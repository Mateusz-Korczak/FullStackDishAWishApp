import React, { useState } from 'react';
import IngredientForm from '../ingredientForm/IngredientForm';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import './Ingredient.scss';


function Ingredient({ ingredients, removeIngredient, updateIngredient }) {
  const [edit, editIngredient] = useState({
    id: null,
    name: ''
  });


  const submitUpdate = ingredient => {
    updateIngredient({ id: edit.id, name: ingredient.name });
    editIngredient({
      id: null,
      name: ''
    });
  };


  if (edit.id) {
    return <IngredientForm edit={edit} onSubmit={submitUpdate} />;
  }


  return ingredients.map((ingredient) => (
    <div
      className="ingredient-row"
      key={ingredient.id}
    >
      <div >
        {ingredient.name}
      </div>
      <div className="icons">
        <FontAwesomeIcon
          icon={faPenToSquare}
          onClick={() => editIngredient({ id: ingredient.id, name: ingredient.name })}
          className="edit-icon"
        />
        <FontAwesomeIcon
          icon={faTrash}
          onClick={() => removeIngredient(ingredient.id)}
          className="delete-icon"
        />
      </div>
    </div>
  ));
}


export default Ingredient;
