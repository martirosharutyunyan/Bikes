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
class Trash {
    static deleteFromTrash(productName) {
        return __awaiter(this, void 0, void 0, function* () {
            yield Postgres_1.trash.destroy({ where: { productName } });
        });
    }
    ;
    static AddProduct(args) {
        return __awaiter(this, void 0, void 0, function* () {
            yield Postgres_1.trash.create(args);
        });
    }
    static getProducts() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield Postgres_1.trash.findAll();
        });
    }
}
exports.default = Trash;
//# sourceMappingURL=Trash.js.map