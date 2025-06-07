let recipes = [];
function addRecipe() {
    const name = document.getElementById('recipe-name').value.trim();
    const ingredients = document.getElementById("recipe-ingredients").value.trim();
    const instructions = document.getElementById("recipe-instructions").value.trim();

    if (!name || !ingredients || !instructions){
        alert("Please fill in all fields.");
        return;
    }

    const ingredientsArray = ingredients.split(',').map(ingredient => ingredient.trim());
    const newRecipe = {name, ingredients, instructions};
    recipes.push(newRecipe);

    renderRecipes();
    clearInputs();
}

function clearInputs() {
    document.getElementById("recipe-name").value = '';
    document.getElementById("recipe-ingredients").value = '';
    document.getElementById("recipe-instructions").value = '';
}

function renderRecipes() {
    const list = document.getElementById("recipe-list");
    list.innerHTML = ''; // Clear the list before rendering
    recipes.forEach((recipe, index) => {
        const listItem = document.createElement("li");
        listItem.innerHTML = `<strong>${recipe.name}</strong><br>
                              Ingredients: ${recipe.ingredients}<br>
                              Instructions: ${recipe.instructions}
                              <button onclick="deleteRecipe(${index})">Delete</button>`;
        list.appendChild(listItem);
    });
}

function generateShoppingList() {
    const shoppingList = recipes.flatMap(recipe => recipe.ingredients.split(',').map(ingredient => ingredient.trim()));
    const uniqueIngredients = [...new Set(shoppingList)];
    
    const list = document.getElementById("shopping-list");
    list.innerHTML = ''; // Clear the list before rendering
    uniqueIngredients.forEach(ingredient => {
        const listItem = document.createElement("li");
        listItem.textContent = ingredient;
        list.appendChild(listItem);
    });
}
function deleteRecipe(index) {
    if (index < 0 || index >= recipes.length) {
        alert("Invalid recipe index.");
        return;
    }
    recipes.splice(index, 1);
    renderRecipes();
}
function clearShoppingList() {
    const list = document.getElementById("shopping-list");
    list.innerHTML = ''; // Clear the shopping list
}