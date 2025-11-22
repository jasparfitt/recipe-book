import { useFormikContext } from "formik";
import { useEffect } from "react";

const AutoChecker = ({ helpers, name, isEmpty, defaultValue }) => {
  const { values } = useFormikContext();
  const fieldValue = values[name];

  useEffect(() => {
    const lastIndex = fieldValue.length - 1;
    const lastValue = fieldValue[lastIndex];
    const secondLastValue = fieldValue.length > 1 ? fieldValue[fieldValue.length - 2] : null;

    if (!isEmpty(lastValue)) {
      helpers.push(defaultValue);
    }
    
    if (fieldValue.length > 1 && isEmpty(lastValue) && isEmpty(secondLastValue)) {
      helpers.remove(lastIndex);
    }
  }, [fieldValue, helpers.push, helpers.remove]);
};

export default AutoChecker;