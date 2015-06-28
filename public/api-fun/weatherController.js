angular.module('myApp.weatherController', []).
  controller('WeatherCtrl', ['$scope', '$http', '$route', function ($scope, $http, $route) {
  	$scope.hello = "Hello from the Weather controller!";
  }]);