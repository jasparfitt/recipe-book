import { useField } from 'formik';
import './ExpandingTextarea.scss';
import React from 'react';

const ExpandingTextarea = ({ name, value, onChange }) => {
    const [field] = useField({name, value});

    const fullOnChange = (event) => {
        field.onChange(event);
        onChange(event.target.value);
    }

    return (
        <div className="form-control expand-background">
            {`${value} `}
            <textarea 
                name={name} 
                {...field} 
                onChange={fullOnChange} 
                className="form-control expand-input" 
                autoComplete="off">
            </textarea>
        </div>
    )
};

export default ExpandingTextarea