function initMap() {
 	// Create a map object and specify the DOM element for display.
 	var map = new google.maps.Map(document.getElementById('map'), {
 		center: {lat: -34.397, lng: 150.644},
 		zoom: 8
 	});
 };
	
angular.module('mappinApp', [])
	.controller('HomeController', function($scope, $http, $location) {
		$scope.maps =[]
		$http.get('http://localhost:8080/map').
        then(function(response) {
			console.log(response.data.maps);
			for(var i =0; i < response.data.maps.length; i++)
				$scope.maps.push(response.data.maps[i]);
			console.log($scope.maps);
        });
	
		this.clickedMap = function(index) {
			window.location.href = 'map.html?id='+index;
		};
	})
;

function openModal(){
   $('#createModal').modal();   
}

