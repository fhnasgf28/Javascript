document.getElementById('zakatForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const jumlahAnggota = parseInt(document.getElementById('jumlahAnggota').value);
    const hargaBeras = parseFloat(document.getElementById('hargaBeras').value);
    
    const zakatFitrahPerOrang = 2.5; // Zakat Fitrah per orang dalam kg
    const totalZakatFitrah = jumlahAnggota * zakatFitrahPerOrang * hargaBeras;
    
    document.getElementById('result').innerText = `Total Zakat Fitrah: Rp${totalZakatFitrah.toFixed(2)}`;
});
