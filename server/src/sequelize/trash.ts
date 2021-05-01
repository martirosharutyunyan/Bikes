import { trash } from "../model/postgres";

export default class Trash {
    static async deleteFromTrash(codeOfProduct:string):Promise<any> {
        await trash.destroy({where:{codeOfProduct}}) 
    };

    static async AddProduct(args):Promise<any> {
        await trash.create(args)
    }

    static async getProducts():Promise<any> {
        return await trash.findAll()
    }
}