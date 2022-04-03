import recipeService from '../services/recipeService';
import { Formik } from 'formik';
import { useNavigate } from 'react-router-dom';
import RecipeForm from '../components/RecipeForm';

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
        console.log(values);
        await recipeService.addNewRecipe(values);
        navigate('/home');
    }

    return (
        <div className="row">
            <h1>New Recipe</h1>
            <div className="col-lg-8">
                <Formik
                    validateOnBlur
                    initialValues={{ recipeName: '', makes: '', ingredients: [{amount: '100', name: '100'}, {}], steps: ['hi', 'bye'] }}
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
