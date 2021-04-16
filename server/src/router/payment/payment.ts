import express from 'express';
const router = express.Router();

router.use('/Ameriabank', require('./ameriabank'))
router.use('/Idram', require('./idram'))



module.exports = router;