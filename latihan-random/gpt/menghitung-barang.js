const items = [
    {name: 'laptop', price: 100000, quantity: 5},
    {name: 'phone', price: 50000, quantity: 10},
    {name: 'tablet', price: 20000, quantity: 15},
    {name: 'watch', price: 30000, quantity: 20},
    {name: 'headphone', price: 40000, quantity: 25},
    {name: 'speaker', price: 60000, quantity: 30},
]

// pajak 11%
const taxRate = 0.11;

// fungsi untuk menghitung total sebelum pajak
function calculateSubtotal(items) {
    let subtotal = 0;
    for (let item of items){
        subtotal += item.price * item.quantity;
    }
    return subtotal;
}

// fungsi untuk menghitung pajak
function calculateTax(subtotal) {
    return subtotal * taxRate;
}
// fungsi untuk menghitung total setelah pajak
function calculateTotal(subtotal, tax) {
    return subtotal + tax;
}

// proses perhitungan
const subtotal = calculateSubtotal(items);
const tax = calculateTax(subtotal);
const total = calculateTotal(subtotal, tax);

// menampilkan hasil perhitungan
console.log('Subtotal: Rp ' + subtotal.toLocaleString());
console.log('Pajak: Rp ' + tax.toLocaleString());
console.log('Total: Rp ' + total.toLocaleString());