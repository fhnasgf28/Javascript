let daftarSiswa = [];
let editIndex = -1; 

function tambahSiswa() {
    const nama = document.getElementById('nama_siswa').value.trim();
    const kelas = document.getElementById('kelas').value.trim();
    const nilai = parseFloat(document.getElementById('nilai').value.trim());

    if (nama === "" || kelas === "" || isNaN(nilai)) {
        alert('Semua field harus diisi!');
        return;
    }

    const siswa = { nama, kelas, nilai };

    if (editIndex === -1) {
        // Tambah baru
        daftarSiswa.push(siswa);
    } else {
        // Edit data lama
        daftarSiswa[editIndex] = siswa;
        editIndex = -1;  // Reset setelah edit
    }

    resetForm();
    tampilkanSiswa();
}

function tampilkanSiswa() {
    const tabel = document.getElementById('tabel_siswa');
    tabel.innerHTML = '';

    daftarSiswa.forEach((siswa, index) => {
        const row = tabel.insertRow();
        row.insertCell(0).innerText = index + 1;
        row.insertCell(1).innerText = siswa.nama;
        row.insertCell(2).innerText = siswa.kelas;
        row.insertCell(3).innerText = siswa.nilai;

        const aksiCell = row.insertCell(4);
        aksiCell.innerHTML = `
            <button onclick="editSiswa(${index})">Edit</button>
            <button onclick="hapusSiswa(${index})">Hapus</button>
        `;
    });
}

function resetForm() {
    document.getElementById('nama_siswa').value = '';
    document.getElementById('kelas').value = '';
    document.getElementById('nilai').value = '';
}

function editSiswa(index) {
    const siswa = daftarSiswa[index];
    document.getElementById('nama_siswa').value = siswa.nama;
    document.getElementById('kelas').value = siswa.kelas;
    document.getElementById('nilai').value = siswa.nilai;
    editIndex = index;
}

function hapusSiswa(index) {
    daftarSiswa.splice(index, 1);
    tampilkanSiswa();
}

tampilkanSiswa();