angular.module('myApp.wordChainingController', []).
controller('WordChainingCtrl', ['$scope', '$http', 'Upload', function ($scope, $http, Upload) {
	var wordServiceDomain = 'http://word-service.mattvoget.com';
	var wordChainerDomain = 'http://word-chainer.mattvoget.com';
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
	$scope.errorMessage = false;
	$scope.execId = false;
	$scope.inProgress = false;

	$scope.chainWords = function(){
		$scope.longestChain = {chain:[],time:0};
		$scope.errorMessage = false;
		$http.get(wordServiceDomain + '/dictionary/' + $scope.dictionaryOption)
		.success(function(data){
			$http.post(wordChainerDomain + '/longest-chain/', data.words)
			.success(function(data){
				$scope.execId = data.uuid;
			})
			.error(function(data){
				$scope.errorMessage = "Failed to start the word chainer!";
			});
		})
		.error(function(data){
			$scope.errorMessage = "Failed to load the dictionary!";
		});
		
	};

	$scope.checkForCompletion = function(){
		$http.get('/longest-chain/' + $scope.execId)
		.success(function(data){
			if (data.hasOwnProperty('notComplete')){
				$scope.inProgress = true;
			} else {
				$scope.longestChain = data;
				$scope.execId = false;
				$scope.inProgress = false;
			}
		})
		.error(function(data){
			$scope.errorMessage = "Failed to check for longest chain!";
		});
	};

	$scope.anagramError = false;
	$scope.anagrams = [];
	$scope.anagramInput = '';
	$scope.anagramLoading = false;

	$scope.findAnagrams = function(){
		$scope.anagramError = false;
		$scope.anagramLoading = true;
		if ($scope.anagramInput.length<8) {
			$http.get(wordServiceDomain + '/anagrams/' + $scope.anagramInput)
			.success(function(data){
				$scope.anagrams = data.anagrams;
				$scope.anagramLoading = false;
			})
			.error(function(data){
				$scope.anagramError = "Failed to compute anagrams!";
				$scope.anagramLoading = false;
			});
		} else {
			alert('Use a word less than 8 characters or it will take too long....');
		}
		$scope.anagramLoading = false;
	};

}]);