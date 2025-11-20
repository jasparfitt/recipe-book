import HeadingText from '../components/HeadingText';
import RecipeForm from '../components/RecipeForm';
import { useContext } from 'react';
import RecipeContext from '../context/RecipeContext';
import useStyles from '../hooks/useStyles';
import { View } from 'react-native';
import BackButton from '../components/BackButton';
import NotFoundPage from './NotFoundPage';

const EditRecipePage = ({route, navigation}) => {
  const id = route.params.id;
  const [recipes, setRecipes] = useContext(RecipeContext);
  const recipe = recipes[id];
  const {screenContainer} = useStyles();

  const onSubmit = async (value) => {
    await setRecipes({...recipes, [id]: value});
    navigation.navigate('Home')
  }

  return recipe && recipe !== 'deleted' ? (
    <View style={screenContainer}>
      <BackButton/>
      <HeadingText level="h1">Edit Recipe</HeadingText>
      <RecipeForm recipe={recipe} onSubmit={onSubmit}/>
    </View>
  ) : (<NotFoundPage />)
}

export default EditRecipePage;