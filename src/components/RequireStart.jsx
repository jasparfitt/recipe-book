import Storage from 'store2';
import { Navigate } from 'react-router-dom';
import React from 'react';

const RequireStart = ({ children }) => {
    let googleEnabled = Storage.get('googleEnabled');
  
    if (googleEnabled === null) {
        return <Navigate to="/" replace />;
    }
  
    return children;
};

export default RequireStart;