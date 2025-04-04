let pesanan = [];
let total = 0;

export function tambahPesanan(item) {
    pesanan.push(item);
    total += item.harga;
    console.log(`Pesanan: ${item.nama}, Harga: ${item.harga}`);
    console.log(`Total: ${total}`);
}

export function getPesanan() {
    return pesanan;
}

export function getTotal() {
    return total;
}

export function resetPesanan() {
    pesanan = [];
    total = 0;
    console.log("Pesanan telah direset");
    console.log(`Total: ${total}`);
}