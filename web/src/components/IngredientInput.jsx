import { Field, useFormikContext } from 'formik';
import CloseIcon from '@mui/icons-material/Close';

const IngredientInput = ({ index, remove }) => {
  const { values } = useFormikContext();
  const lastIndex = values['ingredients'].length - 1
  const isLast = index === lastIndex;

  return (
    <div className="row mt-2">
      <div className="col">
        <div className="input-group">
          <Field
            as="input"
            name={`ingredients.${index}.amount`}
            className="form-control"
            placeholder={index === 0 ? '500g': ''} 
            aria-label="amount"            
            autoComplete="off" />
          <Field
            as="input"
            name={`ingredients.${index}.name`}
            className="form-control flex-grow-3" 
            placeholder={index === 0 ? 'Plain flour': ''}  
            aria-label="ingredient name" 
            autoComplete="off" />
        </div>
      </div>
      <div className="col-auto ps-0">
        <button type="button" className={`btn btn-link px-0 ${isLast ? 'invisible' : ''}`} onClick={remove} disabled={isLast}>
          <CloseIcon />
        </button>
      </div>
    </div>
  );
};

export default IngredientInput;