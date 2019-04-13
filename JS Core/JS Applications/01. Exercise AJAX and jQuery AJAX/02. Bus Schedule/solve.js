function solve() {
    const baseUrl = 'https://judgetests.firebaseio.com/schedule/';
    let currentStopId = 'depot';
    let currentStop;


    function depart() {
        $.ajax({
            url: baseUrl + currentStopId + '.json',
            method: 'GET',
            success: loadStop
        })
    }

    function arrive() {
        $('.info')
            .text(`Arriving at ${currentStop.name}`);
        currentStopId = currentStop.next;
        switchButtons('arrive', 'depart');
    }

    function loadStop(data) {
        currentStop = data;
        $('.info')
            .text(`Next stop ${currentStop.name}`);
        switchButtons('depart', 'arrive');
    }

    function switchButtons(disable, enable) {
        $(`#${disable}`).attr('disabled', true);
        $(`#${enable}`).attr('disabled', false);
    }

    return {
        depart,
        arrive
    };
}

let result = solve();