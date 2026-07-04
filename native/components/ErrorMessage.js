import { Text } from "react-native";
import useStyles from "../hooks/useStyles";
import { useFormikContext } from "formik";

const ErrorMessage = ({ name, children }) => {
  const { errorMessage } = useStyles();
  const { errors, touched } = useFormikContext();
    
  return errors[name] && touched[name] ? (
    <Text style={errorMessage} name={name}>{children || errors[name]}</Text>
  ) : null
};

export default ErrorMessage;
