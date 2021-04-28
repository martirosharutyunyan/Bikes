import React, { useState, useEffect, useMemo, useRef, memo, FC, } from 'react';
import axios from '../../Axios/AxiosPost';
import { input, Redux } from '../../typescript/types';

let Banner:FC = () => {
    const [banners, setbanners] = useState({
        firstBanner:[],
        secondBanner:[],
        firstBannerText:'',
        secondBannerText:''
    });
    const changeTheBanners = (e:input) => {
        const isFile = e.target.type !== 'text'
        setbanners({
            ...banners,
            [e.target.name]:isFile ? e.target.files : e.target.value
        })
        console.log(banners)
    }

    return (
        <section>
            <img src={`${process.env.REACT_APP_API}/banner1.jpg`} alt="error"/>
            <input multiple onChange={changeTheBanners} name='firstBanner' type="file"/>
            <input onChange={changeTheBanners} value={banners.firstBannerText} name='firstBannerText' type="text"/>
            <img src={`${process.env.REACT_APP_API}/banner2.jpg`} alt="error"/>
            <input multiple onChange={changeTheBanners} name='secondBanner' type="file"/>
            <input onChange={changeTheBanners} value={banners.secondBannerText} name='secondBannerText' type="text"/>
        </section>
    )
}

export default Banner = memo(Banner);