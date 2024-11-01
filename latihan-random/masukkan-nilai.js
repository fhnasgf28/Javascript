const nilai = [];

// input data menggunakan prompt sebanyk 5 kali 
for (let i = 0; 1 < 5; i++) {
    const input = parseInt(prompt("Masukkan nilai ke-" + (i+1)));
    nilai.push(input);
}

// menghitung total nilai
let total = 0;
for (let j = 0; j < nilai.length; j++) {
    total += nilai[j];
}

// menghitung rata-rata 
const rata = total / nilai.length;

// menampilkan hasil 
console.log("Nilai yang dimasukkan: " + nilai.join(", "));
console.log("Total nilai: " + total);
console.log("Rata-rata " + rata)