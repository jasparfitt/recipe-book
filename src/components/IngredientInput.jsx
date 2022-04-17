import { useField } from 'formik';
import CloseIcon from '@mui/icons-material/Close';
import React from 'react';

const IngredientInput = ({ index, remove, onChange }) => {
    const [amountField] = useField({name:`ingredients.${index}.amount`, value:''});
    const [nameField] = useField({name:`ingredients.${index}.name`, value:''});

    const fullOnChange = (event, key, field) => {
        field.onChange(event);
        onChange({[key]: event.target.value});
    }

    return (
        <div className="row mt-2">
            <div className="col">
                <div className="input-group">
                    <input
                        {...amountField}
                        name={`ingredients.${index}.amount`}
                        className="form-control" 
                        placeholder={index === 0 ? '500g': ''} 
                        aria-label="amount" 
                        autoComplete="off"
                        onChange={event => fullOnChange(event, 'amount', amountField)} />
                    <input
                        {...nameField} 
                        name={`ingredients.${index}.name`}
                        className="form-control flex-grow-3" 
                        placeholder={index === 0 ? 'Plain flour': ''}  
                        aria-label="ingredient name" 
                        autoComplete="off"
                        onKeyUp={event => fullOnChange(event, 'name', nameField)} />
                </div>
            </div>
            <div className="col-auto ps-0">
                <button type="button" className="btn btn-link px-0" onClick={remove}>
                    <CloseIcon />
                </button>
            </div>
        </div>
    );
};

export default IngredientInput;