package com.example.dishwish.controller;

import com.example.dishwish.model.Ingredient;
import com.example.dishwish.service.ChatGPTService;
import com.example.dishwish.service.IngredientService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/ingredients")
@CrossOrigin("http://localhost:3000")
public class IngredientController {

    @Autowired
    private IngredientService ingredientService;
    @Autowired
    private ChatGPTService chatGPTService;

    @GetMapping("/")
    public ResponseEntity<List<Ingredient>> getAllIngredients() {
        List<Ingredient> ingredients = ingredientService.getAllIngredients();
        return new ResponseEntity<>(ingredients, HttpStatus.OK);
    }

    @PostMapping("/")
    public ResponseEntity<Ingredient> saveIngredient(@RequestBody Ingredient ingredient) {
        ingredientService.saveIngredient(ingredient);
        return new ResponseEntity<>(ingredient, HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Ingredient> getIngredientById(@PathVariable int id) {
        Ingredient ingredient = ingredientService.getIngredientById(id);
        return ingredient != null ?
                new ResponseEntity<>(ingredient, HttpStatus.OK) :
                new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteIngredient(@PathVariable int id) {
        boolean deleted = ingredientService.deleteIngredient(id);
        return deleted ?
                new ResponseEntity<>("Ingredient has been deleted with id:" + id, HttpStatus.OK) :
                new ResponseEntity<>("Ingredient with id:" + id + " not found", HttpStatus.NOT_FOUND);
    }

    @PutMapping("/")
    public ResponseEntity<Ingredient> updateIngredient(@RequestBody Ingredient ingredient) {
        ingredientService.saveIngredient(ingredient);
        return new ResponseEntity<>(ingredient, HttpStatus.OK);
    }

    @GetMapping("/generate-recipe")
    public ResponseEntity<String> generateRecipe() {
        List<Ingredient> ingredients = ingredientService.getAllIngredients();
        String recipe = chatGPTService.generateDishIdea(ingredients);
   return new ResponseEntity<>(recipe, HttpStatus.OK);
    }


}
