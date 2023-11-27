import React, { useState, useEffect } from 'react';
import IngredientForm from '../../components/ingredientForm/IngredientForm';
import Ingredient from '../../components/ingredient/Ingredient';
import Modal from 'react-modal';
import ApiBOController from '../../controllers/BOApiController';
import { Link } from 'react-router-dom';
import "./VirtualFridge.scss";


const HERO_TITLE_TEXT = "What's in Your Fridge Today?";
const MODAL_TITLE_TEXT = 'Ooops!';
const MODAL_CONTENT_TEXT = 'It looks like you already added this ingredient...';
const MODAL_BTN_TEXT = 'I Know';
const WISH_DISH_BTN_TEXT = 'Wish a dish';


function VirtualFridge({ onDishWish }) {
  const [ingredients, setIngredients] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);


  useEffect(() => {
    const fetchIngredients = async () => {
      try {
        const result = await ApiBOController.getAllIngredientsFromBackend();
        setIngredients(result);
      } catch (error) {
        console.error('Error getting ingredients:', error);
      }
    };

    fetchIngredients();
  }, []);


  useEffect(() => {
    setModalIsOpen(ingredients.length >= 3 && ingredients.some((ingredient, index) => ingredients.findIndex(i => i.name === ingredient.name) !== index));
  }, [ingredients]);


  const addIngredient = async (ingredient) => {
    if (!ingredient.name || /^\s*$/.test(ingredient.name)) {
      return;
    }

    try {
      const duplicateIngredient = ingredients.find(i => i.name === ingredient.name);
      if (duplicateIngredient) {
        setModalIsOpen(true);
        return;
      }

      const result = await ApiBOController.addIngredientToBackend(ingredient);
      setIngredients([result, ...ingredients]);
    } catch (error) {
      console.error(`Error adding ${ingredient.name} ingredient:`, error);
    }
  };


  const handleDishWishButtonClick = () => {
    onDishWish();
  };


  const updateIngredient = async (newIngredient) => {
    if (!newIngredient.name || /^\s*$/.test(newIngredient.name)) {
      return;
    }

    try {
      const duplicateIngredient = ingredients.some((ingredient) => ingredient.name === newIngredient.name && ingredient.id !== newIngredient.id);
      if (duplicateIngredient) {
        setModalIsOpen(true);
        return;
      }

      const result = await ApiBOController.updateIngredientToBackend(newIngredient);
      setIngredients((prev) =>
        prev.map((ingredient) =>
          ingredient.id === result.id ? { ...ingredient, name: result.name } : ingredient
        )
      );
    } catch (error) {
      console.error(`Error updating ${newIngredient.name} ingredient:`, error);
    }
  };


  const removeIngredient = async (id) => {
    try {
      await ApiBOController.deleteIngredientFromBackend(id);
      setIngredients([...ingredients].filter((ingredient) => ingredient.id !== id));
    } catch (error) {
      console.error(`Error deleting ingredient id: ${id}:`, error);
    }
  };


  return (
    <>
      <div className="blue-background"></div>
      <div className='virtual-fridge-container'>
        <h1 className='hero-title'>{HERO_TITLE_TEXT}</h1>
        <IngredientForm onSubmit={addIngredient} />
        <div className="ingredients-container">
          <Ingredient ingredients={ingredients} removeIngredient={removeIngredient} updateIngredient={updateIngredient} />
          <Modal className="modal" isOpen={modalIsOpen} onRequestClose={() => setModalIsOpen(false)}>
            <h2>{MODAL_TITLE_TEXT}</h2>
            <p>{MODAL_CONTENT_TEXT}</p>
            <button onClick={() => setModalIsOpen(false)}>{MODAL_BTN_TEXT}</button>
          </Modal>
        </div>
      </div>
      {ingredients.length >= 3 && (
        <Link className="dish-wish-button pulse" onClick={handleDishWishButtonClick} to="/recipe">
          {WISH_DISH_BTN_TEXT}
        </Link>
      )}
    </>
  );
}


export default VirtualFridge;
