import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.scss';
import StartPage from './pages/StartPage';
import HomePage from './pages/HomePage';
import NewRecipePage from './pages/NewRecipePage';
import RecipePage from './pages/RecipePage';
import EditRecipePage from './pages/EditRecipePage';
import recipeService from './services/recipeService';
import RequireStart from './components/RequireStart';
import Header from './components/Header';
import { useEffect, useState } from 'react'

function App() {
  let [loading, setLoading] = useState(true);

  useEffect(() => {
    recipeService.loadRecipes().finally(() => {
      setLoading(false);
    });
  }, []);

  return (
    <div>
      <Header/>
      {!loading ? (
        <div className="container mb-5">
          <BrowserRouter>
            <Routes>
              <Route path="/*" element={<StartPage />}/>
              <Route path="/home" element={<RequireStart><HomePage /></RequireStart>}/>
              <Route path="/new-recipe" element={<RequireStart><NewRecipePage /></RequireStart>}/>
              <Route path="/recipe/:id" element={<RequireStart><RecipePage /></RequireStart>}/>
              <Route path="/edit-recipe/:id" element={<RequireStart><EditRecipePage /></RequireStart>}/>
            </Routes>
          </BrowserRouter>
        </div>
      ) : null}
    </div>
  );
}

export default App;
