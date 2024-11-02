document.getElementById('addSubject').addEventListener('click', addSubject);
document.getElementById('calculateAverage').addEventListener('click', calculateAverage);

let subjects = [];

function addSubject() {
    const inputFields = document.getElementById('inputFields');
    const subjectDiv = document.createElement('div');
    subjectDiv.classList.add('subject');

    subjectDiv.innerHTML = `
        <input type="text" placeholder="Masukkan pelajaran" class="subject-name" required>
        <input type="number" placeholder="Masukkan nilai" class="subject-score" required>
        <button class="removeSubject">Hapus</button>
    `;

    inputFields.appendChild(subjectDiv);
    subjects.push(subjectDiv);

    // eventi listener untuk tombol hapus
    subjectDiv.querySelector('.removeSubject').addEventListener('click', function() {
        inputFields.removeChild(subjectDiv);
        subjects = subjects.filter(sub => sub !== subjectDiv);
    });
}

function calculateAverage() {
    let totalScore = 0;
    let count = 0;

    subjects.forEach(subjectDiv => {
        const subjectName = subjectDiv.querySelector('.subject-name').value;
        const subjectScore = parseFloat(subjectDiv.querySelector('.subject-score').value);

        // pastikan nilai tidak kosong dalam rentang yang valid
        if (subjectName && !isNaN(subjectScore) && subjectScore >= 0 && subjectScore <= 100) {
            totalScore += subjectScore;
            count++;
        }
    });

    const resultDiv = document.getElementById('result');
    if (count > 0) {
        const average = totalScore / count;
        resultDiv.innerText = `Rata-rata nilai pelajaran: ${average.toFixed(2)}`;
    } else {
        resultDiv.innerText = 'Tidak ada pelajaran yang dimasukkan';
    }
}