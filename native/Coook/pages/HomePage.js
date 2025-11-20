import { View, FlatList } from 'react-native';
import HeadingText from '../components/HeadingText';
import { useContext, useEffect, useState } from 'react';
import RecipeContext from '../context/RecipeContext';
import Button from '../components/Button';
import useStyles from '../hooks/useStyles';
import RecipeButton from '../components/RecipeButton';
import SearchBar from '../components/SearchBar';

const HomePage = ({navigation}) => {
  const [recipesObject] = useContext(RecipeContext);
  const [recipes, setRecipes] = useState([]);
  const [allRecipes, setAllRecipes] = useState([]);
  const { screenContainer, flexRow, mb2, mb3 } = useStyles();

  useEffect(() => {
    const filteredRecipes = Object.values(recipesObject || {}).filter((r) => r !== 'deleted').sort((a,b) => {
      if (a.recipeName === b.recipeName) {
        return 0;
      } else if (a.recipeName < b.recipeName) {
        return -1;
      } else {
        return 1;
      }
    });

    setRecipes(filteredRecipes);
    setAllRecipes(filteredRecipes);
  }, [recipesObject])

  const addNew = () => navigation.navigate('NewRecipe');

  return (
    <View style={screenContainer}>
      <HeadingText level="h1">All Recipes</HeadingText>
      <SearchBar setList={setRecipes} fullList={allRecipes} style={mb2} searchKey="recipeName" />
      <FlatList
        data={recipes}
        renderItem={(props) => <RecipeButton {...props}/>}
        ListHeaderComponent={(<View style={{...flexRow, ...mb2}}><Button variant="Primary" onPress={addNew}>Add new recipe</Button></View>)}
        ListFooterComponent={<View style={mb3}/>}
        keyExtractor={(i) => i.id}>
      </FlatList>
    </View>
  )
}

export default HomePage;