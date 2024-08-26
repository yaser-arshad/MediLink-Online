import React from 'react';
import { Navigate } from 'react-router-dom';
import {useStateContext} from "../contexts/ContextProvider";
const PrivateRoute = ({children}) => {
    const { user } = useStateContext();
    console.log(user);
    if (!user) {
        return <Navigate to="/login" replace />;
    }
    return children;
}

export default PrivateRoute;