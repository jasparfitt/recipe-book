import { useField } from 'formik';
import React from 'react';

const FileUpload = ({ name, id, value }) => {
  const [fileField, meta, helpers] = useField({name: name, value:''});

  const onChange = (e) => {
    if (e.target.files.length > 0) {
      helpers.setValue(e.target.files[0]);
    } else {
      helpers.setValue('');
    }
  };

  return (
    <input
      name={name}
      id={id}
      type="file"
      accept=".json,text/json"
      className={`form-control ${meta.error ? 'is-invalid' : ''}`}
      aria-label="amount" 
      autoComplete="off"
      onChange={onChange} />
  );
};

export default FileUpload;