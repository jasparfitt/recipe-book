import recipeService from '../services/recipeService';
import { Formik } from 'formik';
import { useNavigate, useParams } from 'react-router-dom';
import RecipeForm from '../components/RecipeForm';
import Storage from 'store2';
import { useEffect, useState } from 'react';

const NewRecipePage = () => {
    const navigate = useNavigate();
    const params = useParams();
    let [notFound, setNotFound] = useState(false);
    let [initialValues, setInitialValues] = useState(false);

    useEffect(() => {
        const recipes = Storage.get('recipes');
        const recipe = recipes[params.id];

        if (!recipe) {
            setNotFound(true);
        } else {
            recipe.steps.push('');
            recipe.ingredients.push({amount:'', name:''})
            console.log(recipe)
            setInitialValues(recipe);
        }
    }, [])

    const validateForm = values => {
        const errors = {};

        if (!values.recipeName) {
            errors.recipeName = 'Required';
        }

        return errors;
    }

    const save = async (values, { setSubmitting }) => {
        console.log(values);
        await recipeService.updateRecipe(values, initialValues.id);
        navigate('/home');
    }

    return (
        <div className="row">
            <h1>Edit Recipe</h1>
            <div className="col-lg-8">
                {notFound ? (
                    <p>Not Found</p>
                ) : (initialValues ? (
                    <Formik
                        validateOnBlur
                        initialValues={initialValues}
                        validate={validateForm}
                        onSubmit={save}>
                        {({ isSubmitting, values }) => (
                            <RecipeForm isSubmitting={isSubmitting} formValues={values} />
                        )}
                    </Formik>
                ) : (null))}
            </div>
        </div>
    );
}

export default NewRecipePage;
