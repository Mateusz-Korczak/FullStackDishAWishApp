package com.example.dishwish.service;

import com.example.dishwish.model.Ingredient;
import com.theokanning.openai.completion.chat.ChatCompletionChoice;
import com.theokanning.openai.completion.chat.ChatCompletionRequest;
import com.theokanning.openai.completion.chat.ChatMessage;
import com.theokanning.openai.service.OpenAiService;

import java.time.Duration;
import java.util.List;
import java.util.stream.Collectors;

public interface IngredientService {

    List<Ingredient> getAllIngredients();

    Ingredient getIngredientById(int id);

    void saveIngredient(Ingredient ingredient);

    boolean deleteIngredient(int id);

    class ChatGPTService {
        private final OpenAiService openAiService;

        public ChatGPTService() {
            openAiService = new OpenAiService("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", Duration.ofSeconds(120));
        }

        public String getDishPrompt(String products) {
            return String.format("I have in my fridge: %s. What can I eat for meal? Give me 2 ideas:\n" +
                    "1) Using only the ingredients I have,\n" +
                    "2) Using the mentioned ingredients, but if something needs to be bought, create a separate shopping list.\n" +
                    "Let the suggestions have this structure:\n" +
                    "Dish <dish number>: <dish title>\n\n" +
                    "Ingredients:\n<list of ingredients>\n\n" +
                    "Preparation method:\n<bulleted steps>\n\n" +
                    "Shopping list (only for dish 2):\n<list of ingredients to buy>\n\n" +
                    "Fun fact:\n<fun fact>", products);
        }


        public String generateDishIdea(List<Ingredient> ingredients) {
            try {
                String allProducts = ingredients.stream()
                        .map(Ingredient::getName)
                        .collect(Collectors.joining(", "));

                String question = getDishPrompt(allProducts);

                ChatCompletionRequest completionRequest = ChatCompletionRequest.builder()
                        .messages(List.of(new ChatMessage("user", question)))
                        .model("gpt-3.5-turbo")
                        .build();

                List<ChatCompletionChoice> choices = openAiService.createChatCompletion(completionRequest).getChoices();

                String result = choices.stream()
                        .map(choice -> choice.getMessage().getContent())
                        .collect(Collectors.joining());

                return result;
            } catch (Exception e) {
                e.printStackTrace();
                return "An error occurred while generating a dish idea. Please try again later.";
            }
        }
    }
}
