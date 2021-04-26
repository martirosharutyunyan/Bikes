import express from 'express';
import { Op } from 'sequelize';
import { products } from '../../model/postgres';
const router = express.Router();

router.get('/search:data', async (req, res):Promise<void> => {
    try{
        const { data } = req.params
        const product = await products.findAll({
            where:{
                productType:{
                    [Op.like]:data
                }
            }
        })
        res.send({message:"ok", data:product})        
    } catch(err:any){
        console.log(err);
        res.send({message:'error'})
    }
});

module.exports = router;