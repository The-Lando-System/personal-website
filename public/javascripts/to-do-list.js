// ToDo list array
var toDoData = [];

// DOM Ready =====================================================
$(document).ready(function(){

	// Populate the ToDo table on page load
	populateToDoTable();

	// Add new ToDo button click
	$(document).on('click', '#btnAddToDo', addNewToDo);

	// Delete a ToDo button click
	$(document).on('click', 'td span#deleteToDo', deleteToDo);

	// Edit a ToDo button click
	$(document).on('click', 'td span#editToDo', editToDo);

	// Update a ToDo confirmation click
	$(document).on('click', 'td span#confirmEditToDo', updateToDo);

});
// Functions =====================================================

var myApp = angular.module('myApp',[]);

myApp.controller('ToDoController', ['$scope', function($scope) {

}]);


// Populate the list of ToDos
function populateToDoTable() {

	var toDoTableContent = '';

	$.getJSON('/to-dos/to-dos', function(data){

		toDoData = data;

		if(data !== null){
			$.each(data, function(){
				toDoTableContent += '<tr id="' + this._id + '">';
				toDoTableContent += '<td>' + this.todo + '</td>';
				toDoTableContent += '<td>' + this.description + '</td>';
				toDoTableContent += '<td>';
				toDoTableContent += '<span id="editToDo" style="cursor:pointer" class="glyphicon glyphicon-pencil" title="Edit" />';
				toDoTableContent += '<span id="deleteToDo" style="cursor:pointer; padding-left:1em" class="glyphicon glyphicon-trash" title="Delete" />';
				toDoTableContent += '</td>';
				toDoTableContent += '</tr>';
			});
		}

		// Add the input forms for a new ToDo
		toDoTableContent += '<tr id="newToDoInputs">';
		toDoTableContent += '<td><input type="text" id="newToDoInput" placeholder="Enter a name" /></td>';
		toDoTableContent += '<td><input type="text" id="newDescriptionInput" placeholder="Enter a description" style="width:500px;" /></td>';
		toDoTableContent += '<td><button id="btnAddToDo" class="btn btn-xs btn-primary">Add</button></td>';
		toDoTableContent += '</tr>';

		// Inject the content into the ToDo table
		$('#toDoList table tbody').html(toDoTableContent);

	});
}

// Add a new ToDo
function addNewToDo(event){
	event.preventDefault();

	// Validate the input forms
	var errCount = 0;
	$('#newToDoInputs input').each(function(index, val){
		if($(this).val() === ''){
			errCount++;
		}
	});

	if (errCount === 0){

		// Build the new ToDo object from the inputs
		var newToDo = {
			'todo': $('#newToDoInputs input#newToDoInput').val(),
			'description': $('#newToDoInputs input#newDescriptionInput').val()
		};

		// Use AJAX to post the ToDo to the addToDo service
		$.ajax({
			type: 'POST',
			data: newToDo,
			url: '/to-dos/add-to-do',
			dataType: 'JSON'
		}).done(function(response){
			if (response.msg === ''){
				$('#newToDoInputs fieldset input').val('');
				populateToDoTable();
			} else {
				alert('Error: ' + response.msg);
			}
		});


	} else {
		alert('Please fill out all inputs!');
		return false;
	}
}

// Delete a ToDo from the ToDo list
function deleteToDo(event){
	event.preventDefault();

	// Confirm the delete with a dialog
	var confirmation = confirm('Are you sure you want to delete?');
	if (confirmation === true){

		// Retrieve the ToDo ID from the parent table row id
		var toDoId = $(this).parent().parent().attr('id');


		$.ajax({
			type: 'DELETE',
			url: '/to-dos/delete-to-do/' + toDoId
		}).done(function( response ) {

			if (response.msg !== ''){
				alert('Error: ' + response.msg);
			}

			populateToDoTable();

		});

	} else {
		return false;
	}
}

// Prepare a ToDo for editing
function editToDo(event){
	event.preventDefault();

	// Retrieve the ToDo ID from the parent table row id
	var toDoId = $(this).parent().parent().attr('id');

	// Get the data from the ToDo of interest
	var arrPos = toDoData.map(function(arrayItem){
		return arrayItem._id;
	}).indexOf(toDoId);
	var toDoToEdit = toDoData[arrPos];

	// Turn the row HTML data into input forms
	var editToDoHtml = '';
	editToDoHtml += '<td><input type="text" id="editToDoInput" value="' + toDoToEdit.todo + '"/></td>';
	editToDoHtml += '<td><input type="text" id="editDescriptionInput" value="' + toDoToEdit.description + '"/></td>';
	editToDoHtml += '<td>';
	editToDoHtml += '<span id="confirmEditToDo" style="cursor:pointer" class="glyphicon glyphicon-ok" title="Confirm Edit" />';
	editToDoHtml += '</td>';

	$(this).parent().parent().html(editToDoHtml);
}

// Confirm the updates to the ToDo being edited
function updateToDo(event){
	event.preventDefault();

	// Get the id of the ToDo from the row id attribute
	var toDoId = $(this).parent().parent().attr('id');

	// Validation
	var errCount = 0;
	$('#' + toDoId + ' input').each(function(index, val){
		if($(this).val() === ''){
			errCount++;
		}
	});

	if (errCount === 0){

		// Extract the edited values from the ToDo inputs
		var editedToDo = {
			'todo': $('#' + toDoId + ' input#editToDoInput').val(),
			'description': $('#' + toDoId + ' input#editDescriptionInput').val()
		};

		// Use AJAX to put the edited ToDo to the updateToDo service
		$.ajax({
			type: 'PUT',
			data: editedToDo,
			url: '/to-dos/update-to-do/' + toDoId,
			dataType: 'JSON'
		}).done(function(response){
			if (response.msg === ''){
				populateToDoTable();
			} else {
				alert('Error: ' + response.msg);
			}
		});

	} else {
		alert('To-Do fields cannot be blank!');
		return false;
	}
}