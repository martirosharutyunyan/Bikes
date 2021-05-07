import express from 'express';
import { Infos } from '../../model/postgres';
const router = express.Router();
        
router.post('/changedata', async (req, res):Promise<void> => {
    try{
        const { info, language, name } = req.body
        if(language === 'hy'){
            Infos.create({info_hy:info, name})
            res.send({message:'added'})
            return 
        }
        if(language === 'en'){
            Infos.create({info_en:info, name})
            res.send({message:'added'})
            return 
        }
        Infos.create({info_ru:info, name})
        res.send({message:'added'})
    } catch(err:any){
        console.log(err)
    }
})

module.exports = router;