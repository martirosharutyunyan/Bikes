import { Op } from "sequelize";
import { products } from "../model/postgres";

export default class Products {
    static async AddProduct(args):Promise<any> {
        products.create(args);
    };

    static async getProducts():Promise<any> {
        return await products.findAll();
    };

    static async deleteProduct(codeOfProduct:string):Promise<void> {
        await products.destroy({where: {codeOfProduct}});    
    };

    static async findProduct(codeOfProduct:string):Promise<any> {
        return await products.findOne({where:{codeOfProduct}});
    };
    
    static async updateProduct(args, codeOfProduct:number):Promise<any> {
        await products.update(args, {where:{codeOfProduct}});
    };

    static async updateStars({productCode, count}):Promise<any> {
        const dataStr:any = await products.findOne({where:{productCode}});
        const { stars } = JSON.parse(JSON.stringify(dataStr));
        let array = [...JSON.parse(stars), count];
        await products.update({stars:JSON.stringify(array)}, {where:{productCode}});
    };

    static async search(info:string):Promise<any> {
        return await products.findAll({
            where:{
                hashteg:{
                    [Op.like]:`%${info}%`,
                },
            },
        });
    };
}
