document.getElementById('calculate').addEventListener('click', function() {
    const income = parseFloat(document.getElementById('income').value);
    const expense = parseFloat(document.getElementById('expense').value);

    if (isNaN(income) || isNaN(expense)) {
        document.getElementById('result').innerText = 'Input harus berupa angka!';
        return;
    }

    const balance = income - expense;

    let resultMessage = `Sisa Keuangan: Rp ${balance.toFixed(2)}`;
    if (balance < 0) {
        resultMessage += ' (Anda memiliki utang)'
    } else if (balance === 0) {
        resultMessage += ' (Anda tidak memiliki utang)';
    } else {
        resultMessage += ' (Anda tidak memiliki hutang)';
    }
    document.getElementById('result').innerText = resultMessage;
})