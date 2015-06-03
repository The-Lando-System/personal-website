// DOM Ready =====================================================
$(document).ready(function(){

	// Populate the sound data
	populateSoundDataTable();

	listenForSoundData();

});

// Populate the list of sound data
function populateSoundDataTable() {

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


}

function listenForSoundData() {

	var graph;

	$.getJSON('/sound-data/sound-data', function(data){

		var soundData = data;
		var graphData = '';

		if(soundData !== null){
			$.each(soundData, function(){
				graphData += this.timestamp + ',' + this.frequency + '\n';
			});
		}


		//graph = new Dygraph(document.getElementById("graphdiv"), graphData);
		graph = new Dygraph(document.getElementById("graphdiv"), graphData,
			{
				drawPoints: true,
				showRoller: true,
				valueRange: [0,100],
				labels: ['Timestamp', 'Frequency']
			}
		);

	});


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

	}, 2000);

}