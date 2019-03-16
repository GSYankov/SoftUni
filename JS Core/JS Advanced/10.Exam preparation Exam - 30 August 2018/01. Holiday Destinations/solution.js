function addDestination() {
    let $inputFields = $('#input input');
    let city = $inputFields[0].value;
    let country = $inputFields[1].value;
    let season = $('#seasons').find(':selected').text();

    if (city && country) {
        let $destinations = $('#destinations');
        let $newDestinationRow = $('<tr>');
        let $newDestination = $('<td>').text(`${city}, ${country}`);
        let $season = $('<td>').text(season);
        $newDestinationRow
            .append($newDestination)
            .append($season)
            .appendTo($destinations);

        $(`#${season.toLowerCase()}`).val(+$(`#${season.toLowerCase()}`).val() + 1);

        $inputFields.val('');
    }
}