import { useContext, useEffect, useState } from "react";
import { FlatList, View } from "react-native";
import HeadingText from "../components/HeadingText";
import RecipeButton from "../components/RecipeButton";
import SearchBar from "../components/SearchBar";
import RecipeContext from "../context/RecipeContext";
import useStyles from "../hooks/useStyles";

const TagPage = ({route}) => {
  const {screenContainer, capitals, mb2, mb3} = useStyles();
  const [recipesObject] = useContext(RecipeContext);
  const tag = route.params.tag;
  const [recipes, setRecipes] = useState([])
  const [allRecipes, setAllRecipes] = useState([])

  useEffect(() => {
    const filteredRecipes = Object.values(recipesObject || {})
      .filter((r) => r !== 'deleted')
      .filter((recipe) => recipe.tags?.includes(tag))
      .sort((a,b) => {
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
  }, [])
  
  return (
    <View style={screenContainer}>
      <HeadingText style={capitals} level="h1">{tag}</HeadingText>
      <SearchBar setList={setRecipes} fullList={allRecipes} style={mb2} searchKey="recipeName" />
      <FlatList
        data={recipes}
        renderItem={(props) => <RecipeButton {...props}/>}
        ListFooterComponent={<View style={mb3}/>}
        keyExtractor={(i) => i.id}>
      </FlatList>
    </View>
  );
};

export default TagPage;