import { Idram } from './../../model/postgres';
import express from 'express';
import Products from '../../sequelize/products';
const router = express.Router();

router.post('/buy', async (req, res) => {
    try {
        const { products, BILL_NO, user } = req.body
        let Amount = 0
        for (let i:number = 0; i < products.length; i++) {
            Amount += products[i].price
        }
        let Description = []
        const codeOfProducts = products.map(elem => {
            Description = [...Description, elem.productName]
            return elem.codeOfProduct
        })
        Idram.create({ description:JSON.stringify(Description), Amount, codeOfProduct:JSON.stringify(codeOfProducts), BILL_NO, paymentStatus:false, ...user }) 
        res.send({message:'ok'})
    } catch(err) {
        console.log(err)
        res.send({message:"ok"})
    }
})

router.get('/success', async (req, res) => {
    try {
        await Idram.update({paymentStatus:true}, {where:{BILL_NO:req.query.EDP_BILL_NO}})
        res.redirect(`${process.env.FRONTURL}/Idram/success/${req.query.EDP_BILL_NO}`)
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
        res.send('OK')
    } catch(err) {
        console.log(err)
        res.send({message:"error"})
    }
})

router.get('/fail', async (req, res) => {
    try {
        res.redirect(`${process.env.FRONTURL}/Idram/success/${req.query.EDP_BILL_NO}`)
    } catch(err) {
        console.log(err)
        res.send({message:"error"})
    }
})

router.post('/getStatus', async (req, res):Promise<any> => {
    try{
        const { BILL_NO } = req.body;
        const data = await Idram.findOne({where:{BILL_NO}});
        console.log(data)
        if (!data) {
            return res.send({message:"error"});
        }
        let { codeOfProduct }:any = data;
        codeOfProduct = JSON.parse(codeOfProduct)
        codeOfProduct = codeOfProduct.map(async elem => {
            const product = await Products.findProduct(codeOfProduct);
            return product
        })
        res.send({message:"ok", codeOfProduct});
    } catch(err:any){
        console.log(err);
        res.send({message: 'error'});
    }
});

module.exports = router;