import { Pressable, Text, View } from "react-native";
import useStyles from "../hooks/useStyles";
import { useField } from "formik";

const RadioButtonGroup = ({ items, name, variant = "Primary" }) => {
  const { flexRow, mb2 } = useStyles();
  const [_, meta, helpers] = useField({ name });
  const styles = useStyles()
  const btnStyle = {
    ...styles.btn,
    ...styles[`btnOutline${variant}`],
  };
  const selectedBtnStyle = {
    ...styles.btn,
    ...styles[`btn${variant}`],
  }

  return (
    <View style={{...flexRow, ...mb2}}>
      {items.map((item, i) => (
        <Pressable 
          style={{
            ...(meta.value === item.value ? selectedBtnStyle : btnStyle),
            borderRadius: 0,
            borderTopLeftRadius: i === 0 ? btnStyle.borderRadius : 0,
            borderBottomLeftRadius: i === 0 ? btnStyle.borderRadius : 0,
            borderTopRightRadius: i === (items.length - 1) ? btnStyle.borderRadius : 0,
            borderBottomRightRadius: i === (items.length - 1) ? btnStyle.borderRadius : 0,
          }} 
          onPress={() => helpers.setValue(item.value)} 
          key={item.value}>
          {() => <Text>{item.label}</Text>}
        </Pressable>
      ))}
    </View>
  );
};

export default RadioButtonGroup;