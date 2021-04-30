import { Idram } from './../../model/postgres';
import axios from 'axios';
import express, { response } from 'express';
const router = express.Router();
        


router.post('/buy', async (req, res) => {
    try {
        const { product:{ description, price:Amount, codeOfProduct }, BILL_NO, user:{ name, surname } } = req.body
        Idram.create({ description, Amount, codeOfProduct, BILL_NO, surname, name }) 
        res.send({message:'ok'})
    } catch(err) {
        console.log(err)
        res.send({message:"ok"})
    }
})

router.get('/success', async (req, res) => {
    try {
        res.send({message:"success"})
    } catch(err) {
        console.log(err)
        res.send({message:"error"})
    }
})

router.post('/result', async (req, res) => {
    try {
        const data = await Idram.findOne({where: {BILL_NO:req.body.EDP_BILL_NO}})
        if (!data) {
            res.send({message:'error'})
            return 
        }
        res.status(200).send('OK')
    } catch(err) {
        console.log(err)
        res.send({message:"error"})
    }
})

router.get('/fail', async (req, res) => {
    try {
        res.send({message:"fail"})
    } catch(err) {
        console.log(err)
        res.send({message:"error"})
    }
})

module.exports = router;