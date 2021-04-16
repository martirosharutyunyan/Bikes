import { AmeriabankRequest, product } from '../../typescript/types';
import axios from 'axios';
import express from 'express';
const router = express.Router();
        
router.post('/', async (req, res):Promise<void> => {
    try{        
        // const { user: { name, surname }, product: { productName, price:Amount } } = req.body
        const { AMERIAPASSWORD, AMERIACLIENTID, AMERIAAPI, AMERIAUSERNAME } = process.env
        const requestData:AmeriabankRequest = {
            ClientID:AMERIACLIENTID,
            Username:AMERIAUSERNAME,
            Password:AMERIAPASSWORD,
            Description:'Description',
            // OrderID:Math.floor(Math.random() * 100000000),
            OrderID:2380801 + Math.floor(Math.random() * 50),
            BackURL:"http://localhost:8888/api/payment/Ameriabank/get",
            Amount:10,
        }
        const { data } = await axios.post(AMERIAAPI, requestData)
        res.send({data, message:'ok'})
    } catch(err:any) {
        console.log(err)
        res.send({message:'error'})
    }
})

router.get('/get',async (req, res)=>{
    try{
        if (req.query.responseCode !== '00') {
            console.log('error')
        }
        res.send({message:"ok", data:req.query})
        // res.redirect('http://localhost:3000/ameriabank')
    } catch(err){
        console.log(err)
    }
})


router.post('/getdata', async (req, res) => {
    try{
        // const { data } = await axios.post(process.env.AMERIAGETSTATUSOFPAYMENT, requestBody)
        // res.send({data})
    } catch(err){
        console.log(err)
        res.send({message:'error'})
    }
})


router.get('/confirm', async (req, res) => {
    try {
        const { paymentID, orderID } = req.query
        const { AMERIAPASSWORD, AMERIAUSERNAME } = process.env
        const requestBody = {
            paymentID,
            orderID,
            Username:AMERIAUSERNAME,
            Password:AMERIAPASSWORD,
        }
        const { data }:any = await axios.post(process.env.AMERIACONFIRMPAYMENT, requestBody)
        res.send({message:'ok'})
    } catch(err) {
        console.log(err)
        res.send({message:"error"})
    }
})

module.exports = router;

