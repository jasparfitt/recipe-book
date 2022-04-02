import Storage from 'store2';
import { v4 as uuidv4 } from 'uuid';
import googleService from './googleService';

const loadRecipes = async () => {
    const googleEnabled = Storage.get('googleEnabled');

    if (googleEnabled) {
        await googleService.init(Storage.get('googleToken'));
        const fileId = await googleService.recipesExists();

        if (fileId) {
            const recipes = await googleService.getFile(fileId);
            Storage.add('recipes', recipes);
        }
    }
}

const addNewRecipe = async (recipe) => {
    const recipes = Storage.get('recipes') || {};
    const uuid = uuidv4();
    recipes[uuid] = recipe;
    Storage.set('recipes', recipes);

    if (Storage.get('googleEnabled')) {
        const fileId = await googleService.recipesExists();

        if (fileId) {
            googleService.updateFile(recipes, fileId);
        } else {
            googleService.createRecipes(recipes);
        }
    }
}

const recipeService = {
    addNewRecipe,
    loadRecipes
};

export default recipeService;