function dart() {
    let $pointsTable = $('tr td:nth-child(2)');
    let homeTurn = true;
    let $homeScore = $('#Home p:nth-child(1)');
    let $awayScore = $('#Away p:nth-child(1)');
    $('body section:nth-child(1) div').on('click', function (e) {
        e.stopPropagation();
        let layerNumber = $('div').index(this);
        let turnPoints = $pointsTable[layerNumber].innerHTML.split(' ')[0];

        if (homeTurn) {
            let homeScore = Number($homeScore.text()) + Number(turnPoints);
            $homeScore.text(homeScore);
            homeTurn = !homeTurn;

            if (homeScore >= 100) {
                $('body section:nth-child(1) div').off('click');
                $('#Home p:nth-child(2)').css('background','green');
                $('#Away p:nth-child(2)').css('background','red');
            }
            $('#turns p:nth-child(2)').css('font-weight', 'bold');
            $('#turns p:nth-child(1)').css('font-weight', 'normal');

        } else {
            let awayScore = Number($awayScore.text()) + Number(turnPoints);
            $awayScore.text(awayScore);
            homeTurn = !homeTurn

            if (awayScore >= 100) {
                $('#Away p:nth-child(2)').css('background','green');
                $('#Home p:nth-child(2)').css('background','red');
                $('body section:nth-child(1) div').off('click');
            }

            $('#turns p:nth-child(1)').css('font-weight', 'bold');
            $('#turns p:nth-child(2)').css('font-weight', 'normal')
        }
    });
}