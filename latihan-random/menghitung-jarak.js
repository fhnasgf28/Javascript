class Runner {
    constructor(distance, time) {
        this.distance = distance;
        this.time = time;
    }

    calculateSpeed() {
        return this.distance / this.time;
    }
}

// input data 
const distance = prompt("Masukkan jarak perjalanan (km): ");
const time = prompt("Masukkan waktu perjalanan (jam): ");

// membuat objek runner
const runner = new Runner(parseFloat(distance), parseFloat(time));

// menghitung kecepatan
const speed = runner.calculateSpeed();

// menampilkan hasil
console.log(`Kecepatan kendaraan: ${speed} km/jam`);