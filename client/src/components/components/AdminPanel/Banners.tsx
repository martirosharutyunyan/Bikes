import React, { useState, useEffect, useMemo, useRef, memo, FC, } from 'react';
import axios from '../../Axios/AxiosPost';
import { input, Redux } from '../../typescript/types';

let Banner:FC = () => {
    const [url, seturl] = useState<string>();
    const [banners, setbanners] = useState({
        firstBanner:'',
        secondBanner:'',
    });
    const [array, setarray] = useState<any[]>([]);
    const changeTheBanners = (e:input) => {
        setbanners({
            ...banners,
            // @ts-ignore
            [e.target.name]:e.target.files[0]
        })
        console.log(banners)
    }
    const submitFirst = async ():Promise<any> => {
        const form = new FormData()
        form.append('firstBanner', banners.firstBanner)
        form.append('which', '1')
        const { data } = await axios.post('/changePromotions/banner', form)
        console.log(data)   
    }
    const submitSecond = async ():Promise<any> => {
        const form = new FormData()
        form.append('secondBanner', banners.secondBanner)
        form.append('which', '2')
        const { data } = await axios.post('/changePromotions/banner', form)
        console.log(data)   
    }
    const getBanners = async () => {
        const { data } = await axios.get('/changePromotions/getBanners')
        setarray(data)
        console.log(data)
    }
    useEffect(():void => {
        getBanners()
    }, []);
    return (
        <section>
            {array.map((elem, i:number):JSX.Element => {
                return (
                    <div key={elem.id}>
                        <img src={elem.url} alt="error"/>
                        <input type="file" onChange={changeTheBanners} name={elem.name === 'banner1' ? 'firstBanner' : 'secondBanner'}/>
                        {elem.name === 'banner1' ? <button onClick={submitFirst}>click</button> : <button onClick={submitSecond}>click</button>}
                    </div>
                )
            })}
        </section>
    )
}



export default Banner = memo(Banner);

