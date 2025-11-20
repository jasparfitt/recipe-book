import { View, Text } from "react-native";
import TextField from "./TextField";
import RemoveButton from "./RemoveButton";
import ThemeText from "./ThemeText";
import useStyles from "../hooks/useStyles";

const MethodField = ({baseName, index, extraStyle}) => {
  const name = `${baseName}[${index}]`
  const {methodNumber, flexFill, flexRow} = useStyles();

  return (
    <View style={{...extraStyle, ...flexRow}}>
      <ThemeText style={methodNumber}>{index + 1}.</ThemeText>
      <TextField extraStyle={flexFill} name={name} multiline/>
      <RemoveButton baseName={baseName} index={index}/>
    </View>
  );
}

export default MethodField;