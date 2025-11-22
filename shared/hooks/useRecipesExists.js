import { useCallback, useContext } from "react";
import GDriveContext from "../context/GDriveContext";

const useRecipesExists = () => {
  const getGDrive = useContext(GDriveContext);

  const recipesExists = useCallback(async () => {
    const gDrive = await getGDrive();

    const response = await gDrive.files.list({
      spaces: 'appDataFolder',
      fields: 'nextPageToken, files(id, name)',
      pageSize: 100
    });

    const files = response.files;
    let file = null;

    if (files && files.length > 0) {
      file = files.find(file => file.name === 'recipes.json');
    }

    return file;
  }, []);

  return [recipesExists];
}

export default useRecipesExists;