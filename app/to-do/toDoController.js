angular.module('myApp.toDoController', []).
controller('ToDoCtrl', ['$scope', '$http', '$route', function ($scope, $http, $route) {
	
  $scope.addToDo = function() {


  	// Just in case...
  	if ($scope.toDoList.length > 50) {
  		alert("Exceeded to-do limit!!!");
  		return;
  	}


  	if (!$scope.newToDoName || !$scope.newToDoDesc) {
  		alert("Please fill out both fields!");
  		return;
  	}

  	var newToDo = {
  		'todo': $scope.newToDoName,
  		'description': $scope.newToDoDesc
  	};

  	$http.post('/to-dos/add-to-do', newToDo).
  	success(function(data, status, headers, config) {

  	}).
  	then(function(answer){
  		$scope.newToDoName = '';
  		$scope.newToDoDesc = '';
  		getToDos();
  	});
};

	$scope.editToDoId = '';

  $scope.editToDo = function(toDo) {

  	// Set the ID of the todo being edited
  	$scope.editToDoId = toDo._id;

  	// Reset the to do list in case we were editing other to dos
  	getToDos();

  };

  $scope.confirmEditToDo = function() {

  	// Get the data from the ToDo of interest
		var toDoToEdit = '';

		for (var i=0; i<$scope.toDoList.length; i++) {
			if ($scope.toDoList[i]._id === $scope.editToDoId){
				toDoToEdit = {
					"todo" : $scope.toDoList[i].todo,
					"description" : $scope.toDoList[i].description
				};
				break;
			} 
		}


  	if (!toDoToEdit) {
  		alert("Could not get edited to-do!");
  		return;
  	} else if (!toDoToEdit.todo || !toDoToEdit.description) {
  		alert("Please fill out both fields!");
  		return;
  	}

  	$http.put('/to-dos/update-to-do/' + $scope.editToDoId, toDoToEdit).
  	success(function(data, status, headers, config) {
  		$scope.editToDoId = '';
  	}).
  	then(function(answer){
  		getToDos();
  	});


  };

  $scope.deleteToDo = function(toDo) {
  	var confirmation = confirm('Are you sure you want to delete?');
		if (!confirmation){
			return;
		}

		$http.delete('/to-dos/delete-to-do/' + toDo._id).
  	success(function(data, status, headers, config) {

  	}).
  	then(function(answer){
  		getToDos();
  	});

  };

  $scope.cancelEditToDo = function() {
  	$scope.editToDoId = '';
  };

  var getToDos = function() {

  	$http.get('/to-dos/to-dos').success(function(data, status, headers, config) {
  	  $scope.toDoList = data;
  	});

  };



	// Execute these functions on page load
  angular.element(document).ready(function () {
    getToDos();
  });

}]);