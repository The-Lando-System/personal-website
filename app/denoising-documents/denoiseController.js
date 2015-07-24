angular.module('myApp.denoiseController', []).
controller('DenoiseCtrl', ['$scope', '$http', '$route', function ($scope, $http, $route) {

  $http.get('/denoise/row-pixel-averages')
  .success(function(rowPixelData) {

    var csvData = '';
    var rowPixelLabels = new Array(rowPixelData.length);
    for(i=0;i<rowPixelData.length;i++){
      rowPixelLabels[i] = "";
      csvData += i + ',' + (255-rowPixelData[i]) + '\n';
    }


    /**
     * ChartJS
     */
    // Chart.defaults.global.responsive = true;
    // var ctx = document.getElementById("rowPixelAvgChart").getContext("2d");
    // var data = {
    //     labels: rowPixelLabels,
    //     datasets: [
    //         {
    //             label: "Pixel Averages",
    //             fillColor: "rgba(151,187,205,0.2)",
    //             strokeColor: "rgba(151,187,205,1)",
    //             pointColor: "rgba(151,187,205,1)",
    //             pointStrokeColor: "#fff",
    //             data: rowPixelData
    //         }
    //     ]
    // };
    // var options = {
    //   scaleShowGridLines : false,
    //   pointDot : false,
    //   pointHitDetectionRadius : 1
    // };
    // var myLineChart = new Chart(ctx).Line(data,options);


    /**
     * Dygraph
     */
    var opts = {
        drawPoints: true,
        showRoller: true,
        rollPeriod: 1,
        valueRange: [0,150],
        height: 300,
        width: 1000,
        labels: ['Pixel', 'Value']
    }
    graph = new Dygraph(document.getElementById("rowPixelAvgChart"), csvData, opts);


  });

  $http.get('/denoise/col-pixel-averages')
  .success(function(colPixelData) {

    var valueMark = 244;

    var csvData = [];
    var colPixelLabels = new Array(colPixelData.length);
    for(i=0;i<colPixelData.length;i++){
      colPixelLabels[i] = "";
      //csvData += i + ',' + colPixelData[i] + ',' + valueMark + '\n';
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
    graph = new Dygraph(document.getElementById("colPixelAvgChart"), csvData, opts);


  });



}]);