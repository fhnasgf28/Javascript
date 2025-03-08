// key penyimpanan di local storage
const localStorageKey = 'karyawan_data';

// load data dari local storage
function loadData() {
    return JSON.parse(localStorage.getItem(localStorageKey) || '[]');
}

// simpan data ke local storage
function saveData(data) {
    localStorage.setItem(localStorageKey, JSON.stringify(data));
}

// menampilkan daftar karyawan 
function lihatKaryawan() {
    let karyawan = loadData();
    console.log("\nDaftar Karyawan:");
    if (karyawan.length === 0) {
        console.log("Tidak ada data karyawan.");
        return;
    }
    karyawan.forEach((karyawan, index) => {
        console.log(`${index + 1}. ${karyawan.nama} - ${karyawan.jabatan}`);
    });
    console.log();
}

// menambahkan karyawan baru
function tambahKaryawan() {
    let id = prompt("Masukkan ID karyawan:");
    let nama = prompt("Masukkan nama karyawan:");
    let jabatan = prompt("Masukkan jabatan karyawan:");
    let gaji = parseFloat(prompt("Masukkan gaji karyawan:"));

    let karyawan = loadData();
    karyawan.push({ id, nama, jabatan, gaji });
    saveData(karyawan);
    console.log(`Karyawan dengan ID ${id} berhasil ditambahkan.`);
}

// memperbaharui data karywan 
function perbaruiKaryawan() {
    let id = prompt("Masukkan ID karyawan yang ingin diperbarui:");
    let karyawan = loadData();

    let karyawanDitemukan = karyawan.find(k => k.id === id);
    if (!karyawanDitemukan) {
        console.log(`Karyawan dengan ID ${id} tidak ditemukan.`);
        return;
    }
    console.log("1.perbarui jabatan");
    console.log("2.perbarui gaji");
    let pilihan = parseInt(prompt("Masukkan pilihan:"));
    if (pilihan === 1){
        let jabatanBaru = prompt("Masukkan jabatan baru:");
        karyawanDitemukan.jabatan = jabatanBaru;
    }else if (pilihan === 2){
        let gajiBaru = parseFloat(prompt("Masukkan gaji baru:"));
        karyawanDitemukan.gaji = gajiBaru;
    }else {
        console.log("Pilihan tidak valid.");
        return;
    }

    saveData(karyawan);
    console.log(`Data karyawan dengan ID ${id} berhasil diperbarui.`);
}

// menghapus data karyawan 
function hapusKaryawan() {
    let id = prompt("Masukkan ID karyawan yang ingin dihapus:");
    let karyawan = loadData();
    let karyawanDitemukan = karyawan.find(k => k.id === id);
    if (!karyawanDitemukan) {
        console.log(`Karyawan dengan ID ${id} tidak ditemukan.`);
        return;
    }
    let index = karyawan.indexOf(karyawanDitemukan);
    karyawan.splice(index, 1);
    saveData(karyawan);
    console.log(`Karyawan dengan ID ${id} berhasil dihapus.`);
}

// Menu utama
function main() {
    while (true) {
        console.log("\n🏢 Sistem Manajemen Karyawan 🏢");
        console.log("1. Tambah Karyawan");
        console.log("2. Lihat Daftar Karyawan");
        console.log("3. Perbarui Data Karyawan");
        console.log("4. Hapus Karyawan");
        console.log("5. Keluar");

        let pilihan = prompt("Pilih menu (1-5):");

        if (pilihan === "1") {
            tambahKaryawan();
        } else if (pilihan === "2") {
            lihatKaryawan();
        } else if (pilihan === "3") {
            perbaruiKaryawan();
        } else if (pilihan === "4") {
            hapusKaryawan();
        } else if (pilihan === "5") {
            console.log("🚀 Terima kasih! Sampai jumpa.");
            break;
        } else {
            console.log("❌ Pilihan tidak valid, coba lagi.\n");
        }
    }
}

// Jalankan program
main();