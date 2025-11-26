import { useFormikContext } from "formik";
import { useEffect, useRef, useState } from "react";

const SelectAllCheckbox = ({ keyName, allCount, allSelectedValue }) => {
  const { values, setFieldValue } = useFormikContext();
  const selectAll = useRef();
  const [checked, setChecked] = useState(false);
  const selectedLength = values[keyName]?.length || 0;
  const isAllSelected = selectedLength === allCount;
  const isNoneSelected = selectedLength === 0;
  const indeterminate = !isAllSelected && !isNoneSelected;

  useEffect(() => {
    if (isAllSelected) {
      setChecked(true);
    } else if (isNoneSelected) {
      setChecked(false);
    }
  }, [selectedLength, allCount]);

  useEffect(() => {
    if (selectAll.current) {
      if (indeterminate) {
        selectAll.current.indeterminate = true;
      } else {
        selectAll.current.indeterminate = false;
      }
    }
  }, [indeterminate]);

  const onChange = () => {
    if (checked) {
      setFieldValue(keyName, []);
    } else {
      setFieldValue(keyName, allSelectedValue);
    }
  };

  return (
    <div className="form-check mx-1">
      <input
        className="form-check-input"
        onChange={onChange}
        checked={checked}
        type="checkbox"
        id="selectAll"
        ref={selectAll} />
      <label className="form-check-label" htmlFor="selectAll">
        Select All
      </label>
    </div>
  );
};

export default SelectAllCheckbox;