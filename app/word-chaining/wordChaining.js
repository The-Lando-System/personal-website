angular.module('myApp.wordChainingController', []).
controller('WordChainingCtrl', ['$scope', '$http', 'Upload', function ($scope, $http, Upload) {
	//var wordServiceDomain = 'http://word-service.mattvoget.com';
	var wordServiceDomain = 'http://localhost:3001';
	var wordChainerDomain = 'http://localhost:3002';
	$scope.hello = "Welcome to the word chainer!";
	$scope.randomWord = '';
	$scope.getRandomWord = function(){
		$http.get(wordServiceDomain + '/random-word')
		.success(function(data){
			$scope.randomWord = data.word;
		});
	};


	$scope.dictionaryOption = 1;
	$scope.longestChain = {chain:[],time:0};
	$scope.loading = false;

	$scope.chainWords = function(){
		$scope.longestChain = {chain:[],time:0};
		$scope.loading = true;
		$http.get(wordServiceDomain + '/dictionary/' + $scope.dictionaryOption)
		.success(function(data){
			$http.post(wordChainerDomain + '/longest-chain/', data.words)
			.success(function(data){
				console.log(data);
				$scope.longestChain = data;
				$scope.loading = false;
			});
		});
		
	};

}]);