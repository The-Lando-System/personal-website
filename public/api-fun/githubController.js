angular.module('myApp.githubController', []).
  controller('GitHubCtrl', ['$scope', '$http', '$route', function ($scope, $http, $route) {
  	$scope.hello = "Hello from the GitHub controller!";

  	$http.get('https://api.github.com/repos/The-Lando-System/personal-website/stats/commit_activity').
  		success(function(data, status, headers, config) {
  			$scope.lastYearsCommits = 0;
  			$scope.lastWeeksCommits = data[51].total;

  			for (i=0; i<data.length; i++){
  				$scope.lastYearsCommits += data[i].total;
  			}
  		});




  }]);