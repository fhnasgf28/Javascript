let tugas = [];

function tambahTugas() {
    let inputTugas = prompt("Masukkan tugas baru:");
    if (inputTugas){
        tugas.push({nama: inputTugas, selesai: false});
        tampilkanTugas();
    }
}

// fungsi untuk menghapus tugas
function hapusTugas(index) {
    tugas.splice(index, 1);
    tampilkanTugas();
}

function tandaiSelesai(index) {
    tugas[index].selesai = !tugas[index].selesai;
    tampilkanTugas();
}

// function untuk menampilkan daftar tugas

function tampilkanTugas() {
    let output = "";
    for (let i = 0; i < tugas.length; i++) {
        output += `${i + 1}. ${tugas[i].nama}`;
        if (tugas[i].selesai){
            output += "[Selesai]";
        }
        output += "\n"
    }
    alert(output);
}

// Loop utama program
while (true) {
  let pilihan = prompt(
    "Pilih aksi:\n1. Tambah tugas\n2. Hapus tugas\n3. Tandai selesai\n4. Tampilkan tugas\n5. Keluar"
  );

  switch (pilihan) {
    case "1":
      tambahTugas();
      break;
    case "2":
      let indexHapus = prompt("Masukkan nomor tugas yang ingin dihapus:");
      hapusTugas(parseInt(indexHapus) - 1);
      break;
    case "3":
      let indexSelesai = prompt("Masukkan nomor tugas yang ingin ditandai:");
      tandaiSelesai(parseInt(indexSelesai) - 1);
      break;
    case "4":
      tampilkanTugas();
      break;
    case "5":
      alert("Terima kasih!");
      break;
    default:
      alert("Pilihan tidak valid.");
  }

  if (pilihan === "5") {
    break;
  }
}