import React from 'react';
import { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from './AuthProvider';

const PrivateRoute = ({children}) => {

    const {user, loading} = useContext(AuthContext);

    const location = useLocation();

    if(loading){
        return <div className='flex items-center justify-center'><progress className="progress w-56"></progress></div>
    }

    if(user){
        return children;
    }

    return <Navigate state={{from: location}} to='/login' replace></Navigate>
};

export default PrivateRoute;