import React, { useState, useEffect, useMemo, useRef, memo, FC, } from 'react';
import { Route, useParams,Switch, NavLink, Link } from 'react-router-dom';
import { animateScroll as scroll } from 'react-scroll';
import { useSelector, useDispatch } from 'react-redux';
// import Media from '../../media';
import axios from 'axios';
import 'react-scroll';
//types
import { Redux } from '../../typescript/types';

const SuccessPage:FC = () => {

    const dispatch = useDispatch();

    useEffect(() => {

    }, []);
    const data = useParams()
    const [state, setState] = useState('');

    console.log(data)
    return (
        <>
            <section className=''>
                
            </section>
        </>
    )
}

export default memo(SuccessPage);