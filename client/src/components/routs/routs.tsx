import React, { lazy, Suspense } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Redux } from '../typescript/types';
import Loader from '../components/Loader/Loader';
const AdminPanel = lazy(()=> import('../components/AdminPanel/AdminPanel'))
const AdminLogin = lazy(()=> import('../components/AdminLogin/AdminLogin'))
const AmeriaBank = lazy(()=> import('../components/Test/AmeriaBank'))
{/* {window.location.href = 'https://facebook.com'}  */}

function Routs():JSX.Element {
    const email = useSelector((state:Redux) => state.Reducer1.AdminEmail)
    return (
        <Suspense fallback={<Loader/>}>
            <Switch>
                <Route exact path='/'><AdminLogin/></Route>
                {/* <Route exact path='/'><AmeriaBank/></Route> */}
                { email ? <Route path='/admin'><AdminPanel/></Route> : null }
                <Redirect to='/'/>
            </Switch>
        </Suspense>
    )
}
export default Routs
