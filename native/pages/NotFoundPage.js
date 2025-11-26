import { View } from "react-native";
import BackButton from "../components/BackButton";
import HeadingText from "../components/HeadingText";
import useStyles from "../hooks/useStyles";

const NotFoundPage = () => {
  const { screenContainer } = useStyles();

  return (
    <View style={screenContainer}>
      <BackButton />
      <HeadingText level="h1">Not Found</HeadingText>
    </View>
  );
}

export default NotFoundPage;