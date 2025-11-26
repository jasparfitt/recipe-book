import { useParams, useNavigate } from 'react-router-dom';
import BackButton from '../components/BackButton';
import './RecipePage.scss'
import { Form, Field, Formik } from 'formik';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import CloseIcon from '@mui/icons-material/Close';
import useRecipePage from '../../../shared/pages/useRecipePage';

const RecipePage = () => {
  const params = useParams();
  const navigate = useNavigate();
  const { 
    recipe, validateForm, resetAdjuster, removeRecipe, isMultiplier
  } = useRecipePage({ params });

  const editRecipe = () => {
    navigate(`/edit-recipe/${id}`);
  };

  const deleteRecipe = async () => {
    removeRecipe();
    navigate('/home');
  };

  const exportRecipe = () => {
    navigate(`/export/${params.id}`);
  }

  const goToTag = (tag) => {
    navigate(`/tag/${tag}`)
  }

  return (
    <div className="row">
      <div className="col-lg-8" itemScope itemType="http://schema.org/Recipe">
        <BackButton />
        {recipe && recipe !== 'deleted' ? (<>
          <div className='row'>
            <h1 className='col' itemProp="name">{recipe.recipeName}</h1>
            <div className='col-auto h1'>
              <div className="dropdown">
                <button className="btn btn-link p-0" type="button" id="optionsButton" data-bs-toggle="dropdown" aria-expanded="false">
                  <MoreVertIcon />
                </button>
                <ul className="dropdown-menu" aria-labelledby="optionsButton">
                  <li><button className="dropdown-item" onClick={editRecipe}>Update</button></li>
                  <li><button className="dropdown-item" onClick={deleteRecipe}>Delete</button></li>
                  <li><button className="dropdown-item" onClick={exportRecipe}>Export recipe</button></li>
                  <li><button className="dropdown-item" data-bs-toggle="collapse" data-bs-target="#adjustPanel">Adjust amount</button></li>
                </ul>
              </div>
            </div>
          </div>
          {recipe.tags ? (<div className="mb-2">
            {(recipe.tags || []).map(tag => (
              <button className="badge tag bg-primary me-2" onClick={() => goToTag(tag)}>{tag}</button>
            ))}
          </div>) : null}
          {recipe.makes ? (<h3 itemProp="recipeYield">Makes: {recipe.makes}</h3>) : null}
          <div className="collapse" id="adjustPanel">
            <Formik
              validateOnBlur
              initialValues={{adjust: isMultiplier ? 1 : parseInt(recipe.makes)}}
              validate={validateForm}>
              {({ resetForm }) => (
                <Form className='card mb-2 card-body'>
                  <div className='d-flex'>
                    <label htmlFor="adjuster" className="form-label me-auto">Amount {isMultiplier ? 'multiplier' : ''}</label>
                    <button type="button" className="btn btn-link mt--4 me--3" data-bs-toggle="collapse" data-bs-target="#adjustPanel">
                      <CloseIcon />
                    </button>
                  </div>
                  <Field as="input" name="adjust" className="form-control" id="adjuster" autoComplete="off"/>
                  <div>
                    <button type="button" className="btn btn-primary mt-2" onClick={() => resetAdjuster(resetForm)}>
                      Reset
                    </button>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
          {recipe.ingredients.length ? (<>
            <h4>Ingredients</h4>
            <ul className='list-group'>
              {recipe.ingredients.map((ingredient, index) => (
                <li key={`ingredient-${index}`} className='list-group-item' itemProp="recipeIngredient">{`${ingredient.amount ?? ''} ${ingredient.name ?? ''}`}</li>
              ))}
            </ul>
          </>) : null}
          {recipe.steps.length ? (<>
            <h4 className='mt-2'>Method</h4>
            <ol className='list-group list-group-numbered'>
              {recipe.steps.map((step, index) => (
                <li key={`step-${index}`} className='list-group-item' itemProp="recipeInstructions">{step}</li>
              ))}
            </ol>
          </>) : null}
        </>) : (<p>Not Found</p>)}
      </div>
    </div>
  );
}

export default RecipePage;
