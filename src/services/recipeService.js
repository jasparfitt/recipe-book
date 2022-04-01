import Storage from 'store2';
import { v4 as uuidv4 } from 'uuid';
import googleService from './googleService';

const addNewRecipe = async (recipe) => {
    const recipes = Storage.get('recipes') || {};
    const uuid = uuidv4();
    recipes[uuid] = recipe;
    Storage.set('recipes', recipes);

    if (Storage.get('googleEnabled')) {
        const fileId = await googleService.configExists();

        if (fileId) {
            googleService.updateRecipes(recipes, fileId);
        } else {
            googleService.createRecipes(recipes);
        }
    }
}

const recipeService = {
    addNewRecipe
};

export default recipeService;