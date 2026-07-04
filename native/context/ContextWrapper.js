import RecipeContext from 'coook.shared/context/RecipeContext';
import GoogleEnabledContext from 'coook.shared/context/GoogleEnabledContext';
import { ActivityIndicator, View } from 'react-native';
import DarkModeContext from 'coook.shared/context/DarkModeContext';
import useStorageContextValue from 'coook.shared/context/useStorageContextValue';
import useRecipeContextData from 'coook.shared/context/useRecipeContextData';

const ContextWrapper = ({ children }) => {
  const { loading: googleLoading, contextValue: googleContextData } = useStorageContextValue('@googleEnabled');
  const { loading: darkLoading, contextValue: darkContextData } = useStorageContextValue('@darkMode');
  const { loading, contextValue: recipeContextData } = useRecipeContextData(googleContextData[0], googleLoading);

  return (
    <GoogleEnabledContext.Provider value={googleContextData}>
      <RecipeContext.Provider value={recipeContextData}>
        <DarkModeContext.Provider value={darkContextData}>
          {(loading || googleLoading || darkLoading) ? (
            <View style={{ flex: 1 }}><ActivityIndicator style={{margin: 'auto'}} size="large" /></View>
          ) : children}
        </DarkModeContext.Provider>
      </RecipeContext.Provider>
    </GoogleEnabledContext.Provider>
  );
}

export default ContextWrapper;