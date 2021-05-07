import { proto } from './tools/tools';
import express from 'express';
import dotenv from 'dotenv'
dotenv.config();
import morgan from 'morgan';
import cors from 'cors'
import path from 'path';
import fileupload from 'express-fileupload';
import { sequelize } from './model/postgres';
const app = express();
const port:string | number = process.env.PORT ?? 8888;

sequelize.authenticate().then(res=>console.log('DB connected')).catch(err=>console.log(err))
proto()

app.use(cors({origin:['http://localhost:3000']}))
app.use(fileupload())
app.use(morgan(`dev`));
app.use(express.json())
app.use(express.urlencoded({
    extended: false
}))
app.use('/api',require('./router/controller'))
app.use(express.static(path.join(__dirname, '../public')))

// require('bcrypt').hash('hhs13516', 10).then(res => console.log(res));
app.get('/', (req, res) => {
    res.send('ok')
})

app.listen(port, () => console.log(`server is running on port http://localhost:${port}`));
