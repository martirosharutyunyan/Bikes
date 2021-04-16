import express, { response } from 'express';
const router = express.Router();
        


router.post('/buy', (req, res) => {
    try {
        const data = req.body
        const { IDRAM_SUCCESS_URL:SUCCESS_URL, IDRAM_RESULT_URL:RESULT_URL, IDRAM_FAIL_URL:FAIL_URL } = process.env
        res.send({message:'ok'})
    } catch(err) {
        console.log(err)
        res.send({message:"ok"})
    }
})


router.post('/success', (req, res) => {
    try {
        res.send({message:"success"})
    } catch(err) {
        console.log(err)
        res.send({message:"error"})
    }
})

router.post('/result', (req, res) => {
    try {
        res.send('OK')
    } catch(err) {
        console.log(err)
        res.send({message:"error"})
    }
})

router.post('/fail', (req, res) => {
    try {
        res.send({message:"fail"})
    } catch(err) {
        console.log(err)
        res.send({message:"error"})
    }
})

module.exports = router;