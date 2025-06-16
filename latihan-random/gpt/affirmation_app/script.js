const affirmations = [
    "Saya layak untuk bahagia dan sukses.",
    "Saya bisa melewati hari ini dengan tenang dan percaya diri.",
    "Saya berkembang setiap hari, sekecil apa pun itu.",
    "Saya pantas dihargai dan mencintai diri sendiri.",
    "Saya fokus pada hal-hal yang bisa saya kontrol.",
    "Saya memilih untuk tetap bersyukur dalam segala keadaan.",
    "Saya percaya proses hidup saya."
];

function getTodayAffirmation() {
    const today = new Date();
    const dayIndex = today.getDate() % affirmations.length;
    return affirmations[dayIndex];
}

function showDate() {
    const today = new Date();
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    document.getElementById('dateText').textContent = today.toLocaleDateString('id-ID', options);
}

document.addEventListener("DOMContentLoaded", () => {
    const affirmationText = getTodayAffirmation();
    document.getElementById('affirmation').textContent = affirmationText;

    showDate();

    document.getElementById('copyBtn').addEventListener('click', () => {
        navigator.clipboard.writeText(affirmationText).then(() => {
            alert("Afirmasi disalin ke clipboard!");
        });
    });
});