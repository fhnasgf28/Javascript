function calculateTaxZakat() {
    let income = parseFloat(document.getElementById("income").value)
    let taxRate = parseFloat(document.getElementById("taxRate").value) / 100;
    let zakatRate = parseFloat(document.getElementById("zakatRate").value) / 100;

    let tax = income * taxRate;
    let zakat = income * zakatRate;
    let netIncome = income - tax - zakat;

    document.getElementById("taxResult").innerText = "Pajak: Rp " + tax.toLocaleString();
    document.getElementById("zakatResult").innerText = "Zakat: Rp " + zakat.toLocaleString();
            document.getElementById("netIncome").innerText = "Penghasilan Bersih: Rp " + netIncome.toLocaleString();
}   
