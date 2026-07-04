import { View } from "react-native";
import HeadingText from "../components/HeadingText";
import useStyles from "../hooks/useStyles";
import Button from "../components/Button";
import FileInput from "../components/FileInput";
import { useIsFocused } from "@react-navigation/native";
import { Formik } from "formik";
import useImportPage from "coook.shared/pages/useImportPage";

const ImportPage = () => {
  const {screenContainer, mt3} = useStyles();
  const isFocused = useIsFocused();
  const initialValues = { type: 'json', file: '' };

  const readJsonFile = async (file) => {
    return await file.text();
  }

  const { saveRecipe, validate } = useImportPage(readJsonFile);

  const save = async () => {
    await saveRecipe();
    navigate('Home')
  }

  if (!isFocused) {
    return null;
  }

  return (
    <View style={screenContainer}>
      <HeadingText level="h1">Import Page</HeadingText>
      <Formik
        initialValues={initialValues}
        validate={validate}
        onSubmit={save}>
        {({ isSubmitting, handleSubmit }) => (
          <View>
            <FileInput name="file"/>
            <Button onPress={handleSubmit} disabled={isSubmitting} variant="Primary" style={mt3}>Import</Button>
          </View>
        )}
      </Formik>
    </View>
  );
}

export default ImportPage;