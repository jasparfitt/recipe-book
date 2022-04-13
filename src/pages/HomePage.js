import Storage from 'store2'
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
    const navigate = useNavigate();
    const recipes = Object.values(Storage.get('recipes') || {})
        .sort((a, b) => {
            if (a.recipeName === b.recipeName) {
                return 0;
            } else if (a.recipeName < b.recipeName) {
                return -1;
            } else {
                return 1;
            }
          }); 

    const goToNewRecipe = () => navigate('/new-recipe');
    const open = (id) => navigate(`/recipe/${id}`);
    const edit = (id) => navigate(`/edit-recipe/${id}`);

    return (
        <div className="row">
            <div className="col">
                <button className="btn btn-primary mt-3" onClick={goToNewRecipe}>Add new recipe</button>
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
