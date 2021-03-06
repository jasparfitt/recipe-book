import googleService from '../services/googleService';
import recipeService from '../services/recipeService';
import Storage from 'store2';
import { useNavigate } from "react-router-dom";
import React, { useEffect } from 'react';

const StartPage = () => {
    const navigate = useNavigate();
    
    useEffect(() => {
        const googleEnabled = Storage.get('googleEnabled');

        if (googleEnabled !== null) {
            navigate('/home');
        }
    }, [navigate]);

    const link = async () => {
        await googleService.init();
        Storage.add('googleEnabled', true);
        await recipeService.loadRecipes();

        navigate('/home')
    };
    
    const skip = () => {
        Storage.add('googleEnabled', false);
        navigate('/home')
    };

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
