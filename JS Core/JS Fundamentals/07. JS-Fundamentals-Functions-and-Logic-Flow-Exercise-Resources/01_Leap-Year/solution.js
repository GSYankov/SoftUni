function leapYear() {
    function IsLeapYear(year) {
        return ((year % 4 == 0) && (year % 100 != 0)) || (year % 400 == 0);
    }

    function CheckLeapYear() {
        let inputElement = document.getElementsByTagName("input")[0];
        let year = inputElement.value;
        let h2Element = document.getElementsByTagName("h2")[0];
        h2Element.textContent = IsLeapYear(year) ? "Leap Year" : "Not Leap Year";
        inputElement.value = "";
        let yearDivElement = document.getElementsByTagName("div")[4];
        yearDivElement.textContent = year;
    }

    document.getElementsByTagName("button")[0]
        .addEventListener("click", CheckLeapYear);
}