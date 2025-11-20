import Storage from 'store2';
import { v4 as uuidv4 } from 'uuid';
import googleService from './googleService';

const getDeleted = (recipes) => {
    return Object.keys(recipes)
        .filter( key => recipes[key] === 'deleted') 
        .reduce( (res, key) => (res[key] = recipes[key], res), {} );
}

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

const getLocalRecipes = () => Object.values(Storage.get('recipes') || {})
    .filter(r => r !== 'deleted');

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

const removeEmptyVals = (value) => Object.values(value).join('').trim();
const formatTags = (tags) => tags.split(',').map(t => t.trim().toLowerCase()).filter(removeEmptyVals)

const addNewRecipe = async (recipe) => {
    const recipes = Storage.get('recipes') || {};
    const uuid = uuidv4();
    recipe.ingredients = recipe.ingredients.filter(removeEmptyVals);
    recipe.steps = recipe.steps.filter(removeEmptyVals);
    recipe.tags = formatTags(recipe.tags);
    recipe.id = uuid;
    console.log(recipe);
    recipes[uuid] = recipe;

    await saveRecipes(recipes);
}

const updateRecipe = async (recipe, id) => {
    const recipes = Storage.get('recipes') || {};
    recipe.ingredients = recipe.ingredients.filter(removeEmptyVals);
    recipe.steps = recipe.steps.filter(removeEmptyVals);
    recipe.tags = formatTags(recipe.tags);
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
    getDeleted,
    loadRecipes,
    saveRecipes,
    getRecipes,
    getLocalRecipes,
};

export default recipeService;