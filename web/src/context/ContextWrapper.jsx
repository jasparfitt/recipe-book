import DarkModeContext from "coook.shared/context/DarkModeContext";
import GoogleEnabledContext from "coook.shared/context/GoogleEnabledContext";
import RecipeContext from "coook.shared/context/RecipeContext";
import useRecipeContextData from "coook.shared/context/useRecipeContextData";
import useStorageContextValue from "coook.shared/context/useStorageContextValue";

const ContextWrapper = ({ children }) => {
  const { loading: googleLoading, contextValue: googleContextData } = useStorageContextValue('@googleEnabled');
  const { loading: darkLoading, contextValue: darkContextData } = useStorageContextValue('@darkMode');
  const { loading, contextValue: recipeContextData } = useRecipeContextData(googleContextData[0], googleLoading);

  return (
    <GoogleEnabledContext.Provider value={googleContextData}>
      <RecipeContext.Provider value={recipeContextData}>
        <DarkModeContext.Provider value={darkContextData}>
          {(loading || googleLoading || darkLoading) ? (
            <div>Loading...</div>
          ) : children}
        </DarkModeContext.Provider>
      </RecipeContext.Provider>
    </GoogleEnabledContext.Provider>
  );
};

export default ContextWrapper;