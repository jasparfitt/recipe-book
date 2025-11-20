import { View } from 'react-native';
import HeadingText from '../components/HeadingText';
import { useContext, useEffect } from 'react';
import Button from '../components/Button';
import GoogleEnabledContext from '../context/GoogleEnabledContext';
import useStyles from '../hooks/useStyles';
import ThemeText from '../components/ThemeText';

const StartPage = ({navigation}) => {
  const [googleEnabled, setGoogleEnabled] = useContext(GoogleEnabledContext);
  const {container, mb3, flexRow, meAuto, mb1} = useStyles();
    
  useEffect(() => {
    if (googleEnabled !== null) {
      navigation.navigate('Home')
    }
  }, [navigation.navigate, googleEnabled]);

  const link = async () => {
    setGoogleEnabled(true);
    // await recipeService.loadRecipes();

    navigation.navigate('Home')
  };
  
  const skip = () => {
    setGoogleEnabled(false);
    navigation.navigate('Home')
  };

  return (
    <View style={container}>
      <HeadingText level="h1">Recipe Book</HeadingText>
      <ThemeText style={mb3}>Connect to Google to backup and view your recipes on other devices</ThemeText>
      <View style={{...flexRow, ...mb1}}>
        <Button onPress={link} variant="Primary" outerStyle={meAuto}>Link to Google</Button>
      </View>
      <View style={flexRow}>
        <Button onPress={skip} variant="Link" outerStyle={meAuto}>Skip this step</Button>
      </View>
    </View>
  )
}

export default StartPage;