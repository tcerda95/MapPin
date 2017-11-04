  $('#myModal').modal({ show: false})

    var selectedLatLng = {lat: 0, lng:0};

    function markerCreate(){
    new google.maps.Marker({
            position: selectedLatLng,
            map: map
         });
          
      $('#marker-modal').modal('hide')
    }



    function initMap() {
        var uluru = {lat: -33, lng: -55};

       map = new google.maps.Map(document.getElementById('map'), {
          zoom: 3,
          center: uluru,
          styles: [
                    {
                      "featureType": "administrative.land_parcel",
                      "elementType": "geometry",
                      "stylers": [
                        {
                          "visibility": "off"
                        }
                      ]
                    },
                    {
                      "featureType": "administrative.neighborhood",
                      "stylers": [
                        {
                          "visibility": "off"
                        }
                      ]
                    },
                    {
                      "featureType": "administrative.neighborhood",
                      "elementType": "geometry.fill",
                      "stylers": [
                        {
                          "visibility": "off"
                        }
                      ]
                    },
                    {
                      "featureType": "landscape.man_made",
                      "stylers": [
                        {
                          "visibility": "off"
                        }
                      ]
                    },
                    {
                      "featureType": "poi",
                      "stylers": [
                        {
                          "visibility": "off"
                        }
                      ]
                    },
                    {
                      "featureType": "road",
                      "stylers": [
                        {
                          "visibility": "off"
                        }
                      ]
                    },
                    {
                      "featureType": "transit",
                      "stylers": [
                        {
                          "visibility": "off"
                        }
                      ]
                    }
                  ]
        });
          
          var input = /** @type {!HTMLInputElement} */(document.getElementById('autocomplete'));

        var types = document.getElementById('type-selector');

        var autocomplete = new google.maps.places.Autocomplete(input, {types: ['(cities)']});
        autocomplete.bindTo('bounds', map);

        var infowindow = new google.maps.InfoWindow();
        var marker = new google.maps.Marker({
          map: map,
          anchorPoint: new google.maps.Point(0, -29)
        });

        autocomplete.addListener('place_changed', function() {
          infowindow.close();
          marker.setVisible(false);
          var place = autocomplete.getPlace();
          if (!place.geometry) {
            // User entered the name of a Place that was not suggested and
            // pressed the Enter key, or the Place Details request failed.
            window.alert("No details available for input: '" + place.name + "'");
            return;
          }

          // If the place has a geometry, then present it on a map.
          if (place.geometry.viewport) {
            map.fitBounds(place.geometry.viewport);
          } else {
            map.setCenter(place.geometry.location);
            map.setZoom(17);  // Why 17? Because it looks good.
          }
        
        });

      map.addListener('rightclick', function(mouseEvent) {
          selectedLatLng = mouseEvent.latLng;
          $('#marker-modal').modal('show')
     });

    }