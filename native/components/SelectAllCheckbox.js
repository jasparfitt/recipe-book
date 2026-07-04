import { Text } from "react-native";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { useTheme } from "@react-navigation/native";
import useStyles from "../hooks/useStyles";
import useSelectAllCheckbox from "coook.shared/components/useSelectAllCheckbox";

const SelectAllCheckbox = ({ keyName, allCount, allSelectedValue }) => {
  const { colors } = useTheme();
  const { mb3 } = useStyles();  
  const indeterminateStyle = { fontSize: 25, lineHeight: 24, fontWeight: 'bold', color: '#fff' };
  const {
    onChange,
    indeterminate,
    checked
  } = useSelectAllCheckbox({ keyName, allCount, allSelectedValue });

  return (
    <BouncyCheckbox 
      text="Select all"
      style={mb3}
      isChecked={checked || indeterminate}
      onPress={onChange}
      fillColor={colors.primary}
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
      iconComponent={indeterminate ? <Text style={indeterminateStyle}>–</Text> : null} />
  );
};

export default SelectAllCheckbox;