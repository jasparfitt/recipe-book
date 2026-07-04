import useStyles from "../hooks/useStyles"
import { Text } from "react-native";

const ThemeText = ({style, children, ...props}) => {
  const {text} = useStyles();
  const newProps = { ...props }
  delete newProps.key;
  
  return <Text style={{...text, ...style}} {...newProps}>{children}</Text>
}

export default ThemeText;