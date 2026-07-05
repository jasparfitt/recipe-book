import { useNavigate } from 'react-router';

const BackButton = ({className}) => {
  const navigate = useNavigate();
  
  return (
    <button type="button" className={`btn btn-primary ${className}`} onClick={() => navigate('/home')}>Back</button>
  )
};

export default BackButton