import { useParams } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import stringService from '../services/stringService';
import recipeService from '../services/recipeService';
import RecipeList from '../components/RecipeList';
import SearchBar from '../components/SearchBar';

const TagPage = () => {
    const [recipes, setRecipes] = useState([])
    const [allRecipes, setAllRecipes] = useState([])
    const params = useParams();

    useEffect(() => {
        const allRecipes = recipeService.getLocalRecipes()
            .filter(recipe => (recipe.tags || []).includes(params.tag));

        setRecipes(allRecipes);
        setAllRecipes(allRecipes);
    }, [])

    return (
        <div className="row">
            <div className="col-lg-8">
                <h1>{stringService.capitalise(params.tag)}</h1>
                <SearchBar setList={setRecipes} fullList={allRecipes} searchKey="recipeName"/>
                <div className="mt-3">
                    <RecipeList recipes={recipes} />
                </div>
            </div>
        </div>
    );
}

export default TagPage;
