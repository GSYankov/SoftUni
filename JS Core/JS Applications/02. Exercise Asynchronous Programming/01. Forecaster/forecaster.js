function attachEvents() {
    const baseUrl = 'https://judgetests.firebaseio.com';

    $('#submit').on('click', getWeather);

    function getConditionSymbol(condition) {
        let symbol;
        switch (condition) {
            case 'Sunny':
                symbol = '&#x2600';
                break;
            case 'Partly sunny':
                symbol = '&#x26C5';
                break;
            case 'Overcast':
                symbol = '&#x2601';
                break;
            case 'Rain':
                symbol = '&#x2614'
                break;
            case 'Degrees':
                symbol = '&#176'
                break;
        }
        return symbol;
    };

    async function getWeather() {
        try {
            let weather = await $.ajax({
                url: baseUrl + '/locations.json',
                method: 'GET'
            })

            let $town = $('#location')
            let townName = $town.val();
            let code = weather.filter(t => t.name === townName)[0].code;

            let weatherToday = await $.ajax({
                url: baseUrl + `/forecast/today/${code}.json`,
                method: "GET"
            })

            let weatherUpcomoing = await $.ajax({
                url: baseUrl + `/forecast/upcoming/${code}.json`,
                method: "GET"
            })

            $('#forecast').css('display', 'block');

            $(`
            <span class="condition symbol">${getConditionSymbol(weatherToday.forecast.condition)}</span>
            <span class="condition">
                <span class="forecast-data">${townName}</span>
                <span class="forecast-data">${weatherToday.forecast.low}&#176/${weatherToday.forecast.high}&#176</span>
                <span class="forecast-data">${weatherToday.forecast.condition}</span>`)
                .appendTo($('#current'));

            
            weatherUpcomoing.forecast.forEach(d => {
                $(` <span class="upcoming">
                        <span class="symbol">${getConditionSymbol(d.condition)}</span>
                        <span class="forecast-data">${d.low}&#176/${d.high}&#176</span>
                        <span class="forecast-data">${d.condition}</span>
                    </span>`).appendTo($('#upcoming'))
            })
        } catch (err) {
            $('#forecast').html('Error').css('display', 'block');
        }
    }
}