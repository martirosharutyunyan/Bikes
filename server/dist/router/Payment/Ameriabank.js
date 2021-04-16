"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
router.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // const { user: { name, surname }, product: { productName, price:Amount } } = req.body
        const { AMERIAPASSWORD, AMERIACLIENTID, AMERIAAPI, AMERIAUSERNAME } = process.env;
        const requestData = {
            ClientID: AMERIACLIENTID,
            Username: AMERIAUSERNAME,
            Password: AMERIAPASSWORD,
            Description: 'Description',
            // OrderID:Math.floor(Math.random() * 100000000),
            OrderID: 2380801 + Math.floor(Math.random() * 50),
            BackURL: "http://localhost:8888/api/payment/Ameriabank/get",
            Amount: 10,
        };
        const { data } = yield axios_1.default.post(AMERIAAPI, requestData);
        res.send({ data, message: 'ok' });
    }
    catch (err) {
        console.log(err);
        res.send({ message: 'error' });
    }
}));
router.get('/get', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (req.query.responseCode !== '00') {
            console.log('error');
        }
        res.send({ message: "ok", data: req.query });
        // res.redirect('http://localhost:3000/ameriabank')
    }
    catch (err) {
        console.log(err);
    }
}));
router.post('/getdata', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // const { data } = await axios.post(process.env.AMERIAGETSTATUSOFPAYMENT, requestBody)
        // res.send({data})
    }
    catch (err) {
        console.log(err);
        res.send({ message: 'error' });
    }
}));
router.get('/confirm', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { paymentID, orderID } = req.query;
        const { AMERIAPASSWORD, AMERIAUSERNAME } = process.env;
        const requestBody = {
            paymentID,
            orderID,
            Username: AMERIAUSERNAME,
            Password: AMERIAPASSWORD,
        };
        const { data } = yield axios_1.default.post(process.env.AMERIACONFIRMPAYMENT, requestBody);
        res.send({ message: 'ok' });
    }
    catch (err) {
        console.log(err);
        res.send({ message: "error" });
    }
}));
module.exports = router;
//# sourceMappingURL=Ameriabank.js.map