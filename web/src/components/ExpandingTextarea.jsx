import { useField } from 'formik';
import './ExpandingTextarea.scss';

const ExpandingTextarea = ({ name }) => {
  const [field] = useField(name);

  return (
    <div className="form-control expand-background">
      <span aria-hidden>{`${field.value} `}</span>
      <textarea
        {...field} 
        className="form-control expand-input" 
        autoComplete="off">
      </textarea>
    </div>
  )
};

export default ExpandingTextarea