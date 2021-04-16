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
const tool_1 = require("../tools/tool");
const router = express_1.default.Router();
router.use('/tools', require('./ProductsTools'));
router.get('/products:language', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { language } = req.params;
        const data = yield products_1.default.getProducts(language);
        res.send(data);
    }
    catch (err) {
        console.log(err);
        res.send({ message: 'error' });
    }
}));
router.get('/product:productName', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { productName } = req.params;
        const data = yield products_1.default.findProduct(productName);
        res.send({ data });
    }
    catch (err) {
        console.log(err);
        res.send({ message: "error" });
    }
}));
router.post('/add', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // @ts-ignore
        let arr = [];
        const { data: dataStr } = req.body;
        const data = JSON.parse(dataStr);
        const { productName } = data;
        const areThere = yield products_1.default.findProduct(productName);
        if (areThere) {
            res.send({ message: 'this product is already registered' });
            return;
        }
        // @ts-ignore
        for (let key in req.files) {
            // @ts-ignore
            arr = [...arr, tool_1.generateFile(req.files[key].name, req.files[key].data)];
        }
        const product = Object.assign(Object.assign({}, data), { stars: '', language: req.body.language, imagePath: JSON.stringify(arr) });
        products_1.default.AddProduct(product);
        res.send({ message: 'saved' });
    }
    catch (err) {
        console.log(err);
        res.send({ message: 'error' });
    }
}));
router.post('/edit', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let arr = [];
        const data = JSON.parse(req.body.data);
        // @ts-ignore
        const files = req.files;
        if (files) {
            for (let key in files) {
                arr = [...arr, { id: key, img: files[key] }];
            }
        }
        arr = arr.map(elem => {
            if (files) {
                if (!elem.img.length) {
                    return {
                        id: +elem.id,
                        imagePath: [tool_1.generateFile(elem.img.name, elem.img.data)]
                    };
                }
                const urls = elem.img.map(image => tool_1.generateFile(image.name, image.data));
                return {
                    id: +elem.id,
                    imagePath: urls
                };
            }
            return elem;
        });
        data.forEach(elem => {
            const image = arr.find(image => image.id === elem.id);
            if (image) {
                JSON.parse(elem.imagePath).forEach(elem => tool_1.deleteImage(elem));
                const { imagePath } = image;
                const obj = Object.assign(Object.assign({}, elem), { price: +elem.price, imagePath: JSON.stringify(imagePath) });
                delete obj.image;
                delete obj.id;
                delete obj.createdAt;
                delete obj.updatedAt;
                products_1.default.updateProduct(obj, elem.id);
                return;
            }
            const obj = Object.assign(Object.assign({}, elem), { price: +elem.price });
            delete obj.id;
            delete obj.createdAt;
            delete obj.updatedAt;
            products_1.default.updateProduct(obj, elem.id);
        });
        res.send({ message: "ok" });
    }
    catch (err) {
        console.log(err);
        res.send({ message: 'error' });
    }
}));
module.exports = router;
//# sourceMappingURL=Product.js.map