document.getElementById('calculateButton').addEventListener('click', () => {
    // total halaman alquran
    const totalPages = 604;
    const pagesPerday = parseInt(document.getElementById('pagesPerDay').value);

    // validasi input
    if (!pagesPerday || pagesPerday <= 0) {
        document.getElementById('result').innerText = 'Masukkan jumlah halaman yang valid.';
        return;
    }

    // menghitung jumlah hari
    const totalDays = Math.ceil(totalPages / pagesPerday);
    // menampilkan hasil
    document.getElementById('result').textContent = `Anda akan selesai membaca Al-Qur'an dalam ${totalDays} hari jika Anda membaca ${pagesPerday} halaman setiap hari.`;
});