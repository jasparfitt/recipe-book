import { useNavigate } from 'react-router-dom';
import React from 'react';

const BackButton = ({className}) => {
    const navigate = useNavigate();
    
    return (
        <button type="button" className={`btn btn-primary ${className}`} onClick={() => navigate('/home')}>Back</button>
    )
};

export default BackButton