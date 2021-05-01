import { Sequelize, DataTypes } from 'sequelize';
require('dotenv').config()

<<<<<<< HEAD
=======
// export const sequelize = new Sequelize({
//     host:process.env.MYSQLHOST,
//     username:process.env.MYSQLUSERNAME,
//     password:process.env.MYSQLPASSWORD,
//     database:process.env.MYSQLDATABASE,
//     dialect:'mysql'
// })
const STRING = () => ({ type: DataTypes.STRING })
const BOOLEAN = () => ({ type: DataTypes.BOOLEAN })
const INTEGER = () => ({ type: DataTypes.INTEGER })
>>>>>>> 62ef80b4c77935771db1747ab07220d3d1d66356

export const sequelize = new Sequelize({
    host:process.env.MYSQLHOST,
    username:process.env.MYSQLUSERNAME,
    password:process.env.MYSQLPASSWORD,
    database:process.env.MYSQLDATABASE,
    dialect:'mysql'
})

// export const sequelize = new Sequelize({
//     username:process.env.POSTGRESDBUSERNAME,
//     password:process.env.POSTGRESDBPASSWORD,
//     database:process.env.POSTGRESDBNAME,
//     dialect:'postgres',
//     logging:false
// })

const productColumns = {
    productNameHY:STRING(),
    productNameEN:STRING(),
    productNameRU:STRING(),
    productType:STRING(),
    price:INTEGER(),
    colors:STRING(),
    sizes:STRING(),
    height:STRING(),
    descriptionHY:STRING(),
    descriptionEN:STRING(),
    descriptionRU:STRING(),
    imagePath:STRING(),
    promotions:BOOLEAN(),
    discounts:STRING(),
    oldPrice:STRING(),
    codeOfProduct:STRING(),
    theBestProduct:BOOLEAN(),
    stars:STRING(),
    month:STRING(),
    priceOfMonth:STRING(),
    hashtag:STRING(),
}

export const Ameriabank = sequelize.define('ameriabank',{
    name:STRING(),
    surname:STRING(),
    address:STRING(),
    phoneNumber:STRING(),
    email:STRING(),
    description:STRING(),
    Amount:STRING(),
    paymentID:STRING(),
    codeOfProduct:STRING(),
    paymentStatus:BOOLEAN()
})

export const Idram = sequelize.define('idram', {
    name:STRING(),
    surname:STRING(),
    address:STRING(),
    phoneNumber:STRING(),
    email:STRING(),
    description:STRING(),
    Amount:STRING(),
    codeOfProduct:STRING(),
    BILL_NO:INTEGER(),
    paymentStatus:BOOLEAN()
})


export const Infos = sequelize.define('Infos',{
    name:STRING(),
    info_hy:STRING(),
    info_en:STRING(),
    info_ru:STRING(),
})

export const products = sequelize.define('products', productColumns)
export const trash = sequelize.define('trash', productColumns)

Infos.sync()
Ameriabank.sync()
Idram.sync()
trash.sync()
products.sync()