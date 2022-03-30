import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.scss';
import StartPage from './pages/StartPage';
import HomePage from './pages/HomePage';
import Storage from 'store2';
import googleService from './services/googleService';
import RequireStart from './components/RequireStart';

function App() {
  const googleEnabled = Storage.get('googleEnabled');

  if (googleEnabled) {
    googleService.init(Storage.get('googleToken'));
  }

  return (
    <div className="container">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<StartPage />}/>
          <Route path="/home" element={<RequireStart><HomePage /></RequireStart>}/>
          <Route path="/new-recipe" element={<RequireStart><HomePage /></RequireStart>}/>
          <Route path="/recipe:id" element={<RequireStart><HomePage /></RequireStart>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
