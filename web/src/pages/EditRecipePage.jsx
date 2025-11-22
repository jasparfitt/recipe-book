import { useNavigate, useParams } from 'react-router-dom';
import RecipeForm from '../components/RecipeForm';
import BackButton from '../components/BackButton';
import RecipeContext from '../../../shared/context/RecipeContext';
import { useContext } from 'react';

const NewRecipePage = () => {
  const navigate = useNavigate();
  const params = useParams();
  const id = params.id;
  const [recipes, setRecipes] = useContext(RecipeContext);
  const recipe = recipes[id];

  const onSubmit = async (value) => {
    await setRecipes({ ...recipes, [id]: value });
    navigate('/home');
  }

  return (
    <div className="row">
      <h1>Edit Recipe</h1>
      <div className="col-lg-8">
        <BackButton />
        {recipe && recipe !== 'deleted' ? (
          <RecipeForm recipe={recipe} onSubmit={onSubmit} />
        ) : (
          <p>Not Found</p>
        )}
      </div>
    </div>
  );
}

export default NewRecipePage;
