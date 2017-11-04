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
        var uluru = {lat: -25.363, lng: 131.044};

       map = new google.maps.Map(document.getElementById('map'), {
          zoom: 4,
          center: uluru
        });

        var marker = new google.maps.Marker({
          position: uluru,
          map: map
        });

      map.addListener('click', function(mouseEvent) {
          selectedLatLng = mouseEvent.latLng;
          $('#marker-modal').modal('show')
      });

    }