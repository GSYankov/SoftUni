function attachEvents() {
    const baseUrl = 'https://messanger-e7645.firebaseio.com/messages';
    $('#messages').text('Pesho: hi guys\nGosho: whats up\n');

    function loadMessages(messages) {
        let $messages = $('#messages');
        $messages.text('');

        let allMessages = '';
        for (let message of Object.values(messages)) {

            allMessages += `${message.author}: ${message.content}\n`
        }

        $messages.text(allMessages);
    }

    const onRefresh = function () {
        $.ajax({
            url: baseUrl + '.json',
            method: 'GET',
            success: loadMessages
        });
    };
    onRefresh();

    $('#submit').on('click', onSendClick);
    $('#refresh').on('click', onRefresh);

    function onSendClick() {
        let $author = $('#author');
        let $content = $('#content');
        let msgAuthor = $author.val();
        let msgContent = $content.val();

        if (msgAuthor && msgContent) {
            let timestamp = Date.now();
            let message = {
                author: msgAuthor,
                content: msgContent,
                timestamp: timestamp
            };

            $.ajax({
                url: baseUrl + '.json',
                method: 'POST',
                data: JSON.stringify(message),
                dataType: "text",
            });
            onRefresh();
            $author.val('');
            $content.val('');
        }
    }
}