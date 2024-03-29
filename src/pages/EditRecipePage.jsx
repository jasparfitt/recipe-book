import recipeService from '../services/recipeService';
import { Formik } from 'formik';
import { useNavigate, useParams } from 'react-router-dom';
import RecipeForm from '../components/RecipeForm';
import Storage from 'store2';
import React, { useEffect, useState } from 'react';
import BackButton from '../components/BackButton';

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
            recipe.steps = (recipe.steps || [])
            recipe.ingredients = (recipe.ingredients || [])
            recipe.tags = (recipe.tags || []).join(', ')
            recipe.steps.push('');
            recipe.ingredients.push({amount:'', name:''});
            
            setInitialValues(recipe);
        }
    }, [params.id])

    const validateForm = values => {
        const errors = {};

        if (!values.recipeName) {
            errors.recipeName = 'Required';
        }

        return errors;
    }

    const save = async (values, { setSubmitting }) => {
        await recipeService.updateRecipe(values, initialValues.id);
        navigate('/home');
    }

    return (
        <div className="row">
            <h1>Edit Recipe</h1>
            <div className="col-lg-8">
                <BackButton />
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
