import useStyles from "../hooks/useStyles"
import { Text } from "react-native";

const ThemeText = ({style, children, ...props}) => {
  const {text} = useStyles();
  
  return <Text style={{...text, ...style}} {...props}>{children}</Text>
}

export default ThemeText;