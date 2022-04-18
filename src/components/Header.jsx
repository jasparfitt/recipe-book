import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import Storage from 'store2';
import recipeService from '../services/recipeService';

const Header = () => {
  const navigate = useNavigate();
  const [googleEnabled, setGoogleEnabled] = useState(Storage.get('googleEnabled'));

  const changeGoogleState = async () => {
    const newGoogleState = !googleEnabled;
    Storage.set('googleEnabled', newGoogleState);
    setGoogleEnabled(newGoogleState);

    if (newGoogleState) {
      const googleRecipes = await recipeService.getRecipes();
      const recipes = Storage.get('recipes');

      recipeService.saveRecipes({...googleRecipes, ...recipes})
    }
  }

  return (
    <nav className="navbar navbar-light navbar-light bg-light">
      <div className="container">
        <button className="navbar-brand btn btn-link" onClick={() => navigate('/home')}>Coook</button>
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