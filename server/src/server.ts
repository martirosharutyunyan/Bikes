import { proto } from './tools/tools';
import express from 'express';
import dotenv from 'dotenv'
dotenv.config();
import morgan from 'morgan';
import cors from 'cors'
import path from 'path';
import fileupload from 'express-fileupload';
import { Ameriabank, sequelize } from './model/postgres';
import Products from './sequelize/products';
import { recover } from './model/recoverProduct';
const app = express();
const port:string | number = process.env.PORT ?? 8888;

sequelize.authenticate().then(res=>console.log('DB connected')).catch(err=>console.log(err))
proto()

// app.use(cors({origin:['http://localhost:3000']}))
app.use(cors())
app.use(fileupload())
app.use(morgan(`dev`));
app.use(express.json())
app.use(express.urlencoded({
    extended: false
}))
app.use('/api', require('./router/controller'))
app.use('/public',express.static(path.join(__dirname, '../public')))

// require('bcrypt').hash('hhs13516', 10).then(res => console.log(res));
app.get('/', (req, res) => {    
    // Ameriabank.create({name:'name',surname:"surname",address:'address',phoneNumber:'phoneNumber',email:'email',deliveryTime:'deliveryTime',Amount:'10000', paymentID:'123321',codeOfProduct:JSON.stringify(['codeOfProduct','codeOfProduct2']),paymentStatus:true})
    res.send('ok')
})


app.listen(port, () => console.log(`server is running on port http://localhost:${port}`));
