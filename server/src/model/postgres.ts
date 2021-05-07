import { Sequelize, DataTypes } from 'sequelize';
require('dotenv').config()

const STRING = () => ({ type: DataTypes.STRING })
const BOOLEAN = () => ({ type: DataTypes.BOOLEAN })
const INTEGER = () => ({ type: DataTypes.INTEGER })

// export const sequelize = new Sequelize({
//     host:process.env.MYSQLHOST,
//     username:process.env.MYSQLUSERNAME,
//     password:process.env.MYSQLPASSWORD,
//     database:process.env.MYSQLDATABASE,
//     dialect:'mysql',
//     logging:false
// })

export const sequelize = new Sequelize({
    username:process.env.POSTGRESDBUSERNAME,
    password:process.env.POSTGRESDBPASSWORD,
    database:process.env.POSTGRESDBNAME,
    dialect:'postgres',
    // logging:false
})

export const productColumns = {
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
    discounts:STRING(),
    oldPrice:STRING(),
    codeOfProduct:STRING(),
    theBestProduct:BOOLEAN(),
    stars:STRING(),
    month:STRING(),
    priceOfMonth:STRING(),
    hashtag:STRING(),
    promotions:BOOLEAN(),
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
    paymentStatus:BOOLEAN(),
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
    paymentStatus:BOOLEAN(),
})


export const Infos = sequelize.define('Infos',{
    name:STRING(),
    info_hy:STRING(),
    info_en:STRING(),
    info_ru:STRING(),
})

export const products = sequelize.define('products', productColumns)
export const trash = sequelize.define('trash', productColumns)
export const promotions = sequelize.define('promotions', {
    name:STRING(),
    url:STRING(),
})

// Infos.sync({force:true})
// Ameriabank.sync({force:true})
// Idram.sync({force:true})
// trash.sync({force:true})
// products.sync({force:true})
// promotions.sync({force:true})

