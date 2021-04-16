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
        // const { user, product:{ productName, price:Amount } } = req.body
        const requestData = {
            ClientID: 'dsa',
            Username: 'dsa',
            Password: 'dsa',
            Description: 'das',
            BackURL: "das",
            OrderID: 231,
            Amount: 200
        };
        const data = yield axios_1.default.post(process.env.AMERIABANKAPI, requestData);
        console.log(data.data);
        res.send({ message: 'ok' });
    }
    catch (err) {
        console.log(err.data);
        res.send({ message: 'error' });
    }
}));
module.exports = router;
//# sourceMappingURL=Ameriabank.js.map