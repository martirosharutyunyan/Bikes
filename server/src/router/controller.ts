import express from 'express';
const router = express.Router();

router.use('/product', require('./product/product'))
router.use('/info', require('./product/info'))
router.use('/trash', require('./product/trash'))
router.use('/adminlogin', require('./admin/adminLogin'))
router.use('/tokenverify', require('./admin/tokenVerify'))
router.use('/payment', require('./payment/payment'))

module.exports = router;