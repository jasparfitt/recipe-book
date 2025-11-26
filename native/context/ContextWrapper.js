import RecipeContext from '../../shared/context/RecipeContext';
import GoogleEnabledContext from '../../shared/context/GoogleEnabledContext';
import { ActivityIndicator, View } from 'react-native';
import DarkModeContext from '../../shared/context/DarkModeContext';
import useStorageContextValue from '../../shared/context/useStorageContextValue';
import useRecipeContextData from '../../shared/context/useRecipeContextData';

const ContextWrapper = ({ children }) => {
  const { loading: googleLoading, contextValue: googleContextData } = useStorageContextValue('@googleEnabled');
  const { loading: darkLoading, contextValue: darkContextData } = useStorageContextValue('@darkMode');
  const { loading, contextValue: recipeContextData } = useRecipeContextData();

  return (
    <GoogleEnabledContext.Provider value={googleContextData}>
      <RecipeContext.Provider value={recipeContextData}>
        <DarkModeContext.Provider value={darkContextData}>
          {(loading || googleLoading || darkLoading) ? (
            <View><ActivityIndicator size="large" /></View>
          ) : children}
        </DarkModeContext.Provider>
      </RecipeContext.Provider>
    </GoogleEnabledContext.Provider>
  );
}

export default ContextWrapper;