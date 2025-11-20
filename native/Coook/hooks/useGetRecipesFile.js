import { useCallback } from "react";
import useGDrive from "./useGDrive";
import useHook from "./useHook";
import useRecipesExists from "./useRecipesExists";

const useGetRecipesFile = () => {
  const [getGDrive] = useGDrive();
  const [recipesExists] = useRecipesExists();

  const getRecipesFile = useCallback(async () => {
    const gDrive = await getGDrive();
    const file = await recipesExists();
    
    if (file) {
      const response = await gDrive.files.getJson(file.id);

      return response;
    } else {
      return null;
    }
  }, []);

  return [getRecipesFile];
}

export default useGetRecipesFile;