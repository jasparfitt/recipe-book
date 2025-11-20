import { SectionList, Text, View } from 'react-native';
import React from 'react';
import TextField from './TextField';
import HeadingText from './HeadingText';
import { ErrorMessage, FieldArray, Formik } from 'formik';
import Button from './Button';
import AutoChecker from './AutoChecker';
import IngredientsField from './IngredientsField';
import MethodField from './MethodField';
import useStyles from '../hooks/useStyles';

const RecipeForm = ({ recipe, onSubmit }) => {
  const {mb3, mb2, mt2, errorMessage, errorInput} = useStyles();
  const defaultIngredient = { amount: '', name: '' };
  const defaultStep = '';
  const isObjectEmpty = (value) => !Object.values(value).join('').trim();
  const isStringEmpty = (value) => !value;
  const formatTags = (tags) => tags.split(',').map(t => t.trim().toLowerCase()).filter((i) => !isStringEmpty(i));

  const initialValues = {
    ...recipe,
    steps: (recipe.steps || []),
    ingredients: (recipe.ingredients || []),
    tags: (recipe.tags || []).join(', '),
    steps: [...(recipe.steps || []), defaultStep],
    ingredients: [...(recipe.ingredients || []), defaultIngredient],
  };

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

  const convertValues = (values) => ({
    ...values,
    ingredients: values.ingredients.filter((i) => !isObjectEmpty(i)),
    steps: values.steps.filter((i) => !isStringEmpty(i)),
    tags: formatTags(values.tags),
  })

  const validateForm = (values) => {
    const errors = {};

    if (!values.recipeName) {
      errors.recipeName = 'Required';
    }

    return errors;
  }

  return (
    <Formik 
      initialValues={initialValues} 
      onSubmit={(values) => onSubmit(convertValues(values))}
      validate={validateForm}>
      {({isSubmitting, values, errors, touched, handleSubmit}) => (
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
            renderItem={({item, section: {multiline, isButton, type, baseName}, index}) => {
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
                  <TextField multiline={multiline} extraStyle={{...mb2, ...(errors[name] && touched[name] ? errorInput : {})}} name={name}/>
                  {errors[name] && touched[name] ? <Text style={errorMessage} name={name}>required</Text> : null}
                </>
              );
            }}
            renderSectionHeader={({section: {header}}) => header ? (<HeadingText level="h3">{header}</HeadingText>) : null}
          />
        </>
      )}
    </Formik>
  );
};

export default RecipeForm;