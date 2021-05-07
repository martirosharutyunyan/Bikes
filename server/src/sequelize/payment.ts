import { Ameriabank } from "../model/postgres";

export class AmeriaPayments {
    static async saveToDB(args) {
        await Ameriabank.create(args)
    };

    static async getFromDB(OrderID:string) {
        return await Ameriabank.findOne({where:{OrderID}})
    };
}