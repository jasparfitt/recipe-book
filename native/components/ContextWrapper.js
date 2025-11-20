import RecipeContext from '../context/RecipeContext';
import useSaveRecipes from '../hooks/useSaveRecipes';
import useRecipes from '../hooks/useRecipes';
import { useState, useCallback, useEffect } from 'react';
import GoogleEnabledContext from '../context/GoogleEnabledContext';
import useStorageValue from '../hooks/useStorageValue';
import useSaveStorageValue from '../hooks/useSaveStorageValue';
import { ActivityIndicator, Text, View } from 'react-native';
import DarkModeContext from '../context/DarkModeContext';

const ContextWrapper = ({ children }) => {
  const {data: googleData, loading: googleLoading, promise} = useStorageValue('@googleEnabled');
  const [saveGoogleEnabled] = useSaveStorageValue('@googleEnabled');
  const [googleEnabled, setGoogleEnabled] = useState(null);
  useEffect(() => {
    if (!googleLoading) {
      setGoogleEnabled(googleData);
    }
  }, [googleData, googleLoading]);

  const {data: darkData, loading: darkLoading} = useStorageValue('@darkMode');
  const [saveDarkMode] = useSaveStorageValue('@darkMode');
  const [darkMode, setDarkMode] = useState(null);
  useEffect(() => {
    if (!darkLoading) {
      setDarkMode(darkData);
    }
  }, [darkData, darkLoading]);

  const { data, loading, error } = useRecipes(googleEnabled, googleLoading);
  const [saveRecipes] = useSaveRecipes(googleEnabled, promise);
  const [recipes, setRecipes] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  useEffect(() => {
    if (!loading) {
      setRecipes(data);
    }
  }, [data, loading]);
  useEffect(() => {
    setErrorMessage(error)
  }, [error])

  const setCurrentGoogleEnabled = useCallback(async (newGoogleEnabled) => {
    saveGoogleEnabled(newGoogleEnabled);
    setGoogleEnabled(newGoogleEnabled);
  }, [saveGoogleEnabled]);

  const setCurrentDarkMode = useCallback(async (newDarkMode) => {
    setDarkMode(newDarkMode);
    saveDarkMode(newDarkMode);
  }, [saveDarkMode]);

  const setCurrentRecipes = useCallback(async (newRecipes) => {
    try {
      await saveRecipes(newRecipes);
      setRecipes(newRecipes);
    } catch (e) {
      setErrorMessage(e)
    }
  }, [saveRecipes]);

  return (
    <GoogleEnabledContext.Provider value={[googleEnabled, setCurrentGoogleEnabled]}>
      <RecipeContext.Provider value={[recipes, setCurrentRecipes, errorMessage, setErrorMessage]}>
        <DarkModeContext.Provider value={[darkMode, setCurrentDarkMode]}>
          {(loading || googleLoading || darkLoading) ? (
            <View><ActivityIndicator size="large" /></View>
          ) : children}
        </DarkModeContext.Provider>
      </RecipeContext.Provider>
    </GoogleEnabledContext.Provider>
  );
}

export default ContextWrapper;