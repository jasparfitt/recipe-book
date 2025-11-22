import { useNavigate } from 'react-router-dom';
import RecipeList from '../components/RecipeList';
import SearchBar from '../components/SearchBar';
import useHomePage from '../../../shared/pages/useHomePage';

const HomePage = () => {
  const { recipeList, setSearchTerm } = useHomePage();
  const navigate = useNavigate();
  
  const goToNewRecipe = () => navigate('/new-recipe');

  return (
    <div className="row">
      <div className="col-lg-8">
        <h1>All Recipes</h1>
        <SearchBar setSearchTerm={setSearchTerm} />
        <button className="btn btn-primary mt-3" onClick={goToNewRecipe}>Add new recipe</button>
        <div className="mt-3">
          <RecipeList recipes={recipeList}/>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
