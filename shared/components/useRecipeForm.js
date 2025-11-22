const useRecipeForm = (recipe, onSubmit) => {
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

  const handleFormSubmit = (values) => onSubmit(convertValues(values));
  
  return {
    initialValues,
    validateForm,
    handleFormSubmit,
    defaultIngredient,
    defaultStep,
    isObjectEmpty,
    isStringEmpty,
  };
};

export default useRecipeForm;