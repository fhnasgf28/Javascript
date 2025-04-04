const attendanceMap = new Map();

export function tandaiHadir(idKaryawan) {
    attendanceMap.set(idKaryawan, true);
    console.log(`Karyawan dengan ID ${idKaryawan} telah ditandai hadir.`);
}

export function cekKehadiran(idKaryawan) {
    return attendanceMap.get(idKaryawan) === true;
}

export function resetAbsensi() {
    attendanceMap.clear();
    console.log("Absensi telah direset.");
}