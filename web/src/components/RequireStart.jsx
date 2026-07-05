import { Navigate } from 'react-router';
import { useContext } from 'react';
import GoogleEnabledContext from "coook.shared/context/GoogleEnabledContext";

const RequireStart = ({ children }) => {
  const [googleEnabled] = useContext(GoogleEnabledContext)

  if (googleEnabled === null) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default RequireStart;