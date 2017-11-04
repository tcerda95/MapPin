$('#createModal').on('shown.bs.modal', function () {
        initMap();
    });


function initMap() {
        // Create a map object and specify the DOM element for display.
        map = new google.maps.Map(document.getElementById('mapModal'), {
          mapTypeControl: false,
          fullscreenControl: false,
          streetViewControl: false,
          center: {lat: 0, lng: 0},
          zoom: 2,
		  minZoom: 2
        });
          
        var input = /** @type {!HTMLInputElement} */(
            document.getElementById('autocomplete'));

        var types = document.getElementById('type-selector');

        var autocomplete = new google.maps.places.Autocomplete(input);
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

      }

function getFormData() {
    var mapName = document.getElementById("MapName").value;
    var authorName = document.getElementById("MapAuthor").value;
    var email = document.getElementById("MapEmail").value;
    var place = document.getElementById("autocomplete").value;
    var descr = document.getElementById("MapDescription").value;

    var lat = map.center.lat();
    var lng = map.center.lng();
    var zoom = map.zoom;
    //tomar map para datos del mapa
    
    console.log(lat);
    console.log(lng);
    console.log(zoom);

    
    var xhr = new XMLHttpRequest();
    var url = "http://localhost:8080/map";
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-type", "application/json");
    xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
        var json = JSON.parse(xhr.responseText);
        console.log("algo en el if");
    }
    };
    
    var data = JSON.stringify({"name": mapName, 
                               "author": {"name": authorName, "email": email},
                               "description": descr,
                               "tabs": null,
                               "initial": {"latLng": {"lat": lat , "lng": lng}, "zoom": zoom}
                              });
    
    xhr.send(data);
}