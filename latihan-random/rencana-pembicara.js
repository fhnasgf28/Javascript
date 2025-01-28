class SpeakingPracticePlanner {
    constructor() {
        this.practicePlans = [];
    }
    addPractice(topic, durationMinutes, practiceDate) {
       if (durationMinutes <= 0) {
           throw new Error("Duration must be greater than 0");
       }
    
        const newPractice = {
            topic,
            durationMinutes,
            practiceDate: new Date(practiceDate),
            isCompleted: false,
            notes: []
        };
        this.practicePlans.push(newPractice);
        return "Practice added successfully";
    }

    completePractice(index) {
        if (index < 0 || index >= this.practicePlans.length){
            throw new Error("Invalid practice index");
        }
        this.practicePlans[index].isCompleted = true;
        return `Latihan "${this.practicePlans[index].topic}" telah selesai`;
    }

    addNotesPractice(index, note) {
        if (index < 0 || index >= this.practicePlans.length){
            throw new Error("Invalid practice index");
        }

        this.practicePlans[index].notes.push(note);
        return "Catatan berhasil ditambahkan";
    }

    getProgress() {
        const completed = this.practicePlans.filter(p => p.isCompleted).length;
        return `Progress: ${completed}/${this.practicePlans.length} (${Math.round((completed/this.practicePlans.length) * 100 )}%)latihan selesai`;
    }
    displayPlans() {
        console.log("\n=== Rencana Latihan Public Speaking ===");
        this.practicePlans.forEach((plan, index) => {
            console.log(`
[${index + 1}] Topik: ${plan.topic}
   Durasi: ${plan.durationMinutes} menit
   Tanggal: ${plan.practiceDate.toLocaleDateString()}
   Status: ${plan.isCompleted ? "✅ Selesai" : "🕒 Belum"}
   Catatan: ${plan.notes.join(", ") || "Tidak ada catatan"}
            `);
        });
        console.log(this.getProgress());
    }
}

// Contoh penggunaan
const planner = new SpeakingPracticePlanner();

// Menambahkan beberapa rencana latihan
planner.addPractice("Teknik Bicara di Depan Umum", 45, "2024-03-20");
planner.addPractice("Manajemen Nervous", 30, "2024-03-21");
planner.addPractice("Pembukaan Presentasi yang Menarik", 60, "2024-03-22");

// Menandai satu latihan selesai
planner.completePractice(0);

// Menambahkan catatan
planner.addNotesPractice(0, "Perlu memperbaiki kontak mata");

// Menampilkan semua rencana
planner.displayPlans();