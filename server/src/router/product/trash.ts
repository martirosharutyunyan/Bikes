import express from 'express';
import Products from '../../sequelize/products';
import Trash from '../../sequelize/trash';
import { deleteImage } from '../../tools/tools';
const router = express.Router();

router.post('/addToTrash', async (req, res):Promise<void> => {
    try{
	const { product } = req.body
        const { codeOfProduct } = product
        await Products.deleteProduct(codeOfProduct)
        await Trash.AddProduct(product)
        res.send('ok')
    } catch(err:any){
        console.log(err)
        res.send({message:'error'})
    }
})

router.post('/deleteFromTrash', async (req, res):Promise<void> => {
    try{
        const { product } = req.body
        let { imagePath, codeOfProduct } = product
        imagePath = JSON.parse(imagePath)
        console.log(imagePath)
        imagePath.forEach((elem:string) => {
            deleteImage(elem)
        })
        Trash.deleteFromTrash(codeOfProduct)
        res.send({message:"ok"}) 
    } catch(err:any){
        console.log(err)
        res.send({message:"error"}) 
    }
})

router.get('/getTrashProducts', async (req, res):Promise<void> => {
    try{
        const data = await Trash.getProducts()
        res.send({message:'ok', data})
    } catch(err:any){
        console.log(err)
        res.send({message:'error'})
    }
})

router.post('/recovery', async (req, res):Promise<void> => {
    try{
        const { product } = req.body
        const { codeOfProduct } = product
        await Products.AddProduct(product)
        await Trash.deleteFromTrash(codeOfProduct)
        res.send({message:"ok"})
    } catch(err:any){
        console.log(err)
        res.send({message:'error'})
    }
})


module.exports = router;
