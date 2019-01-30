function solve() {
    function OnSearchClick() {
        let tableRowsArray = Array.from(
            document.getElementsByTagName("tr"));
        tableRowsArray.forEach((row) => row.className = "");

        let searchElement = document.getElementById("searchField");
        let searchedPhrase = searchElement.value;

        for (let i = 2; tableRowsArray.length > i; i++) {
            let currentRow = tableRowsArray[i];
            let currentRowCellsArray = Array.from(tableRowsArray[i].getElementsByTagName("td"));
            currentRowCellsArray.forEach((row) => row.textContent.includes(searchedPhrase)
                ? currentRow.className = "select" : null);
        }
        searchElement.value = "";
    }

    document.getElementsByTagName("button")[0]
        .addEventListener("click", OnSearchClick)
}