// Kelas untuk mengelola penjualan motor
class MotorSales {
    constructor(salesData) {
        this.salesData = salesData;
    }

    // 1. Menghitung total pendapatan
    calculateTotalRevenue() {
        return this.salesData.reduce((total, motor) => total + (motor.price * motor.unitsSold), 0);
    }

    // 2. Menentukan motor terlaris
    findBestSellingMotor() {
        let bestSelling = this.salesData.reduce((best, motor) => 
            (motor.unitsSold > best.unitsSold ? motor : best), this.salesData[0]);
        return bestSelling;
    }

    // 3. Menghitung rata-rata harga jual per unit
    calculateAveragePrice() {
        let totalRevenue = this.calculateTotalRevenue();
        let totalUnits = this.salesData.reduce((total, motor) => total + motor.unitsSold, 0);
        return totalUnits > 0 ? totalRevenue / totalUnits : 0;
    }

    // Menampilkan hasil perhitungan
    displayReport() {
        console.log("=== Laporan Penjualan Motor Honda ===");
        console.log(`Total Pendapatan: Rp${this.calculateTotalRevenue().toLocaleString("id-ID")}`);

        let bestSellingMotor = this.findBestSellingMotor();
        console.log(`Motor Terlaris: ${bestSellingMotor.model} (${bestSellingMotor.unitsSold} unit terjual)`);

        console.log(`Rata-rata Harga Jual per Unit: Rp${this.calculateAveragePrice().toLocaleString("id-ID")}`);
    }
}

// Data penjualan motor Honda
const salesData = [
    { model: "Honda Beat", price: 17000000, unitsSold: 25 },
    { model: "Honda Vario", price: 22000000, unitsSold: 15 },
    { model: "Honda PCX", price: 32000000, unitsSold: 10 },
    { model: "Honda CBR150R", price: 36000000, unitsSold: 5 }
];

// Membuat objek MotorSales
const motorSales = new MotorSales(salesData);

// Menampilkan laporan penjualan
motorSales.displayReport();
