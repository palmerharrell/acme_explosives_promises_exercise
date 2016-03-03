"use strict";

let categories = [];
let types = [];
let products = [];
let categoriesHTML = ``;
let productsHTML = ``;

$(document).ready(function() {

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
	function handleRejection() {
		console.log("Promise Rejected");
	}


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
		productsHTML = `<div class="row">`;
		for (let i = 0; i < selProducts.length; i++) {
			let currentType = selTypes.filter(function(obj) {
	  		return obj.id == selProducts[i].type;
			});
			productsHTML += `<div class="col-md-5 product">`;
			productsHTML += `<p class="name">${selProducts[i].name}</p>`;
			productsHTML += `<p class="type">${currentType[0].name}</p>`;
			productsHTML += `<p class="category">${selCategory}</p></div>`;
		}
		productsHTML += `</div>`;
		$(".all_products").html(productsHTML);
	}

	let getMatches = function() {
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
	};


	loadJSON();
	$("#categories").change(getMatches);

});

