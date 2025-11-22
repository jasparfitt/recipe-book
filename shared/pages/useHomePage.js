import { useContext, useMemo, useState } from "react";
import RecipeContext from "../context/RecipeContext";
import useOrderByKey from "../hooks/useOrderByKey";

const useHomePage = (extraFilter = null) => {
  const [recipesObject] = useContext(RecipeContext);
  const [searchTerm, setSearchTerm] = useState('');
  const orderByRecipeName = useOrderByKey('recipeName');
  const allRecipes = useMemo(() => (
    Object.values(recipesObject || {})
      .filter((r) => r !== 'deleted')
      .filter((r) => extraFilter ? extraFilter(r) : true)
      .sort(orderByRecipeName)
  ), [recipesObject, orderByRecipeName]);

  const recipeList = useMemo(() => {
    return allRecipes.filter(item => {
      return item.recipeName.toLowerCase().search(searchTerm.toLowerCase()) !== -1
    });
  }, [allRecipes, searchTerm]);

  return { recipeList, setSearchTerm };
};

export default useHomePage;