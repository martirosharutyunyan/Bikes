"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
router.post('/', (req, res) => {
    try {
        const data = req.body;
        console.log(data);
        res.send({ message: 'ok' });
    }
    catch (err) {
        console.log(err);
        res.send({ message: "ok" });
    }
});
module.exports = router;
//# sourceMappingURL=Idram.js.map