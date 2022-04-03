import Storage from 'store2'
import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import recipeService from '../services/recipeService';
import './RecipePage.scss'

const RecipePage = () => {
    const params = useParams();
    const navigate = useNavigate();
    let [notFound, setNotFound] = useState(false);
    let [recipe, setRecipe] = useState(false);

    useEffect(() => {
        const recipes = Storage.get('recipes');
        const recipe = recipes[params.id];

        if (!recipe) {
            setNotFound(true);
        } else {
            console.log(recipe);
            setRecipe(recipe);
        }
    }, [])

    const editRecipe = () => {
        navigate(`/edit-recipe/${params.id}`);
    };

    const deleteRecipe = () => {
        recipeService.deleteRecipe(params.id);
        navigate('/home');
    };

    return (
        <div className="row">
            <div className="col-lg-8">
                {notFound ? (
                    <p>Not Found</p>
                ) : (recipe ? (<>
                    <div className='row'>
                        <h1 className='col'>{recipe.recipeName}</h1>
                        <div className='col-auto h1'>
                            <div class="dropdown">
                                <button class="btn p-0" disabled={notFound} type="button" id="optionsButton" data-bs-toggle="dropdown" aria-expanded="false">
                                    <span class="material-icons-outlined icon-h1">more_vert</span>
                                </button>
                                <ul class="dropdown-menu" aria-labelledby="optionsButton">
                                    <li><button class="dropdown-item" onClick={editRecipe}>Update</button></li>
                                    <li><button class="dropdown-item" onClick={deleteRecipe}>Delete</button></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    {recipe.makes ? (<h3>Makes: {recipe.makes}</h3>) : null}
                    {recipe.ingredients.length ? (<>
                        <h4 className='mt-2'>Ingredients</h4>
                        <ul className='list-group'>
                            {recipe.ingredients.map(ingredient => (
                                <li className='list-group-item'>{`${ingredient.amount ?? ''} ${ingredient.name ?? ''}`}</li>
                            ))}
                        </ul>
                    </>) : null}
                    {recipe.steps.length ? (<>
                        <h4 className='mt-2'>Method</h4>
                        <ol className='list-group list-group-numbered'>
                            {recipe.steps.map(step => (
                                <li className='list-group-item'>{step}</li>
                            ))}
                        </ol>
                    </>) : null}
                </>) : (null))}
            </div>
        </div>
    );
}

export default RecipePage;
