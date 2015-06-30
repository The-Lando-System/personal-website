angular.module('myApp.weatherController', []).
  controller('WeatherCtrl', ['$scope', '$http', '$route', function ($scope, $http, $route) {
  	$scope.hello = "Hello from the Weather controller!";

  	var getWeather = function(){
  		var noaaUrl = 'http://forecast.weather.gov/MapClick.php?lat=38.9508964&lon=-77.3992481&FcstType=json&callback=JSON_CALLBACK';

  		$http.jsonp(noaaUrl).success(function(data) {
  			$scope.tonightsForecast = data.data.text[0];
  			$scope.tomorrowsForecast = data.data.text[1];
  		});

  	};

  	angular.element(document).ready(function () {
  		getWeather();
  	});

  }]);