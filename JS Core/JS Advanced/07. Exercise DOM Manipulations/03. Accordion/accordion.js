function toggle() {
    let hiddenElement = document.getElementById('extra');
    let button = document.getElementsByTagName('span')[0];

    if (hiddenElement.style.display === 'none') {
        button.textContent = 'Less';
        hiddenElement.style.display = 'block';
    } else {
        button.textContent = 'More';
        hiddenElement.style.display = 'none';
    }
}