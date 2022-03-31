import googleService from '../services/googleService';
import Storage from 'store2'

const RecipePage = () => {
    return (
        <div className="row">
            <h1>Recipe Book Home</h1>
            <button className="btn btn-primary" onClick={googleService.configExists}>config exists?</button>
        </div>
    );
}

export default RecipePage;
