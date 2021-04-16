"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteImage = exports.generateFile = exports.proto = void 0;
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
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
String.prototype.log = function () {
    console.log(this.toString());
};
// @ts-ignore
Array.prototype.log = function () {
    console.log(this);
};
// @ts-ignore
Number.prototype.log = function () {
    console.log(this);
};
exports.proto = () => {
    console.log('prototype connected');
};
const promisify1arg = action => {
    return (path) => {
        return new Promise((res, rej) => {
            action(path, (err, data) => {
                if (err) {
                    return rej(err);
                }
                res(data);
            });
        });
    };
};
const promisify2arg = action => {
    return (path, data) => {
        return new Promise((res, rej) => {
            action(path, data, (err, data) => {
                if (err) {
                    return rej(err);
                }
                res(data);
            });
        });
    };
};
const unlink = promisify1arg(fs_1.default.unlink);
const writeFile = promisify2arg(fs_1.default.writeFile);
exports.generateFile = (imageName, data) => {
    const array = imageName.split('.');
    const extension = array[array.length - 1];
    const random = Math.random();
    const img_path = path_1.default.join(__dirname, '../../public');
    writeFile(`${img_path}/random${random}.${extension}`, data).catch(err => console.log(err));
    return `http://localhost:8888/random${random}.${extension}`;
};
exports.deleteImage = (pathToImage) => {
    const img_path = path_1.default.join(__dirname, '../../public');
    const image = pathToImage.slice(22);
    unlink(`${img_path}/${image}`).catch(err => console.log(err));
};
// export const generateFile = (imageName: string, data:any):string => {
//     const array = imageName.split('.')
//     const extension = array[array.length-1]
//     const random = Math.random() 
//     const img_path = path.join(__dirname,'../../public')
//     fs.writeFile(`${img_path}/random${random}.${extension}`,data,(err)=>{
//         if(err) throw err
//         console.log('saved')
//     }) 
//     const imagePath = `http://localhost:8888/random${random}.${extension}`
//     return imagePath
// }
// export const deleteImage = (pathToImage:string) => {
//     const img_path = path.join(__dirname,'../../public')
//     const image = pathToImage.slice(22)
//     fs.unlink(`${img_path}/${image}`,(err:Error):void=>{
//         if(err) throw err
//     })
// }
//# sourceMappingURL=Tool.js.map