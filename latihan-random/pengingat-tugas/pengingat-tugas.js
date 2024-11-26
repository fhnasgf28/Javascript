// Daftar tugas
let tugas = [];

// fungsi untuk menambahkan tugas baru
function tambahTugas(namaTugas) {
    tugas.push({ nama: namaTugas, selesai: false });
    console.log(`Tugas "${namaTugas}" telah di tambahkan`)
}

// fungsi untuk menampilkn daftar tugas
function tampilkanTugas() {
    console.log("Daftar Tugas: ")
    tugas.forEach((tugas, index) => { 
        console.log(`${index + 1}. ${tugas.nama} - ${tugas.selesai ? 'Selesai' : 'Belum Selesai'}`)
    })
}

// fungsi untuk menandai tugas selesai 
function tandaiSelesai(index) {
    if (index >= 0 && index < tugas.length) {
        tugas[index].selesai = true;
        console.log(`Tugas "${tugas[index].nama}" telah ditandai sebagai selesai.`);
    } else {
        console.log("Tugas tidak ditemukan")
    }
}

// Contoh penggunaan fungsi 
tambahTugas("Mengerjakan PR Matematika"); 
tambahTugas("Membersihkan Kamar"); 
tampilkanTugas(); 
tandaiSelesai(0); 
tampilkanTugas();