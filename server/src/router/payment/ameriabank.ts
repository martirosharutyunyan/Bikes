import { AmeriabankRequest, nodemailerMessageType } from '../../typescript/types';
import axios from 'axios';
import express from 'express';
const router = express.Router();
import { Ameriabank } from '../../model/postgres';
import { mailer } from '../nodemailer/nodemailer';
import { mailText, sendNotifications } from '../../tools/tools';
const { AMERIAPASSWORD, AMERIACLIENTID, AMERIAAPI, AMERIAUSERNAME } = process.env

router.post('/', async (req, res):Promise<void> => {
    try{        
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
        await Ameriabank.create({Amount, ...user, paymentID:PaymentID, codeOfProducts:JSON.stringify(codeOfProducts), paymentStatus:false})
        res.send({message:'ok', PaymentID})
    } catch(err:any) {
        res.send({message:'error'})
    }
})

router.get('/get', async (req:any, res)=>{
    try{
        let { resposneCode, paymentID } = req.query;
        paymentID = paymentID.toUpperCase()
        if (resposneCode !== '00') {
            return res.redirect(`${process.env.FRONTURL}/Ameriabank/${paymentID}`)
        }
        const data:any = await Ameriabank.findOne({where:{paymentID}})
        await Ameriabank.update({paymentStatus:true}, {where:{paymentID:paymentID}})
        return res.redirect(`${process.env.FRONTURL}/Ameriabank/${paymentID}`)
    } catch(err){
        console.log(err)
        res.send({message:"error"})
    }
})

router.post('/getStatus', async (req, res) => {
    try {
        const { paymentID }:any = req.body
        const data = await Ameriabank.findOne({where:{paymentID}})
        sendNotifications(data, 'AMERIABANK')
        res.send(data)
    } catch(err) {
        console.log(err)
        res.send({message:'error'})
    }
})

module.exports = router;
