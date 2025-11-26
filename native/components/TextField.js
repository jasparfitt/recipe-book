import { useField } from "formik";
import TextInput from './TextInput';

const TextField = ({ extraStyle, ...props }) => {
  const [field, _, helpers] = useField(props);

  const onChangeText = (text) => {
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