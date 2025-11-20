import { useField } from "formik";
import TextInput from './TextInput';
import useStyles from "../hooks/useStyles";

const TextField = ({onChange, extraStyle, ...props}) => {
  const [field, _, helpers] = useField(props);

  const onChangeText = (text) => {
    if (onChange) {
      onChange(text);
    }

    helpers.setValue(text)
  }

  return (
    <TextInput
      style={extraStyle}
      onChangeText={onChangeText}
      value={field.value}
      {...props}
    />
  );
};

export default TextField;