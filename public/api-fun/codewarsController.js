angular.module('myApp.codewarsController', []).
  controller('CodewarsCtrl', ['$scope', '$http', '$route', function ($scope, $http, $route) {

    var codewarsUserUrl = 'https://www.codewars.com/api/v1/users/landosystem';
    var proxyUrl = 'http://query.yahooapis.com/v1/public/yql';

    var getCodewarsUser = function() {

      var query = "select * from json where url=\"" + codewarsUserUrl + "\"";
      var format = "&format=json&callback=JSON_CALLBACK";
      var url = proxyUrl + "?q=" + fixedEncodeURIComponent(query) + format;

      $http.jsonp(url).success( function (data) {
        if (data.query.results) {

          var codewarsData = data.query.results.json;

          var obj = codewarsData.ranks.languages;
          var arr = [];
          for (var key in obj) {
              if (obj.hasOwnProperty(key)) {
                  arr.push(capFirstLetter(key));
              }
          };
          $scope.languages = arr;

          $scope.username = codewarsData.username;
          $scope.honor = codewarsData.honor;
          $scope.clan = codewarsData.clan;
          $scope.leaderboardPosition = codewarsData.leaderboardPosition;

        }
      });

    };

    var capFirstLetter = function(string){
      return string.charAt(0).toUpperCase() + string.slice(1);
    };

    var fixedEncodeURIComponent = function(str) {
        return encodeURIComponent(str).replace(/[!'()]/g, escape).replace(/\*/g, "%2A").replace(/\"/g, "%22");
    }
  	
  	angular.element(document).ready(function () {
  		getCodewarsUser();
  	});
  	
  }]);