function solve() {
    function OnBtnClick(e) {
        let button = e.target;
        let parentDevisor = button.parentElement;
        let hiddenElements = parentDevisor.querySelectorAll("div")[1];
        let lockButton = parentDevisor.getElementsByTagName("input")[0];
        let isLocked = lockButton.checked;

        if (!isLocked && button.textContent == "Show more") {
            hiddenElements.id = "userFields";
            button.textContent = "Hide it";
        }else if (!isLocked && button.textContent == "Hide it"){
            hiddenElements.id = "user1HiddenFields";
            button.textContent = "Show more";
        }

        console.log(lockButton);
    }

    Array.from(document.querySelectorAll("button"))
        .forEach((btn) => btn.addEventListener("click", OnBtnClick));
} 