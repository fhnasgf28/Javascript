document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', function() {
        const product = this.parentElement;
        const name = product.getAttribute('data-name');
        const price = parseFloat(product.getAttribute('data-price'));
        let quantity = parseInt(product.getAttribute('data-quantity'));
        
        if (quantity > 0) {
            addToCart(name, price);
            quantity--;
            product.setAttribute('data-quantity', quantity);
            product.querySelector('span').textContent = `${name} - ${price.toFixed(2)} (Stock: ${quantity})`;
        } else {
            alert (`Stok ${name} habis!`);
        }
    });
});

let cart = [];
let total = 0;

function addToCart(name, price) {
    cart.push({ name, price });
    total += price;
    updateCart();
}

function updateCart() {
    const cartItems = document.getElementById('cart-items');
    cartItems.innerHTML = '';

    cart.forEach(item => {
        const li = document.createElement('li');
        li.textContent = `${item.name} - Rp ${item.price.toFixed(2)}`;
        cartItems.appendChild(li);
    });

    document.getElementById('total').textContent = `Rp ${total.toFixed(2)}`;
}

document.getElementById('checkout').addEventListener('click', function() {
    if (cart.length === 0) {
        alert('Keranjang kosong!');
    } else {
        alert(`Total belanja Anda: Rp ${total.toFixed(2)}. Terima kasih!`);
        cart = [];
        total = 0;
        updateCart();
    }
});
