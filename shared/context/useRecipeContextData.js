import useSaveRecipes from '../../shared/hooks/useSaveRecipes';
import useRecipes from '../../shared/hooks/useRecipes';
import { useState, useCallback, useEffect, useMemo } from 'react';

const useRecipeContextData = (googleEnabled, googleLoading) => {
  const { data, loading, error } = useRecipes(googleEnabled, googleLoading);
  const [saveRecipes] = useSaveRecipes(googleEnabled);
  const [recipes, setRecipes] = useState(null);
  const [recipesLoading, setRecipesLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    if (!loading) {
      setRecipes(data);
      setRecipesLoading(false);
    }
  }, [data, loading]);

  useEffect(() => {
    setErrorMessage(error)
  }, [error])

  const setCurrentRecipes = useCallback(async (newRecipes) => {
    try {
      await saveRecipes(newRecipes);
      setRecipes(newRecipes);
    } catch (e) {
      setErrorMessage(e)
    }
  }, [saveRecipes]);

  const contextValue = useMemo(
    () => [recipes, setCurrentRecipes, errorMessage, setErrorMessage], 
    [recipes, setCurrentRecipes, errorMessage, setErrorMessage]
);
  
  return { loading: recipesLoading, contextValue }
};

export default useRecipeContextData;