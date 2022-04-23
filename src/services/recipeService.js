import Storage from 'store2';
import { v4 as uuidv4 } from 'uuid';
import googleService from './googleService';

const loadRecipes = async () => {
    const googleEnabled = Storage.get('googleEnabled');

    if (googleEnabled) {
        await googleService.init(Storage.get('googleToken'));
        const fileId = await googleService.recipesExists();

        if (fileId) {
            const googleRecipes = await googleService.getFile(fileId);
            const localRecipes = Storage.get('recipes');
            const localDeleted = getDeleted(localRecipes);

            const newRecipes = {...localRecipes, ...googleRecipes, ...localDeleted}
            Storage.set('recipes', newRecipes);
            saveRecipes(newRecipes);
        }
    }
}

const getDeleted = (recipes) => {
    return Object.keys(recipes)
        .filter( key => recipes[key] === 'deleted') 
        .reduce( (res, key) => (res[key] = recipes[key], res), {} );
}

const getRecipes = async () => {
    await googleService.init(Storage.get('googleToken'));
    const fileId = await googleService.recipesExists();
    let recipes = {};

    if (fileId) {
        recipes = await googleService.getFile(fileId);
        console.log(recipes);
    }

    return recipes;
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
    recipes[id] = 'deleted';

    await saveRecipes(recipes);
}

const recipeService = {
    addNewRecipe,
    updateRecipe,
    deleteRecipe,
    loadRecipes,
    saveRecipes,
    getRecipes,
};

export default recipeService;