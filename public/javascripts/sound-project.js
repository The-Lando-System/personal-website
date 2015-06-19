var myApp = angular.module('myApp',[]);

myApp.controller('SoundInfoController', ['$scope', function($scope) {

	/* 
	 * Delete the sound data
	 */
	$scope.deleteSoundData = function() {

		// Confirm the delete with a dialog
		var confirmation = confirm('Are you sure you want to reset the data?');
		if (confirmation === true){

			$.ajax({
				type: 'DELETE',
				url: '/sound-data/delete-sound-data'
			}).done(function( response ) {
				populateSoundDataTable();
				listenForSoundData($scope.refreshCheckboxValue,$scope.refreshIntervalValue);
			});

		} else {
			return false;
		}
	};

	/*
	 * Toggle Graph Controls
	 */
	$scope.refreshCheckboxValue = false;	// Auto-refresh enable initial setting
	$scope.refreshIntervalValue = 1000;		// Refresh interval initial setting 
	$scope.toggleGraphControls = function () {
		clearInterval(window.intervalId);
		listenForSoundData($scope.refreshCheckboxValue,$scope.refreshIntervalValue);
	}

	/*
	 * Toggle Raw Sound Data Table
	 */
	$scope.showSoundTable = false;
	$scope.soundTableButtonText = "Show Raw Data";
	$scope.toggleSoundDataTable = function () {
		if ($scope.showSoundTable){
			$scope.showSoundTable = false;
			$scope.soundTableButtonText = "Show Raw Data";
		} else {
			$scope.showSoundTable = true;
			$scope.soundTableButtonText = "Hide Raw Data";
		}
		
	}


	/*
	 * Load the sample CSV sound data
	 */
	$scope.loadCSVData = function () {
		
		var data;
		$.ajax({
			url: "/sound-data/sample_sound_data",
			async: false,
			success: function (csvd) {
				data = $.csv2Array(csvd);
			},
			dataType: "text",
			complete: function () {}
		});
		$.each(data, function(){ 

			
			//alert(this[0] + ' : ' + this[1]);
			var frequency = this[0];
			var timestamp = this[1];

			var soundData = {
				'frequency': frequency,
				'timestamp': timestamp
			};

			$.ajax({
				type: 'POST',
				data: soundData,
				url: '/sound-data/add-sound-data',
				dataType: 'JSON'
			}).done(function(response){
				if (response.msg === ''){
					populateSoundDataTable();
					listenForSoundData($scope.refreshCheckboxValue,$scope.refreshIntervalValue);
				} else {
					alert('Error: ' + response.msg);
				}
			});

		});
	}


	/*
	 * Populate the sound data table
	 * TO-DO : use ng-repeat
	 */
	var populateSoundDataTable = function() {
		var soundDataTableContent = '';

		$.getJSON('/sound-data/sound-data', function(data){

			var soundData = data;
			if(soundData !== null){
				$.each(soundData, function(){
					soundDataTableContent += '<tr id="' + this._id + '">';
					soundDataTableContent += '<td>' + this.frequency + '</td>';
					soundDataTableContent += '<td>' + this.timestamp + '</td>';
					soundDataTableContent += '</tr>';
				});
			}

			// Inject the content into the sound data table
			$('#soundDataTable table tbody').html(soundDataTableContent);
		});
	};

	/*
	 * Create the sound graph and get sound data at the given interval
	 * TO-DO : find a better way...
	 */
	var listenForSoundData = function(isEnabled,refreshInterval) {
		var graph;
		var graphData = '';


		$.getJSON('/sound-data/sound-data', function(data){
			if(data !== null) {
				$.each(data, function(){
					if (this.timestamp && this.frequency) {
						graphData += this.timestamp + ',' + this.frequency + '\n';
					}
				});
			}

			if (graphData === '') {
				graph = new Dygraph(document.getElementById("graphDiv"), "\n", {});
			} else {
				graph = new Dygraph(document.getElementById("graphDiv"), graphData,
					{
						drawPoints: true,
						showRoller: true,
						rollPeriod: 2,
						valueRange: [0,100],
						labels: ['Timestamp', 'Frequency']
					}
				);
			}
		});
		

		if (isEnabled){
			window.intervalId = setInterval(function() {
				// graph.updateOptions( { 'file': graphData } );

				$.getJSON('/sound-data/sound-data', function(data){

					var soundData = data;
					var graphData = '';

					if(soundData !== null){
						$.each(soundData, function(){
							if (this.timestamp && this.frequency) {
								graphData += this.timestamp + ',' + this.frequency + '\n';
							}
						});
					}

					graph.updateOptions( { 'file': graphData } );

				});

				populateSoundDataTable();

			}, refreshInterval);
		} else {
			clearInterval(window.intervalId);
		}
	};

	// Execute these functions on page load
	populateSoundDataTable();
	listenForSoundData($scope.refreshCheckboxValue,$scope.refreshIntervalValue);

}]);