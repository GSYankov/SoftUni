function attachEvents() {
    const appKey = 'kid_rJyaQBCuE';
    const userName = 'bobi';
    const password = '123';
    const endpoint = 'biggestCatches';
    const baseUrl = 'https://baas.kinvey.com/';
    const headers = {
        'Authorization': `Basic ${btoa(userName + ':' + password)}`,
        'Content-Type': 'application/json'
    };

    $('.load').on('click', loadCatches);
    let $asideTab = $('#aside');
    $asideTab.find('.add').on('click', onAddBtnClick);

    async function onAddBtnClick() {
        let $angler = $asideTab.find('.angler');
        let $weight = $asideTab.find('.weight');
        let $species = $asideTab.find('.species');
        let $location = $asideTab.find('.location');
        let $bait = $asideTab.find('.bait');
        let $captureTime = $asideTab.find('.captureTime');

        let angler = $angler.val();
        let weight = Number.parseInt($weight.val());
        let species = $species.val();
        let location = $location.val();
        let bait = $bait.val();
        let captureTime = Number.parseInt($captureTime.val());

        addCatch(angler, weight, species, location, bait, captureTime);
        loadCatches();

        $angler.val('');
        $weight.val('');
        $species.val('');
        $location.val('');
        $bait.val('');
        $captureTime.val('');

    }

    async function loadCatches() {
        let catches = await $.ajax({
            url: baseUrl + 'appdata/' + appKey + "/" + endpoint,
            method: 'GET',
            headers
        });

        let $catches = $('#catches');
        $catches.empty();

        for (let c of catches) {
            let $catch = $(`<div class="catch" data-id="<id-goes-here>">
            <label>Angler</label>
            <input type="text" class="angler" value="${c.angler}"/>
            <label>Weight</label>
            <input type="number" class="weight" value="${c.weight}"/>
            <label>Species</label>
            <input type="text" class="species" value="${c.species}"/>
            <label>Location</label>
            <input type="text" class="location" value="${c.location}"/>
            <label>Bait</label>
            <input type="text" class="bait" value="${c.bait}"/>
            <label>Capture Time</label>
            <input type="number" class="captureTime" value="${c.captureTime}"/>
            <button class="update" id="${c._id}">Update</button>
            <button class="delete" id="${c._id}">Delete</button>
        </div>`).appendTo($catches);
        }

        $('.catch .update').on('click', onUpdateClick);
        $('.catch .delete').on('click', onDeleteClick);

    }

    async function onDeleteClick(e) {
        let id = e.target.id;
        let deletedRecord = await $.ajax({
            url: baseUrl + 'appdata/' + appKey + '/' + endpoint + '/' + id,
            method: 'DELETE',
            headers
        })
    }

    async function onUpdateClick(e) {
        let currentCatch = $(e.target).parent();

        let angler = currentCatch.find('.angler').val();
        let weight = Number.parseInt(currentCatch.find('.weight').val());
        let species = currentCatch.find('.species').val();
        let location = currentCatch.find('.location').val();
        let bait = currentCatch.find('.bait').val();
        let captureTime = Number.parseInt(currentCatch.find('.captureTime').val());
        let id = currentCatch.find('.update').attr('id');

        let updatedCatch = {
            angler, weight, species, location, bait, captureTime
        };

        await $.ajax({
            url: baseUrl + 'appdata/' + appKey + '/' + endpoint + '/' + id,
            method: 'PUT',
            headers,
            data: JSON.stringify(updatedCatch)
        });

        loadCatches();
    }

    async function addCatch(angler, weight, species, location, bait, captureTime) {
        let data = {
            angler,
            weight,
            species,
            location,
            bait,
            captureTime
        };

        await $.ajax({
            url: baseUrl + 'appdata/' + appKey + "/" + endpoint,
            method: 'POST',
            headers,
            data: JSON.stringify(data)
        });

        loadCatches();
    }
}