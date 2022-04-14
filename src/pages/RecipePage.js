import Storage from 'store2'
import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import recipeService from '../services/recipeService';
import BackButton from '../components/BackButton';
import './RecipePage.scss'
import { Form, Field, Formik } from 'formik';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import CloseIcon from '@mui/icons-material/Close';
import unit from 'parse-unit';

const RecipePage = () => {
    const params = useParams();
    const navigate = useNavigate();
    const [notFound, setNotFound] = useState(false);
    const [recipe, setRecipe] = useState(false);
    const [originalRecipe, setOriginalRecipe] = useState(false);
    const [isMultiplier, setIsMultiplier] = useState(true);

    useEffect(() => {
        const recipes = Storage.get('recipes');
        const recipe = recipes[params.id];

        if (!recipe) {
            setNotFound(true);
        } else {
            const amount = parseInt(recipe.makes);
            setIsMultiplier(isNaN(amount) || amount != recipe.makes.trim());
            console.log(recipe);
            setRecipe(recipe);
            setOriginalRecipe(recipe);
        }
    }, [params.id])

    const editRecipe = () => {
        navigate(`/edit-recipe/${params.id}`);
    };

    const deleteRecipe = () => {
        recipeService.deleteRecipe(params.id);
        navigate('/home');
    };

    const validateForm = (values) => {
        const adjust = parseFloat(values.adjust);
        let multiplier = 1;

        if (!isNaN(adjust)) {
            if (isMultiplier) {
                multiplier = adjust;
            } else {
                const originalAmount = parseInt(originalRecipe.makes);
                multiplier = adjust / originalAmount;
            }

            const newRecipe = {...originalRecipe};
            newRecipe.ingredients = originalRecipe.ingredients.map((ingredient) => {
                const newIngredient = {...ingredient};
                const [number, unitString] = unit(ingredient.amount);

                if (!isNaN(number)) {
                    newIngredient.amount = `${parseFloat((number * multiplier).toPrecision(4))}${unitString}`
                }
                
                return newIngredient;
            });

            if (!isMultiplier) {
                newRecipe.makes = adjust;
            }

            setRecipe(newRecipe);
        }
    };

    const resetAdjuster = (values) => {
        if (isMultiplier) {
            values.adjust = 1;
        } else {
            values.adjust = parseInt(originalRecipe.makes);
        }

        setRecipe(originalRecipe);
    };

    return (
        <div className="row">
            <div className="col-lg-8">
            <BackButton className="mt-3" />
                {notFound ? (
                    <p>Not Found</p>
                ) : (recipe ? (<>
                    <div className='row'>
                        <h1 className='col'>{recipe.recipeName}</h1>
                        <div className='col-auto h1'>
                            <div className="dropdown">
                                <button className="btn p-0" disabled={notFound} type="button" id="optionsButton" data-bs-toggle="dropdown" aria-expanded="false">
                                    <MoreVertIcon />
                                </button>
                                <ul className="dropdown-menu" aria-labelledby="optionsButton">
                                    <li><button className="dropdown-item" onClick={editRecipe}>Update</button></li>
                                    <li><button className="dropdown-item" onClick={deleteRecipe}>Delete</button></li>
                                    <li><button className="dropdown-item" data-bs-toggle="collapse" data-bs-target="#adjustPanel">Adjust amount</button></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                        <div className="collapse" id="adjustPanel">
                            <Formik
                                validateOnBlur
                                initialValues={{adjust: isMultiplier ? 1 : parseInt(recipe.makes)}}
                                validate={validateForm}>
                                {({ isSubmitting, values }) => (
                                    <Form className='card mb-2 card-body'>
                                        <div className='d-flex'>
                                            <label htmlFor="adjuster" className="form-label me-auto">Amount {isMultiplier ? 'multiplier' : ''}</label>
                                            <button type="button" className="btn btn-link mt--4 me--3" data-bs-toggle="collapse" data-bs-target="#adjustPanel">
                                                <CloseIcon />
                                            </button>
                                        </div>
                                        <Field as="input" name="adjust" className="form-control" id="adjuster" autoComplete="off"/>
                                        <div>
                                            <button type="button" className="btn btn-primary mt-2" onClick={() => resetAdjuster(values)}>
                                                Reset
                                            </button>
                                        </div>
                                    </Form>
                                )}
                            </Formik>
                        </div>
                    {recipe.makes ? (<h3>Makes: {recipe.makes}</h3>) : null}
                    {recipe.ingredients.length ? (<>
                        <h4 className='mt-2'>Ingredients</h4>
                        <ul className='list-group'>
                            {recipe.ingredients.map((ingredient, index) => (
                                <li key={`ingredient-${index}`} className='list-group-item'>{`${ingredient.amount ?? ''} ${ingredient.name ?? ''}`}</li>
                            ))}
                        </ul>
                    </>) : null}
                    {recipe.steps.length ? (<>
                        <h4 className='mt-2'>Method</h4>
                        <ol className='list-group list-group-numbered'>
                            {recipe.steps.map((step, index) => (
                                <li key={`step-${index}`} className='list-group-item'>{step}</li>
                            ))}
                        </ol>
                    </>) : null}
                </>) : (null))}
            </div>
        </div>
    );
}

export default RecipePage;
