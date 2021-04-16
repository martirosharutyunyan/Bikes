"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
router.post('/buy', (req, res) => {
    try {
        const data = req.body;
        const { IDRAM_SUCCESS_URL: SUCCESS_URL, IDRAM_RESULT_URL: RESULT_URL, IDRAM_FAIL_URL: FAIL_URL } = process.env;
        res.send({ message: 'ok' });
    }
    catch (err) {
        console.log(err);
        res.send({ message: "ok" });
    }
});
router.post('/success', (req, res) => {
    try {
    }
    catch (err) {
        console.log(err);
        res.send({ message: "error" });
    }
});
router.post('/result', (req, res) => {
    try {
    }
    catch (err) {
        console.log(err);
        res.send({ message: "error" });
    }
});
router.post('/fail', (req, res) => {
    try {
    }
    catch (err) {
        console.log(err);
        res.send({ message: "error" });
    }
});
module.exports = router;
//# sourceMappingURL=Idram.js.map