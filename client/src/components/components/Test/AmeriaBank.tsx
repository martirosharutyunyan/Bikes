import React, { useState, useEffect, memo, FC,  } from "react";
import axios from "../../Axios/AxiosPost";
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
//types
import { input, Redux } from "../../typescript/types";

const Test: FC = () => {

    useEffect(() => {}, []);
    const [state, setState] = useState({
        name:'Մարտիրոս',
        surname:"Հարությունյան",
        productName:"հեծանիվ 1",
        amount:"10"
    });
    const [bank, setbank] = useState<boolean>(false);
    const changeValue = (e:input) => {
        setState({...state,[e.target.name]:e.target.value})
    }
    const language = useSelector((state:Redux) => state.Reducer1.language);
    const test = async () => {
        const { data: { data } } = await axios.post('/payment/Ameriabank', state)
        window.location.href = `https://servicestest.ameriabank.am/VPOS/Payments/Pay?id=${data.PaymentID}&lang=${language}` 
    }
    return (
        <>
            <button onClick={() => setbank(prev => !prev)}>change</button>
            {
                bank ?
                    <section className="">
                        <input name='name' onChange={changeValue} value={state.name} type="text" />
                        <input name='surname' onChange={changeValue} value={state.surname} type="text" />
                        <input name='productName' onChange={changeValue} value={state.productName} type="text" />
                        <input name='amount' onChange={changeValue} value={state.amount} type="text" />
                        <button onClick={test}>click</button>
                    </section>
                :
                    <section>
                        <form action="https://banking.idram.am/Payment/GetPayment" method="POST">
                            <input type="hidden" name="EDP_LANGUAGE" value="EN"/>
                            <input type="hidden" name="EDP_REC_ACCOUNT" value="110000803" />
                            <input type="hidden" name="EDP_DESCRIPTION" value="Order description" />
                            <input type="hidden" name="EDP_AMOUNT" value="1" />
                            <input type="hidden" name="EDP_BILL_NO" value ="1806"/>
                            <input type="submit" value="submit"/>
                        </form>
                    </section>
            }
        </>
    );
};

export default memo(Test);
  /* <input name='text' onChange={changeValue} value={state.text} type="text" />
               
                <input name='text' onChange={changeValue} value={state.text} type="text" />
                <input name='text' onChange={changeValue} value={state.text} type="text" />
                <input name='text' onChange={changeValue} value={state.text} type="text" />
                <input name='email' onChange={changeValue} value={state.email} type="text" />
                <button onClick={test}>click</button> */