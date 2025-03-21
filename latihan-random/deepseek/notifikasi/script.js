// Ambil elemen tombol dan notifikasi
const notifySuccessButton = document.getElementById('notifySuccess');
const notifyErrorButton = document.getElementById('notifyError');
const notificationSuccess = document.getElementById('notificationSuccess');
const notificationError = document.getElementById('notificationError');

// Fungsi untuk menampilkan notifikasi
function showNotification(notification) {
    notification.classList.add('show');

    // Sembunyikan notifikasi setelah 3 detik
    setTimeout(() => {
        notification.classList.remove('show');
    }, 3000); // 3000 milidetik = 3 detik
}

// Tambahkan event listener ke tombol success
notifySuccessButton.addEventListener('click', () => {
    showNotification(notificationSuccess);
});

// Tambahkan event listener ke tombol error
notifyErrorButton.addEventListener('click', () => {
    showNotification(notificationError);
});