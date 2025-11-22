import useHomePage from "./useHomePage";

const useTagPage = (params) => useHomePage(
  (recipe) => recipe.tags?.includes(params.tag)
);

export default useTagPage;