let hutangList = [];

function tambahHutang(nama, jumlah) {
    hutangList.push({ nama: nama, jumlah: jumlah });
    tampilkanHutang();
}

function tampilkanHutang() {
    const daftarHutang = document.getElementById('daftarHutang');
    daftarHutang.innerHTML = ''; // Kosongkan daftar sebelum menampilkan
    hutangList.forEach(hutang => {
        const li = document.createElement('li');
        li.textContent = `${hutang.nama} berhutang sebesar ${hutang.jumlah}`;
        daftarHutang.appendChild(li);
    });
}

function tagihHutang(nama) {
    const hutang = hutangList.find(hutang => hutang.nama === nama);
    if (hutang) {
        alert(`Halo ${hutang.nama}, Anda masih memiliki hutang sebesar ${hutang.jumlah}. Harap segera melunasi.`);
    } else {
        alert(`Tidak ada hutang yang terdaftar untuk ${nama}.`);
    }
}

function hapusHutang(nama) {
    const index = hutangList.findIndex(hutang => hutang.nama === nama);
    if (index !== -1) {
        hutangList.splice(index, 1);
        alert(`Hutang ${nama} telah dihapus.`);
        tampilkanHutang();
    } else {
        alert(`Tidak ada hutang yang terdaftar untuk ${nama}.`);
    }
}

document.getElementById('tambahHutang').addEventListener('click', () => {
    const nama = document.getElementById('nama').value;
    const jumlah = parseFloat(document.getElementById('jumlah').value);
    if (nama && !isNaN(jumlah)) {
        tambahHutang(nama, jumlah);
        document.getElementById('nama').value = '';
        document.getElementById('jumlah').value = '';
    } else {
        alert('Nama dan jumlah hutang harus diisi.');
    }
});

document.getElementById('tagihHutang').addEventListener('click', () => {
    const nama = document.getElementById('namaTagih').value;
    tagihHutang(nama);
    document.getElementById('namaTagih').value = '';
});

document.getElementById('hapusHutang').addEventListener('click', () => {
    const nama = document.getElementById('namaHapus').value;
    hapusHutang(nama);
    document.getElementById('namaHapus').value = '';
});