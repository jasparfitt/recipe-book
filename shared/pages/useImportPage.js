import { useContext } from 'react';
import RecipeContext from '../context/RecipeContext';
import { v4 as uuidv4 } from 'uuid';

const useImportPage = (readJsonFile) => {
  const [currentRecipes, setRecipes] = useContext(RecipeContext);

  const isOneOf = (value, types) => value && types.includes(typeof value);
  const isType = (value, type) => isOneOf(value, [type]);

  const asOneOf = (value, types, defaultValue = null) => isOneOf(value, types) ? value : defaultValue;
  const asType = (value, type, defaultValue = null) => isType(value, type) ? value : defaultValue;

  const asArray = (value) => Array.isArray(value) ? value : [];
  const asArrayOfType = (value, type) => asArray(value).filter((item) => isType(item, type));

  const makeRecipe = (input) => {
    const recipe = {}
    recipe.recipeName = asType(input?.recipeName, 'string', 'Untitled Recipe');

    recipe.id = asType(input?.id, 'string', uuidv4());
    recipe.makes = asOneOf(input.makes, ['string', 'number']);
    recipe.tags = asArrayOfType(input?.tags, 'string');
    recipe.steps = asArrayOfType(input?.steps, 'string');
    recipe.ingredients = asArray(input?.ingredients).map((i) => ({
      amount: asType(i?.amount, 'string'),
      name: asType(i?.name, 'string'),
    })).filter((i) => i.name || i.amount);    

    return recipe;
  }

  const recipeArrayToObj = (recipes) => {
    return recipes.reduce((prev, cur) => {
      if (cur && cur.recipeName && typeof cur.recipeName === 'string') {
        const recipe = makeRecipe(cur);
        
        prev[recipe.id] = recipe;
      }

      return prev;
    }, {})
  }

  const saveRecipe = async (values) => {
    const loadedRecipes = await readJsonFile(values.file);
    const parsedRecipes = recipeArrayToObj(loadedRecipes);
    
    const mergedRecipes = {...currentRecipes, ...parsedRecipes};
    setRecipes(mergedRecipes);
  };

  const validate = async (values) => {
    const errors = {};

    if (!values.file) {
      errors.file = "You need to choose a JSON file."
    } else {
      try {
        const recipes = await readJsonFile(values.file);
        let noValid = true;

        if (recipes && Array.isArray(recipes)) {
          recipes.forEach(recipe => {
            if (recipe && recipe.recipeName && typeof recipe.recipeName === 'string') {
              noValid = false;
            }
          });
        }

        if (noValid) {
          errors.file = "No valid recipes found in file."
        }
      } catch {
        errors.file = "Invalid JSON - please choose a different file.";
      }
    }
    
    return errors;
  };

  return { validate, saveRecipe }
};

export default useImportPage;