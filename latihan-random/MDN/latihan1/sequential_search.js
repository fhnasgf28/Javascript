const dataBerita = [
    { id: 1, judul: "Hasil Pertandingan Liga Inggris Tadi Malam" },
    { id: 2, judul: "Jadwal Lengkap MotoGP 2025 di Mandalika" },
    { id: 3, judul: "Rumor Transfer: Bintang Muda Ini Diincar Real Madrid" },
    { id: 4, judul: "Analisis Taktik: Mengapa Timnas Indonesia Kalah?" },
    { id: 5, judul: "Bursa Transfer Liga 1: Siapa Saja Pemain Baru Persib?" },
    { id: 6, judul: "Hasil Liga Champions: Barcelona Tumbang di Kandang" },
    { id: 7, judul: "Profil Pemain: Mengenal Bintang Baru Timnas Indonesia" }
];

// 2. Fungsi Inti Algoritma Sequential Search
function sequentialSearch(data, keyword) {
    const hasil = [];
    const keywordLower = keyword.toLowerCase();
    // Iterasi/pengecekan satu per satu dari awal sampai akhir
    for (let i = 0; i < data.length; i++) {
        const judulLower = data[i].judul.toLowerCase();
        if (judulLower.includes(keywordLower)) {
            hasil.push(data[i]);
        }
    }
    return hasil;
}
console.log(sequentialSearch(dataBerita, "liga"));
console.log(sequentialSearch(dataBerita, "indonesia"));