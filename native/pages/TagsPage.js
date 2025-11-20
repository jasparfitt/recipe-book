import { useContext, useEffect, useState } from "react";
import { View } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import Button from "../components/Button";
import HeadingText from "../components/HeadingText";
import SearchBar from "../components/SearchBar";
import RecipeContext from "../context/RecipeContext";
import useStyles from "../hooks/useStyles";

const TagsPage = ({navigation}) => {
  const [recipesObject] = useContext(RecipeContext);
  const [tags, setTags] = useState([]);
  const [allTags, setAllTags] = useState([]);
  const { screenContainer, mb2, mb3, mb1, textStart, capitals } = useStyles();

  useEffect(() => {
    const filteredTags = [...new Set(Object.values(recipesObject || {})
      .filter((r) => r !== 'deleted' && r.tags)
      .reduce((p,c) => ([...p, ...c.tags]), []))]
      .sort()
      .map((t) => ({tag: t}));

    setTags(filteredTags);
    setAllTags(filteredTags);
  }, [recipesObject])
  
  return (
    <View style={screenContainer}>
      <HeadingText level="h1">All Tags</HeadingText>
      <SearchBar setList={setTags} fullList={allTags} style={mb2} searchKey="tag" />
      <FlatList
        data={tags}
        renderItem={({item}) => <Button variant="OutlinePrimary" style={{...textStart, ...capitals}} outerStyle={mb1} onPress={() => navigation.navigate("Tag", {tag: item.tag})}>{item.tag}</Button>}
        ListFooterComponent={<View style={mb3}/>}
        keyExtractor={(i) => i.tag}>
      </FlatList>
    </View>
  );
}

export default TagsPage;