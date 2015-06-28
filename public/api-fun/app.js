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
  'ngRoute'
]).
config(function ($routeProvider, $locationProvider) {
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
		when('/codewars', {
			templateUrl: 'codewars',
			controller: 'CodewarsCtrl',
			activetab: 'codewars'
		}).
		when('/weather', {
			templateUrl: 'weather',
			controller: 'WeatherCtrl',
			activetab: 'weather'
		}).
		otherwise({
			redirectTo: '/'
		});
});