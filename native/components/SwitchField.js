import { useField } from "formik";
import { Pressable, View } from "react-native";
import Switch from "./Switch";
import ThemeText from "./ThemeText";
import useStyles from "../hooks/useStyles";

const SwitchField = ({ label, name, disabled }) => {
  const { flexRow, mb2, ms2, myAuto, p1 } = useStyles();
  const [_, meta, helpers] = useField({ name });

  return (
    <View style={{...flexRow, ...mb2, opacity: disabled ? 0.5 : null}}>
      <Switch
        disabled={disabled}
        onValueChange={helpers.setValue}
        value={meta.value}
      />
      <Pressable onPress={() => disabled ? null : helpers.setValue(!meta.value) }>
        <ThemeText style={{...ms2, ...myAuto, ...p1}}>{label}</ThemeText>
      </Pressable>
    </View>
  );
};

export default SwitchField;