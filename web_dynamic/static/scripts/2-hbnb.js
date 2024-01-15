$(document).ready(function () {

  $.getJSON('http://0.0.0.0:5001/api/v1/status/', function (response) {
    if (response.status === 'OK') {
      $('#api_status').addClass('available');
    } else {
      $('#api_status').removeClass('available');
    }
  });

  /* filtering amenities */
  let amenitiesChecked = [];

  function filterAmenities() {
    amenitiesChecked = amenitiesChecked.filter((item) => item !== '');
    if (amenitiesChecked.length > 1) {
      let amenities = amenitiesChecked.join(', ');
      if (amenities.length > 40) {
        amenities = amenities.slice(0, 39) + '...';
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
    if ($(this).prop('checked')) {
      amenitiesChecked.push(amenityName);
      filterAmenities();
    } else {
      amenitiesChecked.splice(amenitiesChecked.indexOf(amenityName), 1);
      filterAmenities();
    }
  });
});
