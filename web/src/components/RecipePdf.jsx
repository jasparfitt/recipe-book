import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

const RecipePdf = ({ recipe }) => {
  const ingredients = recipe.ingredients.map(ingredient => (
    <Text>{ingredient.amount ?? ''} {ingredient.name ?? ''}</Text>
  ));

  const steps = recipe.steps.map((step, i) => (
    <Text>{i + 1}. {step}</Text>
  ));

  return (    
    <Page size="A4" style={styles.page}>
      <Text>{recipe.recipeName}</Text>
      {recipe.makes ? (<Text>Makes: {recipe.makes}</Text>) : null}
      <Text>Ingredients</Text>
      {ingredients}
      <Text>Method</Text>
      {steps}
    </Page>
  )
};

export default RecipePdf;