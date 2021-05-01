import React, { useState, useEffect, useMemo, useRef, memo, FC, } from 'react';
import { Route, Switch, NavLink, Link } from 'react-router-dom';
import { animateScroll as scroll } from 'react-scroll';
import { useSelector, useDispatch } from 'react-redux';
// import Media from '../../media';
import axios from 'axios';
import 'react-scroll';
//types
import { Redux } from '../../typescript/types';

const FailPage:FC = () => {

    return (
        <>
            <section className=''>
                fail
            </section>
        </>
    )
}

export default memo(FailPage);