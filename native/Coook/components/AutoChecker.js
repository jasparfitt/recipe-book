import { useFormikContext } from "formik";
import { useEffect, useState } from "react";

const AutoChecker = ({helpers, name, isEmpty, defaultValue}) => {
  const { values } = useFormikContext();
  const [fieldValue, setFieldValue] = useState(values[name]);

  useEffect(() => {
    setFieldValue(values[name])
  }, [values, name])

  useEffect(() => {
    if (!isEmpty(fieldValue[fieldValue.length - 1])) {
      helpers.push(defaultValue);
    }
    
    if (fieldValue.length > 1 && isEmpty(fieldValue[fieldValue.length - 1]) && isEmpty(fieldValue[fieldValue.length - 2])) {
      helpers.remove(fieldValue.length - 1);
    }
  }, [fieldValue, helpers.push, helpers.remove]);
};

export default AutoChecker;