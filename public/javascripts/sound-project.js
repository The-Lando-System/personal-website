// DOM Ready =====================================================
$(document).ready(function(){

	// Populate the sound data
	populateSoundDataTable();

});

// Populate the list of sound data
function populateSoundDataTable() {

	var soundDataTableContent = '';

	$.getJSON('/sound-data/sound-data', function(data){

		soundData = data;

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