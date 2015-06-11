// DOM Ready =====================================================
$(document).ready(function(){

	// Populate the sound data
	populateSoundDataTable();

	listenForSoundData(false,$('input[type=radio][name=refreshInterval]:checked').val());

	$('#autoRefreshCheckbox').on('change', toggleAutoRefresh);

	$('#deleteSoundDataBtn').on('click', deleteSoundData);

	$('input[type=radio][name=refreshInterval]').change(changeRefreshInterval);

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

function listenForSoundData(isEnabled,refreshInterval) {

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

}

function toggleAutoRefresh() {

	var refreshInterval = $('input[type=radio][name=refreshInterval]:checked').val();

	if (document.getElementById('autoRefreshCheckbox').checked) {
		listenForSoundData(true,refreshInterval);
	} else {
		listenForSoundData(false,refreshInterval);
	}
}

function deleteSoundData() {
	event.preventDefault();

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
}

function changeRefreshInterval() {

	var refreshInterval = this.value;
	//alert(refreshInterval);
	clearInterval(window.intervalId);
	listenForSoundData(document.getElementById('autoRefreshCheckbox').checked,refreshInterval);
	//if (document.getElementById('autoRefreshCheckbox').checked) {
	//	listenForSoundData(true);
	//} else {
	//	listenForSoundData(false);
	//}
}