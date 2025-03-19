const { resolve } = require("path");

const pertanyaan = [
    "Ceritakan tentang pengalaman kerja Anda?",
    "Apa yang Anda ketahui tentang JavaScript?",
    "Bagaimana cara menangani error dalam JavaScript?",
]

function wawancara(nama){
    return new Promise((resolve) => {
        const index = Math.floor(Math.random() * pertanyaan.length)
        console.log(`Halo ${nama}, ${pertanyaan[index]}`);
        setTimeout(() => {
            resolve(`Halo ${nama}, sedang berpikir... Jawaban akan segera muncul.`);
        })
    })
}

wawancara("Alice").then((jawaban) => console.log(jawaban));