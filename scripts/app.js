"use strict";


// Once all data is loaded, you need to display the products in a Bootstrap grid.

// Each product must display the string name of its product type, and product category,
// not the integer id value.

let categories = [];
let types = [];
let products = [];
let categoriesHTML = ``;
let productsHTML = ``;

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
			$("#categories").append(categoriesHTML);
	  }, handleRejection
	);
}


// Populate .all_products div
function populateProducts(selProducts, selTypes, selCategory) {

	for (let i = 0; i < selProducts.length; i++) {
		var currentType = selTypes.filter(function(obj) {
  		return obj.id == selProducts[i].type;
		});

		console.log(selProducts[i].name);
		console.log(currentType[0].name);
		console.log("Category:", selCategory);
		console.log("~~~~~~~~~~~~~~~~~");

	}
}

loadJSON();



// Event Listener

$("#categories").change(function(){

	let selectedCategory = $("#categories").val();
	let categoryID = null;
	let matchingTypes = [];
	let matchingProducts = [];

	for (let i = 0; i < categories.length; i++) {
		if (selectedCategory === categories[i].name) {
			categoryID = categories[i].id;
		}
	}

	for (let i = 0; i < types.length; i++) {
		if (categoryID === types[i].category) {
			matchingTypes.push(types[i]);
		}
	}

	for (let i = 0; i < products.length; i++) {
		for (let j = 0; j < matchingTypes.length; j++) {
			if (products[i].type == matchingTypes[j].id) {
				matchingProducts.push(products[i]);
			}
		}
	}
	populateProducts(matchingProducts, matchingTypes, selectedCategory);
});

















