// DOM Ready =====================================================
$(document).ready(function(){

	// Populate the project information in the project page
	populateProjectInfo();

});

// Functions =====================================================

// Populate the page with specific project information
function populateProjectInfo() {

	// Get the project ID from the URL
	var projectId = /\/(\w+)\/project$/g.exec(window.location.href)[1];

	// Do a GET on the project/:id route
	$.getJSON('/projects/' + projectId, function(project){

		// Put the project name in the navbar and header
		$('.page-header').html('<h1>' + project.project + '</h1>');
		$('#projectTab a').html(project.project);

		// Make a table with the project information
		var projectTableContent = '';
		projectTableContent += '<tr id="' + project._id + '">';
		projectTableContent += '<td>' + project.project + '</td>';
		projectTableContent += '<td>' + project.description + '</td>';
		projectTableContent += '<td>' + project._id + '</td>';
		projectTableContent += '</tr>';

		// Inject the project content into the project table html
		$('#projectList table tbody').html(projectTableContent);

	});
}