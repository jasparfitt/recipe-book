import Storage from 'store2'
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

const HomePage = () => {
    const [recipes, setRecipes] = useState([])
    const [allRecipes, setAllRecipes] = useState([])
    const navigate = useNavigate();

    useEffect(() => {
        const allRecipes = Object.values(Storage.get('recipes') || {})
            .sort((a, b) => {
                if (a.recipeName === b.recipeName) {
                    return 0;
                } else if (a.recipeName < b.recipeName) {
                    return -1;
                } else {
                    return 1;
                }
            });

        setRecipes(allRecipes);
        setAllRecipes(allRecipes);
    }, [])

    const goToNewRecipe = () => navigate('/new-recipe');
    const open = (id) => navigate(`/recipe/${id}`);
    const edit = (id) => navigate(`/edit-recipe/${id}`);
    const onSearchChange = (event) => {
        const searchResults = allRecipes.filter(recipe => recipe.recipeName.toLowerCase().search(event.target.value.toLowerCase()) !== -1);
        setRecipes(searchResults);
    }

    return (
        <div className="row">
            <div className="col">
                <button className="btn btn-primary mt-3" onClick={goToNewRecipe}>Add new recipe</button>
                <div className="input-group mt-3">
                    <span className="input-group-text">
                        <span className="material-icons-outlined">
                            search
                        </span>
                    </span>
                    <input className="form-control" placeholder='Search' onChange={onSearchChange}/>
                </div>
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
                                    <span className="material-icons-outlined">
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
