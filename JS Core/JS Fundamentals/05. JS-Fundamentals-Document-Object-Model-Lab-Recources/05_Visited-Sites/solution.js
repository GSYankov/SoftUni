function solve() {
    function linkClick(elementId) {
        let countElement = document.getElementsByTagName('span')[elementId];
        let countElementText = document.getElementsByTagName('span')[elementId].textContent;
        let currentCount = Number(countElementText.replace("Visited: ", "").replace(" times", ""));
        let updatedCount = `Visited: ${currentCount + 1} times`;
        document.getElementsByTagName('span')[elementId].textContent = updatedCount;
    }

    for (let i = 0; i < 6; i++) {
        document.getElementsByTagName('a')[i].addEventListener("click", function () {
            linkClick(i);
        }, false);
    }
}