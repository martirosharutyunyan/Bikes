import React, { useState, useEffect, memo, FC} from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import './AdminLogin.scss';
import axios from '../../Axios/AxiosPost';
import Loader from '../Loader/Loader';
import { AdminToken } from './AdminToken';
import { input } from '../../typescript/types';

let  AdminLogin:FC = () =>{
    const dispatch = useDispatch();
    const history = useHistory()    
    const [state, setState] = useState({
        LoginEmail:'admin@gmail.com',
        LoginPassword:'hhs13516'
    });
    const [load, setload] = useState(false);
    const changeValue = (e:input) => {
        setState({
            ...state,
            [e.target.id]:e.target.value
        })
    }
    const AutoLogin = async () => {
        if (AdminToken.getToken()) {
            setload(true)
            const res = await axios.post('/tokenverify', {token:AdminToken.getToken()})
            if(res.data.message !== 'ok'){
                console.log(res.data.message)
                setload(false)
                return 
            }
            dispatch({type:'ADMINLOGIN', payload:'admin'})
            history.push('/admin')
            setload(false)
        }
    }
    useEffect(() => {
        AutoLogin()
    }, []);
    const AdminLogin = async () => {
        setload(true)
        const res = await axios.post('/adminlogin', state)
        if(res.data.message !== 'ok'){
            setload(false)
            return 
        }
        AdminToken.setToken(res.data.token)
        dispatch({type:'ADMINLOGIN', payload:'admin'})
        history.push('/admin')
    }
    if(load){
        return <Loader/>
    }
    return (
        <>
             <section className='AdminPage'>
                <div className='login'>
                    <span>Please Sign in</span>
                    <input className='form-control' id='LoginEmail' placeholder='email' value={state.LoginEmail} onChange={changeValue} type="text"/>
                    <input className='form-control' id='LoginPassword' placeholder='password' value={state.LoginPassword} onChange={changeValue} type="text"/>
                    <button onClick={AdminLogin} type="button" className="btn btn-primary">login</button>
                </div>
            </section>
        </>
    )
}


export default AdminLogin = memo(AdminLogin);
        