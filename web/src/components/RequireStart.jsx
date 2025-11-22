import { Navigate } from 'react-router-dom';
import { useContext } from 'react';
import GoogleEnabledContext from "../../../shared/context/GoogleEnabledContext";

const RequireStart = ({ children }) => {
  const [googleEnabled] = useContext(GoogleEnabledContext)

  if (googleEnabled === null) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default RequireStart;