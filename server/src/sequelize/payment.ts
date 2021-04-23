import { payment } from "../model/postgres";

export class Users {
    static async saveToDB(args){
        await payment.create(args)
    };

    static async getFromDB(OrderID:string){
        return await payment.findOne({where:{OrderID}})
    };
    
}