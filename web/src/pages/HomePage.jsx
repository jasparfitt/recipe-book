import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import RecipeList from '../components/RecipeList';
import recipeService from '../services/recipeService';
import SearchBar from '../components/SearchBar';

const HomePage = () => {
    const [recipes, setRecipes] = useState([])
    const [allRecipes, setAllRecipes] = useState([])
    const navigate = useNavigate();

    useEffect(() => {
        const allRecipes = recipeService.getLocalRecipes()

        setRecipes(allRecipes);
        setAllRecipes(allRecipes);
    }, [])

    const goToNewRecipe = () => navigate('/new-recipe');

    return (
        <div className="row">
            <div className="col-lg-8">
                <h1>All Recipes</h1>
                <SearchBar setList={setRecipes} fullList={allRecipes} searchKey="recipeName"/>
                <button className="btn btn-primary mt-3" onClick={goToNewRecipe}>Add new recipe</button>
                <div className="mt-3">
                    <RecipeList recipes={recipes}/>
                </div>
            </div>
        </div>
    );
}

export default HomePage;
