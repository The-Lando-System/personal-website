angular.module('myApp.imageReaderController', []).
controller('ImageReaderCtrl', ['$scope', '$http', '$route', function ($scope, $http, $route) {

  $http.get('/image-reader/test-data')
  .success(function(rowPixelData) {

    var csvData = '';
    var rowPixelLabels = new Array(rowPixelData.length);
    for(i=0;i<rowPixelData.length;i++){
      rowPixelLabels[i] = "";
      csvData += i + ',' + rowPixelData[i] + '\n';
    }

    /**
     * Dygraph
     */
    var opts = {
        drawPoints: true,
        showRoller: true,
        rollPeriod: 1,
        valueRange: [50,300],
        height: 300,
        width: 1000,
        labels: ['Pixel', 'Value']
    }
    graph = new Dygraph(document.getElementById("testDataChart"), csvData, opts);


  });

  $http.get('/image-reader/train-data')
  .success(function(colPixelData) {

    var valueMark = 254;

    var csvData = [];
    var colPixelLabels = new Array(colPixelData.length);
    for(i=0;i<colPixelData.length;i++){
      colPixelLabels[i] = "";
      csvData.push([
          i,
          colPixelData[i],
          valueMark
        ]);
    }

    /**
     * Dygraph
     */
    var opts = {
        drawPoints: true,
        showRoller: true,
        rollPeriod: 1,
        valueRange: [50,300],
        height: 300,
        width: 1000,
        labels: ['Pixel', 'Value', 'Mark']
    }
    graph = new Dygraph(document.getElementById("trainDataChart"), csvData, opts);


  });



}]);