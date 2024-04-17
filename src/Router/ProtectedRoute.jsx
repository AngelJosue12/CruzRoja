import React, { useState, useEffect } from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { useAuth } from '../Components/Contexts/AuthContexts';
import { message } from 'antd';

const ProtectorRutas = ({user, children}) => {
    
    if(user == false){
        return <Navigate to='/Login' />
    }
    return children ? children: <Outlet/>
};

export default ProtectorRutas;
