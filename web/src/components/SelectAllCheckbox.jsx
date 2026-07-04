import { useEffect, useRef } from "react";
import useSelectAllCheckbox from "coook.shared/components/useSelectAllCheckbox";

const SelectAllCheckbox = ({ keyName, allCount, allSelectedValue }) => {
  const selectAll = useRef();

  const {
    onChange,
    indeterminate,
    checked
  } = useSelectAllCheckbox({ keyName, allCount, allSelectedValue });

  useEffect(() => {
    if (selectAll.current) {
      if (indeterminate) {
        selectAll.current.indeterminate = true;
      } else {
        selectAll.current.indeterminate = false;
      }
    }
  }, [indeterminate]);


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