import { FlatList, View, Linking, ActivityIndicator } from "react-native";
import HeadingText from "../components/HeadingText";
import useStyles from "../hooks/useStyles";
import { Formik } from 'formik';
import RadioButtonGroup from "../components/RadioButtonGroup";
import SwitchField from "../components/SwitchField";
import SelectAllCheckbox from "../components/SelectAllCheckbox";
import CheckboxField from "../components/CheckboxField";
import TextField from "../components/TextField";
import ThemeText from "../components/ThemeText";
import Button from "../components/Button";
import ErrorMessage from "../components/ErrorMessage";
import useExportPage from "coook.shared/pages/useExportPage";
import { Directory, File, Paths } from 'expo-file-system';

const ExportPage = ({ route }) => {
  const { screenContainer, mt2, mb2, mb3 } = useStyles();
  const params = route?.params;

  const saveFile = async (content, name) => {
    try {
    console.log(Paths.document);
    const path = await Directory.pickDirectoryAsync()
    console.log(path);
    const file = new File(path.uri, name);
    file.create();
    file.write(content);
    console.log('foo')
    } catch (e) {
      console.log(e);
    }
  };

  const savePdf = (doc, name) => {
    // no option to save pdf in app currently
  };

  const saveDoc = (data) => {
    Linking.openURL(`https://docs.google.com/document/d/${data.id}`);
  }

  const {
    validate, initialValues, allRecipesSelectedValue, save, recipeList
  } = useExportPage({ saveJson: saveFile, savePdf, saveDoc, params })

  return (
    <View style={screenContainer}>
      <HeadingText level="h1">Export Page</HeadingText>
      <Formik
        initialValues={initialValues}
        validateOnBlur={false}
        validateOnChange={false}
        onSubmit={save}
        validate={validate}>
        {({ isSubmitting, values, handleSubmit }) => (
          <>
            <RadioButtonGroup
              name="type"
              items={[{
                label: 'Google doc',
                value: 'googleDoc',
              }, {
                label: 'JSON',
                value: 'json',
              }]}/>
            <SwitchField name="newPage" label="Put each recipe on a new page" disabled={values.type === 'json'} />
            <HeadingText level="h2">Choose Recipes</HeadingText>
            <ErrorMessage name="recipes" />
            <SelectAllCheckbox keyName="recipes" allCount={allRecipesSelectedValue.length} allSelectedValue={allRecipesSelectedValue} />
            <FlatList
              data={recipeList}
              renderItem={({item: recipe}) => <CheckboxField name="recipes" label={recipe.recipeName} value={recipe.id} />}
              keyExtractor={item => item.id} 
            />
            <View style={{...mt2,...mb2}}>
              <ThemeText>Name</ThemeText>
              <TextField name="name" />
              <ErrorMessage name="name" />
            </View>
            <Button variant="Primary" style={mb3} disabled={isSubmitting} onPress={handleSubmit}>
              {isSubmitting ? <ActivityIndicator style={{margin: 'auto'}} /> : 'Export'}
            </Button>
          </>
        )}
      </Formik>
    </View>
  );
}

export default ExportPage;