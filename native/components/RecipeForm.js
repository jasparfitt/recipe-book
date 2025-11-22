import { SectionList, Text, View } from 'react-native';
import TextField from './TextField';
import HeadingText from './HeadingText';
import { FieldArray, Formik } from 'formik';
import Button from './Button';
import IngredientsField from './IngredientsField';
import MethodField from './MethodField';
import useStyles from '../hooks/useStyles';
import AutoChecker from '../../shared/components/AutoChecker';
import useRecipeForm from '../../shared/components/useRecipeForm';

const RecipeForm = ({ recipe, onSubmit }) => {
  const { mb3, mb2, mt2, errorMessage, errorInput } = useStyles();
  const {
    handleFormSubmit,
    validateForm,
    initialValues,
    defaultIngredient,
    defaultStep,
    isObjectEmpty,
    isStringEmpty,
  } = useRecipeForm(recipe, onSubmit);

  const data = (values) => [{
    header: 'Name',
    data: ['recipeName'],
  }, {
    header: 'Tags',
    data: ['tags'],
  }, {
    header: 'Makes',
    data: ['makes'],
  }, {
    header: 'Ingredients',
    type: 'ingredients',
    baseName: 'ingredients',
    data: values.ingredients.map(() => null),
  }, {
    header: 'Method',
    type: 'method',
    baseName: 'steps',
    multiline: true,
    data: values.steps.map(() => null),
  }, {
    header: '',
    isButton: true,
    data: [''],
  }];

  return (
    <Formik 
      validateOnBlur
      initialValues={initialValues}
      validate={validateForm}
      onSubmit={handleFormSubmit}>
      {({ isSubmitting, values, errors, touched, handleSubmit }) => (
        <>
          <FieldArray
            name="ingredients"
            render={(arrayHelpers) => (
              <AutoChecker helpers={arrayHelpers} name={'ingredients'} isEmpty={isObjectEmpty} defaultValue={defaultIngredient}/>
            )} />
          <FieldArray
            name="steps"
            render={(arrayHelpers) => (
              <AutoChecker helpers={arrayHelpers} name={'steps'} isEmpty={isStringEmpty} defaultValue={defaultStep}/>
            )} />
          <SectionList
            sections={data(values)}
            keyExtractor={(item, index) => item + index}
            renderItem={({item, section: { multiline, isButton, type, baseName }, index}) => {
              if (isButton) {
                return <View><Button variant="Primary" disabled={isSubmitting} style={{...mb3, ...mt2}} onPress={handleSubmit}>Save</Button></View>
              }
              
              if (type === 'ingredients') {
                return (<IngredientsField extraStyle={mb2} index={index} baseName={baseName} />);
              }
              
              if (type === 'method') {
                return (<MethodField extraStyle={mb2} index={index} baseName={baseName} />);
              }

              const name = baseName ? `${baseName}[${index}]` : item;

              return (
                <>
                  <TextField multiline={multiline} extraStyle={{ ...mb2, ...(errors[name] && touched[name] ? errorInput : {}) }} name={name}/>
                  {errors[name] && touched[name] ? <Text style={errorMessage} name={name}>required</Text> : null}
                </>
              );
            }}
            renderSectionHeader={({ section: { header } }) => header ? (<HeadingText level="h3">{header}</HeadingText>) : null}
          />
        </>
      )}
    </Formik>
  );
};

export default RecipeForm;