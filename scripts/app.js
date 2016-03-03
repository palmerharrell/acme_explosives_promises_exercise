"use strict";

// Create a simple user interface for your product catalog where a user can select
// a category from a dropdown.

// When a category is selected, you must use Promises to read, first, from the categories.json
// to load that array of objects, then load types.json, then products.json.

// Once all data is loaded, you need to display the products in a Bootstrap grid.

// Each product must display the string name of its product type, and product category,
// not the integer id value.

var categories = [];
var types = [];
var products = [];

// Process AJAX requests
var loadCategories = function() {
  return new Promise((resolve, reject) => {
  	$.ajax({url:"./jsonFiles/categories.json"}).done(function(catsObj) {
  		resolve(catsObj);
  	});
  });
};

var loadTypes = function() {
  return new Promise((resolve, reject) => {
  	$.ajax({url:"./jsonFiles/types.json"}).done(function(typesObj) {
  		resolve(typesObj);
  	});
  });
};

var loadProducts = function() {
  return new Promise(() => {
  	$.ajax({url:"./jsonFiles/products.json"}).done(function(prodsObj) {
  		products = prodsObj.products;
  	});
  });
};


// Reject Function
var handleRejection = function() {
	console.log("Promise Rejected");
};


// Load JSON files in order
function loadJSON() {
	loadCategories().then(
	  function (jsonObj) {
	    categories = jsonObj.categories;
	    return loadTypes();
	  }, handleRejection
	).then(
	  function (jsonObj) {
	    types = jsonObj.types;
	    return loadProducts();
	  }, handleRejection
	);
}

loadJSON();

// Event Listener







