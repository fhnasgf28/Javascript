const menuItems = [
    {id: 1, name: "Espresso", price: 15000},
    {id: 2, name: "Latte", price: 20000},
    {id: 3, name: "Cappuccino", price: 25000},
    {id: 4, name: "Macchiato", price: 30000},
    {id: 5, name: "Mocha", price: 35000},
    {id: 6, name: "Americano", price: 20000},
    {id: 7, name: "Cafe Latte", price: 25000},
    {id: 8, name: "Cafe Mocha", price: 30000},
    {id: 9, name: "Cafe Americano", price: 20000},
    {id: 10, name: "Cafe Cappuccino", price: 25000}
]

const cart = [];
function displayMenu() {
    const menuDiv = document.getElementById("menu");
    menuDiv.innerHTML = "";
    menuItems.forEach(item => {
        const div = document.createElement("div");
        div.classList.add("menu-item");
        div.innerHTML = `
            <p>${item.name} - Rp ${item.price.toLocaleString()}</p>
            <button onclick="addToCart(${item.id})">Add</button>`;
        menuDiv.appendChild(div);
    })
}

function addToCart(id) {
    const item = menuItems.find(i => i.id === id);
    cart.push(item);
    updateCart();
}

function updateCart() {
    const cartDiv = document.getElementById("cart");
    const totalSpan = document.getElementById("total");
    cartDiv.innerHTML = "";

    if (cart.length === 0) {
        cartDiv.innerHTML = "<p>Cart is empty</p>";
        totalSpan.textContent = "0";
        return;
    }

    cart.forEach((item, index) => {
        const div = document.createElement("div");
        div.classList.add("cart-item");
        div.innerHTML = `
            <p>${item.name} - Rp ${item.price.toLocaleString()}</p>
            <button onclick="removeFromCart(${index})">Remove</button>`;
        cartDiv.appendChild(div);
    })
    const total = cart.reduce((sum, item) => sum + item.price, 0);
    totalSpan.textContent = total.toLocaleString();
}

displayMenu();