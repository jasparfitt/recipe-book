import { useParams } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import stringService from '../services/stringService';
import recipeService from '../services/recipeService';
import RecipeList from '../components/RecipeList';
import SearchBar from '../components/SearchBar';
import useTagPage from '../../../shared/pages/useTagPage';

const TagPage = () => {
  const params = useParams();
  const { recipeList, setSearchTerm } = useTagPage(params);

  return (
    <div className="row">
      <div className="col-lg-8">
        <h1>{stringService.capitalise(params.tag)}</h1>
        <SearchBar setSearchTerm={setSearchTerm} />
        <div className="mt-3">
          <RecipeList recipes={recipeList} />
        </div>
      </div>
    </div>
  );
}

export default TagPage;
