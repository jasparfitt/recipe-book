import { Navigate, useNavigate } from "react-router-dom";
import { useContext, useEffect } from 'react';
import GoogleEnabledContext from '../../../shared/context/GoogleEnabledContext';

const StartPage = () => {
  const [googleEnabled, setGoogleEnabled] = useContext(GoogleEnabledContext);
  const navigate = useNavigate();

  const link = async () => {
    setGoogleEnabled(true);

    navigate('/home')
  };
  
  const skip = () => {
    setGoogleEnabled(false);
    
    navigate('/home')
  };

  if (googleEnabled !== null) {
    return <Navigate to="/home" />;
  }

  return (
    <div className="row">
      <div className="col-lg-8">
        <h1>Recipe Book</h1>
        <p>Connect to Google to backup and view your recipes on other devices</p>
        <button onClick={link} className="btn btn-primary">Link to Google</button>
        <button onClick={skip} className="btn btn-link">Skip this step</button>
      </div>
    </div>
  );
}

export default StartPage;
