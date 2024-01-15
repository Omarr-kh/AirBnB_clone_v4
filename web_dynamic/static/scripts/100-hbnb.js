$(document).ready(function () {
  /* Show API status */

  $.getJSON('http://54.235.193.23:5001/api/v1/status/', function (data) {
    if (data.status === 'OK') {
      $('#api_status').addClass('available');
    } else {
      $('#api_status').removeClass('available');
    }
  });

  /* Filtered Search */
  let amenitiesChecked = [];
  const checkedAmenitiesIds = [];

  let checkedStates = [];
  const checkedStatesIds = [];

  let checkedCities = [];
  const checkedCitiesIds = [];

  $('#btn_search').on('click', function () {
    $.ajax('http://54.235.193.23:5001/api/v1/places_search', {
      data: JSON.stringify({
        amenities: checkedAmenitiesIds,
        states: checkedStatesIds,
        cities: checkedCitiesIds
      }),
      contentType: 'application/json',
      type: 'POST',
      success: function (data) {
        for (const place of data) {
          const template = `<article>
            <div class="title_box">
              <h2>${place.name}</h2>
              <div class="price_by_night">$${place.price_by_night}</div>
            </div>
            <div class="information">
              <div class="max_guest">${place.max_guest} Guests</div>
                    <div class="number_rooms">${place.number_rooms} Bedrooms</div>
                    <div class="number_bathrooms">${place.number_bathrooms} Bathrooms</div>
            </div>
            <div class="description">
              ${place.description}
            </div>
          </article>`;
          $('section.places').append(template);
        }
      }
    });
  });

  /* Make amenities filter dynamic */

  function fillHeader (header, checked) {
    console.log(checked);
    checked = checked.filter((item) => item !== '');
    if (checked.length > 1) {
      let string = checked.join(', ');

      if (string.length > 38) {
        string = string.slice(0, 37) + '...';
      }

      header.text(string);
    } else if (checked.length === 1) {
      header.text(checked[0]);
    } else {
      header.text('');
    }
  }

  $('.amenity-checkbox').on('change', function () {
    const amenityName = $(this).attr('data-name');
    const amenityId = $(this).attr('data-id');

    if ($(this).prop('checked')) {
      checkedAmenitiesIds.push(amenityId);
      amenitiesChecked.push(amenityName);
      fillHeader($('#h_amn'), amenitiesChecked);
    } else {
      checkedAmenitiesIds.splice(checkedAmenitiesIds.indexOf(amenityId), 1);
      amenitiesChecked.splice(amenitiesChecked.indexOf(amenityName), 1);
      fillHeader($('#h_amn'), amenitiesChecked);
    }
  });

  $('.state-checkbox').on('change', function () {
    const stateName = $(this).attr('data-name');
    const stateId = $(this).attr('data-id');

    console.log(stateName, stateId);
    if ($(this).prop('checked')) {
      checkedStatesIds.push(stateId);
      checkedStates.push(stateName);
      fillHeader($('#h_st_ct'), checkedStates.concat(checkedCities));
    } else {
      checkedStatesIds.splice(checkedStatesIds.indexOf(stateId), 1);
      checkedStates.splice(checkedStates.indexOf(stateName), 1);
      fillHeader($('#h_st_ct'), checkedStates.concat(checkedCities));
    }
  });

  $('.city-checkbox').on('change', function () {
    const cityName = $(this).attr('data-name');
    const cityId = $(this).attr('data-id');

    if ($(this).prop('checked')) {
      checkedCitiesIds.push(cityId);
      checkedCities.push(cityName);
      fillHeader($('#h_st_ct'), checkedCities.concat(checkedStates));
    } else {
      checkedCitiesIds.splice(checkedCitiesIds.indexOf(cityId), 1);
      checkedCities.splice(checkedCities.indexOf(cityName), 1);
      fillHeader($('#h_st_ct'), checkedCities.concat(checkedStates));
    }
  });
});
