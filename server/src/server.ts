import dotenv from 'dotenv'
dotenv.config();
import { proto } from './tools/tools';
import express from 'express';
import morgan from 'morgan';
import cors from 'cors'
import path from 'path';
import fileupload from 'express-fileupload';
import { sequelize } from './model/postgres';
const app = express();
const port:string | number = process.env.PORT ?? 8888;
sequelize.authenticate().then(console.log, console.error)
proto()

app.use(cors())
app.use(fileupload())
app.use(morgan(`dev`));
app.use(express.json())
app.use(express.urlencoded({
    extended: false
}))
app.use('/api', require('./router/controller'))
app.use('/public', express.static(path.join(__dirname, '../public')))


app.listen(port, () => console.log(`server is running on port http://localhost:${port}`));