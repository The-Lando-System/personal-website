angular.module('myApp.redditController', []).
  controller('RedditCtrl', ['$scope', '$http', '$route', function ($scope, $http, $route) {

    $scope.hello = "Top posts in /r/StarWars";
    var starWarsUrl = 'http://www.reddit.com/r/starwars/hot.json?sort=hot';
    var commonWords = ['the','to','i','of','a','for','got','and','is','my','in','was','from','with','-','just','now.','on'];

    var getNewPosts = function(redditUrl){
      $http.get(redditUrl)
      .success(function(data) {
        $scope.posts = data.data.children;
        buildWordTable();
      });
    };

    var buildWordTable = function() {
      var wordTable = {};
      for (var i=0; i<$scope.posts.length; i++){
        var titleWords = $scope.posts[i].data.title.split(' ');
        for (var j=0; j<titleWords.length; j++){
          if (wordTable.hasOwnProperty(titleWords[j])){
            wordTable[titleWords[j]] = wordTable[titleWords[j]] + 1;
          } else {
            wordTable[titleWords[j]] = 1;
          } 
        }
      }
      var sortableWordTable = [];
      for (var word in wordTable){
        sortableWordTable.push([word,wordTable[word]]);
      }
      sortableWordTable.sort(function(a, b) {return b[1] - a[1]});
      $scope.topWords = [];
      
      var wordsAdded = 0;
      for (var i=0; i<sortableWordTable.length; i++){
        var commonWord = false;
        for (var j=0; j<commonWords.length; j++){
          if(sortableWordTable[i][0].toLowerCase() === commonWords[j]){
            commonWord = true;
            break;
          }
        }
        if (!commonWord && wordsAdded<5){
          $scope.topWords[wordsAdded] = {
            'word': sortableWordTable[i][0],
            'weight': sortableWordTable[i][1]
          };
          wordsAdded++;
        }
      }
      console.log($scope.topWords);
    }

  	angular.element(document).ready(function () {
      getNewPosts(starWarsUrl);
  	});
  	
  }]);