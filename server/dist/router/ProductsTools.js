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
const products_1 = __importDefault(require("../sequelize/products"));
const app = express_1.default.Router();
app.post('/sort', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { language, attribute } = req.body;
        const data = yield postgres_1.products.findAll({
            where: { language },
            order: [
                [attribute, attribute === 'price' ? "DESC" : 'ASC'],
            ]
        });
        res.send({ data });
    }
    catch (err) {
        console.log(err);
        res.send({ message: 'error' });
    }
}));
app.post('/filter', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { language, attributes } = req.body;
        const data = yield postgres_1.products.findAll({
            where: Object.assign({ language }, attributes),
        });
        res.send({ data });
    }
    catch (err) {
        console.log(err);
        res.send({ message: 'error' });
    }
}));
app.post('/stars', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // @ts-ignore
        yield products_1.default.updateStars(req.body);
        res.send({ message: 'ok' });
    }
    catch (err) {
        console.log(err);
        res.send({ message: 'error' });
    }
}));
module.exports = app;
//# sourceMappingURL=ProductsTools.js.map