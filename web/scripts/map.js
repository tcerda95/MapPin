angular.module('mappinApp', ['ngAnimate'])
	.controller('MapController', function() {
		this.map = 
			{name: "Historia Argentina 1910",
			 description: "Un mapa que prueba lo bueno que es mappin para aprender todo tipo de cosas en un modo interactivo, enriquecedor, blockchain",
			 initial: {latlng:{lat: 10, lng: -30}, zoom: 3.0},
			 author: {id: 123, name: "Juan Perez", email: "juan@victory.com.ar"},
			 id: 101,
			 tabs: [
				 {name: "1920", id:1, 
				  pins:[
					  {name: "Hipolito Yrigoyen presidente", description:"De la UCR", latlng: {lat: 10.40, lng:-43.23}, type:"nature"},
					  {name: "Torcuato de Alvear", description:"De la UCR", latlng: {lat: -10.40, lng:33.23}, type:"art"}]}, 
				 {name: "1930", id:2,
				  pins:[
					  {name: "Uriburu", description:"dictador de facto", latlng: {lat: 90.40, lng:-3.23}, type:"religion"},{name: "Pedro Justo", description:"Partido democrata nacional", latlng: {lat: -40.40, lng:93.23}, type:"science"}]},
				 {name: "1940", id:3, 
				  pins:[
					  {name: "Hipolito Yrigoyen presidente", description:"De la UCR", latlng: {lat: 10.40, lng:-43.23}, type:"religion"},
					  {name: "Torcuato de Alvear", description:"De la UCR", latlng: {lat: -10.40, lng:33.23}, type:"art"}]}, 
				 {name: "1950", id:4,
				  pins:[
					  {name: "Uriburu", description:"dictador de facto", latlng: {lat: 90.40, lng:-3.23}, type:"politics"},
					  {name: "Pedro Justo", description:"Partido democrata nacional", latlng: {lat: -40.40, lng:93.23}, type: "society"}]},
			 ]
			};
		this.showDescription = false;
	
		this.titleHover = function(value) {
			this.showDescription = value;
		}
	})
;

//$('#myModal').modal({ show: false})

    var selectedLatLng = {lat: 0, lng:0};

    function markerCreate(){

      var hitoTitle = $("#hito").val();
      var desc = $("#hitodesc").val();

      var contentString = '<div class="iw-container">'+
            '<div class="infowindowContent">'+
            '<div class="iw-title">'+
              hitoTitle +
            +'</div>'+
            '<p>' + desc + '</p>' +
            '</div>'+ 
            '</div>'
            ;

        var infowindow = new google.maps.InfoWindow({
          content: contentString
        });


   var infowindow = new google.maps.InfoWindow({
          content: contentString
    });


    var marker =  new google.maps.Marker({
            position: selectedLatLng,
            map: map, 
            title: hitoTitle
         });

     marker.addListener('click', function() {
          infowindow.open(map, marker);
        });

          
      $('#marker-modal').modal('hide')
    }



    function initMap() {
      var uluru = {lat: -33, lng: -55};

       map = new google.maps.Map(document.getElementById('map'), {
          zoom: 3,
          center: uluru,
          mapTypeControl: false,
          fullscreenControl: false,
          streetViewControl: false,
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
          
          // Clear values
          $("#hito").val('');
          $("#hitodesc").val('');

          $('#marker-modal').modal('show')
     });

    }