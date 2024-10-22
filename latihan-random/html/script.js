const surahNames = [
    "Al-Fatihah", "Al-Baqarah", "Ali 'Imran", "An-Nisa'", "Al-Ma'idah",
    "Al-An'am", "Al-A'raf", "Al-Anfal", "At-Tawbah", "Yunus",
    "Hud", "Yusuf", "Ar-Ra'd", "Ibrahim", "Al-Hijr",
    "An-Nahl", "Al-Isra", "Al-Kahf", "Maryam", "Ta-Ha",
    "Al-Anbiya", "Al-Hajj", "Al-Mu'minun", "An-Nur", "Al-Furqan",
    "Ash-Shu'ara", "An-Naml", "Al-Qasas", "Al-Ankabut", "Ar-Rum",
    "Luqman", "As-Sajda", "Al-Ahzab", "Saba", "Fatir",
    "Ya-Sin", "As-Saffat", "Sad", "Az-Zumar", "Ghafir",
    "Fussilat", "Ash-Shura", "Az-Zukhruf", "Ad-Dukhan", "Al-Jathiya",
    "Al-Ahqaf", "Muhammad", "Al-Fath", "Al-Hujurat", "Qaf",
    "Adh-Dhariyat", "At-Tur", "An-Najm", "Al-Qamar", "Ar-Rahman",
    "Al-Waqi'a", "Al-Hadid", "Al-Mujadila", "Al-Hashr", "Al-Mumtahana",
    "As-Saff", "Al-Jumu'a", "Al-Munafiqun", "At-Taghabun", "At-Talaq",
    "At-Tahrim", "Al-Mulk", "Al-Qalam", "Al-Haaqqa", "Al-Ma'arij",
    "Nuh", "Al-Jinn", "Al-Muzzammil", "Al-Muddathir", "Al-Qiyama",
    "Al-Insan", "Al-Mursalat", "An-Naba", "An-Nazi'at", "Abasa",
    "At-Takwir", "Al-Infitar", "Al-Mutaffifin", "Al-Inshiqaq", "Al-Burooj",
    "At-Tariq", "Al-A'la", "Ghashiya", "Al-Fajr", "Al-Balad",
    "Ash-Shams", "Al-Lail", "Ad-Dhuha", "Al-Inshirah", "At-Tin",
    "Al-Alaq", "Al-Qadr", "Al-Bayyina", " Az-Zalzala", "Al-Adiyat",
    "Al-Qari'a", "At-Takathur", "Al-Asr", "Al-Humaza", "Al-Fil",
    "Quraysh", "Al-Ma'un", "Al-Kawthar", "Al-Kafirun", "An-Nasr",
    "Al-Lahab", "Al-Ikhlas", "Al-Falaq", "An-Nas"
];

// mendapatkan element-element HTML
const surahNumberInput = document.getElementById('suraNumber');
const findSurahButton = document.getElementById('findSurah');
const resultElement = document.getElementById('result');

// menambahkan event listener pada tombol cari 
findSurahButton.addEventListener('click', (e) => {
    e.preventDefault(); // mencegah form di-submit

    // mengambil nilai input dari pengguna
    const surahNumber = parseInt(surahNumberInput.value);

    // menampilkan hasil
    resultElement.textContent = `Nama Surat; ${surahNames[surahNumber - 1]}`;
})