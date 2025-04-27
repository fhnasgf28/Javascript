document.addEventListener("DOMContentLoaded", function () {
    const angka1Input = document.getElementById("angka1");
    const angka2Input = document.getElementById("angka2");
    const operationButtons = document.querySelectorAll(".operation");
    const hasilSpan = document.getElementById("hasil");

    operationButtons.forEach(button => {
        button.addEventListener('click', function() {
            const angka1 = parseFloat(angka1Input.value);
            const angka2 = parseFloat(angka2Input.value);
            const operation = this.dataset.operation;
            let result;

            if (isNaN(angka1) || isNaN(angka2)) {
                hasilSpan.textContent = 'Masukkan angka yang valid';
                return;
            }

            switch (operation) {
                case 'add':
                    result = angka1 + angka2;
                    break;
                case 'subtract':
                    result = angka1 - angka2;
                    break;
                case 'multiply':
                    result = angka1 * angka2;
                    break;
                case 'divide':
                    if (angka2 === 0) {
                        hasilSpan.textContent = 'Tidak dapat dibagi dengan nol';
                        return;
                    }
                    result = angka1 / angka2;
                    break;
                default:
                    result = 0;
            }

            hasilSpan.textContent = result;
        });
    });
});