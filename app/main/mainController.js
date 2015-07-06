angular.module('myApp.mainController', []).
controller('MainCtrl', ['$scope', '$http', '$route', function ($scope, $http, $route) {

  $scope.hello = "hello from main";

}]);