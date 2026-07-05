import { Formik, Field, Form, ErrorMessage } from 'formik';
import './ExportPage.scss';
import FileUpload from '../components/FileUpload';
import { useNavigate } from "react-router";
import useImportPage from 'coook.shared/pages/useImportPage';

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

  const { saveRecipe, validate } = useImportPage(readJsonFile);

  const save = async () => {
    await saveRecipe();
    navigate('/home')
  }

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