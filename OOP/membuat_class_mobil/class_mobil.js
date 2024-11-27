class Mobil {
    constructor(merek, model, tahun, warna) {
        this.merek = merek;
        this.model = model;
        this.tahun = tahun;
        this.warna = warna;
    }

    start() {
        console.log("Mobil dinyalakan");
    }

    stop() {
        console.log("mobil dimatikan")
    }
}

// membuat objek mobil
const mobilku = new Mobil("Toyota","Corolla", 2023, "Putih");
mobilku.start();
mobilku.stop();