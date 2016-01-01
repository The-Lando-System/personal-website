/************************** 
 * routes.js - Provide angular-ui routes for different 'states'
 * 
 * This will serve up the different pages using the routing defined by /routes/main.js
 *
 ********/

myApp.config(function ($stateProvider,$urlRouterProvider) {


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
		.state('word-chaining', {
			url: '/word-chaining',
			templateUrl: '/word-chaining',
			controller: 'WordChainingCtrl'
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
		.state('image-reader', {
			url: '/image-reader',
			templateUrl: '/image-reader',
			controller: 'ImageReaderCtrl'
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
		})
		.state('api-fun.reddit', {
			url: '/reddit',
			templateUrl: '/api-fun/reddit',
			controller: 'RedditCtrl'
		});
});