function getInfo() {
    const baseUrl = 'https://judgetests.firebaseio.com';
    let $busStation = $('#stopId');
    let busId = $busStation.val();
    $.get(baseUrl + `/businfo/${busId}.json`)
        .then(displayBusInfo)
        .catch(displayError);

    function displayError() {
        $('#stopName').text('Error');
    }
    function displayBusInfo(info) {
        $('#stopName').text(info.name);
        let $buses = $('#buses');
        for (let key in info.buses) {
            let busId = key;
            let time = info.buses[key];
            let $liBus = $('<li>')
                .text(`Bus ${busId} arrives in ${time} minutes`)
                .appendTo($buses);
            $busStation.val('');
        }
    }
}