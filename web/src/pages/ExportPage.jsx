import { Formik, Field, Form, ErrorMessage } from 'formik';
import { useParams } from 'react-router-dom';
import './ExportPage.scss';
import saveAs from 'file-saver';
import SelectAllCheckbox from '../components/SelectAllCheckbox';
import useExportPage from 'coook.shared/pages/useExportPage';

const ExportPage = () => {
  const params = useParams();

  const saveJson = (content, name) => {
    const blob = new Blob([content], {
      type: "text/plain;charset=utf-8"
    }); 

    saveAs(blob, filename);
  };

  const savePdf = (doc, name) => {
    doc.save(name);
  };

  const saveDoc = (data) => {
    window.open(`https://docs.google.com/document/d/${data.id}`, '_blank', 'noopener,noreferrer');
  }

  const {
    validate, initialValues, allRecipesSelectedValue, save, recipeList
  } = useExportPage({ saveJson, savePdf, saveDoc, params })

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
          {({ isSubmitting, values, errors }) => (
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
              <input type="checkbox" value="foo" onChange={(e) => console.log(JSON.stringify(e))}/>
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