import { View } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import Button from "../components/Button";
import HeadingText from "../components/HeadingText";
import SearchBar from "../components/SearchBar";
import useStyles from "../hooks/useStyles";
import useTagsPage from "../../shared/pages/useTagsPage";

const TagsPage = ({navigation}) => {  
  const { screenContainer, mb2, mb3, mb1, textStart, capitals } = useStyles();
  const { tagList, setSearchTerm } = useTagsPage();
  
  return (
    <View style={screenContainer}>
      <HeadingText level="h1">All Tags</HeadingText>
      <SearchBar setSearchTerm={setSearchTerm} style={mb2} />
      <FlatList
        data={tagList}
        renderItem={({item}) => <Button variant="OutlinePrimary" style={{ ...textStart, ...capitals }} outerStyle={mb1} onPress={() => navigation.navigate("Tag", { tag: item })}>{item}</Button>}
        ListFooterComponent={<View style={mb3}/>}
        keyExtractor={(i) => i}>
      </FlatList>
    </View>
  );
}

export default TagsPage;