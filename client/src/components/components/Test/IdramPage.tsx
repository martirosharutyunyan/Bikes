import React, { useState, useEffect, useMemo, useRef, memo, FC, } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from '../../Axios/AxiosPost';
import { useParams } from 'react-router-dom';


const Idram:FC = () => {
    const params = useParams()
    const [state, setstate] = useState<any>('');
    const getStatus = async ():Promise<void> => {
        // @ts-ignore
        const { data } = await axios.post('/payment/Idram/getStatus', {BILL_NO:params.data})
        setstate(data)
    }
    useEffect(() => {
        getStatus()
    }, []);
    return (
        <>
            <section className=''>
                {JSON.stringify(state)}
            </section>
        </>
    )
}

export default memo(Idram);