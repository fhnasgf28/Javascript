class Person {
  constructor(name) {
    this.name = name;
    this.answers = [];
    this.personalityTraits = {}; // Objek untuk menyimpan skor setiap trait
  }

  addAnswer(question, answer) {
    this.answers.push({ question, answer });
  }

  analyzePersonality(personalityModel) {
    // Contoh model kepribadian Big Five
    const traits = ['Ekstroversi', 'Neurotisisme', 'Terbuka pada Pengalaman', 'Persepsi', 'Kesadaran'];

    // Inisialisasi skor setiap trait
    traits.forEach(trait => {
      this.personalityTraits[trait] = 0;
    });

    // Hitung skor berdasarkan model kepribadian
    this.answers.forEach(({ question, answer }) => {
      // Logika perhitungan skor berdasarkan pertanyaan dan jawaban
      // ... (sesuaikan dengan model kepribadian yang digunakan)
    });

    // Kembalikan hasil analisis
    return this.personalityTraits;
  }
}
