import { View } from "react-native";
import HeadingText from "../components/HeadingText";
import ThemeText from '../components/ThemeText';
import useStyles from "../hooks/useStyles";

const ExportRecipePage = () => {
  const {screenContainer} = useStyles();

  return (
    <View style={screenContainer}>
      <HeadingText level="h1">Export Page</HeadingText>
      <ThemeText>Coming soon</ThemeText>
    </View>
  );
}

export default ExportRecipePage;