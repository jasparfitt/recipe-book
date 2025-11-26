import { v4 as uuidv4 } from 'uuid';
import { useNavigate } from 'react-router-dom';
import RecipeForm from '../components/RecipeForm';
import BackButton from '../components/BackButton';
import RecipeContext from '../../../shared/context/RecipeContext';
import { useContext } from 'react';

const NewRecipePage = () => {
  const [recipes, setRecipes] = useContext(RecipeContext);
  const navigate = useNavigate();

  const onSubmit = async (value) => {
    const id = uuidv4();
    await setRecipes({...recipes, [id]: {...value, id}});
    navigate('/home')
  }

  return (
    <div className="row">
      <h1>New Recipe</h1>
      <div className="col-lg-8">
        <BackButton/>
        <RecipeForm 
          recipe={{
            recipeName: '',
            makes: '',
            ingredients: [{}],
            steps: [''],
            tags: ['']
          }}
          onSubmit={onSubmit}/>
      </div>
    </div>
  );
}

export default NewRecipePage;
