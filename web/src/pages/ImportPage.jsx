import { Formik, Field, Form, ErrorMessage } from 'formik';
import './ExportPage.scss';
import React from 'react';
import FileUpload from '../components/FileUpload';
import { v4 as uuidv4 } from 'uuid';
import { useNavigate } from "react-router-dom";
import store from 'store2';
import recipeService from '../services/recipeService';

const ImportPage = () => {
  const initialValues = { type: 'json', file: ''};
  const navigate = useNavigate();

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

  const makeRecipe = (input) => {
    const recipe = {}
    recipe.recipeName = input.recipeName;

    if (input.id && typeof input.id === 'string') {
      recipe.id = input.id
    } else {
      recipe.id = uuidv4();
    }

    if (input.makes && (typeof input.makes === 'string' || typeof input.makes === 'number')) {
      recipe.makes = input.makes;
    }

    if (input.steps && Array.isArray(input.steps)) {
      recipe.steps = input.steps.reduce((prev, cur) => {
        if (cur && typeof cur === 'string') {
          prev.push(cur);
        }

        return prev;
      }, []);
    }

    if (input.ingredients && Array.isArray(input.ingredients)) {
      recipe.ingredients = input.ingredients.reduce((prev, cur) => {
        if (cur) {
          const ingredient = {};

          if (cur.amount && typeof cur.amount === 'string') {
            ingredient.amount = cur.amount;
          }

          if (cur.name && typeof cur.name === 'string') {
            ingredient.name = cur.name;
          }

          if (ingredient.name || ingredient.amount) {
            prev.push(ingredient);
          }
        }

        return prev;
      }, []);
    }

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
    const currentRecipes = store.get('recipes');
    
    const mergedRecipes = {...currentRecipes, ...parsedRecipes};
    await recipeService.saveRecipes(mergedRecipes);

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
          {({ isSubmitting, values, setFieldValue, touched }) => (
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