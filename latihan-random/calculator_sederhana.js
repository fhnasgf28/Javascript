<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Kalkulator</title>
</head>
<body>
    <input id="angka1" type="number" placeholder="Angka 1">
    <input id="angka2" type="number" placeholder="Angka 2">
    <select id="operator">
        <option value="+">+</option>
        <option value="-">-</option>
        <option value="*">*</option>
        <option value="/">/</option>
    </select>
    <button onclick="hitung()">Hitung</button>
    <p id="hasil"></p>

    <script>
        function hitung() {
            const angka1 = parseFloat(document.getElementById('angka1').value);
            const angka2 = parseFloat(document.getElementById('angka2').value);
            const operator = document.getElementById('operator').value;
            const hasil = kalkulator(angka1, angka2, operator);
            document.getElementById('hasil').innerText = `hasil: ${hasil}`;
        }

        function kalkulator(angka1, angka2, operator) {
            switch (operator) {
                case '+':
                    return angka1 + angka2;
                case '-':
                    return angka1 - angka2;
                case '*':
                    return angka1 * angka2;
                case '/':
                    return angka1 / angka2;
                default:
                    return 'Operator tidak dikenal';
            }
        }
    </script>
</body>
</html>
