function solve() {
    document.querySelector("#exercise form button")
        .addEventListener("click", (event) => {
            event.preventDefault();
            let user = {
                username: document.getElementsByClassName('user-info')[0].children[1].value,
                email: document.getElementsByClassName('user-info')[0].children[5].value,
                topics: Array.from(document.getElementsByClassName("topics")[0].children).filter(el =>
                    el.checked).map(el => el.value)
            };
            let tr = document.createElement('tr');
            let tdUsername = document.createElement('td');
            tdUsername.innerHTML = user.username;
            let tdEmail = document.createElement('td');
            tdEmail.innerHTML = user.email;
            let tdTopics = document.createElement('td');
            tdTopics.innerHTML = user.topics.join(" ");

            tr.appendChild(tdUsername);
            tr.appendChild(tdEmail);
            tr.appendChild(tdTopics);

            document.getElementsByTagName("tbody")[0].appendChild(tr);
        });

    document.querySelector("#exercise > button")
        .addEventListener("click", () => {
            let searchPhrase = document.querySelector("#exercise > input").value;
            let tds = Array.from(document.querySelectorAll("table tbody tr td"));

            for (let td of tds) {
                td.parentNode.style.visibility = "hidden";
            }

            for (let td of tds) {
                if (td.textContent.includes(searchPhrase)) {
                    td.parentNode.style.visibility = "visible";
                }
            }
        });
}