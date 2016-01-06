/************************** 
 * app.module.js - Define the angular module that will drive this site
 *
 ********/

var myApp = angular.module('myApp', [
  'myApp.mainController',
  'myApp.apiIndexController',
  'myApp.apiMainController',
  'myApp.githubController',
  'myApp.weatherController',
  'myApp.codewarsController',
  'myApp.redditController',
  'myApp.soundProjectController',
  'myApp.toDoController',
  'myApp.aboutController',
  'myApp.imageReaderController',
  'myApp.wordChainingController',
  'myApp.filters',
  'myApp.services',
  'myApp.directives',
  'ui.router',
  'ngRoute',
  'ui.bootstrap',
  'ngFileUpload'
]);