import { Formik, Field, Form, ErrorMessage } from 'formik';
import store from 'store2';
import googleService from '../services/googleService';
import html2pdf from 'html-to-pdf-js';
import { useNavigate, useParams } from 'react-router-dom';
import './ExportPage.scss';
import React, { useRef } from 'react';
import saveAs from 'file-saver';

const ExportPage = () => {
  const selectAll = useRef();
  const navigate = useNavigate();
  const params = useParams();
  const initialRecipes = params.id ? [params.id] : [];
  const initialValues = {type: 'googleDoc', newPage: true, recipes: initialRecipes, name: 'Recipes - Coook'};
  const recipes = Object.values(store.get('recipes') || {})
    .filter(r => r !== 'deleted')
    .sort((a, b) => {
      if (a.recipeName === b.recipeName) {
        return 0;
      } else if (a.recipeName < b.recipeName) {
        return -1;
      } else {
        return 1;
      }
    });

  const updateSelectAllAndName = (value, touched, values, setFieldValue) => {
    if (value === values.recipes) {
      // no change no need to check
      return;
    }

    if (value.length === recipes.length) {
      selectAll.current.checked = true;
      selectAll.current.indeterminate = false;
    } else if (value.length === 0) {
      selectAll.current.checked = false;
      selectAll.current.indeterminate = false;
    } else {
      selectAll.current.indeterminate = true;
    }

    if (!touched.name) {
      let newName = initialValues.name;

      if(value.length === recipes.length) {
        newName = 'All Recipes - Coook'
      } else if (value.length === 1) {
        newName = recipes.filter(recipe => recipe.id === value[0])[0].recipeName + ' - Coook';
      }
      
      if (values.name !== newName) {
        setFieldValue('name', newName)
      }
    }
  };

  const save = async (values, {setSubmitting}) => {
    setSubmitting(true);
    
    const name = values.name;
    const chosenRecipes = recipes.filter(recipe => values.recipes.includes(recipe.id));
    const htmlArray = chosenRecipes.map(recipe => {
      const ingredientsString = recipe.ingredients.map(ingredient => {
        return `<div>${ingredient.amount ?? ''} ${ingredient.name ?? ''}</div>`
      }).join('');

      const stepsString = recipe.steps.map(step => {
        return `<li>${step}</li>`
      }).join('');

      return `
        <h1>${recipe.recipeName}</h1>
        ${recipe.makes ? `<em>Makes: ${recipe.makes}</em>` : ''}
        <h2>Ingredients</h2>
        ${ingredientsString}
        <h2>Method</h2>
        <ol>${stepsString}</ol>
      `
    });

    if (values.type === 'googleDoc') {
      const html = htmlArray.join(values.newPage ? '<hr class="pb">' : '<hr>');

      await googleService.createFile(html, name);
    } else if (values.type === 'pdf') {
      const options = {
        margin: 25, 
        pagebreak: { after: '.afterClass', avoid: ['div', 'h1', 'h2', 'em', 'li']}, 
        filename: name
      };

      await html2pdf().set(options).from(htmlArray.join(values.newPage ? '<hr style="visibility: hidden" class="afterClass">' : '<hr>')).save();
    } else if (values.type === 'json') {
      const content = JSON.stringify(chosenRecipes);
      const filename = `${name}.json`;

      const blob = new Blob([content], {
        type: "text/plain;charset=utf-8"
      });

      saveAs(blob, filename);
    }

    navigate('/home');
  };

  const changeSelectAll = (e, setFieldValue) => {
    let newRecipes = [];

    if (e.target.checked) {
      newRecipes = recipes.map(recipe => recipe.id);
    }

    setFieldValue('recipes', newRecipes);
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
              <div className="form-check mx-1">
                <input ref={selectAll} className="form-check-input" onChange={(e) =>changeSelectAll(e, setFieldValue)} type="checkbox" name="recipes" id="selectAll"/>
                <label className="form-check-label" htmlFor="selectAll">
                  Select All
                </label>
              </div>
              <div className="recipeCheckList">
                {recipes.map((recipe, index) => (
                  <div className="form-check mx-1" key={`recipe-check-${index}`}>
                    <Field className="form-check-input" validate={(value) => updateSelectAllAndName(value, touched, values, setFieldValue)} type="checkbox" name="recipes" value={recipe.id} id={`recipeCheck${index}`} />
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