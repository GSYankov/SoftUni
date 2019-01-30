function solve() {
    function NextBtnClick() {
        let bgDivElement = document.getElementsByTagName("div")[3];
        let firstStepElement = document.getElementsByTagName("div")[4];

        if (bgDivElement.id === "content"
            && firstStepElement.id === "firstStep") {
            bgDivElement.id = "cont";
            firstStepElement.id = "firstStp";
            return;
        }


        let hasAgreed = document.getElementsByTagName("input")[0].checked;
        let secondStepElement = document.getElementsByTagName("div")[5];
        let thirdStepElement = document.getElementsByTagName("div")[6];
        let nextBtnElement = document.getElementsByTagName("button")[0];
        let cancelBtnElement = document.getElementsByTagName("button")[1];
        if (secondStepElement.id === "secondStep") {
            if (hasAgreed) {
                firstStepElement.id = "firstStep";
                secondStepElement.id = "secondStp";
                nextBtnElement.style.visibility = "hidden";

                function HideNextBtn() {
                    nextBtnElement.style.visibility = "";
                }

                setTimeout(HideNextBtn, 3000);
            }
            return;
        }

        if (thirdStepElement.id === "thirdStep"
            && secondStepElement.id === "secondStp") {
            thirdStepElement.id = "thirdStp";
            secondStepElement.style.visibility = "hidden";
            cancelBtnElement.style.visibility = "hidden";
            nextBtnElement.textContent = "Finish";
            return;
        }

        if (nextBtnElement.textContent==="Finish"){
            let elementExercise = document.getElementById("exercise");
            elementExercise.style.visibility = "hidden";
            return;
        }
    }

    function CancelBtnClick(){
        let elementExercise = document.getElementById("exercise");
        elementExercise.style.visibility = "hidden";
    }

    document.getElementsByTagName("button")[0]
        .addEventListener("click", NextBtnClick);
    document.getElementsByTagName("button")[1]
        .addEventListener("click", CancelBtnClick);
}