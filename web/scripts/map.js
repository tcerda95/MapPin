angular.module('mappinApp', ['ngAnimate'])
	.controller('MapController', function() {

		this.infomap = 
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
			}
		;
	

  this.infomap.tabs[0].pins.forEach(function(item, index){
          addPin(item);
      })


  this.showDescription = false;
	
	this.titleHover = function(value) {
  this.showDescription = value;
	
  	}
	})
;

//$('#myModal').modal({ show: false})

    var selectedLatLng = {lat: 0, lng:0};

  function markerCreate() {

      var hitoTitle = $("#hito").val();
      var desc = $("#hitodesc").val();
      $('#marker-modal').modal('hide')
      
      var pin = {
        name: hitoTitle,
        description: desc,
        latlng: selectedLatLng
      }     
      
      console.log("Esto se llama")
      addPin(pin);

   }



    function addPin(pin){
            console.log("Esto se llama2 ")

        var contentString = '<div id="iw-container">' +
                    '<div class="iw-title">'+ pin.name + '</div>' +
                    '<div class="iw-content">' +
                      '<div class="iw-subTitle">Descripción</div>' +
                      '<img src="http://maps.marnoto.com/en/5wayscustomizeinfowindow/images/vistalegre.jpg" alt="Porcelain Factory of Vista Alegre" height="115" width="83">' +
                      '<p>'+ pin.description + '</p>'+
                    '</div>' +
                    '<div class="iw-bottom-gradient"></div>' +
                  '</div>';

        var infowindow = new google.maps.InfoWindow({
          content: contentString
        });


        var marker =  new google.maps.Marker({
                position: pin.latlng,
                map: map, 
                title: pin.name
             });


        marker.addListener('click', function() {
              infowindow.open(map, marker);



              var iwOuter = $('.gm-style-iw');

              /* Since this div is in a position prior to .gm-div style-iw.
               * We use jQuery and create a iwBackground variable,
               * and took advantage of the existing reference .gm-style-iw for the previous div with .prev().
              */
              var iwBackground = iwOuter.prev();

              // Removes background shadow DIV
              iwBackground.children(':nth-child(2)').css({'display' : 'none'});

              // Removes white background DIV
              iwBackground.children(':nth-child(4)').css({'display' : 'none'});


              // Changes the desired tail shadow color.
              iwBackground.children(':nth-child(3)').find('div').children().css({'box-shadow': 'rgba(72, 181, 233, 0.6) 0px 1px 6px', 'z-index' : '1'});


             // If the content of infowindow not exceed the set maximum height, then the gradient is removed.
              if($('.iw-content').height() < 140){
                $('.iw-bottom-gradient').css({display: 'none'});
              }

        });
    

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
