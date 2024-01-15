$(document).ready(function () {
  const amenitiesIds = [];

  $.getJSON('http://54.235.193.23:5001/api/v1/status/', function (response) {
    if (response.status === 'OK') {
      $('div#api_status').addClass('available');
    } else {
      $('div#api_status').removeClass('available');
    }
  });

  /* filter places by amenities */
  $('button#search-btn').on('click', () => {
    $('section.places').html('');
    $.ajax('http://54.235.193.23:5001/api/v1/places_search', {
      data: JSON.stringify({
        amenities: amenitiesIds,
      }),
      contentType: 'application/json',
      type: 'POST',
      success: function (data) {
        console.log(data.length);

        if (!data) {
          $('section.places').html('');
        }

        for (const place of data) {
          const template = `<article>
            <div class='title_box'>
              <h2>${place.name}</h2>
              <div class='price_by_night'>$${place.price_by_night}</div>
            </div>
            <div class='information'>
              <div class='max_guest'>${place.max_guest} Guests</div>
                    <div class='number_rooms'>${place.number_rooms} Bedrooms</div>
                    <div class='number_bathrooms'>${place.number_bathrooms} Bathrooms</div>
            </div>
            <div class='description'>
              ${place.description}
            </div>
          </article>`;
          $('section.places').append(template);
        }
      },
    });
  });

  /* filtering amenities */
  let amenitiesChecked = [];

  function filterAmenities() {
    amenitiesChecked = amenitiesChecked.filter((item) => item !== '');
    if (amenitiesChecked.length > 1) {
      let amenities = amenitiesChecked.join(', ');
      if (amenities.length > 38) {
        amenities = amenities.slice(0, 37) + '...';
      }
      $('.amenitiesChecked').text(amenities);
    } else if (amenitiesChecked.length === 1) {
      $('.amenitiesChecked').text(amenitiesChecked[0]);
    } else {
      $('.amenitiesChecked').text('');
    }
  }

  $('.amenity-checkbox').on('change', function () {
    const amenityName = $(this).attr('data-name');
    const amenityId = $(this).attr('data-id');

    if ($(this).prop('checked')) {
      amenitiesIds.push(amenityId);
      amenitiesChecked.push(amenityName);
      filterAmenities();
    } else {
      amenitiesIds.splice(amenitiesIds.indexOf(amenityId), 1);
      amenitiesChecked.splice(amenitiesChecked.indexOf(amenityName), 1);
      filterAmenities();
    }
  });
});
