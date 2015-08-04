/************************** 
 * routes.js - Provide angular-ui routes for different 'states'
 * 
 * This will serve up the different pages using the routing defined by /routes/main.js
 *
 ********/

myApp.config(function ($stateProvider,$urlRouterProvider,$locationProvider) {

	//$locationProvider.html5Mode(true);

	$urlRouterProvider
		.when('/api-fun', '/api-fun/main')
		.when('/to-do-list', '/to-do-list/to-dos')
		.otherwise('/');

	$stateProvider
		.state('home', {
			url: '/',
			templateUrl: 'main',
			controller: 'MainCtrl'
		})
		.state('sound-project', {
			url: '/sound-project',
			templateUrl: '/sound-project',
			controller: 'SoundProjectCtrl'
		})
		.state('to-do-list', {
			url: '/to-do-list',
			templateUrl: '/to-do-list',
			controller: 'ToDoCtrl'
		})
		.state('to-do-list.to-dos', {
			url: '/to-dos',
			templateUrl: '/to-do-list/to-dos',
			controller: 'ToDoCtrl'
		})
		.state('to-do-list.description', {
			url: '/description',
			templateUrl: '/to-do-list/description',
			controller: 'ToDoCtrl'
		})
		.state('about', {
			url: '/about',
			templateUrl: '/about',
			controller: 'AboutCtrl'
		})
		.state('denoise', {
			url: '/denoise',
			templateUrl: '/denoise',
			controller: 'DenoiseCtrl'
		})
		.state('api-fun', {
			url: '/api-fun',
			templateUrl: '/api-fun',
			controller: 'ApiIndexCtrl'
		})
		.state('api-fun.main', {
			url: '/main',
			templateUrl: '/api-fun/main',
			controller: 'ApiMainCtrl'
		})
		.state('api-fun.github', {
			url: '/github',
			templateUrl: '/api-fun/github',
			controller: 'GitHubCtrl'
		})
		.state('api-fun.weather', {
			url: '/weather',
			templateUrl: '/api-fun/weather',
			controller: 'WeatherCtrl'
		})
		.state('api-fun.codewars', {
			url: '/codewars',
			templateUrl: '/api-fun/codewars',
			controller: 'CodewarsCtrl'
		});
});