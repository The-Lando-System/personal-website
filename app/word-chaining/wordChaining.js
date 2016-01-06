angular.module('myApp.wordChainingController', []).
controller('WordChainingCtrl', ['$scope', '$http', 'FileUploader', function ($scope, $http, FileUploader) {
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

	$scope.dictionarySize = 4;
	$scope.longestChain1 = {chain:[],time:0};
	$scope.loading1 = false;
	$scope.longestChain2 = {chain:[],time:0};
	$scope.loading2 = false;

	$scope.chainWords1 = function(){
		$scope.longestChain1 = {chain:[],time:0};
		$scope.loading1 = true;
		$http.get(wordServiceDomain + '/dictionary/5')
		.success(function(data){
			$http.post(wordChainerDomain + '/longest-chain/', data.words)
			.success(function(data){
				console.log(data);
				$scope.longestChain1 = data;
				$scope.loading1 = false;
			});
		});
		
	};

	$scope.chainWords2 = function(){
		$scope.longestChain2 = {chain:[],time:0};
		$scope.loading2 = true;
		$http.get(wordServiceDomain + '/chainer2/' + $scope.dictionarySize)
		.success(function(data){
			console.log(data);
			$scope.longestChain2 = data;
			$scope.loading2 = false;
		});
	};

	var uploader = $scope.uploader = new FileUploader({url:'dictionary'});

	uploader.onCompleteItem = function(fileItem, response, status, headers) {
        console.info('onCompleteItem', fileItem, response, status, headers);
    };

}]);