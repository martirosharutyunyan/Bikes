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
const postgres_1 = require("../model/postgres");
const router = express_1.default.Router();
router.post('/changedata', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { info, language, name } = req.body;
        if (language === 'hy') {
            postgres_1.Infos.create({ info_hy: info, name });
            res.send({ message: 'added' });
            return;
        }
        if (language === 'en') {
            postgres_1.Infos.create({ info_en: info, name });
            res.send({ message: 'added' });
            return;
        }
        postgres_1.Infos.create({ info_ru: info, name });
        res.send({ message: 'added' });
    }
    catch (err) {
        console.log(err);
    }
}));
module.exports = router;
//# sourceMappingURL=Info.js.map