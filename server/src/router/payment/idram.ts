import axios from 'axios';
import express, { response } from 'express';
const router = express.Router();
        


router.post('/buy', async (req, res) => {
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

<<<<<<< HEAD

router.get('/success', (req, res) => {
=======
router.get('/success', async (req, res) => {
>>>>>>> 4141e0e1f6641e3f9994b37e03281a48ccfe9e19
    try {
        res.send({message:"success"})
    } catch(err) {
        console.log(err)
        res.send({message:"error"})
    }
})

<<<<<<< HEAD
router.get('/result', (req, res) => {
=======
router.post('/result', async (req, res) => {
>>>>>>> 4141e0e1f6641e3f9994b37e03281a48ccfe9e19
    try {
        res.send('OK')
    } catch(err) {
        console.log(err)
        res.send({message:"error"})
    }
})

<<<<<<< HEAD
router.get('/fail', (req, res) => {
=======
router.get('/fail', async (req, res) => {
>>>>>>> 4141e0e1f6641e3f9994b37e03281a48ccfe9e19
    try {
        res.send({message:"fail"})
    } catch(err) {
        console.log(err)
        res.send({message:"error"})
    }
})

module.exports = router;