document.addEventListener('DOMContentLoaded', function() {
    const approvalMatrix = document.querySelector('#approvalMatrix tbody');
    // print data dummy
    const applications = [
        {
            id: 1,
            name: 'Pengajuan Cuti Tahunan',
            value: '5 Hari',
            approvals: {
                manager: 'Approved',
                supervisor: 'Approved',
                hrd: 'Approved',
                director: 'Approved'
            }
        },
        {
            id: 2,
            name: 'Pengajuan Pembelian Laptop',
            value: 'Rp 15.000.000',
            approvals: {
                manager: 'Approved',
                supervisor: 'Approved',
                hrd: 'Pending',
                director: 'Pending'
            }
        },
        {
            id: 3,
            name: 'Pengajuan Reimburse Biaya Perjalanan',
            value: 'Rp 2.500.000',
            approvals: {
                manager: 'Rejected',
                supervisor: 'Approved', // Walaupun supervisor approve, manager reject
                hrd: 'Pending',
                director: 'Pending'
            }
        },
        {
            id: 4,
            name: 'Pengajuan Pelatihan Karyawan',
            value: '1 Orang',
            approvals: {
                manager: 'Pending',
                supervisor: 'Pending',
                hrd: 'Pending',
                director: 'Pending'
            }
        },
        {
            id: 5,
            name: 'Pengajuan Overtime',
            value: '8 Jam',
            approvals: {
                manager: 'Approved',
                supervisor: 'Approved',
                hrd: 'Approved',
                director: 'Pending'
            }
        },
    ];

    // fungsi untuk mendapatkan status kelas css berdasarkan status teks 
    function getStatusClass(status) {
        if (status === 'Approved') {
            return 'status-approved';
        }
        if (status === 'Rejected') {
            return 'status-rejected';
        }
        else {
            return 'status-pending';
        }
    }
    // fungsi untuk menenetukan status akhir
    function getOverallStatus(approvals){
        const statuses = Object.values(approvals);
        if (statuses.includes('Rejected')) {
            return 'Rejected';
        }
        if (statuses.every(status => status === 'Approved')) {
            return 'Approved';
        }
        return 'Pending';
    }

    // Mengisi tabel dengan data aplikasi
    applications.forEach(app => {
        const row = approvalMatrix.insertRow(); // Buat baris baru

        // Sel untuk Nomor
        const cellNo = row.insertCell();
        cellNo.textContent = app.id;

        // Sel untuk Nama Pengajuan
        const cellName = row.insertCell();
        cellName.textContent = app.name;

        // Sel untuk Nilai/Kuantitas
        const cellValue = row.insertCell();
        cellValue.textContent = app.value;

        // Sel untuk setiap level persetujuan
        const approvalLevels = ['manager', 'supervisor', 'hrd', 'director'];
        approvalLevels.forEach(level => {
            const cell = row.insertCell();
            const status = app.approvals[level];
            cell.textContent = status; // Tampilkan teks status
            cell.classList.add(getStatusClass(status)); // Tambahkan kelas CSS untuk warna
        });

        // Sel untuk Status Akhir
        const cellOverallStatus = row.insertCell();
        const overallStatus = getOverallStatus(app.approvals);
        cellOverallStatus.textContent = overallStatus;
        cellOverallStatus.classList.add(getStatusClass(overallStatus));
    });
});