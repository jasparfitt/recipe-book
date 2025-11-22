import { BrowserRouter, Routes, Route } from 'react-router-dom';
import StartPage from './pages/StartPage';
import HomePage from './pages/HomePage';
import NewRecipePage from './pages/NewRecipePage';
import RecipePage from './pages/RecipePage';
import EditRecipePage from './pages/EditRecipePage';
import ExportPage from './pages/ExportPage';
import ImportPage from './pages/ImportPage';
import TagsPage from './pages/TagsPage';
import TagPage from './pages/TagPage';
import RequireStart from './components/RequireStart';
import Header from './components/Header';

const Main = () => {
  return (
    <div>
      <BrowserRouter>
        <Header />
        <div className="container mb-5">
          <Routes>            
            <Route path="/start" element={<StartPage />}/>
            <Route path="/home" element={<RequireStart><HomePage /></RequireStart>}/>
            <Route path="/tags" element={<RequireStart><TagsPage /></RequireStart>}/>
            <Route path="/tag/:tag" element={<RequireStart><TagPage /></RequireStart>}/>
            <Route path="/new-recipe" element={<RequireStart><NewRecipePage /></RequireStart>}/>
            <Route path="/recipe/:id" element={<RequireStart><RecipePage /></RequireStart>}/>
            <Route path="/edit-recipe/:id" element={<RequireStart><EditRecipePage /></RequireStart>}/>
            <Route path="/export" element={<RequireStart><ExportPage /></RequireStart>}/>
            <Route path="/export/:id" element={<RequireStart><ExportPage /></RequireStart>}/>
            <Route path="/import" element={<RequireStart><ImportPage /></RequireStart>}/>
            <Route path="/*" element={<StartPage />}/>
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
};

export default Main;