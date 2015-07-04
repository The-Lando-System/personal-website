/************************** 
 * API Fun - app.js
 *
 ********/

angular.module('myApp', [
  'myApp.indexController',
  'myApp.githubController',
  'myApp.codewarsController',
  'myApp.weatherController',
  'myApp.filters',
  'myApp.services',
  'myApp.directives',
  'ngRoute',
  'ui.bootstrap'
]).
config(function ($routeProvider, $locationProvider, $httpProvider) {
	$routeProvider.
		when('/', {
			templateUrl: 'main',
			controller: 'IndexCtrl',
			activetab: 'main'
		}).
		when('/github', {
			templateUrl: 'github',
			controller: 'GitHubCtrl',
			activetab: 'github'
		}).
		when('/weather', {
			templateUrl: 'weather',
			controller: 'WeatherCtrl',
			activetab: 'weather'
		}).
		when('/codewars', {
			templateUrl: 'codewars',
			controller: 'CodewarsCtrl',
			activetab: 'codewars'
		}).
		otherwise({
			redirectTo: '/'
		});
});