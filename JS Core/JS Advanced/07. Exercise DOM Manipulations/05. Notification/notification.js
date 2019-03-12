function notify(message) {
    let notificationElement = document.getElementById('notification');
    notificationElement.textContent = message;
    notificationElement.style.display = 'block';

    setTimeout(hideNotification, 2000);

    function hideNotification() {
        notificationElement.style.display = 'none';
    }
}