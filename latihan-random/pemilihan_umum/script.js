const votingForm = document.getElementById('votingForm');
const resultDiv = document.getElementById('result');

let votes = {
    calon1: 0,
    calon2: 0,
    calon3: 0
};

votingForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const selectedCandidate = document.getElementById('candidate').value;
    votes[selectedCandidate]++;
    displayResult();
})

function displayResult() {
    resultDiv.innerHTML = `
        <h2>Hasil Pemilihan</h2>
        <p>Calon 1: ${votes.calon1} suara</p>
        <p>Calon 2: ${votes.calon2} suara</p>
        <p>Calon 3: ${votes.calon3} suara</p>
    `
}