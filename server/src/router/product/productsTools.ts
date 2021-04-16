import express from 'express';
import { products } from '../../model/postgres';
import Products from '../../sequelize/products';
const app = express.Router();
        
app.post('/sort',async (req, res):Promise<void>=>{
    try{
        const { language, attribute } = req.body
        const data = await products.findAll({
            where:{language},
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


app.post('/filter',async (req, res):Promise<void>=>{
    try{
        const { language, attributes } = req.body
        const data = await products.findAll({
            where:{language, ...attributes},
        })
        res.send({data})
    } catch(err:any){
        console.log(err)
        res.send({message:'error'})
    }
})

app.post('/stars', async (req, res):Promise<void> => {
    try{
        // @ts-ignore
        await Products.updateStars(req.body)
        res.send({message:'ok'})
    } catch(err:any){
        console.log(err)
        res.send({message:'error'})
    }
})


module.exports = app;