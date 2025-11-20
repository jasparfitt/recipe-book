import { View } from "react-native";
import Button from "./Button"
import useStyles from "../hooks/useStyles";
import IconButton from "./IconButton";
import { useNavigation } from '@react-navigation/native';

const RecipeButton = ({item}) => {
  const { flexFill, flexRow, mb1, groupStart, groupEnd, myAuto, textStart } = useStyles();
  const { navigate } = useNavigation();

  return (
    <View style={{...flexRow, ...mb1, ...flexFill}}>
      <Button 
        variant="OutlinePrimary" 
        style={{...groupStart, ...textStart}} 
        outerStyle={flexFill}
        onPress={() => navigate('Recipe', {id: item.id})}>
        {item.recipeName}
      </Button>
      <IconButton 
        variant="OutlinePrimary" 
        style={{...groupEnd, height: '100%'}} 
        iconStyle={myAuto} 
        iconName="edit" 
        iconSize={20} 
        onPress={() => navigate('EditRecipe', {id: item.id})}/>
    </View>
  )
}

export default RecipeButton;