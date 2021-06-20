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
    return (path:string, data:any) =>{
        return new Promise((res, rej)=>{
            action(path, data, (err:Error, data:Buffer) => {
                if(err){
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

export const sendNotifications = async (args, paymentMethod: 'IDRAM' | "AMERIABANK" | 'CASH') => {
    const { codeOfProduct } = args
    let products:product[] = await Promise.all(JSON.parse(codeOfProduct).map(async elem => {
        const data = await Products.findProduct(elem)
        return data
    }))
    const messageForAdmin:nodemailerMessageType = {
        from:process.env.EMAIL,
        subject:'Պատվեր hecanivclub.am-ից',
        to:process.env.ADMINEMAIL,
        html:mailText(args, products, paymentMethod)
    }
    const messageForUser:nodemailerMessageType = {
        from:process.env.EMAIL,
        subject:'Պատվեր hecanivclub.am-ից',
        to:args.email,
        html:mailText(args, products, paymentMethod, false)
    }
    mailer(messageForAdmin)
    mailer(messageForUser)
}

export const mailText = (args:messageTextType, products:product[], paymentMethod:string, admin:boolean = true):string => {
    const productType = [...new Set(products.map(elem => elem.productType))]
    let str = ``
    productType.forEach(elem => {
        const array = products.filter(product => product.productType === elem)
        let model = `${array.length === 1 ? 'Մոդելը՝ ' : 'Մոդելները՝'}`
        array.forEach(elem => {
            model += ` ${elem.productNameHY}, `
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
        Վճարման եղանակը՝ ${paymentMethod}<br>
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
    Վճարման եղանակը՝ ${paymentMethod}<br>
    Առաքման հասցեն՝ ${args.address}<br>
    Նախընտրելի ժամանակը՝ ${args.deliveryTime}<br>
    
    ${str}
    </body>
    </html>`
} 

