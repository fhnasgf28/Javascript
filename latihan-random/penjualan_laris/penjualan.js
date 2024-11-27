const salesData = [
    { product: "Laptop", quantity:5 },
    { product: "Smartphon", quantity:8 },
    { product: "Headphones", quantity:6 },
    { product: "Smartphone", quantity:4 },
    { product: "TP link", quantity:9 },
    { product: "Mic Condensor", quantity:20 },
    { product: "Orbit", quantity:55},
]

// langkah 1: Menghitung total penjualan per product
const totalSales = salesData.reduce((acc, sale) => {
    if (!acc[sale.product]) {
        acc[sale.product] = 0;
    }
    acc[sale.product] += sale.quantity;
    return acc;
}, {});

// langkah 2: menentukan product terlaris 
let topProduct = { name: null, total: 0 };
for (const [product, total] of Object.entries(totalSales)) {
    if (total > topProduct.total) {
        topProduct = { name: product, total: total};
    }
}

console.log(`Produk terlaris adalah "${topProduct.name}" dengan total penjualan sebanyak ${topProduct.total} unit.`);