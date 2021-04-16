import { actionType } from "../../typescript/types";

export type Reducer1Type = {
    products:any[]
    load:boolean
    AdminEmail:string
    language:string
}
const InitialState: Reducer1Type = {
    products: [],
    load:true,
    AdminEmail:'',
    language:'hy'
};

function reduxstate(state:Reducer1Type = InitialState, action: actionType): Reducer1Type {
    switch (action.type) {
        case "ADMINLOGIN":
            return {
                ...state,
                AdminEmail:action.payload,
            };
        case 'PRODUCTS':
            return {
                ...state,
                products:action.payload
            }
        case "LANG":
            return {
                ...state,
                language:action.payload
            }
        default:
            return state; 
    }
}
export default reduxstate;
    