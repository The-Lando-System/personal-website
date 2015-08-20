angular.module('myApp.githubController', []).
  controller('GitHubCtrl', ['$scope', '$http', '$route', function ($scope, $http, $route) {

  	$scope.lastYearsCommits = 0;
  	$scope.lastWeeksCommits = 0;

  	$scope.getGitHubStats = function(){
  		var myGitHubUrl = 'https://api.github.com/repos/The-Lando-System/personal-website/stats/commit_activity';

	  	$http.get(myGitHubUrl).success(function(data, status, headers, config) {
			$scope.lastYearsCommits = 0;

			var weeks = new Array(10);
			var commits = new Array(10);

			var j=0;
			for (i=0; i<data.length; i++){
				$scope.lastYearsCommits += data[i].total;

				if (i>=data.length-10){
					weeks[j] = (data.length-i) === 1 ? (data.length-i) + " week ago" : (data.length-i) + " weeks ago";
					commits[j] = data[i].total;
					j++;
				}
				
			}

      		Chart.defaults.global.responsive = true;
      
			var ctx = $("#myChart").get(0).getContext("2d");
			var data = {
			    labels: weeks,
			    datasets: [
			        {
			            label: "Weekly Commits",
			            fillColor: "rgba(151,187,205,0.2)",
			            strokeColor: "rgba(151,187,205,1)",
			            pointColor: "rgba(151,187,205,1)",
			            pointStrokeColor: "#fff",
			            pointHighlightFill: "#fff",
			            pointHighlightStroke: "rgba(151,187,205,1)",
			            data: commits
			        }
			    ]
			};

			var myLineChart = new Chart(ctx).Line(data);

		});

		//$scope.$apply();
  	};

  	angular.element(document).ready(function () {
  		$scope.getGitHubStats();
  		//getGitHubStats();
  	});

  }]);