import path from 'path';
import fs from 'fs';
import { products } from '../model/postgres';
import { Op } from 'sequelize';

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
            action(path, data, (err:Error, data:Buffer)=>{
                if(err){
                    return rej(err)
                }
                res(data)
            })
        })
    }
}

const unlink = promisify1arg(fs.unlink)
const writeFile = promisify2arg(fs.writeFile)

export const generateFile = (imageName: string, data:any):string => {
    const array = imageName.split('.')
    const extension = array[array.length-1]
    const random = Math.random() 
    const img_path = path.join(__dirname,'../../public')
    writeFile(`${img_path}/random${random}.${extension}`, data).catch(err=>console.log(err))    
    return `http://localhost:8888/random${random}.${extension}`
}

export const deleteImage = (pathToImage:string) => {
    const img_path = path.join(__dirname,'../../public')
    const image = pathToImage.slice(22)
    unlink(`${img_path}/${image}`).catch(err=>console.log(err))
}

