'use strict';
(function () {
  var map = document.querySelector('.map');
  var pinsContainer = document.querySelector('.map__pins');
  var mapItems = document.querySelectorAll('select, fieldset');
  var filterForm = document.querySelector('.map__filters');

  var mapSize = {
    yMin: 130,
    yMax: 630,
    xMin: 0,
    xMax: 1200
  };

  function onDataLoad(responseData) {
    responseData.forEach(function (adv, index) {
      adv.id = index + 1;
    });
    window.map.offers = responseData;
    window.filter.change();
  }

  function updatePinsOnMap(filteredData) {
    var pinsMarkup = window.pin.renderList(filteredData);
    pinsContainer.appendChild(pinsMarkup);
  }

  function enableMap() {
    if (map.classList.contains('map--faded')) {
      window.filter.activate();
      window.backend.load(onDataLoad);
      map.classList.remove('map--faded');
      window.util.toggleElementsDisabled(mapItems, false);
    }
  }

  function disableMap() {
    if (!map.classList.contains('map--faded')) {
      map.classList.add('map--faded');
      window.util.toggleElementsDisabled(mapItems, true);
      window.pin.remove();
      filterForm.reset();
      window.pin.centerTheMainPin();
    }
  }

  disableMap();

  window.map = {
    size: mapSize,
    element: map,
    enable: enableMap,
    disable: disableMap,
    onDataLoad: onDataLoad,
    pinsContainer: pinsContainer,
    updatePins: updatePinsOnMap,
    filterForm: filterForm
  };
})();
