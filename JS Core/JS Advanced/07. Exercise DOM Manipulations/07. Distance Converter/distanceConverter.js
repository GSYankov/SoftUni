function attachEventsListeners() {
    document.getElementById('convert').addEventListener('click', onConvertClick);

    function onConvertClick() {
        let outputDistanceElement = document.getElementById('outputDistance');

        let inputDistance = document.getElementById('inputDistance').value;
        let inputUnit = document.getElementById('inputUnits').selectedIndex;
        let outputUnit = document.getElementById('outputUnits').selectedIndex;

        let metersConverterTable = [1000, 1, 0.01, 0.001, 1609.34, 0.9144, 0.3048, 0.0254];

        let metersMetaValue = inputDistance * metersConverterTable[inputUnit];
        let outputValue = metersMetaValue / metersConverterTable[outputUnit];

        outputDistanceElement.value = outputValue;
    }
}