const button = document.getElementById("btn");
const output = document.getElementById("output");

function ambilData() {
  // Implementasi fungsi ambilData
  return new Promise((resolve, reject) => {
    console.log("Mengambil data...");
    setTimeout(() => {
      const data = "Data dari server";
      console.log("Data berhasil diambil");
      resolve(data);
    }, 2000);
  });
}

async function tampilkanData() {
    console.log("Menampilkan data dimulai...");
    output.innerText = "Memuat data...";
    try {
        const hasil = await ambilData();
        output.innerText = hasil;
    } catch (error) {
        output.innerText = "Terjadi kesalahan";
    }
    console.log("Menampilkan data selesai...");
}

button.addEventListener("click", tampilkanData);