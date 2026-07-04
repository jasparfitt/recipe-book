import { useCallback, useContext, useMemo, useState } from "react";
import unit from 'parse-unit';
import RecipeContext from "../context/RecipeContext";

const useRecipePage = ({ params }) => {
  const [recipes, setRecipes] = useContext(RecipeContext);
  const id = params.id;
  const originalRecipe = recipes?.[id];
  const [multiplier, setMultiplier] = useState(1);
  const amount = parseInt(originalRecipe?.makes);
  const isMultiplier = isNaN(amount) || amount.toString() !== originalRecipe?.makes.trim();

  const recipe = useMemo(() => {
    let newRecipe;

    if (originalRecipe && originalRecipe !== 'deleted') {
      newRecipe = {...originalRecipe};

      newRecipe.ingredients = originalRecipe.ingredients.map((ingredient) => {
        const newIngredient = {...ingredient};
        const [number, unitString] = unit(ingredient.amount);

        if (!isNaN(number)) {
          newIngredient.amount = `${parseFloat((number * multiplier).toPrecision(4))}${unitString}`;
        }

        return newIngredient;
      });

      if (!isMultiplier) {
        newRecipe.makes = newRecipe.makes * multiplier;
      }    
    }

    return newRecipe;
  }, [multiplier, originalRecipe])

  const validateForm = useCallback((values) => {
    const adjust = parseFloat(values.adjust);
    let multiplier = 1;

    if (!isNaN(adjust)) {
      if (isMultiplier) {
        multiplier = adjust;
      } else {
        const originalAmount = parseInt(originalRecipe.makes);
        multiplier = adjust / originalAmount;
      }

      setMultiplier(multiplier);
    }
  }, [isMultiplier, originalRecipe]);

  const resetAdjuster = useCallback((resetForm) => {
    resetForm();
    setMultiplier(1);
  }, []);

  const removeRecipe = useCallback(() => {
    setRecipes({...recipes, [id]: 'deleted'});
  }, [id, recipes, setRecipes]);

  return { recipe, validateForm, resetAdjuster, removeRecipe, isMultiplier };
}

export default useRecipePage;