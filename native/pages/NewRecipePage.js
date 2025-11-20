import KeyboardAvoidingView from '../components/KeyboardAvoidingView';
import HeadingText from '../components/HeadingText';
import RecipeForm from '../components/RecipeForm';
import { useContext } from 'react';
import { v4 as uuidv4 } from 'uuid';
import RecipeContext from '../context/RecipeContext';
import { View } from 'react-native';
import useStyles from '../hooks/useStyles';
import BackButton from '../components/BackButton';

const NewRecipePage = ({navigation}) => {
  const [recipes, setRecipes] = useContext(RecipeContext);
  const {screenContainer} = useStyles();

  const onSubmit = async (value) => {
    const id = uuidv4();
    await setRecipes({...recipes, [id]: {...value, id}});
    navigation.navigate('Home')
  }

  return (
    <View style={screenContainer}>
      <BackButton/>
      <HeadingText level="h1">New Recipe</HeadingText>
      <RecipeForm recipe={{ recipeName: '', makes: '', ingredients: [{}], steps: [''], tags: [''] }} onSubmit={onSubmit}/>
    </View>
  )
}

export default NewRecipePage;