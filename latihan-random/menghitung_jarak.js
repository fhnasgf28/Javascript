// fungsi untuk menghitung jarak
function calculateDistance(speed, time){
    return speed * time;
}

// mendapatkan input dari pengguna
const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

// meminta pengguna memasukan kecepatan
rl.question("Masukkan kecepatan kendaraan (km/h): ", (speedInput) => {
    const speed = parseFloat(speedInput);
    // meminta pengguna memasukan waktu
    rl.question("Masukkan waktu (menit): ", (timeInput) => {
        const time = parseFloat(timeInput);
        const distance = calculateDistance(speed, time);
        console.log(`Jarak yang ditempuh: ${distance} km`);
        rl.close();
    })
})