function solve() {
    function onSubmitBtnClick(e) {
        e.preventDefault();
        let userDetails = [];
        let username = document.getElementsByTagName("input")[0].value;
        let password = document.getElementsByTagName("input")[1].value;
        let email = document.getElementsByTagName("input")[2].value;
        userDetails.push(username);
        userDetails.push(email);
        let topics = [];
        document.querySelectorAll(".topics input")
            .forEach(el => el.checked ? topics.push(el.value) : null);
        userDetails.push(topics.join(" "));

        let tableBodyElement = document.getElementsByTagName("tbody")[0];
        let tableRowElement = document.createElement("tr");
        userDetails.forEach(function (detail) {
            let rowElement = document.createElement("td");
            rowElement.textContent = detail;
            tableRowElement.appendChild(rowElement);
        });

        tableBodyElement.appendChild(tableRowElement);
    }

    function onSearchBtnClick() {
        let searchPhrase = document.querySelector("#exercise > input").value;
        let tdElements = Array.from(document.querySelectorAll("table tbody tr td"));

        for (let td of tdElements) {
            td.parentNode.style.visibility = "hidden";
        }

        for (let td of tdElements) {
            if (td.textContent.includes(searchPhrase)) {
                td.parentNode.style.visibility = "visible";
            }
        }


        //let tableRowElements = document.querySelectorAll("tbody tr");
        //Array.from(tableRowElements).forEach(function (el) {
        //    let isFound = false;
        //    Array.from(el.getElementsByTagName("td")).forEach(function (cell) {
        //        cell.textContent.includes(searchPhrase) ? isFound = true : null;
        //    });
        //    isFound ? null : el.style.visibility = "hidden";
        //})
    }

    document.getElementsByTagName("button")[0]
        .addEventListener("click", (event) => {
            event.preventDefault();
            let userDetails = [];
            let username = document.getElementsByTagName("input")[0].value;
            let password = document.getElementsByTagName("input")[1].value;
            let email = document.getElementsByTagName("input")[2].value;
            userDetails.push(username);
            userDetails.push(email);
            let topics = [];
            document.querySelectorAll(".topics input")
                .forEach(el => el.checked ? topics.push(el.value) : null);
            userDetails.push(topics.join(" "));

            let tableBodyElement = document.getElementsByTagName("tbody")[0];
            let tableRowElement = document.createElement("tr");
            userDetails.forEach(function (detail) {
                let rowElement = document.createElement("td");
                rowElement.textContent = detail;
                tableRowElement.appendChild(rowElement);
            });

            tableBodyElement.appendChild(tableRowElement);
        });

    document.getElementsByTagName("button")[1]
        .addEventListener("click", () => {
            let searchPhrase = document.querySelector("#exercise > input").value;
            let tdElements = Array.from(document.querySelectorAll("table tbody tr td"));

            for (let td of tdElements) {
                td.parentNode.style.visibility = "hidden";
            }

            for (let td of tdElements) {
                if (td.textContent.includes(searchPhrase)) {
                    td.parentNode.style.visibility = "visible";
                }
            }
        });
}