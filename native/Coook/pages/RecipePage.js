import { Text, View, ScrollView } from 'react-native';
import HeadingText from '../components/HeadingText';
import { useContext, useState } from 'react';
import RecipeContext from '../context/RecipeContext';
import Icon from 'react-native-vector-icons/MaterialIcons';
import BackButton from '../components/BackButton';
import useStyles from '../hooks/useStyles';
import ThemeText from '../components/ThemeText';
import { useTheme } from '@react-navigation/native';
import ModalDropdown from 'react-native-modal-dropdown';
import NotFoundPage from './NotFoundPage';
import { Formik } from 'formik';
import Button from '../components/Button';
import TextField from '../components/TextField';
import IconButton from '../components/IconButton';
import unit from 'parse-unit';

const RecipePage = ({route, navigation}) => {
  const {
    screenContainer, flexFill, flexRow, py1, btnLink, px1, pt2, me2, mb1, mb2, tag, list, 
    listItem, listItemTop, myAuto, msAuto, dropdown, dropdownOption, card, mt2
  } = useStyles();
  const {colors} = useTheme();
  const [recipes, setRecipes] = useContext(RecipeContext);
  const [adjustPanel, setAdjustPanel] = useState(false);
  const id = route.params.id;
  const originalRecipe = recipes[id];
  const [recipe, setRecipe] = useState(originalRecipe);
  const amount = parseInt(originalRecipe.makes);
  const isMultiplier = isNaN(amount) || amount.toString() !== originalRecipe.makes.trim();

  const itemStyle = (index) => {
    const isTop = index === 0;

    return {
      ...listItem,
      ...(isTop ? listItemTop : {}),
    };
  }

  const deleteRecipe = () => {
    setRecipes({...recipes, [id]: 'deleted'})
    navigation.navigate('Home')
  }

  const openAdjustPanel = () => {
    setAdjustPanel(true);
  }

  const handleOption = (optionId) => {
    switch (optionId) {
      case 0:
        navigation.navigate('EditRecipe', { id })
        break;
      case 1:
        deleteRecipe();
        break;
      case 2:
        navigation.navigate('Export', { id })
        break;
      case 3:
        openAdjustPanel();
        break;
      default:
        break;
    }
  }

  const validateForm = (values) => {
    const adjust = parseFloat(values.adjust);
    let multiplier = 1;

    if (!isNaN(adjust)) {
      if (isMultiplier) {
        multiplier = adjust;
      } else {
        const originalAmount = parseInt(originalRecipe.makes);
        multiplier = adjust / originalAmount;
      }

      const newRecipe = {...originalRecipe};
      newRecipe.ingredients = originalRecipe.ingredients.map((ingredient) => {
        const newIngredient = {...ingredient};
        const [number, unitString] = unit(ingredient.amount);

        if (!isNaN(number)) {
          newIngredient.amount = `${parseFloat((number * multiplier).toPrecision(4))}${unitString}`
        }
        
        return newIngredient;
      });

      if (!isMultiplier) {
        newRecipe.makes = adjust;
      }

      setRecipe(newRecipe);
    }
  };

  const resetAdjuster = (resetForm) => {
    resetForm();
    setRecipe(originalRecipe);
  }

  return recipe && recipe !== 'deleted' ? (
    <View style={screenContainer}>
      <BackButton/>
      <View style={{...flexRow, ...mb2}}>
        <HeadingText level="h1" style={myAuto}>{recipe.recipeName}</HeadingText>
        <ModalDropdown
          style={{...myAuto, ...msAuto}}
          renderButtonText={() => false}
          dropdownTextStyle={dropdownOption}
          dropdownTextHighlightStyle={dropdownOption}
          onSelect={handleOption}
          dropdownStyle={dropdown}
          options={['Update', 'Delete', 'Export recipe', 'Adjust amount']}
        >
          <Icon 
            style={{...py1, ...px1, ...pt2, ...btnLink}} 
            variant="Link" 
            name="more-vert" 
            size={30}/>
        </ModalDropdown>
      </View>
      <ScrollView style={flexFill}>
        {recipe.tags ? (
          <View style={flexRow}>
            {recipe.tags.map((tagName, index) => (
              <View key={index} style={{...flexRow, ...me2, ...mb1}}>
                <Text style={tag}>{tagName}</Text>
                <Icon name="label" size={43.5} color={colors.primary} style={{marginLeft: -30, zIndex: -1, marginVertical: -9}} />
              </View>
            ))}
          </View>
        ) : null}
        {recipe.makes ? (<HeadingText level="h3">Makes: {recipe.makes}</HeadingText>) : null}
        {adjustPanel ? (
            <Formik
              validateOnBlur
              initialValues={{adjust: isMultiplier ? '1' : `${parseInt(originalRecipe.makes)}`}}
              validate={validateForm}>
              {({ resetForm }) => (
                <View style={{...card, ...mb2}}>
                  <View style={{...flexRow, ...mb1}}>
                    <HeadingText level="h5" style={myAuto}>Amount {isMultiplier ? 'multiplier' : ''}</HeadingText>
                    <IconButton 
                      outerStyle={{...myAuto, ...msAuto}} 
                      style={{...py1, ...px1}} 
                      variant="Link" 
                      iconName="close" 
                      iconSize={30} 
                      onPress={() => setAdjustPanel(false)} />
                  </View>
                  <TextField name="adjust" keyboardType="numeric"/>
                  <View>
                    <Button style={mt2} variant="Primary" onPress={() => resetAdjuster(resetForm)}>
                      Reset
                    </Button>
                  </View>
                </View>
              )}
            </Formik>
        ) : null}
        {recipe.ingredients.length ? (
          <View style={mb2}>
            <HeadingText level="h4">Ingredients</HeadingText>
            <View style={list}>
              {recipe.ingredients.map((ingredient, index) => (
                <ThemeText style={itemStyle(index)} key={`ingredient-${index}`}>{`${ingredient.amount ?? ''} ${ingredient.name ?? ''}`}</ThemeText>
              ))}
            </View>
          </View>
        ) : null}
        {recipe.steps.length ? (
          <View style={mb2}>
            <HeadingText level="h4">Method</HeadingText>
            <View style={list}>
              {recipe.steps.map((step, index) => (
                <ThemeText style={itemStyle(index)} key={`step-${index}`}>{index+1}. {step}</ThemeText>
              ))}
            </View>
          </View>
        ) : null}
      </ScrollView>
    </View>
  ) : (<NotFoundPage />)
}

export default RecipePage;