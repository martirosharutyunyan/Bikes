import React, { useState, useEffect, useMemo, useRef, memo, FC, } from 'react';
import { Route, Switch, NavLink, Link, useParams } from 'react-router-dom';
import { animateScroll as scroll } from 'react-scroll';
import { useSelector, useDispatch } from 'react-redux';
// import Media from '../../media';
import axios from '../../Axios/AxiosPost';
import 'react-scroll';
//types
import { Redux } from '../../typescript/types';

const SuccessPage:FC = () => {
    const data = useParams()
    const getStatus = async () => {
        // @ts-ignore
        const elem = await axios.get('/payment/Ameriabank/getStatus', {paymentID:data.data})
        console.log(elem)
    }
    useEffect(():void => {
        getStatus()
    }, []);
    return (
        <>
            ok
        </>
    )
}

export default memo(SuccessPage);