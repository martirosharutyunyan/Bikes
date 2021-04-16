import { trash } from "../model/postgres";

export default class Trash {
    static async deleteFromTrash(productName:string):Promise<any> {
        await trash.destroy({where:{productName}}) 
    };

    static async AddProduct(args):Promise<any> {
        await trash.create(args)
    }

    static async getProducts():Promise<any> {
        return await trash.findAll()
    }
    
}