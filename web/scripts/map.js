function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

var icons = {
	religion: 'img/praying.png',
	science: 'img/atomic.png',
	economy: 'img/coin.png',
	politics: 'img/capitol.png',
	nature: 'img/volcano.png',
	war: 'img/swords.png',
	art: 'img/paint-board-and-brush.png',
	society: 'img/holding-hands-in-a-circle.png'  
}

var markers = [];
selectedlatLng = {lat: 0, lng:0};
var myUrl;

angular.module('mappinApp', ['ngAnimate'])
	.controller('MapController', function($scope, $http) {
    	this.selectedTab = 0;
      this.infomap = {};
	$scope.icons = icons;
      var id = getParameterByName('id');
		$scope.editMode = editMode;
//		editMode = getParameterByName('edit')
      $scope.enableEditMode = function() {
		  $scope.editMode = true;
		  editMode = true;
	  }
	  
	  $scope.disableEditMode = function() {
		  $scope.editMode = false;
		  editMode = false;
	  }
		console.log("Id is" + id);
      myUrl = "http://localhost:8080/map/" + id;
      console.log(myUrl);
      var myself = this;

      $http.get(myUrl).then(function(response){
            console.log("HOOOOOOO");
            console.log(response);
            myself.infomap = response.data;

            centerMap(response.data.initial);

            if(myself.infomap.tabs.length > 0){
              myself.infomap.tabs[myself.selectedTab].pins.forEach(function(item, index){
                addPin(item);
              });
            }
           }, function(response){
              
           }
      );

	this.showDescription = false;

	this.titleHover = function(value) {
		this.showDescription = value;
	}
	
	this.focusOnCoordinates = function(latLng) {
		map.setCenter(latLng);
       map.setZoom(7); 
	}

	this.clickedTab = function(index) {
		if (this.selectedTab == index)
			return;
		this.selectedTab = index;
		clearMarkers();
		this.infomap.tabs[this.selectedTab].pins.forEach(function(item, index){
			addPin(item);
		});
	};


  function persist(myself){
    $http.post("http://localhost:8080/map", myself.infomap).then(function(){
      console.log("POSTED!");
    })
  }

	var leftTabAdd = false;
	this.addTabLeft = function() {
		leftTabAdd = true;
		$('#createTabModal').modal('show');	
 	};


	this.addTabRight = function() {
		leftTabAdd = false;
		$('#createTabModal').modal('show');	
 	};

	this.submitNewSection = function() {
		var tabName = $('#tabName').val();
    

   	var newTab = {name: tabName, pins:[]}

		if (leftTabAdd) {
			this.infomap.tabs.unshift(newTab);
			this.selectedTab++;
		}
		else {
			this.infomap.tabs.push(newTab);
		}
    
    persist(this);
		
    $('#tabName').val('');
		$('#createTabModal').modal('hide');
	};


	function setMapOnAll(map) {
		for (var i = 0; i < markers.length; i++) {
			markers[i].setMap(map);
		}
	}

	// Removes the markers from the map, but keeps them in the array.
	function clearMarkers() {
		setMapOnAll(null);
	}

	//$('#myModal').modal({ show: false})

	this.markerCreate = function() {
		var hitoTitle = $("#hito").val();
		var desc = $("#hitodesc").val();
		var type= $('#radios input:checked').val();
		var img_url = $('#hitoimg').val();
		console.log(type);
		$('#marker-modal').modal('hide')

		var pin = {
			name: hitoTitle,
			description: desc,
			type: type,
			latLng: selectedlatLng,
			img_url: img_url
		}     
		this.infomap.tabs[this.selectedTab].pins.push(pin);

    console.log("About to log " + myUrl);
    console.log(this.infomap);
    persist(this);
		addPin(pin);
	};
	
});


  function centerMap(initial){
    console.log(initial)
       map.setCenter(initial.latLng);
       map.setZoom(initial.zoom);  // Why 17? Because it looks good.
  }

	function addPin(pin){
		var contentString = '<div id="iw-container">' +
			'<div class="iw-title">'+ pin.name + '</div>' +
			'<div class="iw-content">' +
			'<img src="'+ pin.img_url +'">' +
			'<p>'+ pin.description + '</p>'+
			'</div>' +
			'<div class="iw-bottom-gradient"></div>' +
			'</div>';

		var infowindow = new google.maps.InfoWindow({
			content: contentString
		});


		var marker =  new google.maps.Marker({
			position: pin.latLng,
			map: map, 
			icon: icons[pin.type],
			title: pin.name
		});

		markers.push(marker);

		marker.addListener('mouseover', function() {
			infowindow.open(map, marker);   
			infowindowFormat();     
		});

		var mouseOutHandler = marker.addListener('mouseout', function() {
			infowindow.close(map, marker);     
		});


		marker.addListener('click', function() {  
			infowindow.open(map, marker);   
			infowindowFormat();

			google.maps.event.removeListener(mouseOutHandler);

		});


		google.maps.event.addListener(infowindow,'closeclick',function(){
			mouseOutHandler = marker.addListener('mouseout', function() {
				infowindow.close(map, marker);     
			});            
		});
	}


	function infowindowFormat(){

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


		var iwCloseBtn = iwOuter.next();

      // Apply the desired effect to the close button
      iwCloseBtn.css({
        opacity: '1', // by default the close button has an opacity of 0.7
        right: '75px', top: '30px', // button repositioning
        'background-color': '#0CA4A5',
        'border-radius': '1px', // circular effect
        'box-shadow': '0 0 5px #3990B9' // 3D effect to highlight the button
        });

      // The API automatically applies 0.7 opacity to the button after the mouseout event.
      // This function reverses this event to the desired value.
      
    // If the content of infowindow not exceed the set maximum height, then the gradient is removed.
    if($('.iw-content').height() < 140){
      $('.iw-bottom-gradient').css({display: 'none'});
    }

		// If the content of infowindow not exceed the set maximum height, then the gradient is removed.
		if($('.iw-content').height() < 140){
			$('.iw-bottom-gradient').css({display: 'none'});
		}
	}

	$(function () {
		$('.btn-radio').click(function(e) {
			$('.btn-radio').not(this).removeClass('active')
				.siblings('input').prop('checked',false)
				.siblings('.img-radio').css('opacity','0.5');
			$(this).addClass('active')
				.siblings('input').prop('checked',true)
				.siblings('.img-radio').css('opacity','1');
		});
	});



var $star_rating = $('.star-rating .fa');

var SetRatingStar = function() {
  return $star_rating.each(function() {
    if (parseInt($star_rating.siblings('input.rating-value').val()) >= parseInt($(this).data('rating'))) {
      return $(this).removeClass('fa-star-o').addClass('fa-star');
    } else {
      return $(this).removeClass('fa-star').addClass('fa-star-o');
    }
  });
};

$star_rating.on('click', function() {
  $star_rating.siblings('input.rating-value').val($(this).data('rating'));
  return SetRatingStar();
});

SetRatingStar();
$(document).ready(function() {

});


$('#pinsearch').keypress(function (e) {
  var key = e.which;
  var input = $('#pinsearch').val();
  console.log(input.length);
  console.log(input);
  
  if(!input || !input.length)
    return;

 if(key == 13)  // the enter key code
  {
    for(var i = 0 ; i < markers.length ; i++){
        var m = markers[i];
        var title = m.title.toLowerCase();
        if(title.indexOf(input.toLowerCase()) !== -1){
          map.setCenter(m.position);
          map.setZoom(7);          //Magic 17
          return;
        }

    }
  }
});   
