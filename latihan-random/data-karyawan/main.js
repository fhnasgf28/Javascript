import { karyawanList } from "./employee.js";
import { tandaiHadir, cekKehadiran, resetAbsensi } from './attendance.js';

const container = document.getElementById("app");

function tampilkanKaryawan() {
    container.innerHTML = "";

    karyawanList.forEach(karyawan => {
        const div = document.createElement("div");
        div.className = "karyawan";

        const status = cekKehadiran(karyawan.id) ? "Hadir" : "Tidak Hadir";
        div.innerHTML = `
            <h3>${karyawan.nama}</h3>
            <p>Jabatan: ${karyawan.jabatan}</p>
            <p>Gaji: Rp${karyawan.gaji.toLocaleString()}</p>
            Status: <span class="status">${status}</span><br>
            <button>Absen</button>
        `;

        const btn = div.querySelector("button");
        btn.addEventListener('click', () => {
            tandaiHadir(karyawan.id);
            tampilkanKaryawan();
        });

        container.appendChild(div);
    });
}

document.getElementById("resetBtn").addEventListener('click', () => {
    resetAbsensi();
    tampilkanKaryawan();
});

tampilkanKaryawan();