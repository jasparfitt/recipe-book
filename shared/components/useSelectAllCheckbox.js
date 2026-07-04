import { useEffect, useState } from "react";
import { useFormikContext } from "formik";

const useSelectAllCheckbox = ({ keyName, allCount, allSelectedValue }) => {
  const { values, setFieldValue } = useFormikContext();
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

  const onChange = () => {
    if (checked) {
      setFieldValue(keyName, []);
    } else {
      setFieldValue(keyName, allSelectedValue);
    }
  };

  return {
    onChange,
    indeterminate,
    checked
  }
};

export default useSelectAllCheckbox;