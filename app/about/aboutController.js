angular.module('myApp.aboutController', []).
controller('AboutCtrl', ['$scope', '$http', '$route', function ($scope, $http, $route) {

	$scope.hello = "I enjoy coding, hacking, experimenting, and drinking beer. More details to come...";

}]);