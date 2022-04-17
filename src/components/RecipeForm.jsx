import { Form, Field, ErrorMessage, FieldArray } from 'formik';
import MethodInput from './MethodInput';
import IngredientInput from './IngredientInput';
import React from 'react';

const RecipeForm = ({ isSubmitting, formValues }) => {
    const onListChange = (index, helper, values, isEmpty, defaultValue) => {
        if (index === (values.length -1)) {
            if (isEmpty(values[index])) {
                helper.push(defaultValue);
            }
        } else if (values.length > 1) {
            for (let i = values.length - 2; i >= 0; i--) {
                if (!isEmpty(values[i])) {
                    helper.remove(i);
                } else {
                    break;
                }
            }
        }
    };

    const onIngredientsChange = (index, helper, value) => {
        const defaultValue = { amount: '', name: '' };
        const isEmpty = value => Object.values(value).join('').trim();
        formValues.ingredients[index] = {...formValues.ingredients[index], ...value}

        onListChange(index, helper, formValues.ingredients, isEmpty, defaultValue);
    }

    const onStepsChange = (index, helper, value) => {
        const defaultValue = '';
        const isEmpty = value => value.trim();
        formValues.steps[index] = value

        onListChange(index, helper, formValues.steps, isEmpty, defaultValue);
    }

    const removeItem = (index, helper, values) => {
        helper.remove(index);

        if (values.length < 2) {
            helper.push('')
        }
    };

    return (
        <Form>
            <h3>Name</h3>
            <Field as="input" name="recipeName" className="form-control" id="nameInput" autoComplete="off"/>
            <ErrorMessage name="recipeName" component="div" />
            
            <h3 className="mt-2">Makes</h3>
            <Field as="input" name="makes" className="form-control" id="makes" autoComplete="off"/>
            
            <div className="card mt-2">
                <div className="card-body">
                    <h3>Ingredients</h3>
                    <FieldArray
                        name="ingredients">
                        {arrayHelpers => formValues.ingredients.map((v, index)=> (
                            <IngredientInput 
                                key={`ingredients-${index}`}
                                index={index}
                                onChange={(value) => onIngredientsChange(index, arrayHelpers, value)}
                                remove={() => removeItem(index, arrayHelpers, formValues.ingredients)} />
                        ))}
                    </FieldArray>
                </div>
            </div>
            <div className="card mt-2">
                <div className="card-body">
                    <h3>Method</h3>
                    <FieldArray
                        name="steps">
                        {arrayHelpers => formValues.steps.map((v, index)=> (
                            <MethodInput 
                                key={`steps-${index}`}
                                value={formValues.steps[index]} 
                                index={index}
                                onChange={(value) => onStepsChange(index, arrayHelpers, value)}
                                remove={() => removeItem(index, arrayHelpers, formValues.steps)} />
                        ))}
                    </FieldArray>
                </div>
            </div>
            <button type="submit" className="btn btn-primary mt-3" disabled={isSubmitting}>
                Save
            </button>
        </Form>
    );
};

export default RecipeForm;