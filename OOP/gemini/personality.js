class Person {
    constructor(name) {
        this.name = name;
        this.answers = [];
        this.personalityTraits = {};
    }

    addAnswer(question, answer) {
        this.answers.push({question, answer});
    }

    analyzePersonality() {
        const traits = ['Ekstroversi', 'Neurotisisme', 'Terbuka pada Pengalaman', 'Persepsi', 'Kesadaran'];

        // inisialisasi skor setiap trait
        traits.forEach(trait => {
            this.personalityTraits[trait] = 0;
        });

        // hitung skor berdasarkan model kepribadian
        this.answers.forEach(({ question, answer}) => {

        });

        return this.personalityTraits;
    }
}

// Contoh pertanyaan dan bobot untuk model Big Five
const questions = [
    { text: "Apakah Anda suka berinteraksi dengan orang baru?", traits: ['Ekstroversi'] },
    { text: "Apakah Anda sering merasa cemas?", traits: ['Neurotisisme'] },
    // ... tambahkan pertanyaan lain
  ];
  
  // Contoh fungsi untuk menampilkan hasil
  function displayResults(personalityTraits) {
    console.log("Hasil Analisis Kepribadian:");
    for (const trait in personalityTraits) {
      console.log(`${trait}: ${personalityTraits[trait]}`);
    }
  }
  
  // Buat objek Person dan tambahkan jawaban
  const person1 = new Person("Andi");
  person1.addAnswer(questions[0].text, "ya");
  person1.addAnswer(questions[1].text, "kadang");
  // ...
  
  // Analisis kepribadian dan tampilkan hasil
  const personality = person1.analyzePersonality();
  displayResults(personality);