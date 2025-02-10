let hutangList = [];

function tambahHutang(nama, jumlah) {
    console.log("Tambah Hutang");
    hutangList.push({
        nama: nama,
        jumlah: jumlah
    });
}

function tampilkanHutang() {
    console.log("Tampilkan Hutang");
    for (let i = 0; i < hutangList.length; i++) {
        console.log(`${hutangList[i].nama}: Rp. ${hutangList[i].jumlah}`);
    }
}

// contoh penggunaan
tambahHutang("Alice", 50000); 
tambahHutang("Bob", 100000); // Menampilkan daftar hutang Alice: Rp. 50000
tampilkanHutang(); // Menampilkan daftar hutang Alice: Rp. 50000, Bob: Rp. 100000

// menagih hutang
function menagihHutang(nama) {
    const hutang = hutangList.find(hutang => hutang.nama === nama);
    if (hutang){
        console.log(`Halo ${nama}, kamu masih berhutang sebesar Rp. ${hutang.jumlah}`);
    } else{
        console.log(`Halo ${nama}, kamu tidak memiliki hutang`);
    }
}

// contoh penggunaan
menagihHutang("Alice"); // Menampilkan Halo Alice, kamu masih berhutang sebesar Rp. 50000
menagihHutang("Charlie"); // Menampilkan Halo Charlie, kamu tidak memiliki hutang
menagihHutang("Bob"); // Menampilkan Halo Bob, kamu masih berhutang sebesar Rp. 100000

// menghapus hutang
function hapusHutang(nama){
    const index = hutangList.findIndex(hutang => hutang.name === nama);
    if (index !== -1){
        hutangList.splice(index, 1);
        console.log(`Hutang ${nama} berhasil dihapus`);
    }else{
        console.log(`Hutang ${nama} tidak ditemukan`);
    }
}

// contoh penggunaan
hapusHutang("Alice"); // Menampilkan Hutang Alice berhasil dihapus
tampilkanHutang(); // Menampilkan daftar hutang Bob: Rp. 100000

while (true) {
    const aksi = input("Pilih aksi: 1. Tambah Hutang 2. Tampilkan Hutang 3. Tagih Hutang 4. Hapus Hutang 5. Keluar");
    
    if (aksi === "1") {
        const nama = prompt("Masukkan nama:");
        const jumlah = parseFloat(prompt("Masukkan jumlah hutang:"));
        tambahHutang(nama, jumlah);
    } else if (aksi === "2") {
        tampilkanHutang();
    } else if (aksi === "3") {
        const nama = prompt("Masukkan nama yang ingin ditagih:");
        menagihHutang(nama);
    } else if (aksi === "4") {
        const nama = prompt("Masukkan nama yang ingin dihapus:");
        hapusHutang(nama);
    } else if (aksi === "5") {
        break;
    } else {
        console.log("Pilihan tidak valid.");
    }
}