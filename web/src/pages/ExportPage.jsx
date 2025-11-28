import { Formik, Field, Form, ErrorMessage } from 'formik';
import { useParams } from 'react-router-dom';
import './ExportPage.scss';
import { useContext } from 'react';
import saveAs from 'file-saver';
import RecipeContext from "coook.shared/context/RecipeContext";
import GDriveContext from "coook.shared/context/GDriveContext";
import useOrderByKey from 'coook.shared/hooks/useOrderByKey';
import SelectAllCheckbox from '../components/SelectAllCheckbox';
import { jsPDF } from "jspdf";

const ExportPage = () => {
  const [recipes] = useContext(RecipeContext);
  const getGDrive = useContext(GDriveContext);
  const orderByRecipeName = useOrderByKey('recipeName');
  const params = useParams();
  const initialRecipes = params.id ? [params.id] : [];
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
      window.open(`https://docs.google.com/document/d/${data.id}`, '_blank', 'noopener,noreferrer');
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

      doc.save(`${name}.pdf`);
    } else if (values.type === 'json') {
      const content = JSON.stringify(chosenRecipes);
      const filename = `${name}.json`;

      const blob = new Blob([content], {
        type: "text/plain;charset=utf-8"
      }); 

      saveAs(blob, filename);
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

  return (
    <div className="row">
      <div className="col-lg-8">
        <h1>Export Recipes</h1>
        <Formik
          initialValues={initialValues}
          validateOnBlur={false}
          validateOnChange={false}
          onSubmit={save}
          validate={validate}>
          {({ isSubmitting, values, setFieldValue, touched, errors }) => (
            <Form>
              <div className="btn-group" role="group" aria-label="choose export type">
                <Field type="radio" className="btn-check" name="type" id="googleDocType" value="googleDoc"
                  autoComplete="off"/>
                <label className="btn btn-outline-primary" htmlFor="googleDocType">Google doc</label>
                <Field type="radio" className="btn-check" name="type" id="pdfType" value="pdf"
                  autoComplete="off"/>
                <label className="btn btn-outline-primary" htmlFor="pdfType">PDF</label>
                <Field type="radio" className="btn-check" name="type" id="jsonType" value="json"
                  autoComplete="off"/>
                <label className="btn btn-outline-primary" htmlFor="jsonType">JSON</label>
              </div>
              <div className="form-check mt-2">
                <Field className="form-check-input" type="checkbox" id="newPage" name="newPage" disabled={values.type === 'json'}/>
                <label className="form-check-label" htmlFor="newPage">
                  Put each recipe on a new page
                </label>
              </div>
              <h2 className='mt-2'>Choose Recipes</h2>
              <div className="text-danger">
                <ErrorMessage name="recipes" />
              </div>
              <SelectAllCheckbox keyName="recipes" allCount={allRecipesSelectedValue.length} allSelectedValue={allRecipesSelectedValue} />
              <div className="recipeCheckList">
                {recipeList.map((recipe, index) => ( 
                  <div className="form-check mx-1" key={`recipe-check-${index}`}>
                    <Field className="form-check-input" type="checkbox" name="recipes" value={recipe.id} id={`recipeCheck${index}`} />
                    <label className="form-check-label" htmlFor={`recipeCheck${index}`}>
                      {recipe.recipeName}
                    </label>
                  </div>
                ))}
              </div>
              <div className="mt-2">
                <label htmlFor="name" className="form-label">Name</label>
                <Field className={`form-control ${errors.name ? 'is-invalid' : ''}`} name="name" id="name" autoComplete="off"/>
                <div className="text-danger">
                  <ErrorMessage name="name" />
                </div>
              </div>
              <button type="submit" disabled={isSubmitting} className="btn btn-primary mt-2">Export</button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  )
};

export default ExportPage;