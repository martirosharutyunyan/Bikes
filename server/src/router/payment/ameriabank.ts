import { AmeriabankRequest, product } from '../../typescript/types';
import axios from 'axios';
import express from 'express';
const router = express.Router();
import { Users } from '../../sequelize/payment';
const { AMERIAPASSWORD, AMERIACLIENTID, AMERIAAPI, AMERIAUSERNAME, AMERIAGETSTATUSOFPAYMENT, AMERIACONFIRMPAYMENT } = process.env

router.post('/', async (req, res):Promise<void> => {
    try{        
        const { user: { name, surname }, product: { productName, price:Amount, description } } = req.body
        const OrderID = 2380801 + Math.floor(Math.random() * 500)
        const requestData:AmeriabankRequest = {
            OrderID,
            Amount,
            ClientID:AMERIACLIENTID,
            Username:AMERIAUSERNAME,
            Password:AMERIAPASSWORD,
            Description:description,
            BackURL:"http://localhost:8888/api/payment/Ameriabank/get",
        }
        const { data } = await axios.post(AMERIAAPI, requestData)
        Users.saveToDB({description, OrderID, Amount, name, surname, PaymentID:data.PaymentID})
        res.send({data, message:'ok'})
    } catch(err:any) {
        console.log(err)
        res.send({message:'error'})
    }
})

router.get('/get', async (req:any, res)=>{
    try{
        if (req.query.resposneCode !== '00') {
            console.log(req.query)
        }
        const requestBody = {
            PaymentID:req.query.paymentID.toUpperCase(),
            Username:AMERIAUSERNAME,
            Password:AMERIAPASSWORD,
        }
        const { data } = await axios.post(AMERIAGETSTATUSOFPAYMENT, requestBody)
        res.redirect(`http://localhost:8888/api/payment/Ameriabank/confirm?orderID=${data.OrderID}`)
        // res.send({message:"ok", data})
    } catch(err){
        console.log(err)
        res.send({message:"error"})
    }
})




module.exports = router;
