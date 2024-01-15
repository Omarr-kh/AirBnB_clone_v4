$(document).ready(function () {
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
    if ($(this).prop('checked')) {
      amenitiesChecked.push(amenityName);
      filterAmenities();
    } else {
      amenitiesChecked.splice(amenitiesChecked.indexOf(amenityName), 1);
      filterAmenities();
    }
  });
});
