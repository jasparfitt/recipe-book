import { useNavigation } from "@react-navigation/native";
import { View } from "react-native";
import useStyles from "../hooks/useStyles"
import Button from "./Button"

const BackButton = () => {
  const {flexRow} = useStyles();
  const navigation = useNavigation();

  return <View style={flexRow}><Button variant="Primary" onPress={navigation.goBack}>Back</Button></View>
}

export default BackButton;