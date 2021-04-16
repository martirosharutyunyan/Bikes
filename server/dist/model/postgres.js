"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.trash = exports.products = exports.Infos = exports.payment = exports.sequelize = void 0;
const sequelize_1 = require("sequelize");
// export const sequelize = new Sequelize({
//     host:process.env.MYSQLHOST,
//     username:process.env.MYSQLUSERNAME,
//     password:process.env.MYSQLPASSWORD,
//     database:process.env.MYSQLDATABASE,
//     dialect:'mysql'
// })
exports.sequelize = new sequelize_1.Sequelize({
    username: process.env.POSTGRESDBUSERNAME,
    password: process.env.POSTGRESDBPASSWORD,
    database: process.env.POSTGRESDBNAME,
    dialect: 'postgres',
    logging: false
});
const productColumns = {
    productName: {
        type: sequelize_1.DataTypes.STRING
    },
    productType: {
        type: sequelize_1.DataTypes.STRING
    },
    price: {
        type: sequelize_1.DataTypes.INTEGER
    },
    colors: {
        type: sequelize_1.DataTypes.STRING
    },
    sizes: {
        type: sequelize_1.DataTypes.STRING
    },
    height: {
        type: sequelize_1.DataTypes.STRING
    },
    description: {
        type: sequelize_1.DataTypes.STRING
    },
    imagePath: {
        type: sequelize_1.DataTypes.STRING
    },
    language: {
        type: sequelize_1.DataTypes.STRING
    },
    promotions: {
        type: sequelize_1.DataTypes.STRING
    },
    discounts: {
        type: sequelize_1.DataTypes.STRING
    },
    oldPrice: {
        type: sequelize_1.DataTypes.STRING
    },
    codeOfProduct: {
        type: sequelize_1.DataTypes.STRING
    },
    theBestProduct: {
        type: sequelize_1.DataTypes.BOOLEAN
    },
    stars: {
        type: sequelize_1.DataTypes.STRING
    },
    month: {
        type: sequelize_1.DataTypes.STRING
    },
    priceOfMonth: {
        type: sequelize_1.DataTypes.STRING
    },
};
exports.payment = exports.sequelize.define('users', {
    PaymentID: {
        type: sequelize_1.DataTypes.STRING
    },
    opaque: {
        type: sequelize_1.DataTypes.STRING
    },
    name: {
        type: sequelize_1.DataTypes.STRING
    },
    surname: {
        type: sequelize_1.DataTypes.STRING
    }
});
exports.Infos = exports.sequelize.define('Infos', {
    name: {
        type: sequelize_1.DataTypes.STRING
    },
    info_hy: {
        type: sequelize_1.DataTypes.STRING
    },
    info_en: {
        type: sequelize_1.DataTypes.STRING
    },
    info_ru: {
        type: sequelize_1.DataTypes.STRING
    },
});
exports.products = exports.sequelize.define('products', productColumns);
exports.trash = exports.sequelize.define('trash', productColumns);
// Infos.sync({force:true})
// payment.sync({force:true})
// trash.sync({force:true})
// products.sync({force:true})
//# sourceMappingURL=Postgres.js.map