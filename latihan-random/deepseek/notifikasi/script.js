const notifyButton = document.getElementById('showNotification');
const notification = document.getElementById('notification');

notifyButton.addEventListener('click', () => {
    notification.classList.add('han');
    setTimeout(() => {
        notification.classList.remove('han');
    }, 3000);
});