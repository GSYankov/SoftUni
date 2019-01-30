function solve() {
    let createTitleElement = document.getElementById('createTitle');
    let createTitleValue = document.getElementById('createTitle').value;

    let createContentElement = document.getElementById('createContent');
    let createContentValue = document.getElementById('createContent').value;

    if (createTitleValue && createContentValue) {
        let titleElement = document.createElement("h3");
        titleElement.textContent = createTitleValue;

        let contentElement = document.createElement("p");
        contentElement.textContent = createContentValue;

        let articleElement = document.createElement("article");
        articleElement.appendChild(titleElement);
        articleElement.appendChild(contentElement);

        let articleElements = document.getElementById("articles")
        articleElements.appendChild(articleElement);

        createTitleElement.value="";
        createContentElement.value="";
    }
}