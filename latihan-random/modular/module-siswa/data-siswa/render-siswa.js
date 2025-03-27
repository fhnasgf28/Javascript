import { getSemuaSiswa } from "./data-siswa";

// render data siswa ke dom
export function renderSiswa() {
    const container = document.getElementById('siswa-container')
    const data = getSemuaSiswa()

    let html = '<ul>'
    data.forEach(siswa => {
        html += `<li>${siswa.nama} - ${siswa.kelas} - ${siswa.nilai} - ${siswa.kota}</li>`
    })
    html += '</ul>'
    container.innerHTML = html
    console.log(html)
    console.log(container)
    console.log(data)
}