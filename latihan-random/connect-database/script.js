const { response } = require("express");

document.getElementById('itemForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const quantity = document.getElementById('quantity').value;
    const price = document.getElementById('price').value;

    fetch('http://localhost:3000/items', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, quantity, price }),
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);
        alert('Item added successfully!');
    })
    .catch(error => {
        console.error(error);
    });
})