function makeReservation() {

    let $fullName = $('#fullName');
    let $email = $('#email');
    let $phoneNumber = $('#phoneNumber');
    let $address = $('#address');
    let $postalCode = $('#postalCode');
    let $submitBtn = $('#submit');
    let $continueBtn = $('#continue');
    let $editBtn = $('#edit');
    let $infoPreview = $('#infoPreview');

    $submitBtn.on('click', onSubmitBtnClick);
    $editBtn.on("click", onEditBtnClick);
    $continueBtn.on("click", onContinueBtnClick);


    function onSelectionChange(e) {
        let selectedOption = $(e.target).find(':selected').val();
        let $container = $('#container');
        $container.find('#extraDetails').remove();
        let $externalDetails = $('<div>')
            .attr('id', 'extraDetails')
            .appendTo($container);
        let $checkOutBtn = $.parseHTML('<button id="checkOut">Check Out</button>');

        switch (selectedOption) {
            case 'creditCard':
                let $cardNumber = $.parseHTML('<div class="inputLabel">Card Number<input></div><br>');
                let $expDate = $.parseHTML('<div class="inputLabel">Expiration Date<input></div><br>');
                let $secNums = $.parseHTML('<div class="inputLabel">Security Numbers<input></div><br>');
                $externalDetails
                    .append($cardNumber)
                    .append($expDate)
                    .append($secNums)
                    .append($checkOutBtn);
                break;
            case 'bankTransfer':
                let $bankTransferParagraph =
                    $.parseHTML("<p>You have 48 hours to transfer the amount to:<br>IBAN: GR96 0810 0010 0000 0123 4567 890</p>");
                $externalDetails
                    .append($bankTransferParagraph)
                    .append($checkOutBtn);
                break;
        }
    }

    function onContinueBtnClick() {
        $submitBtn.attr('disabled', 'disabled');
        $continueBtn.attr('disabled', 'disabled');
        $editBtn.attr('disabled', 'disabled');

        let $container = $('#container');
        let $heading = $('<h2>')
            .text('Payment details')
            .appendTo($container);

        let $paymentOptions = $('<select>')
            .attr('id', 'paymentOptions')
            .attr('class', 'custom-select')
            .on('change', onSelectionChange);
        let $optionChoose = $.parseHTML('<option selected disabled hidden>Choose</option>');
        let $optionCreditCard = $('<option>')
            .val('creditCard')
            .text('Credit Card');
        let $optionBankTransfer = $('<option>')
            .val('bankTransfer')
            .text('Bank Transfer');

        $paymentOptions
            .append($optionChoose)
            .append($optionCreditCard)
            .append($optionBankTransfer)
            .appendTo($container);

        let $externalDetails = $('<div>')
            .attr('id', 'extraDetails')
            .appendTo($container);
    }

    function onEditBtnClick() {
        let fullName = $('#infoPreview li:nth-child(1)').text().split(": ")[1];
        let email = $infoPreview.find('li:nth-child(2)').text().split(": ")[1];
        let phoneNumber = $infoPreview.find('li:nth-child(3)').text().split(": ")[1];
        let address = $infoPreview.find('li:nth-child(4)').text().split(": ")[1];
        let postalCode = $infoPreview.find('li:nth-child(5)').text().split(": ")[1];

        $fullName.val(fullName);
        $email.val(email);
        $phoneNumber.val(phoneNumber);
        $address.val(address);
        $postalCode.val(postalCode);
        $infoPreview.find('li').remove();

        $submitBtn.attr('disabled', false);
        $continueBtn.attr('disabled', 'disabled');
        $editBtn.attr('disabled', 'disabled');
    }

    function onSubmitBtnClick(e) {
        let fullName = $fullName.val();
        let email = $email.val();
        let phoneNumber = $phoneNumber.val();
        let address = $address.val();
        let postalCode = $postalCode.val();

        if (fullName && email) {
            let $fullNameLi = $('<li>').text(`Name: ${fullName}`);
            let $emailLi = $('<li>').text(`E-mail: ${email}`);
            let $phoneNumberLi = $('<li>').text(`Phone: ${phoneNumber}`);
            let $addressLi = $('<li>').text(`Address: ${address}`);
            let $postalCodeLi = $('<li>').text(`Postal Code: ${postalCode}`);

            $infoPreview
                .append($fullNameLi)
                .append($emailLi)
                .append($phoneNumberLi)
                .append($addressLi)
                .append($postalCodeLi);

            $submitBtn.attr('disabled', 'disabled');
            $continueBtn.attr('disabled', false);
            $editBtn.attr('disabled', false);

            $fullName.val('');
            $email.val('');
            $phoneNumber.val('');
            $address.val('');
            $postalCode.val('');
        }
    }
}