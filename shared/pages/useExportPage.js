import { useContext } from 'react';
import RecipeContext from "../context/RecipeContext";
import GDriveContext from "../context/GDriveContext";
import useOrderByKey from '../hooks/useOrderByKey';
import { jsPDF } from "jspdf";

const useExportPage = ({ saveJson, savePdf, saveDoc, params }) => {
  const [recipes] = useContext(RecipeContext);
  const getGDrive = useContext(GDriveContext);
  const orderByRecipeName = useOrderByKey('recipeName');
  const initialRecipes = params?.id ? [params.id] : [];
  const initialValues = { type: 'googleDoc', newPage: true, recipes: initialRecipes, name: 'Recipes - Coook' };
  
  const recipeList = Object.values(recipes || {})
    .filter((r) => r !== 'deleted')
    .sort(orderByRecipeName);
  const allRecipesSelectedValue = recipeList.map(recipe => recipe.id);

  const save = async (values, {setSubmitting}) => {
    setSubmitting(true);
    
    const name = values.name;
    const chosenRecipes = recipeList.filter(recipe => values.recipes.includes(recipe.id));
    const htmlArray = chosenRecipes.map(recipe => {
      const ingredientsString = recipe.ingredients.map(ingredient => {
        return `<div>${ingredient.amount ?? ''} ${ingredient.name ?? ''}</div>`
      }).join('');

      const stepsString = recipe.steps.map(step => {
        return `<li>${step}</li>`
      }).join('');

      return `
        <h1 style="break-before: page;">${recipe.recipeName}</h1>
        ${recipe.makes ? `<div><em>Makes : ${recipe.makes}</em></div>` : ''}
        <h2>Ingredients</h2>
        ${ingredientsString}
        <h2>Method</h2>
        <ol>${stepsString}</ol>
      `
    });

    if (values.type === 'googleDoc') {
      const html = htmlArray.join(values.newPage ? '<hr class="pb">' : '<hr>');

      const gDrive = await getGDrive();
      const uploader = gDrive.files.newMultipartUploader()
        .setData(html, 'text/html')
        .setRequestBody({ name, mimeType: 'application/vnd.google-apps.document' });
      
      const data = await uploader.execute();
      saveDoc(data);
    } else if (values.type === 'pdf') {
      var doc = new jsPDF({
        unit: 'mm',
        format: 'a4'
      });

      let htmlForloop = htmlArray;

      if (!values.newPage) {
        let allHtml = htmlArray.join('<hr>');
        allHtml = `<div style="color: black;">${allHtml}</div>`;
        htmlForloop = [allHtml];
      }

      for (let i = 0; i < htmlForloop.length; i++) {
        const html = htmlForloop[i];
        const margin = 25.4;
        const height = doc.internal.pageSize.getHeight() - (margin * 2);
        const width = doc.internal.pageSize.getWidth() - (margin * 2);
        const scaledWidth = width * 4;
        const startPage = i > 0 ? doc.internal.getNumberOfPages() : 0;

        await doc.html(`<div style="color: black;">${html}</div>`, {
          callback: (pdf) => pdf,
          y: height * startPage,
          margin: margin,
          width,
          windowWidth: scaledWidth
        });        
      }

      savePdf(doc, `${name}.pdf`);
    } else if (values.type === 'json') {
      const content = JSON.stringify(chosenRecipes);
      const filename = `${name}.json`;

      saveJson(content, filename);
    }
  };

  const validate = (values) => {
    const errors = {};

    if (values.recipes.length < 1) {
      errors.recipes = "You must choose at least one recipe.";
    }

    if (!values.name) {
      errors.name = "You need to set a name.";
    }

    return errors;
  };

  return {
    validate,
    initialValues,
    allRecipesSelectedValue,
    recipeList,
    save
  }
};

export default useExportPage;