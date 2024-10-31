document.getElementById('searchForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const StudentName = document.getElementById('studentName').value.toLowerCase();
    const resultsDiv = document.getElementById('result');
    resultsDiv.innerHTML = '';

    // contoh data JSON siswa dan nilai akademiknya 
    const students = [
        // tambahkan data json 10 data
        { "name": "John Doe", "grades": { "math": 85, "english": 92, "science": 78 } },
        { "name": "Jane Smith", "grades": { "math": 90, "english": 88, "science": 84 } },
        { "name": "Emily Johnson", "grades": { "math": 76, "english": 95, "science": 80 }},
        { "name": "Michael Brown", "grades": { "math": 92, "english": 89, "science": 92 } },
        { "name": "Sarah Davis", "grades": { "math": 88, "english": 85, "science": 90 } },
        { "name": "David White", "grades": { "math": 94, "english": 91, "science": 94 } },
        { "name": "Olivia Taylor", "grades": { "math": 80, "english": 87, "science": 82 } },    
        { "name": "James Wilson", "grades": { "math": 92, "english": 89, "science": 92 } },
        { "name": "Ava Martinez", "grades": { "math": 88, "english": 85, "science": 90 } },
        { "name": "Benjamin Anderson", "grades": { "math": 94, "english": 91, "science": 94 } } 
    ]

    const student = students.find(s => s.name.toLowerCase() === StudentName);

    if (student){
        resultsDiv.innerHTML = `
        <h2>${student.name}</h2>
        <p>Nilai Matematika: ${student.grades.math}</p>
        <p>Nilai Bahasa Inggris: ${student.grades.english}</p>
        <p>Nilai Ilmu Pengetahuan Sosial: ${student.grades.science}</p>
        `;
    } else {
        resultsDiv.innerHTML = '<p>Student not found.</p>';
    }
})