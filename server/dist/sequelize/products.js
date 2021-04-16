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
Object.defineProperty(exports, "__esModule", { value: true });
const Postgres_1 = require("../model/Postgres");
class Products {
    static AddProduct(args) {
        return __awaiter(this, void 0, void 0, function* () {
            Postgres_1.products.create(args);
        });
    }
    ;
    static getProducts(language) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield Postgres_1.products.findAll({ where: { language } });
        });
    }
    ;
    static deleteProduct(productName) {
        return __awaiter(this, void 0, void 0, function* () {
            yield Postgres_1.products.destroy({ where: { productName } });
        });
    }
    ;
    static findProduct(productName) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield Postgres_1.products.findOne({ where: { productName } });
        });
    }
    ;
    static updateProduct(args, id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield Postgres_1.products.update(args, { where: { id } });
        });
    }
    ;
    static updateStars({ productName, count }) {
        return __awaiter(this, void 0, void 0, function* () {
            const dataStr = yield Postgres_1.products.findOne({ where: { productName } });
            const data = JSON.parse(JSON.stringify(dataStr));
            if (!data.stars.length) {
                const arr = [count];
                return yield Postgres_1.products.update({ stars: JSON.stringify(arr) }, { where: { productName } });
            }
            ;
            let array = [...JSON.parse(data.stars), count];
            yield Postgres_1.products.update({ stars: JSON.stringify(array) }, { where: { productName } });
        });
    }
    ;
}
exports.default = Products;
//# sourceMappingURL=Products.js.map