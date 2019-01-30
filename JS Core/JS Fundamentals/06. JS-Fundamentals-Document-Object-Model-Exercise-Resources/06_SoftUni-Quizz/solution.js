function solve() {
    function BtnClick(e) {
        let buttonId = e.target.id;
        switch (buttonId) {
            case "q0":
                document.getElementById("q1")
                    .parentElement.className = "section1";
                break;
            case "q1":
                document.getElementById("q2")
                    .parentElement.className = "section2";
                break;
            case "q2":
                let rightAnswersCount = 0;
                document.querySelectorAll('input[type=radio]')[1].checked ?
                    rightAnswersCount++ : null;
                document.querySelectorAll('input[type=radio]')[6].checked ?
                    rightAnswersCount++ : null;
                document.querySelectorAll('input[type=radio]')[11].checked ?
                    rightAnswersCount++ : null;
                let resultDiv = document.getElementById("result");
                if (rightAnswersCount === 3) {
                    resultDiv.textContent += `You are recognized as top SoftUni fan!`;
                } else {
                    resultDiv.textContent += `You have ${rightAnswersCount} right answers`;
                }
                break;
        }
    }

    let buttons = document.getElementsByTagName("button");
    for (let i = 0; buttons.length > i; i++) {
        buttons[i].id = "q" + i;
    }
    Array.from(buttons)
        .forEach((btn) => btn.addEventListener("click", BtnClick));
}