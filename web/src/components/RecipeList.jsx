import React from 'react';
import EditIcon from '@mui/icons-material/Edit';
import { useNavigate } from 'react-router-dom';

const RecipeList = ({recipes}) => {
    const navigate = useNavigate();

    const sortedRecipes = recipes.sort((a, b) => {
        if (a.recipeName === b.recipeName) {
            return 0;
        } else if (a.recipeName < b.recipeName) {
            return -1;
        } else {
            return 1;
        }
    });

    const open = (id) => navigate(`/recipe/${id}`);

    const edit = (id) => navigate(`/edit-recipe/${id}`);

    return (<>{sortedRecipes.map((recipe, index) => (
        <div key={`recipe-${index}`} className='input-group mt-1'>
            <button 
                type="button" 
                className="btn btn-outline-primary flex-grow-1 text-start"
                onClick={() => open(recipe.id)}>
                {recipe.recipeName}
            </button>
            <button className="btn btn-outline-primary" onClick={() => edit(recipe.id)}>
                <EditIcon />
            </button>
        </div>
    ))}</>);
};

export default RecipeList;