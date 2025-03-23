// Data absensi karyawan
const absensiKaryawan = [
    { id: 1, nama: "Andi", tanggal: "2025-03-20", status: "Hadir" },
    { id: 2, nama: "Budi", tanggal: "2025-03-20", status: "Izin" },
    { id: 3, nama: "Cici", tanggal: "2025-03-20", status: "Hadir" },
    { id: 4, nama: "Dewi", tanggal: "2025-03-20", status: "Absen" },
    { id: 5, nama: "Eko", tanggal: "2025-03-21", status: "Hadir" },
    { id: 1, nama: "Andi", tanggal: "2025-03-21", status: "Hadir" },
    { id: 2, nama: "Budi", tanggal: "2025-03-21", status: "Hadir" },
];

function cariAbsensi() {
    const tanggal = document.getElementById("tanggal").value;
    const hasil = absensiKaryawan.filter((absensi) => absensi.tanggal === tanggal);
    const tabelBody = document.getElementById("tabelBody");
    tabelBody.innerHTML = "";
    if (hasil.length > 0) {
        hasil.forEach((absensi) => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${absensi.id}</td>
                <td>${absensi.nama}</td>
                <td>${absensi.tanggal}</td>
                <td>${absensi.status}</td>
            `;
            tabelBody.appendChild(row);
        });
    } else {
        tabelBody.innerHTML = '<tr><td colspan="4">Tidak ada data untuk tanggal ini.</td></tr>';
    }
}

window.onload = function() {
    document.getElementById("tabelBody").innerHTML = '<tr><td colspan="4">Pilih tanggal untuk melihat absensi.</td></tr>';
  };