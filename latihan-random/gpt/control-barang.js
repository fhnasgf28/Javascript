// data barang di gudang
const items = [
    {name: "beras", stock:200, expireDate: "2025-01-01", quality:8},
    {name: "telur", stock:100, expireDate: "2026-01-01", quality:7},
    {name: "minyak", stock:50, expireDate: "2026-01-01", quality:6},
    {name: "susu", stock:30, expireDate: "2024-01-01", quality:5},
    {name: "daging", stock:20, expireDate: "2025-01-01", quality:4},
    {name: "ikan", stock:10, expireDate: "2027-01-01", quality:3},
    {name: "telur", stock:5, expireDate: "2027-01-01", quality:2},
    {name: "susu", stock:3, expireDate: "2027-01-01", quality:1},
]

// fungsi untuk mengecek kelayakan barang
function isEligible(item) {
    const today = new Date();
    const expireDate = new Date(item.expireDate);
    return item.stock >= 10 && expireDate > today && item.quality >= 6;
}

// fungsi untuk menampilkan barang yang layak
const eligibleItems = items.filter(isEligible);

// menampilkan barang yang layak
console.log(eligibleItems);
eligibleItems.forEach(item => {
    console.log(`name: ${item.name}, stock: ${item.stock}, expireDate: ${item.expireDate}, quality: ${item.quality}`);
})