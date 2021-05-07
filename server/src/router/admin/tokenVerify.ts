import express from 'express';
const router = express.Router();
import jwt from 'jsonwebtoken';

router.post('/', async (req, res):Promise<void> => {
    try{
        const { token } = req.body;
        const data:any = jwt.verify(token,process.env.TOKENKEY);
        const { ADMINLOGIN, ADMINPASSWORD } = process.env
        if(data.ADMINLOGIN === ADMINLOGIN && data.ADMINPASSWORD === ADMINPASSWORD){
            res.send({message: 'ok'})
            return 
        }
        res.send({message: 'error'});
    } catch(err:any){
        res.send({message: 'error'})
    }
})

module.exports = router;