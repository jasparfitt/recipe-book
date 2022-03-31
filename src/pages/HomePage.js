import googleService from '../services/googleService';
import Storage from 'store2'
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
    const navigate = useNavigate();
    const recipes = Storage.get('recipes')?.values() || [];

    const goToNewRecipe = () => {
        navigate('/new-recipe');
    }

    return (
        <div className="row">
            <h1>All Recipes</h1>
            <div className="col">
                <button className="btn btn-primary" onClick={goToNewRecipe}>Add new recipe</button>
                <div className="list-group">
                    {
                        recipes.map(recipe => {
                            return (
                                <button type="button" className="list-group-item list-group-item-action">
                                    {recipe.name}
                                </button>
                            );
                        })
                    }
                </div>
            </div>
        </div>
    );
}

export default HomePage;
