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
const express_1 = __importDefault(require("express"));
const Nodemailer_1 = require("./Nodemailer");
const router = express_1.default.Router();
router.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { user, product } = req.body;
        const { price, name } = product;
        const { cardNumber, email } = user;
        const message = {
            from: process.env.EMAIL,
            to: req.body.user.email,
            subject: 'Congratualions',
            text: req.body.user.text
        };
        Nodemailer_1.mailer(message);
        res.send({ message: 'ok' });
    }
    catch (err) {
        res.send({ message: 'error' });
    }
}));
module.exports = router;
//# sourceMappingURL=Buy.js.map