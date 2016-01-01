angular.module('myApp.wordChainingController', []).
controller('WordChainingCtrl', ['$scope', '$http', function ($scope, $http) {
	//var wordServiceDomain = 'http://word-service.mattvoget.com';
	var wordServiceDomain = 'http://localhost:3001';
	$scope.hello = "Welcome to the word chainer!";
	$scope.randomWord = '';
	$scope.getRandomWord = function(){
		$http.get(wordServiceDomain + '/random-word')
		.success(function(data){
			$scope.randomWord = data.word;
		});
	};

	$scope.dictionarySize = 4;
	$scope.longestChain = {chain:[],time:0};
	$scope.loading = false;
	$scope.longestChain2 = {chain:[],time:0};
	$scope.loading2 = false;

	$scope.chainWords = function(){
		$scope.longestChain = {chain:[],time:0};
		$scope.loading = true;
		$http.get(wordServiceDomain + '/longest-chain/' + $scope.dictionarySize)
		.success(function(data){
			console.log(data);
			$scope.longestChain = data;
			$scope.loading = false;
		});
	};

	$scope.chainWords2 = function(){
		$scope.longestChain2 = {chain:[],time:0};
		$scope.loading2 = true;
		$http.get(wordServiceDomain + '/longest-chain2/' + $scope.dictionarySize)
		.success(function(data){
			console.log(data);
			$scope.longestChain2 = data;
			$scope.loading2 = false;
		});
	};

}]);