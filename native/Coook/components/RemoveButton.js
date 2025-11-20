import { useFormikContext } from "formik";
import useStyles from "../hooks/useStyles";
import IconButton from "./IconButton";

const RemoveButton = ({baseName, index}) => {
  const {values, setFieldValue} = useFormikContext();
  const {px1, py1} = useStyles();
  const lastIndex = values[baseName].length - 1
  const isLast = index === lastIndex;

  const remove = () => {
    const newValue = [...values[baseName]];
    newValue.splice(index, 1);
    setFieldValue(baseName, newValue);
  }

  return (
    <IconButton style={{...px1, ...py1, height: isLast ? 0 : 'auto'}} iconName="close" iconSize={30} variant="Link" onPress={remove} disabled={isLast}/>
  );
}

export default RemoveButton;