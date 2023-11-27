import React, { useEffect } from 'react';
import jsPDF from 'jspdf';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import JSConfetti from 'js-confetti';
import "./Recipe.scss";


const RECIPE_TITLE = 'Recipe';
const BACK_TO_FRIDGE_BTN = 'Back to Fridge';
const SAVE_AS_PDF_BTN = 'Save as PDF';

const CONFETTI_EMOJIS = [
  '🍉', '🍒', '🍓', '🍅', '🥕', '🌽', '🌶️', '🥦', '🥐', '🧀', '🍗', '🥩', '🥓', '🍔', '🍟', '🍕', '🌭', '🥪', '🍝', '🍦', '🍩', '🍰'
];
const CONFETTI_EMOJI_SIZE = 80;
const CONFETTI_NUMBER = 20;

const PDF_TEXT_X = 20;
const PDF_TEXT_Y = 20;


function Recipe({ recipeText, returnToFridge }) {
  useEffect(() => {
    if (recipeText) {
      new JSConfetti().addConfetti({
        emojis: CONFETTI_EMOJIS,
        emojiSize: CONFETTI_EMOJI_SIZE,
        confettiNumber: CONFETTI_NUMBER,
      });
    }
  }, [recipeText]);


  const handleSaveAsPDF = () => {
    const pdf = new jsPDF();
    pdf.text(recipeText, PDF_TEXT_X, PDF_TEXT_Y);
    pdf.save('Recipe.pdf');
  };


  const onBackToFridgeHandler = () => {
    returnToFridge();
  };


  return (
    <div className="recipe-card">
      <h2>{RECIPE_TITLE}</h2>
      <div className="recipe-content">
        <pre>{recipeText}</pre>
      </div>
      <div className="recipe-buttons">
        <Link className="recipe-button" to="/" onClick={onBackToFridgeHandler}>
          {BACK_TO_FRIDGE_BTN}
        </Link>
        <button className="recipe-button" onClick={handleSaveAsPDF}>
          {SAVE_AS_PDF_BTN}
        </button>
      </div>
    </div>
  );
}


Recipe.propTypes = {
  recipeText: PropTypes.string,
  returnToFridge: PropTypes.func,
};


export default Recipe;
