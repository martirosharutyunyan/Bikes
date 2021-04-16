import StreamTransport from "nodemailer/lib/stream-transport"
import { DecimalDataType } from "sequelize/types"

export type nodemailerMessageType = {
    from: string
    to: string
    subject: string
    text:string
}

export type product = {
    oldPrice:string
    productName:string
    productType:string
    price:string
    colors:string
    sizes:string
    height:string
    description:string
    promotions:string
    discounts:string
    theBestProduct:boolean
    codeOfProduct:string
}

export type productsWithImage = product & {
    id:number
    imagePath:string
    image:any
    stars:string
    language:string
}

export type AmeriabankRequest = {
    ClientID:string
    Username:string
    Password:string
    Description:string
    OrderID:number
    Amount:number
    BackURL?:string
}