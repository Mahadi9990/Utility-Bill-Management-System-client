import React, { use } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from './AuthContext';
import Loading from '../components/Loading';

const PrivateRoute = ({children}) => {
    const {user,loading} = use(AuthContext)
    const location = useLocation()
    if(loading){
       return <Loading/>
    }
    if(user && user?.email){
        return children;
    }else{
       return <Navigate state={location.pathname} to='/auth'/>
    }
};

export default PrivateRoute;