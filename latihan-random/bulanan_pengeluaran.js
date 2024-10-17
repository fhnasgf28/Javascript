const readline = require('readline');

// membuat antarmuka readline 
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// fungsi untk menghitung total pengeluaran bulanan 
function calculateMonthlyExpenses(expenses) {
    return expenses.reduce((total, expenses) => total + expenses, 0);
}

// mendapatkan input dari pengguna 

function getExpenses() {
    return new Promise((resolve, reject) => {
        rl.question('Masukkan pengeluaran bulanan Anda: ', (answer) => {
            const expenses = answer.split(',').map(parseFloat);
            if (isNaN(expenses)) {
                reject('Input harus berupa angka!');
            } else {
                resolve(expenses);
            }
        });
    });
}

// menjjakan tugas

async function main() {
    try {
        const expenses = await getExpenses();
        const totalExpenses = calculateMonthlyExpenses(expenses);
        console.log(`Total pengeluaran bulanan Anda adalah: Rp ${totalExpenses.toFixed(2)}`);
    } catch (error) {
        console.error(error);
    } finally {
        rl.close();
    }
}

main();