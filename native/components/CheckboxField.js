import { useTheme } from "@react-navigation/native";
import { useField } from "formik";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import useStyles from "../hooks/useStyles";

const CheckboxField = ({ name, label, value }) => {
  const { colors } = useTheme();
  const { mb2 } = useStyles();
  const [field, meta, helpers] = useField({ name, type: "checkbox", value });
  
  const onPress = (checked) => {
    if (checked) {
      helpers.setValue([...meta.value, value]);
    } else {
      helpers.setValue(meta.value.filter((i) => value !== i))
    }
  }

  return (
    <BouncyCheckbox
      style={mb2}
      text={label}
      fillColor={colors.primary}
      isChecked={field.checked}
      onPress={onPress}
      textStyle={{
        textDecorationLine: "none",
        color: colors.text
      }}
      innerIconStyle={{
        borderRadius: 5, 
      }}
      iconStyle={{
        borderRadius: 5, 
      }}
    />
  );
};

export default CheckboxField;