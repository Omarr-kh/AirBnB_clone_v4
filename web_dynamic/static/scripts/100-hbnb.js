$(document).ready(() => {
   /* Filtered Search */
  let amenitiesChecked = [];
  const amenitiesIds = [];
  let statesChecked = [];
  const statesIds = [];
  let citiesChecked = [];
  const citiesIds = [];
  
  /* API status */

  $.getJSON('http://54.235.193.23:5001/api/v1/status/', (data) => {
    if (data.status === 'OK') {
      $('#api_status').addClass('available');
    } else {
      $('#api_status').removeClass('available');
    }
  });

  $.ajax("http://54.235.193.23:5001/api/v1/places_search", {
    data: JSON.stringify({}),
    contentType: "application/json",
    type: "POST",
    success: (data) => {
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
        $("section.places").append(template);
      }
    },
  });

  $('#btn_search').on('click', () => {
    $.ajax('http://54.235.193.23:5001/api/v1/places_search', {
      data: JSON.stringify({
        amenities: amenitiesIds,
        states: statesIds,
        cities: citiesIds
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

  function filterHeader (header, checked) {
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

  $('.amenity-checkbox').on('change', () => {
    const amenityName = $(this).attr('data-name');
    const amenityId = $(this).attr('data-id');

    if ($(this).prop('checked')) {
      amenitiesIds.push(amenityId);
      amenitiesChecked.push(amenityName);
      filterHeader($('#h_amn'), amenitiesChecked);
    } else {
      amenitiesIds.splice(amenitiesIds.indexOf(amenityId), 1);
      amenitiesChecked.splice(amenitiesChecked.indexOf(amenityName), 1);
      filterHeader($('#h_amn'), amenitiesChecked);
    }
  });

  $('.state-checkbox').on('change', () => {
    const stateName = $(this).attr('data-name');
    const stateId = $(this).attr('data-id');

    console.log(stateName, stateId);
    if ($(this).prop('checked')) {
      statesIds.push(stateId);
      statesChecked.push(stateName);
      filterHeader($('#h_st_ct'), statesChecked.concat(citiesChecked));
    } else {
      statesIds.splice(statesIds.indexOf(stateId), 1);
      statesChecked.splice(statesChecked.indexOf(stateName), 1);
      filterHeader($('#h_st_ct'), statesChecked.concat(citiesChecked));
    }
  });

  $('.city-checkbox').on('change', () => {
    const cityName = $(this).attr('data-name');
    const cityId = $(this).attr('data-id');

    if ($(this).prop('checked')) {
      citiesIds.push(cityId);
      citiesChecked.push(cityName);
      filterHeader($('#h_st_ct'), citiesChecked.concat(statesChecked));
    } else {
      citiesIds.splice(citiesIds.indexOf(cityId), 1);
      citiesChecked.splice(citiesChecked.indexOf(cityName), 1);
      filterHeader($('#h_st_ct'), citiesChecked.concat(statesChecked));
    }
  });
});
