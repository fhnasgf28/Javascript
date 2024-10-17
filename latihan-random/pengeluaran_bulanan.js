// fungsi untuk menghitung total pengeluaran bulanan 
function calculateMonthlyExpenses(expenses) {
    let total = 0;
    for (let i = 0; i < expenses.length; i++){
        total += expenses[i];
    }
    return total;
}

// mendapatkan input dari pengguna 
function getExpenses(){
    let expenses = [];
    let numberOfExpenses = parseInt(pr("Enter the number of expenses: "));

    for (let i = 0; i < numberOfExpenses; i++){
        let expense = parseFloat(prompt(`Masukkan pengeluaran ke-${i + 1}:`));
        expenses.push(expense);
    }
    return expenses;
}
// menjalankan program
let expenses = getExpenses();
let totalExpenses = calculateMonthlyExpenses(expenses);
console.log(`Total pengeluaran bulanan Anda adalah: Rp ${totalExpenses.toFixed(2)}`);