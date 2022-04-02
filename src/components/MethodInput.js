import ExpandingTextarea from './ExpandingTextarea';

const MethodInput = ({ value, index, remove, onChange }) => (
    <div className="row mt-2">
        <div className="col-auto pe-0 pt-input">{index + 1}.</div>
        <div className="col">
            <ExpandingTextarea name={`steps.${index}`} value={value} onChange={onChange} />
        </div>
        <div className="col-auto ps-0">
            <button type="button" className="btn btn-link px-0" onClick={remove}>
                <span className="material-icons">close</span>
            </button>
        </div>
    </div>
);

export default MethodInput;