"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
router.use('/product', require('./Product/Product'));
router.use('/info', require('./Product/Info'));
router.use('/trash', require('./Product/Trash'));
router.use('/adminlogin', require('./Admin/AdminLogin'));
router.use('/tokenverify', require('./Admin/TokenVerify'));
router.use('/payment', require('./Payment/Payment'));
module.exports = router;
//# sourceMappingURL=Controller.js.map