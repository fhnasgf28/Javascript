function hitungPajak() {
    const harga = parseFloat(document.getElementById('harga').value) || 0;
    const jumlah = parseFloat(document.getElementById('jumlah').value) || 0;
    const kategori = document.getElementById('kategori').value;

    // hitung total sebelum pajak
    const totalSebelumPajak = harga * jumlah;

    // tentukan tarif pajak
    let tarifPajak = 0;
    if (kategori === 'elektronik') {
        tarifPajak = 0.01;
    } else if (kategori === 'pakaian') {
        tarifPajak = 0.05;
    } else if (kategori === 'makanan') {
        tarifPajak = 0.02;
    }

    // hitung pajak
    const totalPajak = totalSebelumPajak * tarifPajak;
    const totalSetelahPajak = totalSebelumPajak + totalPajak;

    // tampilkan hasil
    document.getElementById('totalSebelum').innerText = formatRupiah(totalSebelumPajak);
    document.getElementById('totalPajak').innerText = formatRupiah(totalPajak);
    document.getElementById('totalSetelah').innerText = formatRupiah(totalSetelahPajak);
}

function formatRupiah(angka) {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(angka);
}