import { payment } from "../model/postgres";

export class Users {
    static async saveToDB(args){
        await payment.create(args)
    };

    static async getFromDB(PaymentID){
        return await payment.findOne({where:{PaymentID}})
    };
    
}