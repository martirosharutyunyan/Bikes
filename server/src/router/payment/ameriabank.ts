import { AmeriabankRequest, nodemailerMessageType } from '../../typescript/types';
import axios from 'axios';
import express from 'express';
const router = express.Router();
import { Ameriabank } from '../../model/postgres';
import { sendNotifications } from '../../tools/tools';
const { AMERIAPASSWORD, AMERIACLIENTID, AMERIAAPI, AMERIAUSERNAME } = process.env

router.post('/', async (req, res):Promise<void> => {
    try{ 
        console.log(req.body)       
        const { user, products } = req.body
        const OrderID = 2380801 + Math.floor(Math.random() * 5000000)
        let Amount = 0
        for (let i:number = 0; i < products.length; i++) {
            Amount += products[i].price
        }
        const codeOfProducts = products.map(elem => elem.codeOfProduct)
        const requestBody:AmeriabankRequest = {
            OrderID,
            Amount,
            Description:'Hecanivclub.am-ի վճարում',
            ClientID:AMERIACLIENTID,
            Username:AMERIAUSERNAME,
            Password:AMERIAPASSWORD,
            BackURL:`${process.env.FRONTURL}/api/payment/Ameriabank/get`,
        }
        const { data:{PaymentID} } = await axios.post(AMERIAAPI, requestBody)
        await Ameriabank.create({Amount, ...user, paymentID:PaymentID, products:JSON.stringify(products), paymentStatus:false})
        res.send({message:'ok', PaymentID})
    } catch(err:any) {
        res.send({message:'error'})
    }
})

router.get('/get', async (req:any, res)=>{
    try{
        console.log(req.query)
        let { resposneCode, paymentID } = req.query;
        paymentID = paymentID.toUpperCase()
        if (resposneCode !== '00') {
            return res.redirect('https://hecanivclub.am/basket?paymentStatus=failed')
        }
        await Ameriabank.update({paymentStatus:true}, {where:{paymentID:paymentID}})
        const data = await Ameriabank.findOne({where:{paymentID}})
        sendNotifications(data, 'VISA')
        res.redirect('https://hecanivclub.am/basket?paymentStatus=successed')
    } catch(err){
        console.log(err)
        res.send({message:"error"})
    }
})


module.exports = router;
