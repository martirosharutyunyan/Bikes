import express from 'express';
const router = express.Router();

router.use('/Ameriabank', require('./Ameriabank'))
router.use('/Idram', require('./Idram'))



module.exports = router;