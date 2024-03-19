import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoute = ({ role }) => {
    const userDataString = localStorage.getItem('userData');
    const userData = JSON.parse(userDataString);
    const auth = userData ? userData.Role : 'Unauthorized'
    return auth === role ? <Outlet /> : <Navigate to="/Unauthorized" />;
}

export default PrivateRoute;
