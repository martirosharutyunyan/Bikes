import React, { useState, useEffect, memo, FC,  } from "react";
import axios from "../../Axios/AxiosPost";
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
//types
import { input, Redux } from "../../typescript/types";

const Test:FC = () => {
    const [state, setState] = useState({
        name:'Մարտիրոս',
        surname:"Հարությունյան",
    });
    const [billNo, setbillNo] = useState<number>(Math.floor(Math.random() * 10000000));
    const [products, setproduct] = useState([{
        price:1,
        codeOfProduct:"հեծանիվ 1",
        description:'dasdsadsa',
        productName:'dsadsa',
    }]);
    const [bank, setbank] = useState<boolean>(true);
    const [idram, setIdram] = useState({
        amount:'10',
        description:"das"
    });
    const changeValue = (e:input) => {
        setState({...state,[e.target.name]:e.target.value})
    }
    const language = useSelector((state:Redux) => state.Reducer1.language);
    const test = async () => {
        const { data: { PaymentID } } = await axios.post('/payment/Ameriabank', {user:state, products});
        window.location.href = `https://services.ameriabank.am/VPOS/Payments/Pay?id=${PaymentID}&lang=${language}`; 
    }
    const IdramOnchange = async (e:input) => {
        setIdram({
            ...idram,
            [e.target.placeholder]:e.target.value
        })
    }
    const buyIdram = async () => {
        const { data } = await axios.post('/payment/Idram/buy', {user:state, products, BILL_NO:billNo})
        console.log(data)
    }
    return (
        <>
            <button onClick={() => setbank(prev => !prev)}>change</button>
            {
                bank ?
                    <section className="">
                        <input name='name' onChange={changeValue} value={state.name} type="text" />
                        <input name='surname' onChange={changeValue} value={state.surname} type="text" />
                        <button onClick={test}>click</button>
                    </section>
                :
                    <section>
                        <input placeholder='amount' onChange={IdramOnchange} value={idram.amount} />
                        <input placeholder='description' onChange={IdramOnchange} value={idram.description} />
                        <form action='https://banking.idram.am/Payment/GetPayment' method='POST'>
                            <input type="hidden" name="EDP_LANGUAGE" value="EN" />
                            <input type="hidden" name="EDP_REC_ACCOUNT" value={process.env.REACT_APP_EDP_REC_ACCOUNT} />
                            <input type="hidden" name="EDP_DESCRIPTION" value="Order description" />
                            <input type="hidden" name="EDP_AMOUNT" value="10" />
                            <input type="hidden" name="EDP_BILL_NO" value={billNo} />
                            <input type="hidden" name='EDP_EMAIL' value='harutunyan.martiros@mail.ru'/>
                            <button onClick={buyIdram}>click</button>
                        </form> 
                    </section>
            }
        </>
    );
};

export default memo(Test);