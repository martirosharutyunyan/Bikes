import { product } from '../../typescript/types';
import express from 'express';
import Products from '../../sequelize/products';
import { deleteImage, generateFile } from '../../tools/tools';
const router = express.Router();

router.use('/tools', require('./productsTools'))

router.get('/products', async (req, res):Promise<void>=>{
    try{
        const data = await Products.getProducts()  
        res.send(data)
    } catch(err:any){
        console.log(err)
        res.send({message:'error'})
    }
})

router.post('/add',async (req, res):Promise<void>=>{
    try{
        // @ts-ignore
        let arr = []
        const { data:dataStr } = req.body
        console.log(dataStr)
        const data:product = JSON.parse(dataStr)
        const { codeOfProduct } = data
        const areThere = await Products.findProduct(codeOfProduct)
        if(areThere){
            res.send({message:'this product is already registered'})
            return 
        }
        // @ts-ignore
        for (let key in req.files) {
            // @ts-ignore
            arr = [...arr, generateFile(req.files[key].name, req.files[key].data)]
        }
        const product = {
            ...data,
            stars:'[]',
            imagePath:JSON.stringify(arr),
        }
        Products.AddProduct(product)
        res.send({message:'saved'})
    } catch(err:any){
        console.log(err)
        res.send({message:'error'})
    }
})

router.post('/edit', async (req, res):Promise<void>=>{
    try{
        let arr = []
        const data = JSON.parse(req.body.data)
        console.log(data)
        // @ts-ignore
        const files = req.files
        if(files){
            for (let key in files) {
                arr = [...arr, {id:key, img:files[key]}]
            }
        }
        arr = arr.map(elem=>{
            if(files){
                if(!elem.img.length){
                    return {
                        id:+elem.id,
                        imagePath:[generateFile(elem.img.name, elem.img.data)]
                    }
                }
                const urls = elem.img.map(image => generateFile(image.name,image.data))
                return {
                    id:+elem.id,
                    imagePath:urls
                }
            }
            return elem
        })
        data.forEach(elem => {
            const image = arr.find(image=> image.id === elem.id)
            if(image){
                JSON.parse(elem.imagePath).forEach(elem => deleteImage(elem))
                const { imagePath } = image
                const obj = {...elem, price:+elem.price, imagePath:JSON.stringify(imagePath)}
                delete obj.image
                delete obj.id
                delete obj.createdAt
                delete obj.updatedAt
                Products.updateProduct(obj, elem.codeOfProduct)
                return 
            }
            const obj = {...elem,  price:+elem.price}
            delete obj.id
            delete obj.createdAt
            delete obj.updatedAt
            Products.updateProduct(obj, elem.codeOfProduct)
        })
        res.send({message:"ok"})
    } catch(err:any){
        console.log(err)
        res.send({message:'error'})
    }
})

module.exports = router;
