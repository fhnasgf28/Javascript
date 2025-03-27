// Format nilai ke huruf (A, B, C, etc.)
export function formatNilai(nilai) {
    if (nilai >= 90) return 'A';
    else if (nilai >= 80) return 'B';
    else if (nilai >= 70) return 'C';
    else return 'D';
  }
  
  // Contoh utility lain bisa ditambahkan di sini