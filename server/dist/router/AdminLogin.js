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
const router = express_1.default.Router();
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
router.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { LoginEmail, LoginPassword } = req.body;
        const { ADMINLOGIN, ADMINPASSWORD } = process.env;
        if (LoginEmail !== ADMINLOGIN) {
            res.send({ message: 'not finded' });
            return;
        }
        const isPasswordTrue = yield bcrypt_1.default.compare(LoginPassword, ADMINPASSWORD);
        if (!isPasswordTrue) {
            res.send({ message: 'password is false' });
            return;
        }
        const token = jsonwebtoken_1.default.sign({ ADMINLOGIN, ADMINPASSWORD }, process.env.TOKENKEY, { expiresIn: '1h' });
        res.send({ token, message: 'ok' });
    }
    catch (err) {
        res.send({ message: 'error' });
    }
}));
module.exports = router;
//# sourceMappingURL=AdminLogin.js.map