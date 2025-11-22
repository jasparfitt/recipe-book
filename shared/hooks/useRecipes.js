import { useEffect, useState } from 'react';
import useGetRecipesFile from './useGetRecipesFile';
import useSaveStorageValue from './useSaveStorageValue';
import useStorageValue from './useStorageValue';

const useRecipes = (googleEnabled, googleLoading) => {
  const { data: localRecipes, loading: recipesLoading } = useStorageValue('@recipes');
  const [saveRecipes] = useSaveStorageValue('@recipes');
  const [getRecipesFile] = useGetRecipesFile();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const getDeleted = (recipes) => {
      return Object.keys(recipes)
        .filter((key) => recipes[key] === 'deleted') 
        .reduce((res, key) => ({ ...res, [key]: 'deleted' }), {});
    }

    const getRecipes = async () => {
      try {
        let googleRecipes = {};
        
        if (googleEnabled) {
          googleRecipes = (await getRecipesFile()) || {};
        }

        const localDeleted = getDeleted(localRecipes || {});
        const newRecipes = {...localRecipes, ...googleRecipes, ...localDeleted}
        setData(newRecipes);
        await saveRecipes(newRecipes);
      } catch (e) {
        setError(e);
      } finally {
        setLoading(false);
      }
    };

    if (!googleLoading && !recipesLoading) {
      getRecipes();
    }
  }, [googleLoading, googleEnabled, recipesLoading, localRecipes])
  
  return {data, loading, error};
}

export default useRecipes;