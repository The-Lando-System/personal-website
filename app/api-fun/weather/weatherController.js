angular.module('myApp.weatherController', []).
  controller('WeatherCtrl', ['$scope', '$http', '$route', function ($scope, $http, $route) {
  	
  	var defaultNoaaUrl = 'http://forecast.weather.gov/MapClick.php?lat=39.044969&lon=-104.83755&FcstType=json&callback=JSON_CALLBACK';
  	var customNoaaUrl;

  	$scope.zipPattern = /\d{5}/

  	$scope.weatherLocation = 'Colorado Springs';

  	$scope.getWeatherWithZipCode = function() {

  		if (!$scope.zipForm.$valid || !$scope.zipCode){
  			alert("Please enter a valid zip code");
  			return;
  		}

  		var zipData;
		$.ajax({
			url: "/api-fun/get-zip-data",
			async: false,
			success: function (csvd) {
				zipData = csvJSON(csvd);
			},
			dataType: "text",
			complete: function () {}
		});

		$.each(zipData, function(){
			if (this.zip === $scope.zipCode){
				$scope.lat = this.latitude;
				$scope.lon = this.longitude;
				$scope.weatherLocation = this.city;
				customNoaaUrl = 'http://forecast.weather.gov/MapClick.php?lat=' + $scope.lat + '&lon=' + $scope.lon + '&FcstType=json&callback=JSON_CALLBACK';
				return false;
			}
		});

		if (customNoaaUrl){
			getWeather();
		} else {
			alert("Could not find the given zip code!");
		}
		

  	};


  	//var csv is the CSV file with headers
	var csvJSON = function(csv) {

		var lines=csv.split("\n");
		var result = [];
		var headers=lines[0].split(",");

		for(var i=1;i<lines.length;i++){

		  var obj = {};
		  var currentline=lines[i].split(",");

			if (currentline){
				for(var j=0;j<headers.length;j++){
					obj[headers[j]] = currentline[j];
				}
			}

			result.push(obj);

		}

		//return result; //JavaScript object
		return result; //JSON
	};

  	var getWeather = function() {

  		$scope.isLoading = true;

  		var noaaUrl = customNoaaUrl ? customNoaaUrl : defaultNoaaUrl;

  		$http.jsonp(noaaUrl).success(function(data) {
  			$scope.tonightsForecast = data.data.text[0];
  			$scope.tomorrowsForecast = data.data.text[1];
  			$scope.tonightsImg = data.data.iconLink[0];
  			$scope.tomorrowsImg = data.data.iconLink[1];

  			$scope.isLoading = false;

  		});

  	};

  	angular.element(document).ready(function () {
  		getWeather();
  	});

  }]);