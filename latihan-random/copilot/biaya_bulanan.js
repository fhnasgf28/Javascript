let transaction = [];

function addTransaction(type, amount, description) {
    const transaction = {
        type: type,
        amount: amount,
        description: description,
        date : new Date().toISOString()
    };
    transaction.push(transaction)
}

addTransaction('income', 5000, 'Gaji bulan Oktober');
addTransaction('expense', 1500, 'Belanja bulanan');
console.log(transactions);

function exportJsonFile(transaction) {
    const jsonString = JSON.stringify(transactions)
    const fs = require('fs');
    fs.writeFile('transactions.json', jsonString, 'utf8', (err) => {
        if (err) {
            console.error('Error menulis file:', err);
        } else {
            console.log('Data berhasil diexport ke transactions.json');
        }
    });
}

exportToJsonFile(transactions);