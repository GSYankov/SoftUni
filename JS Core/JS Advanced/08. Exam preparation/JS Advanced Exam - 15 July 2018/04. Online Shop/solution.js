function onlineShop(selector) {
    let form = `<div id="header">Online Shop Inventory</div>
    <div class="block">
        <label class="field">Product details:</label>
        <br>
        <input placeholder="Enter product" class="custom-select">
        <input class="input1" id="price" type="number" min="1" max="999999" value="1"><label class="text">BGN</label>
        <input class="input1" id="quantity" type="number" min="1" value="1"><label class="text">Qty.</label>
        <button id="submit" class="button" disabled>Submit</button>
        <br><br>
        <label class="field">Inventory:</label>
        <br>
        <ul class="display">
        </ul>
        <br>
        <label class="field">Capacity:</label><input id="capacity" readonly>
        <label class="field">(maximum capacity is 150 items.)</label>
        <br>
        <label class="field">Price:</label><input id="sum" readonly>
        <label class="field">BGN</label>
    </div>`;
    $(selector).html(form);

    let $submitBtn = $('#submit');

    $(document).on('input', 'input:text', onBtnPress);

    function onBtnPress() {
        let $name = $('.custom-select');
        if ($name.val()) {
            $submitBtn.removeAttr('disabled');
        } else {
            $submitBtn.attr('disabled', 'disabled');
        }


    }

    $submitBtn.on('click', onBtnClick);
    let products = [];

    function onBtnClick() {
        let $name = $('.custom-select');
        let $price = $('#price');
        let $quantity = $('#quantity');

        let name = $name.val();
        let price = $price.val();
        let quantity = $quantity.val();

        if (name && price && quantity) {
            let product = {name, price, quantity};
            products.push(product);

            let $ul = $('.display');
            let $li = $('<li>')
                .text(`Product: ${product.name} Price: ${product.price} Quantity: ${product.quantity}`);
            $li.appendTo($ul);

            $name.val('');
            $price.val(1);
            $quantity.val(1);

            $('#sum').val(Object.keys(products).reduce(function (previous, key) {
                return previous + Number(products[key].price) * Number(products[key].quantity);
            }, 0));

            let capacity = Object.keys(products).reduce(function (previous, key) {
                return previous + Number(products[key].quantity);
            }, 0);

            let $capacity = $('#capacity');
            if (capacity >= 150) {
                $capacity.val('full');
                $capacity.addClass('fullCapacity');
                $name.attr('disabled', 'disabled');
                $price.attr('disabled', 'disabled');
                $quantity.attr('disabled', 'disabled');
            } else {
                $capacity.val(capacity);
            }

            $submitBtn.attr('disabled', 'disabled');
        }
    }
}
