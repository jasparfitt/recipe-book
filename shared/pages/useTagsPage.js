import { useContext, useMemo, useState } from "react";
import RecipeContext from "../context/RecipeContext";

const useTagsPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [recipesObject] = useContext(RecipeContext);
  const allTags = useMemo(() => {
    const tags = Object.values(recipesObject || {})
      .filter((r) => r !== 'deleted' && r.tags)
      .reduce((p,c) => ([...p, ...c.tags]), []);
    
    return [...new Set(tags)].sort();
  }, []);

  const tagList = useMemo(() => {
    return allTags.filter(item => {
      return item.toLowerCase().search(searchTerm.toLowerCase()) !== -1
    });
  }, [allTags, searchTerm]);

  return { tagList, setSearchTerm  };
};

export default useTagsPage;