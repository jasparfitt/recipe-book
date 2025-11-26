import { useFormikContext } from 'formik';
import ExpandingTextarea from './ExpandingTextarea';
import CloseIcon from '@mui/icons-material/Close';

const MethodInput = ({ index, remove }) => {
  const { values } = useFormikContext();
  const lastIndex = values['steps'].length - 1
  const isLast = index === lastIndex;

  return (
    <div className="row mt-2">
      <div className="col-auto pe-0 pt-input">{index + 1}.</div>
      <div className="col">
        <ExpandingTextarea name={`steps.${index}`} />
      </div>
      <div className="col-auto ps-0">
        <button type="button" className={`btn btn-link px-0 ${isLast ? 'invisible' : ''}`} onClick={remove} disabled={isLast}>
          <CloseIcon />
        </button>
      </div>
    </div>
  );
};

export default MethodInput;