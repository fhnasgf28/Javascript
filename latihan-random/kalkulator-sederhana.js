const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// fungsi untuk meminta input dan menghitung
rl.question("Masukkan angka pertama:", (input1) => {
    let angka1 = parseFloat(input1);

    rl.question("Masukkan angka kedua:", (input2) => {
        let angka2 = parseFloat(input2);

        rl.question("Masukkan operator (+, -, *, /):", (operator) => {
            let hasil;
            
            if (operasi === '+') {
                hasil = angka1 + angka2;
            } else if (operasi === '-') {
                hasil = angka1 - angka2;
            } else if (operasi === '*') {
                hasil = angka1 * angka2;
            } else if (operasi === '/') {
                hasil = angka1 / angka2;
            } else {
                console.log("Operator tidak valid!");
                rl.close();
                return;
            }

            console.log(`Hasil: ${hasil}`);
            rl.close();
        })
    })
})