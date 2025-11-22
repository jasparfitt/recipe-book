import { useCallback, useContext } from "react";
import useRecipesExists from "./useRecipesExists";
import GDriveContext from "../context/GDriveContext";

const useGetRecipesFile = () => {
  const getGDrive = useContext(GDriveContext);
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