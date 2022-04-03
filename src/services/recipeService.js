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
            console.log(recipes);
            Storage.set('recipes', recipes);
        }
    }
}

const saveRecipes = async (recipes) => {
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

const removeEmptyVals = (previous, current) => {
    if (Object.values(current).join('').trim()) {
        previous.push(current);
    }

    return previous;
}

const addNewRecipe = async (recipe) => {
    const recipes = Storage.get('recipes') || {};
    const uuid = uuidv4();
    recipe.ingredients = recipe.ingredients.reduce(removeEmptyVals, []);
    recipe.steps = recipe.steps.reduce(removeEmptyVals, []);
    recipe.id = uuid;
    console.log(recipe);
    recipes[uuid] = recipe;

    await saveRecipes(recipes);
}

const updateRecipe = async (recipe, id) => {
    const recipes = Storage.get('recipes') || {};
    recipe.ingredients = recipe.ingredients.reduce(removeEmptyVals, []);
    recipe.steps = recipe.steps.reduce(removeEmptyVals, []);
    recipe.id = id;
    console.log(recipe);
    recipes[id] = recipe;
    
    await saveRecipes(recipes);
}

const deleteRecipe = async (id) => {
    const recipes = Storage.get('recipes') || {};
    delete recipes[id];

    await saveRecipes(recipes);
}

const recipeService = {
    addNewRecipe,
    updateRecipe,
    deleteRecipe,
    loadRecipes
};

export default recipeService;