import { Sequelize, DataTypes } from "sequelize";
require("dotenv").config()
const { 
    DIALECT,
    MYSQLUSERNAME,
    MYSQLPASSWORD,
    MYSQLDATABASE,
    POSTGRESDBUSERNAME,
    POSTGRESDBPASSWORD,
    POSTGRESDBNAME,
    HOST,
    FORCE,
} = process.env

const STRING = () => ({ type: DataTypes.STRING })
const BOOLEAN = () => ({ type: DataTypes.BOOLEAN })
const INTEGER = () => ({ type: DataTypes.INTEGER })

// @ts-ignore
export const sequelize = new Sequelize({
    username:DIALECT === "mysql" ? MYSQLUSERNAME : POSTGRESDBUSERNAME,
    password:DIALECT === "mysql" ? MYSQLPASSWORD : POSTGRESDBPASSWORD,
    database:DIALECT === "mysql" ? MYSQLDATABASE : POSTGRESDBNAME,
    dialect:DIALECT,
    host:HOST,
    logging:false
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

const userData = {
    name:STRING(),
    surname:STRING(),
    address:STRING(),
    phoneNumber:STRING(),
    email:STRING(),
    deliveryTime:STRING(),
}

export const Ameriabank = sequelize.define("ameriabank", {
    ...userData,
    Amount:STRING(),
    paymentID:STRING(),
    codeOfProduct:STRING(),
    paymentStatus:BOOLEAN(),
})

export const Idram = sequelize.define("idram", {
    ...userData,
    Amount:STRING(),
    codeOfProduct:STRING(),
    BILL_NO:INTEGER(),
    paymentStatus:BOOLEAN(),
})


export const Infos = sequelize.define("Infos", {
    name:STRING(),
    info_hy:STRING(),
    info_en:STRING(),
    info_ru:STRING(),
})

export const products = sequelize.define("products", productColumns)
export const trash = sequelize.define("trash", productColumns)
export const promotions = sequelize.define("promotions", {
    name:STRING(),
    url:STRING(),
})

Infos.sync({force:!!FORCE})
Ameriabank.sync({force:!!FORCE})
Idram.sync({force:!!FORCE})
trash.sync({force:!!FORCE})
products.sync({force:!!FORCE})
promotions.sync({force:!!FORCE})

