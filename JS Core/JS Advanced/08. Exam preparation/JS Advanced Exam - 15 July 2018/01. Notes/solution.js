function addSticker() {
    let $titleInput = $(".title");
    let $textInput = $('.content');

    let title = $titleInput.val();
    let text = $textInput.val();


    if (title && text) {
        let $stickerList = $('#sticker-list');
        let $liNote = $('<li>')
            .attr('class', 'note-content');

        let $closeBtn = $('<a>')
            .attr('class', 'button')
            .text('x')
            .on('click', (e) => $(e.target).parent().remove());

        let $title = $('<h2>').text(title);
        let $text = $('<p>').text(text);

        $liNote.append($closeBtn);
        $liNote.append($title);
        $liNote.append($('<hr>'));
        $liNote.append($text);
        $stickerList.append($liNote);

        $titleInput.val('');
        $textInput.val('');
    }
}