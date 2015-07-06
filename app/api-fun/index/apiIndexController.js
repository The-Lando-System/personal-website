angular.module('myApp.apiIndexController', []).
controller('ApiIndexCtrl', ['$scope', '$http', '$route', function ($scope, $http, $route) {

  $scope.hello = "hello from api-fun index";

}]);