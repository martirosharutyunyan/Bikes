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
<<<<<<< HEAD
                {/* <Route exact path='/'><AmeriaBank/></Route>    */}
                <Route exact path='/'><AdminLogin/></Route>
                {/* <Route path='/admin-login'><AdminLogin/></Route> */}
=======
                <Route exact path='/'><AdminLogin/></Route>
                {/* <Route exact path='/'><AmeriaBank/></Route> */}
>>>>>>> 4141e0e1f6641e3f9994b37e03281a48ccfe9e19
                { email ? <Route path='/admin'><AdminPanel/></Route> : null }
                <Redirect to='/'/>
            </Switch>
        </Suspense>
    )
}
export default Routs
