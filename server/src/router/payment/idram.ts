import { Idram } from './../../model/postgres';
import express from 'express';
import { sendNotifications } from '../../tools/tools';
const router = express.Router();

router.post('/buy', async (req, res) => {
    try {
        console.log(req.body)
        const { products, BILL_NO, user } = req.body
        let Amount = 0
        for (let i:number = 0; i < products.length; i++) {
            Amount += products[i].price
        }
        Idram.create({ Amount, products: JSON.stringify(products), BILL_NO, paymentStatus:false, ...user })
        res.send({message:'ok'})
    } catch(err) {
        console.log(err)
        res.send({message:"ok"})
    }
})

router.get('/success', async (req, res) => {
    try {
        console.log(req.query)
        const { EDP_BILL_NO:BILL_NO } = req.query 
        await Idram.update( { paymentStatus: true }, { where: { BILL_NO } })
        const data = await Idram.findOne({where:{BILL_NO}});
        sendNotifications(data, 'IDRAM')
        res.redirect('https://hecanivclub.am/basket?paymentStatus=successed')
    } catch(err) {
        console.log(err)
        res.send({message:"error"})
    }
})

router.post('/result', async (req, res) => {
    try {
        console.log(req.query)
        const data = await Idram.findOne({where: {BILL_NO:req.body.EDP_BILL_NO}})
        console.log(data)
        if (!data) {
            res.send({message:'error'})
            return 
        }
        res.send('OK')
    } catch(err) {
        console.log(err)
        res.send({message:"error"})
    }
})

router.get('/fail', async (req, res) => {
    try {
        res.redirect('https://hecanivclub.am/basket?paymentStatus=failed')
    } catch(err) {
        console.log(err)
        res.send({message:"error"})
    }
})

module.exports = router;