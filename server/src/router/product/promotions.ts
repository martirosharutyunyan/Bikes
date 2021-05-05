import { generateFile, writeFile } from './../../tools/tools';
import express from 'express';
import { promotions } from '../../model/postgres';
const router = express.Router();
        
router.post('/banner', async (req, res):Promise<void>=>{
    try{
        // @ts-ignore
        const { firstBanner, secondBanner } = req.files
        const { which } = req.body
        const { data, name } = firstBanner ?? secondBanner
        const url = generateFile(name, data) 
        promotions.update({ url }, {where:{name:`banner${which}`}})
        res.send({message:'ok'})
    } catch(err:any){
        console.log(err)
    }
})

router.get('/getBanners', async (req, res):Promise<void> => {
    try {
        const data = await promotions.findAll()
        if(data.length === 0){
            promotions.create({name:'banner1', url:''})
            promotions.create({name:'banner2', url:''})
        }
        res.send(data)
    } catch(err) {
        console.log(err)
        res.send({message:'ok'})
    }
})

module.exports = router;