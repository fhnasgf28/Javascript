const products = [
    { id: 1, name: 'laptop', price: 1000 },
    { id: 2, name: 'phone', price: 500 },
    { id: 3, name: 'tablet', price: 200 },
    { id: 4, name: 'watch', price: 300 },
    { id: 5, name: 'headphone', price: 400 },
    { id: 6, name: 'speaker', price: 600 },
]

// fungsi untuk mencari data barang berdasarkan nama 
function searchProduct(query) {
    return products.filter(products => products.name.toLowerCase().includes(query.toLowerCase()));
}

// mendapatkan input dari pengguna
const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question("Masukkan nama barang yang ingin dicari:", (userInput) => {
    const foundProducts = searchProduct(userInput);
    if (foundProducts.length > 0) {
        console.log("barang yang ditemukan",foundProducts);
        foundProducts.forEach(product => {
            console.log(`id: ${product.id}, name: ${product.name}, price: ${product.price}`);
        });
    } else {
        console.log("barang tidak ditemukan");
    }
    
    rl.close(); // menutup antarmuka readline 
})