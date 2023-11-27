# DishWish - Fullstack Project

DishWish is a fullstack application that helps you generate recipe ideas based on the ingredients you have in your fridge. It utilizes Spring Boot for the backend, React for the frontend, and interacts with the OpenAI GPT-3.5 Turbo model to generate recipe suggestions.

## Table of Contents
- [Technologies](#technologies)
- [Setup](#setup)
- [Features](#features)
- [Endpoints](#endpoints)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Technologies

- **Backend:**
  - Spring Boot
  - Spring Data JPA
  - MySQL
  - OpenAI GPT-3.5 Turbo

- **Frontend:**
  - React
  - Sass (SCSS)

## Setup

1. **Clone the repository:**

    ```bash
    git clone https://github.com/your-username/dish-wish.git
    ```

2. **Backend Setup:**

    - Make sure you have MySQL installed and running.
    - Update `application.properties` in the `src/main/resources` folder with your MySQL configuration.
    - Run the Spring Boot application.

3. **Frontend Setup:**

    - Navigate to the `frontend` directory.
    - Install dependencies:

        ```bash
        npm install
        ```

    - Start the React development server:

        ```bash
        npm start
        ```

4. **OpenAI Setup:**

    - Get your OpenAI API key.
    - Update the API key in `ChatGPTService.java` in the `service` package.

## Features

- **Ingredient Management:**
  - Add, edit, delete ingredients.
  - View a list of all ingredients.

- **Recipe Generation:**
  - Utilize OpenAI GPT-3.5 Turbo to generate recipe ideas.
  - Receive suggestions based on the ingredients you have.

## Endpoints

- **GET `/api/ingredients/`:**
  - Get a list of all ingredients.

- **POST `/api/ingredients/`:**
  - Add a new ingredient.

- **GET `/api/ingredients/{id}`:**
  - Get details of a specific ingredient by ID.

- **DELETE `/api/ingredients/{id}`:**
  - Delete an ingredient by ID.

- **PUT `/api/ingredients/`:**
  - Update an existing ingredient.

- **GET `/api/ingredients/generate-recipe`:**
  - Generate a recipe suggestion based on available ingredients.

## Usage

1. Add ingredients using the frontend form.

2. Navigate to the recipe generation page.

3. Click the "Generate Recipe" button to receive recipe suggestions.

## Contributing

Contributions are welcome! Please follow the [contribution guidelines](CONTRIBUTING.md).

## License

This project is licensed under the [MIT License](LICENSE).
