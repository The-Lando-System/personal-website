// Project list array
var projectData = [];

// DOM Ready =====================================================
$(document).ready(function(){

	// Populate the project table on page load
	populateProjectTable();

	// Add new project button click
	$('#projectList').on('click', 'button', addNewProject);

	// Delete a project button click
	$('#projectList').on('click', 'td span#deleteProject', deleteProject);

	// Edit a project button click
	$('#projectList').on('click', 'td span#editProject', editProject);

	// Update a project confirmation click
	$('#projectList').on('click', 'td span#confirmEditProject', updateProject);

});

// Functions =====================================================

// Populate the list of projects
function populateProjectTable() {

	var projectTableContent = '';

	$.getJSON('/projects/projects', function(data){

		projectData = data;

		if(data !== null){
			$.each(data, function(){
				projectTableContent += '<tr id="' + this._id + '">';
				projectTableContent += '<td>' + this.project + '</td>';
				projectTableContent += '<td>' + this.description + '</td>';
				projectTableContent += '<td><a href="projects/' + this._id + '">Link to project</td>';
				projectTableContent += '<td>';
				projectTableContent += '<span id="editProject" style="cursor:pointer" class="glyphicon glyphicon-pencil" title="Edit" />';
				projectTableContent += '<span id="deleteProject" style="cursor:pointer; padding-left:1em" class="glyphicon glyphicon-trash" title="Delete" />';
				projectTableContent += '</td>';
				projectTableContent += '</tr>';
			});
		}

		// Add the input forms for a new project
		projectTableContent += '<tr id="newProjectInputs">';
		projectTableContent += '<td><input type="text" id="newProjectInput" placeholder="Enter a name" /></td>';
		projectTableContent += '<td><input type="text" id="newDescriptionInput" placeholder="Enter a description" /></td>';
		projectTableContent += '<td><input type="text" id="newLink" placeholder="Enter the link address" /></td>';
		projectTableContent += '<td><button id="btnAddProject" class="btn btn-xs btn-primary">Add</button></td>';
		projectTableContent += '</tr>';

		// Inject the content into the project table
		$('#projectList table tbody').html(projectTableContent);

	});
}

// Add a new project
function addNewProject(event){
	event.preventDefault();

	// Validate the input forms
	var errCount = 0;
	$('#newProjectInputs input').each(function(index, val){
		if($(this).val() === ''){
			errCount++;
		}
	});

	if (errCount === 0){

		// Build the new project object from the inputs
		var newProject = {
			'project': $('#newProjectInputs input#newProjectInput').val(),
			'description': $('#newProjectInputs input#newDescriptionInput').val(),
			'link': $('#newProjectInputs input#newLink').val()
		};

		// Use AJAX to post the project to the addproject service
		$.ajax({
			type: 'POST',
			data: newProject,
			url: '/projects/addproject',
			dataType: 'JSON'
		}).done(function(response){
			if (response.msg === ''){
				$('#newProjectInputs fieldset input').val('');
				populateProjectTable();
			} else {
				alert('Error: ' + response.msg);
			}
		});


	} else {
		alert('Please fill out all inputs!');
		return false;
	}
}

// Delete a project from the project list
function deleteProject(event){
	event.preventDefault();

	// Confirm the delete with a dialog
	var confirmation = confirm('Are you sure you want to delete?');
	if (confirmation === true){

		// Retrieve the project ID from the parent table row id
		var projectId = $(this).parent().parent().attr('id');


		$.ajax({
			type: 'DELETE',
			url: '/projects/deleteproject/' + projectId
		}).done(function( response ) {

			if (response.msg !== ''){
				alert('Error: ' + response.msg);
			}

			populateProjectTable();

		});

	} else {
		return false;
	}
}

// Prepare a project for editing
function editProject(event){
	event.preventDefault();

	// Retrieve the project ID from the parent table row id
	var projectId = $(this).parent().parent().attr('id');

	// Get the data from the project of interest
	var arrPos = projectData.map(function(arrayItem){
		return arrayItem._id;
	}).indexOf(projectId);
	var projectToEdit = projectData[arrPos];

	// Turn the row HTML data into input forms
	var editProjectHtml = '';
	editProjectHtml += '<td><input type="text" id="editProjectInput" value="' + projectToEdit.project + '"/></td>';
	editProjectHtml += '<td><input type="text" id="editDescriptionInput" value="' + projectToEdit.description + '"/></td>';
	editProjectHtml += '<td><input type="text" id="editTargetdateInput" value="' + projectToEdit.link + '"/></td>';
	editProjectHtml += '<td>';
	editProjectHtml += '<span id="confirmEditProject" style="cursor:pointer" class="glyphicon glyphicon-ok" title="Confirm Edit" />';
	editProjectHtml += '</td>';

	$(this).parent().parent().html(editProjectHtml);
}

// Confirm the updates to the project being edited
function updateProject(event){
	event.preventDefault();

	// Get the id of the project from the row id attribute
	var projectId = $(this).parent().parent().attr('id');

	// Validation
	var errCount = 0;
	$('#' + projectId + ' input').each(function(index, val){
		if($(this).val() === ''){
			errCount++;
		}
	});

	if (errCount === 0){

		// Extract the edited values from the project inputs
		var editedProject = {
			'project': $('#' + projectId + ' input#editProjectInput').val(),
			'description': $('#' + projectId + ' input#editDescriptionInput').val(),
			'link': $('#' + projectId + ' input#editTargetdateInput').val()
		};

		// Use AJAX to put the edited project to the updateproject service
		$.ajax({
			type: 'PUT',
			data: editedProject,
			url: '/projects/updateproject/' + projectId,
			dataType: 'JSON'
		}).done(function(response){
			if (response.msg === ''){
				populateProjectTable();
			} else {
				alert('Error: ' + response.msg);
			}
		});

	} else {
		alert('Project fields cannot be blank!');
		return false;
	}
}