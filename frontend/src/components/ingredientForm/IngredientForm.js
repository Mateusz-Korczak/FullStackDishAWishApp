import React, { useState, useEffect, useRef } from 'react';
import './IngredientForm.scss';


const ADD_INGREDIENT_TEXT = 'Add a ingredient';
const EDIT_INGREDIENT_TEXT = 'Edit a ingredient';
const ADD_BUTTON_TEXT = 'Add ingredient';
const UPDATE_BUTTON_TEXT = 'Update';


function IngredientForm(props) {
    const [input, setInput] = useState(props.edit ? props.edit.value : '');
    const inputRef = useRef(null);


    useEffect(() => {
        inputRef.current.focus();
    }, []);

    const handleChange = (e) => {
        setInput(e.target.value);
    };


    const handleSubmit = (e) => {
        e.preventDefault();

        props.onSubmit({
            name: input,
        });
        setInput('');
    };


    return (
        <div>
            <form onSubmit={handleSubmit} className="ingredient-form">
                {props.edit ? (
                    <>
                        <input
                            type="text"
                            placeholder={EDIT_INGREDIENT_TEXT}
                            value={input}
                            name="text"
                            className="ingredient-input edit"
                            onChange={handleChange}
                            ref={inputRef}
                        />
                        <button onClick={handleSubmit} className="ingredient-button edit">
                            {UPDATE_BUTTON_TEXT}
                        </button>
                    </>
                ) : (
                    <>
                        <input
                            type="text"
                            placeholder={ADD_INGREDIENT_TEXT}
                            value={input}
                            name="text"
                            className="ingredient-input"
                            onChange={handleChange}
                            ref={inputRef}
                        />
                        <button onClick={handleSubmit} className="ingredient-button">
                            {ADD_BUTTON_TEXT}
                        </button>
                    </>
                )}
            </form>
        </div>
    );
}


export default IngredientForm;
