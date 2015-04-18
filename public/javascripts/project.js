// Project list array
var projectData = [];

// DOM Ready =====================================================
$(document).ready(function(){

	// Populate the project table on page load
	populateProjectTable();

});

// Functions =====================================================

// Populate the list of projects
function populateProjectTable() {

	var projectTableContent = '';

	//var projectURL = window.location.href;
	//var idRe = /\/(\w+)\/project$/g;
	var projectId = /\/(\w+)\/project$/g.exec(window.location.href)[1];

	$.getJSON('/projects/' + projectId, function(data){

		projectTableContent += '<tr id="' + data._id + '">';
		projectTableContent += '<td>' + data.project + '</td>';
		projectTableContent += '<td>' + data.description + '</td>';
		projectTableContent += '<td>' + data._id + '</td>';
		projectTableContent += '</tr>';

		// Inject the content into the project table
		$('#projectList table tbody').html(projectTableContent);

	});
}