import recipeService from '../services/recipeService';
import { Formik } from 'formik';
import { useNavigate } from 'react-router-dom';
import RecipeForm from '../components/RecipeForm';
import BackButton from '../components/BackButton';
import React from 'react';

const NewRecipePage = () => {
    const navigate = useNavigate();

    const validateForm = values => {
        const errors = {};

        if (!values.recipeName) {
            errors.recipeName = 'Required';
        }

        return errors;
    }

    const save = async (values, { setSubmitting }) => {
        await recipeService.addNewRecipe(values);
        navigate('/home');
    }

    return (
        <div className="row">
            <h1>New Recipe</h1>
            <div className="col-lg-8">
                <BackButton/>
                <Formik
                    validateOnBlur
                    initialValues={{ recipeName: '', makes: '', ingredients: [{}], steps: [''] }}
                    validate={validateForm}
                    onSubmit={save}>
                    {({ isSubmitting, values }) => (
                        <RecipeForm isSubmitting={isSubmitting} formValues={values} />
                    )}
                </Formik>
            </div>
        </div>
    );
}

export default NewRecipePage;
