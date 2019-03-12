function attachEventsListeners() {
    document.getElementsByTagName("body")[0]
        .addEventListener("click", onElementClick);

    function onElementClick(e) {
        let elementId = e.target.id;
        let daysElement = document.getElementById("days");
        let hoursElement = document.getElementById("hours");
        let minutesElement = document.getElementById("minutes");
        let secondsElement = document.getElementById("seconds");

        switch (elementId) {
            case 'daysBtn':
                hoursElement.value = daysElement.value * 24;
                minutesElement.value = hoursElement.value * 60;
                secondsElement.value = minutesElement.value * 60;
                break;
            case 'hoursBtn':
                daysElement.value = hoursElement.value / 24;
                minutesElement.value = hoursElement.value * 60;
                secondsElement.value = minutesElement.value * 60;
                break;
            case 'minutesBtn':
                hoursElement.value = minutesElement.value / 60;
                daysElement.value = hoursElement.value / 24;
                secondsElement.value = minutesElement.value * 60;
                break;
            case 'secondsBtn':
                minutesElement.value = secondsElement.value / 60;
                hoursElement.value = minutesElement.value / 60;
                daysElement.value = hoursElement.value / 24;
                break;
        }
    }
}
