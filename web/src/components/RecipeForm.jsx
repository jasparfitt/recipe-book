import { Form, Field, ErrorMessage, FieldArray, Formik } from 'formik';
import MethodInput from './MethodInput';
import IngredientInput from './IngredientInput';
import AutoChecker from '../../../shared/components/AutoChecker';
import useRecipeForm from '../../../shared/components/useRecipeForm';

const RecipeForm = ({ recipe, onSubmit }) => {
  const {
    handleFormSubmit,
    validateForm,
    initialValues,
    defaultIngredient,
    defaultStep,
    isObjectEmpty,
    isStringEmpty,
  } = useRecipeForm(recipe, onSubmit);

  const removeItem = (index, helper) => {
    helper.remove(index);
  };

  return (
    <Formik
      validateOnBlur
      initialValues={initialValues}
      validate={validateForm}
      onSubmit={handleFormSubmit}>
      {({ isSubmitting, values }) => (
        <>
          <FieldArray
            name="ingredients"
            render={(arrayHelpers) => (
              <AutoChecker helpers={arrayHelpers} name={'ingredients'} isEmpty={isObjectEmpty} defaultValue={defaultIngredient}/>
            )} />
          <FieldArray
            name="steps"
            render={(arrayHelpers) => (
              <AutoChecker helpers={arrayHelpers} name={'steps'} isEmpty={isStringEmpty} defaultValue={defaultStep}/>
            )} />
          <Form>
            <label htmlFor="nameInput" className="h3 mt-2">Name</label>
            <Field as="input" name="recipeName" className="form-control" id="nameInput" autoComplete="off"/>
            <ErrorMessage name="recipeName" component="div" />

            <label htmlFor="tags" className="h3 mt-2">Tags</label>
            <Field as="input" name="tags" className="form-control" id="tags" placeholder="i.e. baking, dessert, cake" autoComplete="off"/>
            
            <label htmlFor="makes" className="h3 mt-2">Makes</label>
            <Field as="input" name="makes" className="form-control" id="makes" autoComplete="off"/>
            
            <div className="card mt-2">
              <div className="card-body">
                <h3>Ingredients</h3>
                <FieldArray
                  name="ingredients">
                  {arrayHelpers => values.ingredients.map((_, index)=> (
                    <IngredientInput 
                      key={`ingredients-${index}`}
                      index={index}
                      remove={() => removeItem(index, arrayHelpers)} />
                  ))}
                </FieldArray>
              </div>
            </div>

            <div className="card mt-2">
              <div className="card-body">
                <h3>Method</h3>
                <FieldArray
                  name="steps">
                  {arrayHelpers => values.steps.map((_, index)=> (
                    <MethodInput 
                      key={`steps-${index}`}
                      index={index}
                      remove={() => removeItem(index, arrayHelpers)} />
                  ))}
                </FieldArray>
              </div>
            </div>
            <button type="submit" className="btn btn-primary mt-3" disabled={isSubmitting}>
              Save
            </button>
          </Form>
        </>
      )}
    </Formik>
  );
};

export default RecipeForm;