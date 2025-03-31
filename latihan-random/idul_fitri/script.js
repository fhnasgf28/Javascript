function ucapkanSelamatIdulFitri() {
    const hari = new Date().getDay(); // 0 = Minggu, 1 = Senin, ..., 6 = Sabtu
    const jam = new Date().getHours();

    const ucapanIdulFitri = "Selamat Hari Raya Idul Fitri 1445H!";
    const pesanTakbiran = "Malam ini kita takbiran! Gema takbir berkumandang, mari sambut hari kemenangan dengan suka cita.";
    const pesanTidur = "Malam ini tidak ada takbiran, saatnya istirahat yang cukup. Selamat tidur!";

    document.getElementById("ucapan").textContent = ucapanIdulFitri;

    // Asumsi: Malam takbiran adalah malam sebelum Idul Fitri (21:00 - 05:00)
    if (jam >= 21 || jam < 5) {
        document.getElementById("pesan").textContent = pesanTakbiran;
    } else {
        document.getElementById("pesan").textContent = pesanTidur;
    }
}

ucapkanSelamatIdulFitri();