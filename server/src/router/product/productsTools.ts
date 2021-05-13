import express from 'express';
import { products } from '../../model/postgres';
import Products from '../../sequelize/products';
const router = express.Router();
        
router.post('/sort', async (req, res):Promise<void> => {
    try{ 
        const { attribute } = req.body
        const data = await products.findAll({
            order:[
                [attribute, attribute === 'price' ? "DESC" : 'ASC'],
            ]
        })
        res.send({data})
    } catch(err:any){
        console.log(err)
        res.send({message:'error'})
    }
})


router.post('/filter', async (req, res):Promise<void> => {
    try{
        const { attributes } = req.body
        const data = await products.findAll({
            where:{...attributes},
        })
        res.send({data})
    } catch(err:any){
        console.log(err)
        res.send({message:'error'})
    }
})

router.post('/stars', async (req, res):Promise<void> => {
    try{
        // @ts-ignore
        await Products.updateStars(req.body)
        res.send({message:'ok'})
    } catch(err:any){
        console.log(err)
        res.send({message:'error'})
    }
})

router.get('/search', async (req, res) => {
    try {
        const { info } = req.query
        // @ts-ignore
        const data = await Products.search(info)
        res.send({message:"ok", data})
    } catch(err) {
        console.log(err)
        res.send({message:'error'})
    }
})

router.get('/find', async (req, res):Promise<void> => {
    try{
        const { codeOfProduct }:any = req.query
        const data = await Products.findProduct(codeOfProduct)
        res.send({data});
    } catch(err:any){
        console.log(err);
        res.send({message: 'error'})
    }
});

module.exports = router;