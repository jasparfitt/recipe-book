import { View, FlatList } from 'react-native';
import HeadingText from '../components/HeadingText';
import Button from '../components/Button';
import useStyles from '../hooks/useStyles';
import RecipeButton from '../components/RecipeButton';
import SearchBar from '../components/SearchBar';
import useHomePage from '../../shared/pages/useHomePage';

const HomePage = ({ navigation }) => {
  const { screenContainer, flexRow, mb2, mb3 } = useStyles();
  const { recipeList, setSearchTerm } = useHomePage();

  const addNew = () => navigation.navigate('NewRecipe');

  return (
    <View style={screenContainer}>
      <HeadingText level="h1">All Recipes</HeadingText>
      <SearchBar setSearchTerm={setSearchTerm} style={mb2} />
      <FlatList
        data={recipeList}
        renderItem={(props) => <RecipeButton {...props} />}
        ListHeaderComponent={(<View style={{...flexRow, ...mb2}}><Button variant="Primary" onPress={addNew}>Add new recipe</Button></View>)}
        ListFooterComponent={<View style={mb3}/>}
        keyExtractor={(i) => i.id}>
      </FlatList>
    </View>
  )
}

export default HomePage;