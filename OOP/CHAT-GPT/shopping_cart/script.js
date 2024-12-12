class ShoppingCart {
    constructor() {
        this.items= [];
    }

    addItem(price, quantity) {
        this.items.push({price, quantity});
    }

    calculateTotal() {
        return this.items.reduce((total, items) => total + items.price * items.quantity, 0);
    }

    clearCart() {
        this.items = [];
    }
}

document.getElementById('calculate').addEventListener('click', () => {
        const cart = new ShoppingCart();
        const itemElements = document.querySelectorAll('#items .item input');

        itemElements.forEach(input => {
            const price = parseFloat(input.getAttribute('data-price'));
            const quantity = parseInt(input.value);

            if (quantity > 0) {
                cart.addItem(price, quantity);
            }
        });

        const total = cart.calculateTotal();
        document.getElementById('total').textContent = `Total: $${total}`;
        cart.clearCart(); // Reset the cart after calculation
    });