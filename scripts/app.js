"use strict";

// Create a simple user interface for your product catalog where a user can select
// a category from a dropdown.

// When a category is selected, you must use Promises to read, first, from the categories.json
// to load that array of objects, then load types.json, then products.json.

// Once all data is loaded, you need to display the products in a Bootstrap grid.

// Each product must display the string name of its product type, and product category,
// not the integer id value.

let categories = [];
let types = [];
let products = [];
let categoriesHTML = ``;

// Process AJAX requests
let loadCategories = function() {
  return new Promise((resolve, reject) => {
  	$.ajax({url:"./jsonFiles/categories.json"}).done(function(catsObj) {
  		resolve(catsObj);
  	});
  });
};

let loadTypes = function() {
  return new Promise((resolve, reject) => {
  	$.ajax({url:"./jsonFiles/types.json"}).done(function(typesObj) {
  		resolve(typesObj);
  	});
  });
};

let loadProducts = function() {
  return new Promise((resolve, reject) => {
  	$.ajax({url:"./jsonFiles/products.json"}).done(function(prodsObj) {
  		products = prodsObj.products;
  		resolve();
  	});
  });
};


// Reject Function
let handleRejection = function() {
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
	).then(
	  function () {
	  	// Populate Category Select with available categories
			for (let i = 0; i < categories.length; i++) {
				categoriesHTML += `<option value="${categories[i].name}">${categories[i].name}</option>`;
			}
			$("#categories").html(categoriesHTML);
	  }, handleRejection
	);
}

loadJSON();



// Event Listener

$("#categories").change(function(){
	console.log("changed");
});










