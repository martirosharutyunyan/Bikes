import express from 'express';
const router = express.Router();

router.use('/product', require('./Product/product'))
router.use('/info', require('./Product/info'))
router.use('/trash', require('./Product/trash'))
router.use('/adminlogin', require('./Admin/adminLogin'))
router.use('/tokenverify', require('./Admin/tokenVerify'))
router.use('/payment', require('./Payment/payment'))

module.exports = router;