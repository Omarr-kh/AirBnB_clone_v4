$(document).ready(function () {

  $.getJSON("http://54.235.193.23:5001/api/v1/status/", function (response) {
    if (response.status === "OK") {
      $("div#api_status").addClass("available");
    } else {
      $("div#api_status").removeClass("available");
    }
  });

  $.ajax("http://0.0.0.0:5001/api/v1/places_search", {
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
      $(".amenitiesChecked").text(amenitiesChecked[0]);
    } else {
      $(".amenitiesChecked").text("");
    }
  }

  $(".amenity-checkbox").on("change", function () {
    const amenityName = $(this).attr("data-name");
    if ($(this).prop("checked")) {
      amenitiesChecked.push(amenityName);
      filterAmenities();
    } else {
      amenitiesChecked.splice(amenitiesChecked.indexOf(amenityName), 1);
      filterAmenities();
    }
  });
});
