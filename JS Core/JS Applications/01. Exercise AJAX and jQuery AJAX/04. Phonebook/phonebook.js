function attachEvents() {
    const baseUrl = 'https://phonebook-nakov.firebaseio.com/';

    $('#btnLoad').on('click', onLoad);
    $('#btnCreate').on('click', onCreateClick);

    function onCreateClick() {
        let $person = $('#person');
        let $phone = $('#phone');

        let person = $person.val();
        let phone = $phone.val();

        if (person && phone) {
            let newRecord = {
                person,
                phone
            };

            $.ajax({
                url: baseUrl + `phonebook.json`,
                method: 'POST',
                data: JSON.stringify(newRecord),
                dataType: 'text',
                success: onLoad
            });
        }
        $person.val('');
        $phone.val('');
    }

    function onLoad() {
        $.ajax({
            url: baseUrl + 'phonebook.json',
            method: 'GET',
            success: updatePhoneList
        })
    }

    function updatePhoneList(data) {
        let $phoneBook = $('#phonebook');
        $phoneBook.empty();

        for (let key in data) {
            let $deleteBtn = $('<button>')
                .text('Delete')
                .attr('id', key);

            let liRecord = $('<li>')
                .text(`${data[key].person}: ${data[key].phone}`)
                .append($deleteBtn)
                .appendTo($phoneBook);
        }

        $('#phonebook li').on('click', onDelete)
    }

    function onDelete(e) {
        let id = e.target.id;
        $.ajax({
            url: baseUrl + `phonebook/${id}.json`,
            method: "DELETE",
            success: onLoad
        })
    }
}