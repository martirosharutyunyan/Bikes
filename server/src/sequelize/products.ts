import { products } from "../model/postgres";

export default class Products {
    static async AddProduct(args):Promise<any> {
        products.create(args)
    };

    static async getProducts(language:string):Promise<any> {
        return await products.findAll({where:{language}})
    };

    static async deleteProduct(productName:string):Promise<void> {
        await products.destroy({where: {productName}})       
    };

    static async findProduct(productName:string):Promise<any> {
        return await products.findOne({where:{productName}})
    };
    
    static async updateProduct(args, id:number):Promise<any> {
        await products.update(args, {where:{id}})
    };

    static async updateStars({productName, count}):Promise<any> {
        const dataStr:any = await products.findOne({where:{productName}});
        const data = JSON.parse(JSON.stringify(dataStr))
        if(!data.stars.length){
            const arr = [count];
            return await products.update({stars:JSON.stringify(arr)}, {where:{productName}})
        };  
        let array = [...JSON.parse(data.stars), count]
        await products.update({stars:JSON.stringify(array)}, {where:{productName}})
    };

}
