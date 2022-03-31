import googleService from '../services/googleService';
import Storage from 'store2'
import { v4 as uuidv4 } from 'uuid';
import { Formik, Form, Field, ErrorMessage } from 'formik';

const NewRecipePage = () => {
    const recipes = Storage.get('recipes') || {};

    const validateForm = values => {
        const errors = {};
        if (!values.rName) {
            errors.rName = 'Required';
        }
        return errors;
    }

    const save = (values, { setSubmitting }) => {

    }

    return (
        <div className="row">
            <h1>New Recipe</h1>
            <div className="col-lg-8">
            <Formik
                validateOnBlur
                initialValues={{ name: '', ingredients: [], steps: [] }}
                validate={validateForm}
                onSubmit={save}>
                {({ isSubmitting }) => (
                    <Form>
                        <h3 for="nameInput">Name</h3>
                        <Field type="text" name="rName" className="form-control" id="nameInput"/>
                        <ErrorMessage name="rName" component="div" />
                        <div class="card">
                            <div class="card-body">
                                <h3>Ingredients</h3>
                                <Field type="text" name="ingredients[0]" className="form-control"/>
                                <button type="button" className="btn btn-primary mt-3" disabled={isSubmitting}>
                                    Add
                                </button>
                            </div>
                        </div>
                        <div class="card mt-2">
                            <div class="card-body">
                                <h3>Method</h3>
                                <Field type="textarea" name="method[0]" className="form-control" />
                                <button type="button" className="btn btn-primary mt-3" disabled={isSubmitting}>
                                    Add
                                </button>
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
