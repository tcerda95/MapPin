angular.module('mappinApp', [])
	.controller('HomeController', function($http) {
		$http.get('http://localhost:8080/map').
        then(function(response) {
			this.maps = response.data;
			console.log(this.maps);
        });
//		this.maps = [
//			{name: "Historia Argentina 1810", description: "Una mapa con una descripcion muy larga que va a hacer que tenga que poner tres puntitos para marcar que continuasdkj skjgnkjfg fgs dgdsfgdf"},
//			{name: "Migraciones prehistóricas", description: "El otro mapa no tiene descripcion"},
//			{name: "Mappin hola"}
//		];
	})
;

