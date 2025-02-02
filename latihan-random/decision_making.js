function pesanTiket() {
    let usia = parseInt(prompt("Masukkan usia Anda:"));

    if (isNaN(usia) || usia < 0) {
        alert("Usia tidak valid! Silakan masukkan angka yang benar.");
        return;
    }

    let kategori;
    if (usia < 5) {
        alert("Maaf, Anda terlalu kecil untuk menonton film di bioskop.");
        return;
    } else if (usia <= 12) {
        kategori = "Anak-anak";
    } else if (usia <= 17) {
        kategori = "Remaja";
    } else {
        kategori = "Dewasa";
    }

    let jenisFilm = prompt("Pilih jenis film (Reguler/Premium):").toLowerCase();
    let hargaTiket;

    switch (jenisFilm) {
        case "reguler":
            hargaTiket = kategori === "Anak-anak" ? 25000 :
                         kategori === "Remaja" ? 35000 : 50000;
            break;
        case "premium":
            hargaTiket = kategori === "Anak-anak" ? 40000 :
                         kategori === "Remaja" ? 50000 : 75000;
            break;
        default:
            alert("Jenis film tidak valid! Pilih antara Reguler atau Premium.");
            return;
    }

    alert(`Kategori Anda: ${kategori}\nJenis Film: ${jenisFilm.charAt(0).toUpperCase() + jenisFilm.slice(1)}\nHarga Tiket: Rp${hargaTiket.toLocaleString()}`);
}

// Panggil fungsi untuk menjalankan program
pesanTiket();
