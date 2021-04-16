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
const products_1 = __importDefault(require("../sequelize/products"));
const trash_1 = __importDefault(require("../sequelize/trash"));
const tool_1 = require("../tools/tool");
const router = express_1.default.Router();
router.post('/addToTrash', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { product } = req.body;
        const { productName } = product;
        products_1.default.deleteProduct(productName);
        trash_1.default.AddProduct(product);
        res.send('ok');
    }
    catch (err) {
        console.log(err);
        res.send({ message: 'error' });
    }
}));
router.post('/deleteFromTrash', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { product } = req.body;
        let { imagePath, productName } = product;
        imagePath = JSON.parse(imagePath);
        console.log(imagePath);
        imagePath.forEach((elem) => {
            tool_1.deleteImage(elem);
        });
        trash_1.default.deleteFromTrash(productName);
        res.send({ message: "ok" });
    }
    catch (err) {
        console.log(err);
        res.send({ message: "error" });
    }
}));
router.get('/getTrashProducts', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield trash_1.default.getProducts();
        res.send({ message: 'ok', data });
    }
    catch (err) {
        console.log(err);
        res.send({ message: 'error' });
    }
}));
router.post('/recovery', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { product } = req.body;
        const { productName } = product;
        yield products_1.default.AddProduct(product);
        yield trash_1.default.deleteFromTrash(productName);
        res.send({ message: "ok" });
    }
    catch (err) {
        console.log(err);
        res.send({ message: 'error' });
    }
}));
module.exports = router;
//# sourceMappingURL=Trash.js.map