function create(sentences) {
    let contentElement = document.getElementById('content');
    sentences.forEach(s => {
        let divElement = document.createElement('div');
        let paragraphElement = document.createElement('p');

        paragraphElement.textContent = s;
        paragraphElement.style.display = 'none';

        divElement.appendChild(paragraphElement);
        contentElement.appendChild(divElement);
    });

    function onClick(e) {
        let paragraphElement = e.target.getElementsByTagName('p')[0];
        paragraphElement.style.display = "block";
    }

    contentElement.addEventListener('click', onClick);
}