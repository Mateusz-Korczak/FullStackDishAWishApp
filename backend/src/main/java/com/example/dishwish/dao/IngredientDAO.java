package com.example.dishwish.dao;

import com.example.dishwish.model.Ingredient;

import java.util.List;

public interface IngredientDAO {

    List<Ingredient> getAllIngredients();

    Ingredient getIngredientById(int id);

    void saveIngredient(Ingredient ingredient);

    void deleteIngredient(int id);
}
