// public-speaker.js

// Daftar topik yang akan dibahas
const topics = [
    "Introduction to Public Speaking",
    "Body Language",
    "Voice Modulation",
    "Audience Engagement",
    "Handling Q&A",
    "Overcoming Stage Fright",
    "Using Visual Aids",
    "Storytelling Techniques"
];

// Fungsi untuk memilih topik secara acak
function getRandomTopic() {
    const randomIndex = Math.floor(Math.random() * topics.length);
    return topics[randomIndex];
}

// Fungsi untuk merencanakan latihan
function planPracticeSessions(numberOfSessions) {
    const practicePlan = [];
    for (let i = 0; i < numberOfSessions; i++) {
        practicePlan.push({
            session: i + 1,
            topic: getRandomTopic()
        });
    }
    return practicePlan;
}

// Contoh penggunaan
const numberOfSessions = 5;
const practicePlan = planPracticeSessions(numberOfSessions);

console.log("Practice Plan:");
practicePlan.forEach(session => {
    console.log(`Session ${session.session}: ${session.topic}`);
});