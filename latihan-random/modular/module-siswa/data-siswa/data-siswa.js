const siswa = [
    {id:1, nama:'Budi', kelas: 'XII', nilai: 80, kota: 'Jakarta'},
    {id:2, nama:'Siti', kelas: 'XII', nilai: 85, kota: 'Bandung'},
    {id:3, nama:'Andi', kelas: 'XII', nilai: 90, kota: 'Surabaya'},
    {id:4, nama:'Dewi', kelas: 'XII', nilai: 95, kota: 'Semarang'},
    {id:5, nama:'Rudi', kelas: 'XII', nilai: 100, kota: 'Yogyakarta'},
]

export function tambahSiswa(newSiswa) {
    siswa.push(newSiswa)
    return siswa
}

export function getSemuaSiswa() {
    return siswa
}

// FUNGSI UNTK FILTER SISWA BERDASARKAN ID
export function filterByKelas(kelas) {
    return siswa.filter(siswa => siswa.kelas === kelas)
}