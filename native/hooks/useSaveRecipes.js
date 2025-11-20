import { useCallback } from "react";
import useRecipesExists from "./useRecipesExists";
import useSaveStorageValue from "./useSaveStorageValue";
import { MimeTypes } from "@robinbobin/react-native-google-drive-api-wrapper";
import useGDrive from "./useGDrive";

const useSaveRecipes = (googleEnabled, promise) => {
  const [saveStorageValue] = useSaveStorageValue('@recipes');
  const [recipesExists] = useRecipesExists();
  const [getGDrive] = useGDrive();

  const saveRecipes = useCallback(async (recipes) => {
    await saveStorageValue(recipes);
    await promise;

    if (googleEnabled) {
      const file = await recipesExists();
      const fileContent = JSON.stringify(recipes);
      const gDrive = await getGDrive();

      let uploader = gDrive.files.newMultipartUploader()
        .setData(fileContent, MimeTypes.JSON);

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