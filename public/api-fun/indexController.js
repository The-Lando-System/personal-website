angular.module('myApp.indexController', []).
  controller('IndexCtrl', ['$scope', '$http', '$route', function ($scope, $http, $route) {
  	$scope.$route = $route;
  }]);