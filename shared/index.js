import AutoChecker from "./components/AutoChecker";
import useRecipeForm from "./components/useRecipeForm";
import DarkModeContext from "./context/DarkModeContext";
import GDriveContext from "./context/GDriveContext";
import GoogleEnabledContext from "./context/GoogleEnabledContext";
import RecipeContext from "./context/RecipeContext";
import StorageContext from "./context/StorageContext";
import useRecipeContextData from "./context/useRecipeContextData";
import useStorageContextValue from "./context/useStorageContextValue";
import useGetRecipesFile from "./hooks/useGetRecipesFile";
import useHook from "./hooks/useHook";
import useOrderByKey from "./hooks/useOrderByKey";
import useRecipes from "./hooks/useRecipes";
import useRecipesExists from "./hooks/useRecipesExists";
import useSaveRecipes from "./hooks/useSaveRecipes";
import useSaveStorageValue from "./hooks/useSaveStorageValue";
import useStorageValue from "./hooks/useStorageValue";
import useExportPage from "./pages/useExportPage";
import useHomePage from "./pages/useHomePage";
import useRecipePage from "./pages/useRecipePage";
import useTagPage from "./pages/useTagPage";
import useTagsPage from "./pages/useTagsPage";
import useImportPage from "./pages/useImportPage";
import useSelectAllCheckbox from "./components/useSelectAllCheckbox";

const pages = {
  useTagPage,
  useTagsPage,
  useRecipePage,
  useHomePage,
  useExportPage,
  useImportPage,
};

const hooks = {
  useGetRecipesFile,
  useHook,
  useOrderByKey,
  useRecipes,
  useRecipesExists,
  useSaveRecipes,
  useSaveStorageValue,
  useStorageValue,
};

const context = {
  DarkModeContext,
  GDriveContext,
  GoogleEnabledContext,
  RecipeContext,
  StorageContext,
  useRecipeContextData,
  useStorageContextValue,
};

const components = {
  AutoChecker,
  useRecipeForm,
  useSelectAllCheckbox,
};

export {
  pages,
  hooks,
  context,
  components,
};