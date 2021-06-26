import express from 'express';
import { sendNotifications } from '../../tools/tools';
const router = express.Router();
        
router.post('/', async (req, res):Promise<void> => {
    try{
        console.log(req.body)
        const { products, user } = req.body
        let Amount = 0
        for (let i:number = 0; i < products.length; i++) {
            Amount += products[i].price
        }
        sendNotifications({ products:JSON.stringify(products), Amount, ...user }, 'CASH')
        res.send({ message: 'ok' })
    } catch(err:any){
        console.log(err);
        res.send({message:'error'})
    }
});


module.exports = router;