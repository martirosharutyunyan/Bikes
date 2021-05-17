import path from 'path';
import fs from 'fs';
import { messageTextType, nodemailerMessageType } from '../typescript/types';
import { mailer } from '../router/nodemailer/nodemailer';
import { Ameriabank } from '../model/postgres';
import Products from '../sequelize/products';

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
    return `${process.env.IMAGEURL}random${random}.${extension}`;
}

export const deleteImage = (pathToImage:string) => {
    const img_path = path.join(__dirname, '../../public')
    const image = pathToImage.slice(process.env.IMAGEURL.length)
    unlink(`${img_path}/${image}`).catch(err => console.log(err))
}

export const sendNotifications = (args, paymentMethod: 'IDRAM' | "AMERIABANK") => {
    const messageForAdmin:nodemailerMessageType = {
        from:process.env.EMAIL,
        subject:'Պատվեր hecanivclub.am-ից',
        to:'harutunyan.martiros@mail.ru',
        text:''
    }
    const messageForUser:nodemailerMessageType = {
        from:process.env.EMAIL,
        subject:'Պատվեր hecanivclub.am-ից',
        to:args.email,
        text:''
    }
    const { codeOfProduct } = args
    let products = []
    JSON.parse(codeOfProduct).forEach(async elem => {
        const data = await Products.findProduct(elem)
        console.log(elem, data)
        products = [...products, data]
    });
    console.log(products)
}

export const mailText = (args:messageTextType, admin:boolean = true):string => {
    if (admin) {
        return `
Հարգելի hecanivclub.am, Դուք ունեք նոր պարվեր կայքից.
Կից կներկայացեն պատվերի մանրամասները՝ անհարաժեշտ տեղեկատվությամբ.
Պատվերի մանրամասները՝
Անուն Ազգանուն՝ ${args.name} ${args.surname}
Վճարման եղանակը՝ ${args.paymentMethod}
Առաքման հասցեն՝ ${args.address}
Նախընտրելի ժամանակը՝ ${args.deliveryTime}
Պատվերի տեսակը՝ 
Մոդելը՝ 
        `
    }
    return `
Պատվեր hecanivclub.am-ից
Հարգելի պատվիրատու, Դուք կատարել եք նոր պատվեր hecanivclub.am- կայքից.
Շնորհակալություն պատվերի համար։
Ձեր պատվերը հաստատվել է, առաքումը կիրականանա նշված ժամանակահատվածում
Կից կներկայացեն պատվերի մանրամասները՝ անհարաժեշտ տեղեկատվությամբ.
Պատվերի մանրամասները՝
Անուն Ազգանուն՝
Վճարման եղանակը՝
Առաքման հասցեն՝
Նախընտրելի ժամանակը՝
Պատվերի տեսակը՝
Մոդելը՝
    `
} 




console.log(mailText({address:'Գյուլբենկյան', deliveryTime:'15։00', name:'Մարտիրոս', paymentMethod:'Իդրամ', productType:'հեծանիվ', surname:'Հարությունյան', model:'համար 1'}))