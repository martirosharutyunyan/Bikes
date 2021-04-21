
export interface nodemailerMessageType {
    from: string
    to: string
    subject: string
    text:string
}

export interface product  {
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

export interface productsWithImage extends product {
    id:number
    imagePath:string
    image:any
    stars:string
    language:string
}

export interface AmeriabankRequest {
    ClientID:string
    Username:string
    Password:string
    Description:string
    OrderID:number
    Amount:number
    BackURL?:string
}
