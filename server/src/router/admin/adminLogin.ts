import express from 'express';
const router = express.Router();
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';


router.post('/', async (req, res) => {
    try{
        const { LoginEmail, LoginPassword } = req.body
        const { ADMINLOGIN, ADMINPASSWORD } = process.env
        if(LoginEmail !== ADMINLOGIN){
            res.send({message: 'not finded'})
            return 
        }
        const isPasswordTrue = await bcrypt.compare(LoginPassword, ADMINPASSWORD)
        if(!isPasswordTrue){
            res.send({message: 'password is false'})
            return 
        }
        const token = jwt.sign({ADMINLOGIN, ADMINPASSWORD}, process.env.TOKENKEY, {expiresIn:'1h'})
        res.send({token, message:'ok'})
    } catch(err){
        res.send({message:'error'})
    }
})

module.exports = router