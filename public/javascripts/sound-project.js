var myApp = angular.module('myApp',[]);

myApp.controller('SoundInfoController', ['$scope', function($scope) {

	$scope.greeting = 'Hello Angular!';

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

		$.getJSON('/sound-data/sound-data', function(data){

			var soundData = data;
			var graphData = '';

			if(soundData !== null){
				$.each(soundData, function(){
					graphData += this.timestamp + ',' + this.frequency + '\n';
				});
			}

			graph = new Dygraph(document.getElementById("graphDiv"), graphData,
				{
					drawPoints: true,
					showRoller: true,
					valueRange: [0,100],
					labels: ['Timestamp', 'Frequency']
				}
			);

		});

		if (isEnabled){
			window.intervalId = setInterval(function() {
				// graph.updateOptions( { 'file': graphData } );

				$.getJSON('/sound-data/sound-data', function(data){

					var soundData = data;
					var graphData = '';

					if(soundData !== null){
						$.each(soundData, function(){
							graphData += this.timestamp + ',' + this.frequency + '\n';
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