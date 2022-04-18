import { BrowserRouter, Routes, Route } from 'react-router-dom';
import StartPage from './pages/StartPage';
import HomePage from './pages/HomePage';
import NewRecipePage from './pages/NewRecipePage';
import RecipePage from './pages/RecipePage';
import EditRecipePage from './pages/EditRecipePage';
import ExportPage from './pages/ExportPage';
import ImportPage from './pages/ImportPage';
import recipeService from './services/recipeService';
import RequireStart from './components/RequireStart';
import Header from './components/Header';
import React, { useEffect, useState } from 'react'

function App() {
  let [loading, setLoading] = useState(true);

  useEffect(() => {
    recipeService.loadRecipes().finally(() => {
      setLoading(false);
    });
  }, []);

  return (
    <div>
      {!loading ? (
          <BrowserRouter>
            <Header/>
            <div className="container mb-5">
              <Routes>
                <Route path="/*" element={<StartPage />}/>
                <Route path="/home" element={<RequireStart><HomePage /></RequireStart>}/>
                <Route path="/new-recipe" element={<RequireStart><NewRecipePage /></RequireStart>}/>
                <Route path="/recipe/:id" element={<RequireStart><RecipePage /></RequireStart>}/>
                <Route path="/edit-recipe/:id" element={<RequireStart><EditRecipePage /></RequireStart>}/>
                <Route path="/export" element={<RequireStart><ExportPage /></RequireStart>}/>
                <Route path="/export/:id" element={<RequireStart><ExportPage /></RequireStart>}/>
                <Route path="/import" element={<RequireStart><ImportPage /></RequireStart>}/>
              </Routes>
            </div>
          </BrowserRouter>
      ) : null}
    </div>
  );
}

export default App;
