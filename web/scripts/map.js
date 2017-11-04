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
	.controller('MapController', function($http) {
    	this.selectedTab = 0;
      this.infomap = {};
      var id = getParameterByName('id');

      console.log("Id is" + id);
      myUrl = "http://localhost:8080/map/" + id;
      console.log(myUrl);
      var myself = this;

      $http.get(myUrl).then(function(response){
            console.log("HOOOOOOO");
            console.log(response);
            myself.infomap = response.data;

            myself.infomap.tabs[myself.selectedTab].pins.forEach(function(item, index){
              addPin(item);
            });

           }, function(response){
              
           }
      );
/*
	this.infomap = 
		{name: "Historia Argentina 1910",
		 description: "Un mapa que prueba lo bueno que es mappin para aprender todo tipo de cosas en un modo interactivo, enriquecedor, blockchain",
		 initial: {latLng:{lat: 10, lng: -30}, zoom: 3.0},
		 author: {id: 123, name: "Juan Perez", email: "juan@victory.com.ar"},
		 id: 101,
		 tabs: [
			 {name: "1920", id:1, 
			  pins:[
				  {name: "Hipolito Yrigoyen presidente", description:"De la UCR", latLng: {lat: 10.40, lng:-43.23}, type:"nature", img_url: "http://assets.vg247.com/current//2015/06/the_witcher_3_close_up_geralt_hrrr.jpg"},
				  {name: "Torcuato de Alvear", description:"De la UCR", latLng: {lat: -10.40, lng:33.23}, type:"art", img_url: "http://assets.vg247.com/current//2015/06/the_witcher_3_close_up_geralt_hrrr.jpg"}]}, 
			 {name: "1930", id:2,
			  pins:[
				  {name: "Uriburu", description:"dictador de facto", latLng: {lat: 90.40, lng:-3.23}, type:"religion", img_url: "http://assets.vg247.com/current//2015/06/the_witcher_3_close_up_geralt_hrrr.jpg"},{name: "Pedro Justo", description:"Partido democrata nacional", img_url: "http://assets.vg247.com/current//2015/06/the_witcher_3_close_up_geralt_hrrr.jpg", latLng: {lat: -40.40, lng:93.23}, type:"science"}]},
			 {name: "1940", id:3, 
			  pins:[
				  {name: "Hipolito Yrigoyen presidente", description:"De la UCR", latLng: {lat: 10.40, lng:-43.23}, type:"religion", img_url: "http://assets.vg247.com/current//2015/06/the_witcher_3_close_up_geralt_hrrr.jpg"},
				  {name: "Torcuato de Alvear", description:"De la UCR", latLng: {lat: -10.40, lng:33.23}, type:"art", img_url: "http://assets.vg247.com/current//2015/06/the_witcher_3_close_up_geralt_hrrr.jpg"}]}, 
			 {name: "1950", id:4,
			  pins:[
				  {name: "Uriburu", description:"dictador de facto", latLng: {lat: 90.40, lng:-3.23}, type:"politics", img_url: "http://assets.vg247.com/current//2015/06/the_witcher_3_close_up_geralt_hrrr.jpg"},
				  {name: "Pedro Justo", description:"Partido democrata nacional", latLng: {lat: -40.40, lng:93.23}, type: "society", img_url: "http://assets.vg247.com/current//2015/06/the_witcher_3_close_up_geralt_hrrr.jpg"}]},
		 ]
		}
	;

*/
	this.showDescription = false;

	this.titleHover = function(value) {
		this.showDescription = value;
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
		console.log(type);
		$('#marker-modal').modal('hide')

		var pin = {
			name: hitoTitle,
			description: desc,
			type: type,
			latLng: selectedlatLng,
			img_url: "http://assets.vg247.com/current//2015/06/the_witcher_3_close_up_geralt_hrrr.jpg"
		}     
		this.infomap.tabs[this.selectedTab].pins.push(pin);

    console.log("About to log " + myUrl);
    console.log(this.infomap);
    persist(this);
		addPin(pin);
	};
	
});


	function addPin(pin){
		var contentString = '<div id="iw-container">' +
			'<div class="iw-title">'+ pin.name + '</div>' +
			'<div class="iw-content">' +
			'<div class="iw-subTitle">Descripción</div>' +
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
