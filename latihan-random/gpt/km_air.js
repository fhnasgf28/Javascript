const fs = require('fs');

const FILE_DATA = 'data_rumah.json';

function muatData() {
  try {
    const data = fs.readFileSync(FILE_DATA, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
}

function simpanData(dataRumah) {
  fs.writeFileSync(FILE_DATA, JSON.stringify(dataRumah, null, 4));
}

function hitungPenggunaanKm(pembacaanSekarang, pembacaanKemarin) {
  return pembacaanSekarang - pembacaanKemarin;
}

function tambahDataRumah(dataRumah, nomorRumah, pembacaanKemarin, pembacaanSekarang) {
  dataRumah.push({
    nomorRumah: nomorRumah,
    pembacaanKemarin: pembacaanKemarin,
    pembacaanSekarang: pembacaanSekarang,
  });
}

function laporanPenggunaanKm(dataRumah) {
  console.log('\nLaporan Penggunaan KM Air:');
  console.log('-------------------------');
  dataRumah.forEach(rumah => {
    const penggunaan = hitungPenggunaanKm(rumah.pembacaanSekarang, rumah.pembacaanKemarin);
    console.log(`Nomor Rumah: ${rumah.nomorRumah}, Penggunaan: ${penggunaan} KM`);
  });
}

function main() {
  const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  let dataRumah = muatData();

  function tampilMenu() {
    console.log('\nMenu:');
    console.log('1. Tambah Data Rumah');
    console.log('2. Laporan Penggunaan KM Air');
    console.log('3. Keluar');

    readline.question('Masukkan pilihan: ', pilihan => {
      switch (pilihan) {
        case '1':
          readline.question('Nomor Rumah: ', nomorRumah => {
            readline.question('Pembacaan KM Air Bulan Lalu: ', pembacaanKemarin => {
              readline.question('Pembacaan KM Air Bulan Ini: ', pembacaanSekarang => {
                pembacaanKemarin = parseFloat(pembacaanKemarin);
                pembacaanSekarang = parseFloat(pembacaanSekarang);
                if (isNaN(pembacaanKemarin) || isNaN(pembacaanSekarang)) {
                  console.log('Input tidak valid. Pastikan Anda memasukkan angka.');
                } else {
                  tambahDataRumah(dataRumah, nomorRumah, pembacaanKemarin, pembacaanSekarang);
                  simpanData(dataRumah);
                  console.log('Data rumah berhasil ditambahkan.');
                }
                tampilMenu();
              });
            });
          });
          break;
        case '2':
          laporanPenggunaanKm(dataRumah);
          tampilMenu();
          break;
        case '3':
          console.log('Program berakhir.');
          readline.close();
          break;
        default:
          console.log('Pilihan tidak valid.');
          tampilMenu();
      }
    });
  }
  tampilMenu();
}

main();