import { TextInput as NativeTextInput } from "react-native";
import useStyles from "../hooks/useStyles";

const TextInput = ({ onChange, style, ...props }) => {
  const { textInput } = useStyles();
  const mergedStyle = {
    ...textInput,
    ...(style || {}),
  };

  return (
    <NativeTextInput
      style={mergedStyle}
      placeholderTextColor={mergedStyle.color}
      {...props}
    />
  );
};

export default TextInput;