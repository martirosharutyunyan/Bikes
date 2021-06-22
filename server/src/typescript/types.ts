
export interface nodemailerMessageType {
    from: string
    to: string
    subject: string
    html:string
}

export interface product  {
    oldPrice:string
    productNameHY:string
    productNameEN:string
    productNameRU:string
    productType:string
    price:number
    colors:string
    sizes:string
    height:string
    descriptionHY:string
    descriptionEN:string
    descriptionRU:string
    promotions:boolean
    discounts:string
    theBestProduct:boolean
    codeOfProduct:string
    month:string
    priceOfMonth:string
    hashtag:string
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

export interface messageTextType {
    name:string
    surname:string
    paymentMethod:string
    address:string
    deliveryTime:string
    productType:string
    model:string
    phoneNumber:string
}