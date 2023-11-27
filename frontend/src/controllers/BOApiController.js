import axios from 'axios';


const API_URL = 'http://localhost:8080/api/ingredients/';


const ApiBOController = {
  addIngredientToBackend: async (Ingredient) => {
    try {
      const response = await axios.post(`${API_URL}`, Ingredient);
      return response.data;
    } catch (error) {
      console.error('addItemToBackend error request', error);
      throw error;
    }
  },


  updateIngredientToBackend: async (Ingredient) => {
    try {
      const response = await axios.put(`${API_URL}`, Ingredient);
      return response.data;
    } catch (error) {
      console.error('updateItemInBackend error request', error);
      throw error;
    }
  },


  deleteIngredientFromBackend: async (IngredientId) => {
    try {
      const response = await axios.delete(`${API_URL}${IngredientId}`);
      return response.data;
    } catch (error) {
      console.error('deleteItemFromBackend error request', error);
      throw error;
    }
  },


  getAllIngredientsFromBackend: async () => {
    try {
      const response = await axios.get(API_URL);
      return response.data;
    } catch (error) {
      console.error('getItemsFromBackend error request', error);
      throw error;
    }
  },


  getRecipeFromBackend: async () => {
    try {
      const response = await axios.get(API_URL + "generate-recipe");
      return response.data;
    } catch (error) {
      console.error('getRecipe error request', error);
      throw error;
    }
  }
};


export default ApiBOController;
