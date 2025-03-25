const arusMudik = [
    {kota: 'Jakarta', jumlah: 1000000},
    {kota: 'Bandung', jumlah: 500000},
    {kota: 'Surabaya', jumlah: 300000},
    {kota: 'Semarang', jumlah: 200000},
    {kota: 'Yogyakarta', jumlah: 150000},
    {kota: 'Malang', jumlah: 100000},
    {kota: 'Solo', jumlah: 50000},
    {kota: 'Pekalongan', jumlah: 40000},
    {kota: 'Cirebon', jumlah: 30000},
    {kota: 'Tegal', jumlah: 20000},
    {kota: 'Purwokerto', jumlah: 10000},
    {kota: 'Purworejo', jumlah: 5000},
    {kota: 'Purbalingga', jumlah: 4000},
]

function hitungTotalArusMudik(data) {
    let total = 0
    for (let i = 0; i < data.length; i++) {
        total += data[i].jumlah
    }
    return total
}

// menghitung total arus mudik
const totalArusMudik = hitungTotalArusMudik(arusMudik)
console.log(`Total arus mudik: ${totalArusMudik}`)