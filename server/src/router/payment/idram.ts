import axios from 'axios';
import express, { response } from 'express';
const router = express.Router();
        


router.get('/buy', async (req, res) => {
    try {
        const { language, amount, description } = req.body 
        const requestBody = {
            EDP_LANGUAGE:language.toUpperCase(),
            EDP_REC_ACCOUNT:process.env.EDP_REC_ACCOUNT,
            EDP_DESCRIPTION:description,
            EDP_AMOUNT:amount,
            EDP_BILL_NO:Math.floor(Math.random() * 10000000),
        }
        const { data } = await axios.post(process.env.IDRAM_API, requestBody)
        console.log(data)
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

router.get('/result', async (req, res) => {
    try {
        res.send('OK')
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