import { AmeriabankRequest } from '../../typescript/types';
import axios from 'axios';
import express from 'express';
const router = express.Router();
import { Ameriabank } from '../../model/postgres';
const { AMERIAPASSWORD, AMERIACLIENTID, AMERIAAPI, AMERIAUSERNAME } = process.env

router.post('/', async (req, res):Promise<void> => {
    try{        
        const { user, products } = req.body
        const OrderID = 2380801 + Math.floor(Math.random() * 5000000)
        let Amount = 0
        for (let i:number = 0; i < products.length; i++) {
            Amount += products[i].price
        }
        let Description = []
        const codeOfProducts = products.map(elem => {
            Description = [...Description, elem.productName]
            return elem.codeOfProduct
        })
        const requestData:AmeriabankRequest = {
            OrderID,
            Amount,
            Description:JSON.stringify(Description),
            ClientID:AMERIACLIENTID,
            Username:AMERIAUSERNAME,
            Password:AMERIAPASSWORD,
            BackURL:"http://46.4.249.19:8888/api/payment/Ameriabank/get",
            // BackURL:"http://localhost:8888/api/payment/Ameriabank/get",
        }
        const { data:{PaymentID} } = await axios.post(AMERIAAPI, requestData)
        await Ameriabank.create({description:JSON.stringify(Description), Amount, ...user, paymentID:PaymentID, codeOfProducts:JSON.stringify(codeOfProducts), paymentStatus:false})
        res.send({message:'ok', PaymentID})
    } catch(err:any) {
        // console.log(err)
        res.send({message:'error'})
    }
})

router.get('/get', async (req:any, res)=>{
    try{
        let { resposneCode, paymentID } = req.query;
        paymentID = paymentID.toUpperCase()
        console.log(req.query)
        if (resposneCode !== '00') {
            return res.redirect('https://hecanivclub.am/Ameriabank/fail')
            // return res.redirect('http://localhost:3000/Ameriabank/fail')
        }
        await Ameriabank.update({paymentStatus:true}, {where:{paymentID:paymentID}})
        res.redirect(`https://hecanivclub.am/Ameriabank/success/${paymentID}`)
        // res.redirect(`http://localhost:3000/Ameriabank/success/${paymentID}`)
    } catch(err){
        console.log(err)
        res.send({message:"error"})
    }
})

router.get('/getStatus', async (req, res) => {
    try {
        const { paymentID }:any = req.query
        const data = await Ameriabank.findOne({where:{paymentID:paymentID.toUpperCase()}})
        res.send(data)
    } catch(err) {
        console.log(err)
        res.send({message:'error'})
    }
})

module.exports = router;
