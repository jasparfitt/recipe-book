import ExpandingTextarea from './ExpandingTextarea';
import CloseIcon from '@mui/icons-material/Close';
import React from 'react';

const MethodInput = ({ value, index, remove, onChange }) => (
    <div className="row mt-2">
        <div className="col-auto pe-0 pt-input">{index + 1}.</div>
        <div className="col">
            <ExpandingTextarea name={`steps.${index}`} value={value} onChange={onChange} />
        </div>
        <div className="col-auto ps-0">
            <button type="button" className="btn btn-link px-0" onClick={remove}>
                <CloseIcon />
            </button>
        </div>
    </div>
);

export default MethodInput;