import { Sequelize, DataTypes } from 'sequelize';
require('dotenv').config()

// export const sequelize = new Sequelize({
//     host:process.env.MYSQLHOST,
//     username:process.env.MYSQLUSERNAME,
//     password:process.env.MYSQLPASSWORD,
//     database:process.env.MYSQLDATABASE,
//     dialect:'mysql'
// })

export const sequelize = new Sequelize({
    username:process.env.POSTGRESDBUSERNAME,
    password:process.env.POSTGRESDBPASSWORD,
    database:process.env.POSTGRESDBNAME,
    dialect:'postgres',
    logging:false
})

const productColumns = {
    productNameHY:{
        type:DataTypes.STRING
    },
    productNameEN:{
        type:DataTypes.STRING
    },
    productNameRU:{
        type:DataTypes.STRING
    },
    productType:{
        type:DataTypes.STRING
    },
    price:{
        type:DataTypes.INTEGER
    },
    colors:{
        type:DataTypes.STRING
    },
    sizes:{
        type:DataTypes.STRING
    },
    height:{
        type:DataTypes.STRING
    },
    descriptionHY:{
        type:DataTypes.STRING
    },
    descriptionEN:{
        type:DataTypes.STRING
    },
    descriptionRU:{
        type:DataTypes.STRING
    },
    imagePath:{
        type:DataTypes.STRING
    },
    promotions:{
        type:DataTypes.BOOLEAN
    },
    discounts:{
        type:DataTypes.STRING
    },
    oldPrice:{
        type:DataTypes.STRING
    },
    codeOfProduct:{
        type:DataTypes.STRING
    },
    theBestProduct:{
        type:DataTypes.BOOLEAN
    },
    stars:{
        type:DataTypes.STRING
    },
    month:{
        type:DataTypes.STRING
    },
    priceOfMonth:{
        type:DataTypes.STRING
    },
    hashtag:{
        type:DataTypes.STRING
    },
}

export const payment = sequelize.define('users',{
    OrderID:{
        type:DataTypes.STRING
    },
    name:{
        type:DataTypes.STRING
    },
    surname:{
        type:DataTypes.STRING
    },
    description:{
        type:DataTypes.STRING
    },
    Amount:{
        type:DataTypes.STRING
    },
    PaymentID:{
        type:DataTypes.STRING
    }
})


export const Infos = sequelize.define('Infos',{
    name:{
        type:DataTypes.STRING
    },
    info_hy:{
        type:DataTypes.STRING
    },
    info_en:{
        type:DataTypes.STRING
    },
    info_ru:{
        type:DataTypes.STRING
    },
})

export const products = sequelize.define('products', productColumns)

export const trash = sequelize.define('trash', productColumns)

Infos.sync()
payment.sync()
trash.sync()
products.sync()