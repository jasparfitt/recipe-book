import { FlatList, View } from "react-native";
import HeadingText from "../components/HeadingText";
import RecipeButton from "../components/RecipeButton";
import SearchBar from "../components/SearchBar";
import useStyles from "../hooks/useStyles";
import useTagPage from "../../shared/pages/useTagPage";

const TagPage = ({route}) => {
  const { screenContainer, capitals, mb2, mb3 } = useStyles();
  const { recipeList, setSearchTerm } = useTagPage(route.params);
  
  return (
    <View style={screenContainer}>
      <HeadingText style={capitals} level="h1">{tag}</HeadingText>
      <SearchBar setSearchTerm={setSearchTerm} style={mb2} />
      <FlatList
        data={recipeList}
        renderItem={(props) => <RecipeButton {...props}/>}
        ListFooterComponent={<View style={mb3}/>}
        keyExtractor={(i) => i.id}>
      </FlatList>
    </View>
  );
};

export default TagPage;