import { tambahSiswa, getSemuaSiswa } from "./data-siswa/data-siswa";
import { renderSiswa } from "./data-siswa/render-siswa";
import { formatNilai } from "./data-siswa/utilities";

tambahSiswa({id:6, nama:'Joko', kelas: 'XII', nilai: 75, kota: 'Malang'})
tambahSiswa({id:7, nama:'Sari', kelas: 'XII', nilai: 80, kota: 'Solo'})
tambahSiswa({id:8, nama:'Budi', kelas: 'XII', nilai: 85, kota: 'Pekalongan'})
tambahSiswa({id:9, nama:'Siti', kelas: 'XII', nilai: 90, kota: 'Cirebon'})

// render data siswa ke dom
renderSiswa()
console.log("Format nilai 85:", formatNilai(85)); // Output: B
console.log(getSemuaSiswa())