import { product } from './../typescript/types';
import path from 'path';
import fs from 'fs';
import { messageTextType, nodemailerMessageType } from '../typescript/types';
import { mailer } from '../router/nodemailer/nodemailer';
import Products from '../sequelize/products';
require('dotenv').config();


// declare global {
//     // interface String{
//     //     log():undefined
//     // }
//     interface Number{
//         log():undefined
//     }
//     // @ts-ignore
//     interface Array{
//         log():undefined
//     }
//     interface Object{
//         log():undefined
//     }
// }

// @ts-ignore
String.prototype.log = function() {
    console.log(this.toString())
}
// @ts-ignore
Array.prototype.log = function() {
    console.log(this)
}
// @ts-ignore
Number.prototype.log = function() {
    console.log(this)
}

export const proto = () => {
    console.log('prototype connected')
}

const promisify1arg = action => {
    return (path:string) =>{
        return new Promise((res, rej)=>{
            action(path, (err:Error, data:Buffer)=>{
                if(err){
                    return rej(err)
                }
                res(data)
            })
        })
    }
}

const promisify2arg = action => {
    return (path:string, data:any) => {
        return new Promise((res, rej) => {
            action(path, data, (err:Error, data:Buffer) => {
                if (err) {
                    return rej(err)
                }
                res(data)
            })
        })
    }
}

const unlink = promisify1arg(fs.unlink)
export const writeFile = promisify2arg(fs.writeFile)

export const generateFile = (imageName: string, data:any):string => {
    const array = imageName.split('.')
    const extension = array[array.length - 1]
    console.log(extension, imageName.length)
    const random = Math.random() 
    const img_path = path.join(__dirname, '../../public')
    writeFile(`${img_path}/random${random}.${extension}`, data).catch(err => console.log(err))    
    return `random${random}.${extension}`;
}

export const deleteImage = (pathToImage:string) => {
    const img_path = path.join(__dirname, '../../public')
    unlink(`${img_path}/${pathToImage}`).catch(err => console.log(err))
}

export const sendNotifications = async (args, paymentMethod: "IDRAM" | "VISA" | "CASH") => {
    const { products:strProducts } = args
    const products = JSON.parse(strProducts)
    const data = await Promise.all(products.map(async e => {
        const item = await Products.findProduct(e.codeOfProduct)
        item.colors = e.colors
        item.height = e.height
        item.sizes = e.sizes
        return item;
    }))
    const messageForAdmin:nodemailerMessageType = {
        from:process.env.EMAIL,
        subject:'Պատվեր hecanivclub.am-ից',
        to:process.env.ADMINEMAIL,
        // @ts-ignore
        html:mailText(args, data, paymentMethod)
    }
    const messageForUser:nodemailerMessageType = {
        from:process.env.EMAIL,
        subject:'Պատվեր hecanivclub.am-ից',
        to:args.email,
        // @ts-ignore
        html:mailText(args, data, paymentMethod, false)
    }
    mailer(messageForAdmin)
    mailer(messageForUser)
}

const colors = {
    "#E3E3CD": 'Մարմնագույն',
    "#E8A631": 'Գազարագույն',
    "#878D92": 'Բաց Մոխրագույն',
    "#49494D": 'Մուգ Մոխրագույն',
    "#B42F32": 'Կարմիր',
    "#000000": 'Սև',
    "#00FF00": 'Կանաչ',
    "#4d19a7": 'Մանուշակագույն'
}

export const mailText = (args:messageTextType, products:product[], paymentMethod:string, admin:boolean = true):string => {
    const productType = [...new Set(products.map(elem => elem.productType))]
    let value = 0;
    products.forEach(e => value+= e.price)
    let str = ``
    productType.forEach(elem => {
        const array = products.filter(product => product.productType === elem)
        let model = array.length === 1 ? 'Մոդելը՝ ' : 'Մոդելները՝ '
        array.forEach(elem => {
            model += `Անունը՝ ${elem.productNameHY}, Գույնը՝ ${colors[elem.colors]}, Չափը՝ ${elem.sizes}, Բարձրությունը՝ ${elem.height}`
        })
        str += `Պատվերի տեսակը՝ ${elem}
${model}
`
    })
    if (admin) {
        // @ts-ignore
        return `<!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Document</title>
        </head>
        <body>
        <b>Հարգելի hecanivclub.am, Դուք ունեք նոր պարվեր կայքից.</b><br>
        Շնորհակալություն պատվերի համար։<br>
        Ձեր պատվերը հաստատվել է, առաքումը կիրականանա նշված ժամանակահատվածում<br>
        Կից կներկայացեն պատվերի մանրամասները՝ անհարաժեշտ տեղեկատվությամբ.<br>
        <br>
        Պատվերի մանրամասները՝<br>
        Անուն Ազգանուն՝ ${args.name} ${args.surname}<br>
        Պատվիրատուի հեռախոսահամարը ${args.phoneNumber}
        Վճարման եղանակը՝ ${paymentMethod}<br>
        Պատվերի արժեքը՝ ${value} դրամ<br>
        Առաքման հասցեն՝ ${args.address}<br>
        Նախընտրելի ժամանակը՝ ${args.deliveryTime}<br>

        ${str}
        </body>
        </html>`
    }
    return `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Document</title>
    </head>
    <body>
    <b>Հարգելի պատվիրատու, Դուք կատարել եք նոր պատվեր hecanivclub.am- կայքից.</b><br>
    Շնորհակալություն պատվերի համար։<br>
    Ձեր պատվերը հաստատվել է, առաքումը կիրականանա նշված ժամանակահատվածում<br>
    Կից կներկայացեն պատվերի մանրամասները՝ անհարաժեշտ տեղեկատվությամբ.<br>
    
    Պատվերի մանրամասները՝<br>
    Անուն Ազգանուն՝ ${args.name} ${args.surname}<br>
    Պատվիրատուի հեռախոսահամարը ${args.phoneNumber}
    Վճարման եղանակը՝ ${paymentMethod}<br>
    Պատվերի արժեքը՝ ${value} դրամ<br>
    Առաքման հասցեն՝ ${args.address}<br>
    Նախընտրելի ժամանակը՝ ${args.deliveryTime}<br>

    ${str}
    </body>
    </html>`
} 

