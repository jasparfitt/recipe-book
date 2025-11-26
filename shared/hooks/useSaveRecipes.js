import { useCallback, useContext } from "react";
import useRecipesExists from "./useRecipesExists";
import useSaveStorageValue from "./useSaveStorageValue";
import GDriveContext from "../context/GDriveContext";

const useSaveRecipes = (googleEnabled) => {
  const [saveStorageValue] = useSaveStorageValue('@recipes');
  const [recipesExists] = useRecipesExists();
  const getGDrive = useContext(GDriveContext);

  const saveRecipes = useCallback(async (recipes) => {
    await saveStorageValue(recipes);

    if (googleEnabled) {
      const file = await recipesExists();
      const fileContent = JSON.stringify(recipes);
      const gDrive = await getGDrive();

      let uploader = gDrive.files.newMultipartUploader()
        .setData(fileContent, 'application/json');

      if (file) {
        uploader = uploader.setIdOfFileToUpdate(file.id);
      } else {
        uploader = uploader.setRequestBody({ name: 'recipes.json', parents: ['appDataFolder'] });
      }

      uploader.execute();
    }
  }, [googleEnabled]);

  return [saveRecipes];
}

export default useSaveRecipes;