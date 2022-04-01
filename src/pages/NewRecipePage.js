import recipeService from '../services/recipeService';
import { Formik, Form, Field, ErrorMessage, FieldArray } from 'formik';
import { useNavigate } from 'react-router-dom';
import './NewRecipePage.scss'

const NewRecipePage = () => {
    const navigate = useNavigate();

    const validateForm = values => {
        const errors = {};

        if (!values.recipeName) {
            errors.recipeName = 'Required';
        }

        return errors;
    }

    const save = (values, { setSubmitting }) => {
        console.log(values);
        recipeService.addNewRecipe(values);
        navigate('/home');
    }

    const removeItem = (index, helper, values) => {
        helper.remove(index);

        if (values.length < 2) {
            helper.push('')
        }
    }

    return (
        <div className="row">
            <h1>New Recipe</h1>
            <div className="col-lg-8">
                <Formik
                    validateOnBlur
                    initialValues={{ recipeName: '', makes: '', ingredients: [''], steps: [''] }}
                    validate={validateForm}
                    onSubmit={save}>
                    {({ isSubmitting, values }) => (
                        <Form>
                            <h3>Name</h3>
                            <Field as="input" name="recipeName" className="form-control" id="nameInput" autoComplete="off"/>
                            <h3 className="mt-2">Makes</h3>
                            <Field as="input" name="makes" className="form-control" id="makes" autoComplete="off"/>
                            <ErrorMessage name="recipeName" component="div" />
                            <div className="card mt-2">
                                <div className="card-body">
                                    <h3>Ingredients</h3>
                                    <FieldArray
                                        name="ingredients">
                                        {arrayHelpers => (
                                            <div>
                                                {values.ingredients.map((i, index)=> (
                                                    <div className="row mt-2" key={`ingredients-${index}`}>
                                                        <div className="col">
                                                            <div className="input-group">
                                                                <Field as="input" name={`ingredients.${index}.amount`}
                                                                    className="form-control" 
                                                                    placeholder={index === 0 ? '500g': ''} 
                                                                    aria-label="amount" 
                                                                    autoComplete="off"/>
                                                                <Field as="input" name={`ingredients.${index}.name`}
                                                                    className="form-control flex-grow-3" 
                                                                    placeholder={index === 0 ? 'Plain flour': ''}  
                                                                    aria-label="ingredient name" 
                                                                    autoComplete="off"/>
                                                            </div>
                                                        </div>
                                                        <div className="col-auto ps-0">
                                                            <button type="button" className="btn btn-link px-0" onClick={() => removeItem(index, arrayHelpers, values.ingredients)}>
                                                                <span className="material-icons">close</span>
                                                            </button>
                                                        </div>
                                                    </div>
                                                ))}
                                                <button type="button" className="btn btn-primary mt-3" disabled={isSubmitting} onClick={() => arrayHelpers.push('')}>
                                                    Add
                                                </button>
                                            </div>
                                        )}
                                    </FieldArray>
                                </div>
                            </div>
                            <div className="card mt-2">
                                <div className="card-body">
                                    <h3>Method</h3>
                                    <FieldArray
                                        name="steps">
                                        {arrayHelpers => (
                                            <div>
                                                {values.steps.map((i, index)=> (
                                                    <div className="row mt-2" key={`steps-${index}`}>
                                                        <div className="col-auto pe-0 pt-input">{index + 1}.</div>
                                                        <div className="col">
                                                            <div className="form-control expand-background">
                                                                {values.steps[index]+' '}
                                                                <Field as="textarea" name={`steps.${index}`} className="form-control expand-input" autoComplete="off"/>
                                                            </div>
                                                        </div>
                                                        <div className="col-auto ps-0">
                                                            <button type="button" className="btn btn-link px-0" onClick={() => removeItem(index, arrayHelpers, values.steps)}>
                                                                <span className="material-icons">close</span>
                                                            </button>
                                                        </div>
                                                    </div>
                                                ))}
                                                <button type="button" className="btn btn-primary mt-3" disabled={isSubmitting} onClick={() => arrayHelpers.push('')}>
                                                    Add
                                                </button>
                                            </div>
                                        )}
                                    </FieldArray>
                                </div>
                            </div>
                            <button type="submit" className="btn btn-primary mt-3" disabled={isSubmitting}>
                                Save
                            </button>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    );
}

export default NewRecipePage;
