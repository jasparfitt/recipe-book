import Storage from 'store2'
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
    const navigate = useNavigate();
    const recipes = Object.values(Storage.get('recipes') || {}); 

    const goToNewRecipe = () => navigate('/new-recipe');
    const open = (id) => navigate(`/recipe/${id}`);
    const edit = (id) => navigate(`/edit-recipe/${id}`);

    return (
        <div className="row">
            <h1>All Recipes</h1>
            <div className="col">
                <button className="btn btn-primary" onClick={goToNewRecipe}>Add new recipe</button>
                <div className="mt-3">
                    {recipes.map((recipe, index) => {
                        return (
                            <div key={`recipe-${index}`} className='input-group mt-1'>
                                <button 
                                    type="button" 
                                    className="btn btn-outline-primary flex-grow-1 text-start"
                                    onClick={() => open(recipe.id)}>
                                    {recipe.recipeName}
                                </button>
                                <button className="btn btn-outline-primary" onClick={() => edit(recipe.id)}>
                                    <span class="material-icons-outlined">
                                        edit
                                    </span>
                                </button>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}

export default HomePage;
