import { View } from "react-native";
import TextField from "./TextField";
import RemoveButton from "./RemoveButton";
import useStyles from "../hooks/useStyles";

const IngredientsField = ({baseName, index, extraStyle}) => {
  const {flexRow, groupStart, groupEnd} = useStyles();
  const name = `${baseName}[${index}]`

  return (
    <View style={{...extraStyle, ...flexRow}}>
      <TextField extraStyle={{flex: 1, ...groupStart}} name={`${name}.amount`}/>
      <TextField extraStyle={{flex: 3, ...groupEnd}} name={`${name}.name`}/>
      <RemoveButton baseName={baseName} index={index}/>
    </View>
  );
}

export default IngredientsField;