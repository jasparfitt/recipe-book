import { Formik, Field, Form } from 'formik';
import store from 'store2';
import googleService from '../services/googleService';

const ExportPage = () => {
  const recipes = Object.values(store.get('recipes') || {});
  const initialValues = {type: 'googleDoc', newPage: true};
  const validateForm = () => {};
  const save = async (values) => {
    console.log(values);
    if (values.type === 'googleDoc') {
      const html = recipes.map(recipe => {
        const ingredientsString = recipe.ingredients.map(ingredient => {
          return `<div>${ingredient.amount ?? ''} ${ingredient.name ?? ''}</div>`
        }).join('');

        const stepsString = recipe.steps.map(step => {
          return `<li>${step}</li>`
        }).join('');

        return `
          <h1>${recipe.recipeName}</h1>
          <em>Makes: ${recipe.makes}</em>
          <h2>Ingredients</h2>
          ${ingredientsString}
          <h2>Method</h2>
          <ol>${stepsString}</ol>
        `
      }).join(values.newPage ? '<hr class="pb">' : '<hr>');

      await googleService.createFile(html, 'All Recipes');
    }
  };
  return (
  <div className="row">
    <div className="col-lg-8">
      <h1>Export Recipes</h1>
      <Formik
        validateOnBlur
        initialValues={initialValues}
        onSubmit={save}>
        {({ isSubmitting, values }) => (<Form>
          <div className="btn-group" role="group" aria-label="choose export type">
            <Field type="radio" className="btn-check" name="type" id="googleDocType" value="googleDoc"
              autoComplete="off"/>
            <label className="btn btn-outline-primary" htmlFor="googleDocType">Google doc</label>

            <Field type="radio" className="btn-check" name="type" id="pdfType" value="pdf"
              autoComplete="off"/>
            <label className="btn btn-outline-primary" htmlFor="pdfType">PDF</label>
          </div>
          <div className="form-check mt-2">
            <Field className="form-check-input" type="checkbox" id="newPage" name="newPage"/>
            <label className="form-check-label" htmlFor="newPage">
              Put each recipe on a new page
            </label>
          </div>
          <button type="submit" className="btn btn-primary mt-2">Export</button>
        </Form>)}
      </Formik>
    </div>
  </div>
)};

export default ExportPage;