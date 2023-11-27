import React, { useState } from 'react';
import './App.scss';
import VirtualFridge from './pages/virtualFridge/VirtualFridge';
import Recipe from './pages/recipe/Recipe';
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import ApiBOController from './controllers/BOApiController';
import MusicController from './controllers/MusicController';
import LoadingScreen from './pages/loadingScreen/LoadingScreen';


function App() {
  const [recipe, setRecipe] = useState();
  const handleDishWishButtonClick = () => {
    getRecipe()
  };


  const getRecipe = () => {
    MusicController.play()
    ApiBOController.getRecipeFromBackend()
      .then(result => {
        setRecipe(result)
      })
      .catch(error => {
        console.error('Error getting recipe:', error);
      });
  };


  return (
    <Router>
      <Routes>
        <Route
          exact
          path='/'
          element={
            <VirtualFridge onDishWish={handleDishWishButtonClick} />
          }
        />
        <Route
          exact
          path='/recipe'
          element={
            recipe ? (
              <Recipe recipeText={recipe} returnToFridge={() => setRecipe(null)} />
            ) : (
              <LoadingScreen />
            )
          }
        />
      </Routes>
    </Router>
  );
}


export default App;
