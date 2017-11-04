function initMap() {
	// Create a map object and specify the DOM element for display.
	var map = new google.maps.Map(document.getElementById('map'), {
		center: {lat: -34.397, lng: 150.644},
		zoom: 8
	});
};

angular.module('mappinApp', [])
	.controller('HomeController', function() {
		this.maps = [
			{name: "Historia Argentina 1810"},
			{name: "Migraciones prehistóricas"},
			{name: "Mappin hola"}
		];
	})
;