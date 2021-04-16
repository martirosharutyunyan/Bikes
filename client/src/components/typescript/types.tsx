import { Reducer1Type } from "../redux/reducer/reducer"
import { actionTypes } from "./actionsTypes"

export type actionType = {
    type:actionTypes
    payload:any
}


export type Redux = {
    Reducer1:Reducer1Type
}

export type input =  React.ChangeEvent<HTMLInputElement>

export type button = React.MouseEvent<HTMLButtonElement>

export type jsx = JSX.Element

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
    month:string
    priceOfMonth:string
}

export type productsWithImage = product & {
    id:number
    imagePath:string[]
    image:any
}