import { Formik, Field, Form, ErrorMessage } from 'formik';
import './ExportPage.scss';
import FileUpload from '../components/FileUpload';
import { v4 as uuidv4 } from 'uuid';
import { useNavigate } from "react-router-dom";
import { useContext } from 'react';
import RecipeContext from 'coook.shared/context/RecipeContext';

const ImportPage = () => {
  const initialValues = { type: 'json', file: ''};
  const navigate = useNavigate();
  const [currentRecipes, setRecipes] = useContext(RecipeContext);

  const readJsonFile = async (file) => {
    const reader = new FileReader();
    const fileReadPromise = new Promise((resolve, reject) => {
      reader.addEventListener('load', (event) => {
        try {
          const res = JSON.parse(event.target.result);
          
          if (!res) {
            throw "error";
          }

          resolve(res);
        } catch {  
          reject();
        }
      });
    });

    reader.readAsText(file);

    return await fileReadPromise;
  }

  const isOneOf = (value, types) => value && types.includes(typeof value);
  const isType = (value, type) => isOneOf(value, [type]);

  const asOneOf = (value, types, defaultValue = null) => isOneOf(value, types) ? value : defaultValue;
  const asType = (value, type, defaultValue = null) => isType(value, type) ? value : defaultValue;

  const asArray = (value) => Array.isArray(value) ? value : [];
  const asArrayOfType = (value, type) => asArray(value).filter((item) => isType(item, type));

  const makeRecipe = (input) => {
    const recipe = {}
    recipe.recipeName = asType(input?.recipeName, 'string', 'Untitled Recipe');

    recipe.id = asType(input?.id, 'string', uuidv4());
    recipe.makes = asOneOf(input.makes, ['string', 'number']);
    recipe.tags = asArrayOfType(input?.tags, 'string');
    recipe.steps = asArrayOfType(input?.steps, 'string');
    recipe.ingredients = asArray(input?.ingredients).map((i) => ({
      amount: asType(i?.amount, 'string'),
      name: asType(i?.name, 'string'),
    })).filter((i) => i.name || i.amount);    

    return recipe;
  }

  const recipeArrayToObj = (recipes) => {
    return recipes.reduce((prev, cur) => {
      if (cur && cur.recipeName && typeof cur.recipeName === 'string') {
        const recipe = makeRecipe(cur);
        
        prev[recipe.id] = recipe;
      }

      return prev;
    }, {})
  }

  const save = async (values) => {
    const loadedRecipes = await readJsonFile(values.file);
    const parsedRecipes = recipeArrayToObj(loadedRecipes);
    
    const mergedRecipes = {...currentRecipes, ...parsedRecipes};
    setRecipes(mergedRecipes);

    navigate('/home');
  };

  const validate = async (values) => {
    const errors = {};

    if (!values.file) {
      errors.file = "You need to choose a JSON file."
    } else {
      try {
        const recipes = await readJsonFile(values.file);
        let noValid = true;

        if (recipes && Array.isArray(recipes)) {
          recipes.forEach(recipe => {
            if (recipe && recipe.recipeName && typeof recipe.recipeName === 'string') {
              noValid = false;
            }
          });
        }

        if (noValid) {
          errors.file = "No valid recipes found in file."
        }
      } catch {
        errors.file = "Invalid JSON - please choose a different file.";
      }
    }
    
    return errors;
  };

  return (
    <div className="row">
      <div className="col-lg-8">
        <h1>Import Recipes</h1>
        <Formik
          initialValues={initialValues}
          validate={validate}
          onSubmit={save}>
          {({ isSubmitting }) => (
            <Form>
              <div className="btn-group mb-2" role="group" aria-label="choose export type">
                <Field type="radio" className="btn-check" name="type" id="jsonType" value="json"
                  autoComplete="off"/>
                <label className="btn btn-outline-primary" htmlFor="jsonType">JSON</label>
              </div>
              <div className="mb-2">
                <label htmlFor="formFile" className="form-label">Choose a JSON file</label>
                <FileUpload name="file" id="formFile" />
                <div className="text-danger">
                  <ErrorMessage name="file" />
                </div>
              </div>
              <button type="submit" disabled={isSubmitting} className="btn btn-primary mt-2">Import</button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  )
};

export default ImportPage;