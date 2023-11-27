package com.example.dishwish.dao;

import com.example.dishwish.model.Ingredient;
import jakarta.persistence.EntityManager;
import org.hibernate.Session;
import org.hibernate.query.Query;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class IngredientDAOImpl implements IngredientDAO {

    @Autowired
    private EntityManager entityManager;

    @Override
    public List<Ingredient> getAllIngredients() {
        Session currentSession = entityManager.unwrap(Session.class);
        Query<Ingredient> query = currentSession.createQuery("from Ingredient", Ingredient.class);
        return query.getResultList();
    }

    @Override
    public Ingredient getIngredientById(int id) {
        Session currentSession = entityManager.unwrap(Session.class);
        return currentSession.get(Ingredient.class, id);
    }

    @Override
    public void saveIngredient(Ingredient ingredient) {
        Session currentSession = entityManager.unwrap(Session.class);
        currentSession.saveOrUpdate(ingredient);
    }

    @Override
    public void deleteIngredient(int id) {
        Session currentSession = entityManager.unwrap(Session.class);
        Ingredient ingredientObj = currentSession.get(Ingredient.class, id);
        currentSession.delete(ingredientObj);
    }
}
