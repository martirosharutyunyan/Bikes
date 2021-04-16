"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Tools_1 = require("./tools/Tools");
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const path_1 = __importDefault(require("path"));
const express_fileupload_1 = __importDefault(require("express-fileupload"));
const Postgres_1 = require("./model/Postgres");
const app = express_1.default();
const port = process.env.PORT;
Postgres_1.sequelize.authenticate().then(res => console.log('DB connected')).catch(err => console.log(err));
Tools_1.proto();
app.use(cors_1.default());
app.use(express_fileupload_1.default());
app.use(morgan_1.default(`dev`));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({
    extended: false
}));
app.use('/api', require('./router/Controller'));
app.use(express_1.default.static(path_1.default.join(__dirname, '../public')));
// require('bcrypt').hash('hhs13516', 10).then(res => console.log(res));
app.get('/', (req, res) => {
    res.send('ok');
});
app.listen(port, () => console.log(`server is running on port http://localhost:${port}`));
//# sourceMappingURL=server.js.map