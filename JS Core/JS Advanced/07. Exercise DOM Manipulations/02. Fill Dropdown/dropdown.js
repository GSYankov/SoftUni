function addItem() {
    let optionTextElement = document.getElementById('newItemText');
    let optionValueElement = document.getElementById('newItemValue');

    let optionText = optionTextElement.value;
    let optionValue = optionValueElement.value;

    let optionElement = document.createElement('option');
    optionElement.textContent = optionText;
    optionElement.value = optionValue;

    let dropdownElement = document.getElementById('menu');
    dropdownElement.appendChild(optionElement);

    optionTextElement.value = '';
    optionValueElement.value = '';
}
