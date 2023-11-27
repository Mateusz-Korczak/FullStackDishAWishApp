package com.example.dishwish.service;

import com.example.dishwish.dao.IngredientDAO;
import com.example.dishwish.model.Ingredient;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class IngredientServiceImpl implements IngredientService {

    @Autowired
    private IngredientDAO ingredientDAO;

    @Transactional
    @Override
    public List<Ingredient> getAllIngredients() {
        return ingredientDAO.getAllIngredients();
    }

    @Transactional
    @Override
    public Ingredient getIngredientById(int id) {
        return ingredientDAO.getIngredientById(id);
    }

    @Transactional
    @Override
    public void saveIngredient(Ingredient ingredient) {
        ingredientDAO.saveIngredient(ingredient);
    }

    @Transactional
    @Override
    public boolean deleteIngredient(int id) {
        try {
            ingredientDAO.deleteIngredient(id);
            return true;
        } catch (Exception e) {
            return false;
        }
    }

}
