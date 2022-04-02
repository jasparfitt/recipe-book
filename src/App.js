import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.scss';
import StartPage from './pages/StartPage';
import HomePage from './pages/HomePage';
import NewRecipePage from './pages/NewRecipePage';
import RecipePage from './pages/RecipePage';
import Storage from 'store2';
import googleService from './services/googleService';
import recipeService from './services/recipeService';
import RequireStart from './components/RequireStart';
import Header from './components/Header';
import { useEffect } from 'react'

function App() {
  useEffect(() => {
    recipeService.loadRecipes();
  }, []);

  return (
    <div>
      <Header/>
      <div className="container mb-5">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<StartPage />}/>
            <Route path="/home" element={<RequireStart><HomePage /></RequireStart>}/>
            <Route path="/new-recipe" element={<RequireStart><NewRecipePage /></RequireStart>}/>
            <Route path="/recipe:id" element={<RequireStart><RecipePage /></RequireStart>}/>
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
