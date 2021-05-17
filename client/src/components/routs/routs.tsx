import React, { FC, lazy, Suspense } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Redux } from '../typescript/types';
import Loader from '../components/Loader/Loader';
const AdminPanel = lazy(() => import('../components/AdminPanel/AdminPanel'))
const AdminLogin = lazy(() => import('../components/AdminLogin/AdminLogin'))
const AmeriaBank = lazy(() => import('../components/Test/AmeriaBank'))
const Banners = lazy(() => import('../components/AdminPanel/Banners'))
<<<<<<< HEAD
const AmeriabankSuccessPage = lazy(() => import('../components/Test/AmeriabankSuccess'))
const AmeriabankFailPage = lazy(() => import('../components/Test/AmeriaBankFail'))
const IdramFail = lazy(() => import('../components/Test/IdramFail'))
=======
const AmeriabankPage = lazy(() => import('../components/Test/AmeriabankPage'))
const IdramPage = lazy(() => import('../components/Test/IdramPage'))
>>>>>>> 05dce95e37b54d5fa0b0e9107febc76df6d1ee94
{/* {window.location.href = 'https://facebook.com'}  */}

const Routs:FC = () => {
    const email = useSelector((state:Redux) => state.Reducer1.AdminEmail)
    return (
        <Suspense fallback={<Loader/>}>
            <Switch>
                {/* <Route exact path='/'><Banners/></Route> */}
<<<<<<< HEAD
                {/* <Route exact path='/'><AmeriaBank/></Route> */}
                <Route exact path='/'><AdminLogin/></Route>
=======
                <Route exact path='/'><AmeriaBank/></Route>
                {/* <Route exact path='/'><AdminLogin/></Route> */}
<<<<<<< HEAD
                <Route path='/Ameriabank/success/:data'><AmeriabankSuccessPage/></Route>
                <Route path='/Ameriabank/fail'><AmeriabankSuccessPage/></Route>
                <Route path='/Idram/fail'><IdramFail/></Route>
=======
>>>>>>> bf4f088c11bd714234c445e4b9fd47928dee92c7
                <Route path='/Ameriabank/:data'><AmeriabankPage/></Route>
                <Route path='/Idram/:data'><IdramPage/></Route>
>>>>>>> 05dce95e37b54d5fa0b0e9107febc76df6d1ee94
                { email ? <Route path='/admin'><AdminPanel/></Route> : null }
                <Redirect to='/'/>
            </Switch>
        </Suspense>
    )
}
export default Routs
