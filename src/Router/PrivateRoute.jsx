import React, { useContext } from 'react';
import { AuthContext } from '../Provider/AuthProvider';
import { Navigate } from 'react-router';

const PrivateRoute = ({children}) => {
    const {user, loading} = useContext(AuthContext)


    if (loading) {
        return <div className="flex items-center justify-center h-screen">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-green-500"></div>
        </div>;
    }
    if (!user) {
        return <Navigate  to='/login'></Navigate>;
    }
    return children;
};

export default PrivateRoute;