import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import Storage from 'store2';
import recipeService from '../services/recipeService';
import RestaurantIcon from '@mui/icons-material/Restaurant';

const Header = () => {
  const navigate = useNavigate();
  const [googleEnabled, setGoogleEnabled] = useState(Storage.get('googleEnabled'));
  const [darkMode, setDarkMode] = useState(Storage.get('darkMode') ?? false);

  const setDarkClass = () => {
    if (darkMode) {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
  }

  useEffect(() => {
    setDarkClass();
  }, [setDarkClass]);

  const changeGoogleState = async () => {
    const newGoogleState = !googleEnabled;
    Storage.set('googleEnabled', newGoogleState);
    setGoogleEnabled(newGoogleState);

    if (newGoogleState) {
      const googleRecipes = await recipeService.getRecipes();
      const googleDeleted = getDeleted(googleRecipes);
      const localRecipes = Storage.get('recipes');

      recipeService.saveRecipes({...googleRecipes, ...localRecipes, ...googleDeleted})
    }
  }

  const changeDarkMode = () => {
    const newDarkMode = !darkMode;
    Storage.set('darkMode', newDarkMode);
    setDarkMode(newDarkMode);
    setDarkClass();
  }

  return (
    <nav className="navbar navbar-light bg-primary border-bottom border-dark border-3 mb-3">
      <div className="container">
        <button className="navbar-brand btn btn-link coook-brand" onClick={() => navigate('/home')}><RestaurantIcon className="me-1" /> Coook</button>
        <ul className="navbar-nav flex-row me-auto">
          <li className="nav-item">
            <button className="btn btn-primary border-dark" onClick={() => navigate('/home')}>Home</button>
          </li>
          <li className="nav-item ms-2">
            <button className="btn btn-primary border-dark" onClick={() => navigate('/tags')}>Tags</button>
          </li>
        </ul>
        <button className="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="offcanvas offcanvas-end" tabIndex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
          <div className="offcanvas-header">
            <h5 className="offcanvas-title" id="offcanvasNavbarLabel">Menu</h5>
            <button type="button" className="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
          </div>
          <div className="offcanvas-body">
            <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
            <li className="nav-item">
                <div className="form-check form-switch form-control-lg">
                  <input className="form-check-input" type="checkbox" role="switch" id="googleSwitch" onChange={changeDarkMode} checked={darkMode}/>
                  <label className="form-check-label fs-6" htmlFor="googleSwitch">Dark mode</label>
                </div>
              </li>
              <li className="nav-item">
                <div className="form-check form-switch form-control-lg">
                  <input className="form-check-input" type="checkbox" role="switch" id="googleSwitch" onChange={changeGoogleState} checked={googleEnabled}/>
                  <label className="form-check-label fs-6" htmlFor="googleSwitch">Google integration</label>
                </div>
              </li>
              <li className="nav-item">
                <button className="nav-link btn link-btn" onClick={() => navigate('/export')}  data-bs-dismiss="offcanvas">Export recipes</button>
                <button className="nav-link btn link-btn" onClick={() => navigate('/import')}  data-bs-dismiss="offcanvas">Import recipes</button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;