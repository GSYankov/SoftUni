function solution() {
    let $toyType = $('#toyType');
    let $toyPrice = $('#toyPrice');
    let $toyDescription = $('#toyDescription');

    $(('body>section div button')).on("click", onBtnClick).click();

    function onBtnClick() {
        let toyType = $toyType.val();
        let toyPrice = Number($toyPrice.val());
        let toyDescription = $toyDescription.val();

        if (toyType && toyPrice && toyDescription) {
            let $christmasGiftShop = $('#christmasGiftShop');

            let $gift = $('<div>').addClass('gift');
            let $image = $('<img>').attr('src', 'gift.png');
            let $heading = $('<h2>').text(toyType);
            let $paragraph = $('<p>').text(toyDescription);
            let $giftBtn = $('<button>')
                .text(`Buy it for $${toyPrice.toFixed(2)}`)
                .on("click", function (e) {
                    e.target.parentElement.remove();
                });
            $gift
                .append($image)
                .append($heading)
                .append($paragraph)
                .append($giftBtn)
                .appendTo($christmasGiftShop);
        }
    }
}