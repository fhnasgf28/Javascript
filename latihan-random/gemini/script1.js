fetch("/Users/farhan/Javascript/latihan-random/gemini/attendance.json")
    .then((response) => response.json())
    .then((data) => {
        const employees = data.employees;

        // fungsi untuk menghitung jam kerja harian
        function calculateDailyHours(timeIn, timeOut) {
            const [inHours, inMinutes] = timeIn.split(':').map(Number);
            const [outHours, outMinutes] = timeOut.split(':').map(Number);
            const inTotalMinutes = inHours * 60 + inMinutes;
            const outTotalMinutes = outHours * 60 + outMinutes;

            const diffMinutes = outTotalMinutes - inTotalMinutes;
            const hours = Math.floor(diffMinutes / 60);
            const minutes = diffMinutes % 60;

            return hours + minutes / 60;
        }

        // fungsi untuk menghitung jam kerja bulanan
        function calculateMonthlyHours(employees) {
            let totalHours = 0;
            employees.attendance.forEach((record) => {
                totalHours += calculateDailyHours(record.timeIn, record.timeOut);
            });
            return totalHours;
        }

        function findTopEmployee(employees) {
            let topEmployee = null;
            let maxHours = 0;

            employees.forEach((employee) => {
                const totalHours = calculateMonthlyHours(employee);
                if (totalHours > maxHours) {
                    maxHours = totalHours;
                    topEmployee = employee;
                }
            });

            return topEmployee;
        }

        // fungsi untuk menghitung rata-rata jam kerja
        function calculateAverageHours(employees) {
            let = totalHours = 0;
            employees.forEach((employee) => {
                totalHours += calculateMonthlyHours(employee);
            })
            return totalHours / employees.length;
        }
        // Menampilkan hasil
    employees.forEach((employee) => {
        console.log(
          `${employee.name} - Total jam kerja: ${calculateMonthlyHours(
            employee
          ).toFixed(2)} jam`
        );
      });
  
      const topEmployee = findTopEmployee(employees);
      console.log(
        `Karyawan dengan jam kerja terbanyak: ${topEmployee.name} (${calculateMonthlyHours(
          topEmployee
        ).toFixed(2)} jam)`
      );
  
      console.log(
        `Rata-rata jam kerja karyawan: ${calculateAverageHours(employees).toFixed(
          2
        )} jam`
      );
    });
  