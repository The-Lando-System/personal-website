angular.module('myApp', [
  'myApp.controllers',
  'myApp.filters',
  'myApp.services',
  'myApp.directives',
  'ngRoute'
]).
config(function ($routeProvider, $locationProvider) {
	$routeProvider.
		when('/', {
			templateUrl: 'partial',
			controller: 'IndexCtrl'
		}).
		when('/partial2', {
			templateUrl: 'partial2',
			controller: 'IndexCtrl'
		}).
		otherwise({
			redirectTo: '/'
		});
});