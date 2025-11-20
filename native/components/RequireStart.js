import { Navigate } from 'react-router-native';
import React, { useContext } from 'react';
import GoogleEnabledContext from '../context/GoogleEnabledContext';

const RequireStart = ({ children }) => {
  const [googleEnabled] = useContext(GoogleEnabledContext);

  if (googleEnabled === null) {
    return <Navigate to="/" replace />;
  }
  
  return children;
};

export default RequireStart;