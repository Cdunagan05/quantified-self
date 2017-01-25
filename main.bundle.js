/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	var Food = __webpack_require__(1);

	// var someFood = new Food();

/***/ },
/* 1 */
/***/ function(module, exports) {

	// require('bootstrap')

	var foodSubmit = document.getElementById('food-submit');
	var foodDelete = document.getElementById('food-delete');
	var foodName = document.getElementById('name-field');
	var calorieNumber = document.getElementById('calorie-field');
	var allFoods = document.getElementById("all-foods-table");
	var alertBox = document.getElementById("alert-message");
	var holdFoods = document.getElementById("hold-foods-table");
	var foodCount = 0;

	foodSubmit.addEventListener('click', function () {
	  var food = foodName.value;
	  var calories = calorieNumber.value;
	  if (food === '') {
	    flash("Please enter a food name");
	  } else if (calories === '') {
	    flash("Please enter a calorie amount");
	  } else {
	    submitFood(food, calories);
	    storeFood(food, calories);
	  }
	});

	foodDelete.addEventListener('click', function () {
	  var deleteRow = function (rowId) {
	    var elem = document.getElementById(rowId);
	    holdFoods.remove(elem);
	  };
	  deleteRow(1);
	});

	function flash(message) {
	  $("#alert-message").remove();
	  $('.alert').prepend('<div id="alert-message">' + message + '</div>');
	  $('#alert-message').delay(1250).fadeOut();
	}

	function storeFood(food, calories) {
	  var foodsJSON = localStorage.getItem('all-foods-table');
	  if (foodsJSON === null) {
	    foodsJSON = '[]';
	  }
	  var currentFoods = JSON.parse(foodsJSON);
	  currentFoods.push({ food: food, calories: calories });
	  foodsJSON = JSON.stringify(currentFoods);
	  localStorage.setItem('hold-foods-table', foodsJSON);
	}

	function submitFood(food, calories) {
	  var newRow = document.createElement("tr");
	  newRow.setAttribute("id", foodCount);
	  var nameCell = document.createElement('td');
	  nameCell.innerText = food;
	  var calorieCell = document.createElement('td');
	  calorieCell.innerText = calories;
	  var deleteCell = document.createElement('td');
	  deleteCell.setAttribute("id", foodCount);
	  deleteCell.innerHTML = "<button id='food-delete'>Delete</button>";
	  newRow.appendChild(nameCell);
	  newRow.appendChild(calorieCell);
	  newRow.appendChild(deleteCell);
	  holdFoods.insertBefore(newRow, holdFoods.firstChild);
	  foodCount++;
	};

	function displayFoods() {
	  JSON.parse(localStorage.getItem('hold-foods-table')).forEach(function (element) {
	    submitFood(element.food, element.calories);
	  });
	}

	displayFoods();

/***/ }
/******/ ]);