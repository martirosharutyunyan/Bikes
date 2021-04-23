import { Reducer1Type } from "../redux/reducer/reducer"
import { actionTypes } from "./actionsTypes"

export interface actionType {
    type:actionTypes
    payload:any
}


export interface Redux {
    Reducer1:Reducer1Type
}

export type input =  React.ChangeEvent<HTMLInputElement>

export type button = React.MouseEvent<HTMLButtonElement>

export type jsx = JSX.Element

export interface product {
    oldPrice:string
    productNameHY:string
    productNameEN:string
    productNameRU:string
    productType:string
    price:string
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
    hashteg:string
}

export interface productsWithImage extends product {
    id:number
    imagePath:string[]
    image:any
    banner:string
}