import express from 'express';
const router = express.Router();

router.use('/Ameriabank', require('./ameriabank'))
router.use('/Idram', require('./idram'))
router.use('/cash', require('./cash'))


module.exports = router;