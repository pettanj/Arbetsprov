"use strict";

/*
 * Initialize global variables
 */
var url = "https://restcountries.eu/rest/v2/name/",
  partialResult = [],
  resultHistory = [],
  $search = document.getElementById("search-input"),
  $results = document.getElementById("result-table");

/*
 * Define auto-complete object with data source and on-select
 */

var ac = new autoComplete({
  selector: '#search-input',
  minChars: 1,
  source: function (country, response) {
    getCountries(country.toLowerCase()).then(function (data) {
      response(data);
    }).catch(function (res) {
      response([]);
    });
  },
  onSelect: function (e, country, item) {
    saveItem(country);
  }
});

/**
 * @desc Makes request to the country API filtering on giver search string
 * @method getCountries
 * @param {String} name - Search string
 */
function getCountries(name) {
  return fetch(url + name).then(function (res) {
    return res.json();
  }).then(function (data) {
    return data.map(function (country) {
      return country.name;
    });
  });
}

/**
 * Removes an item from search history
 * @method removeItem
 * @param {String} name - Country name
 * @param {Object} node - Element to be removed
 */
function removeItem(name, node) {
  resultHistory.splice(resultHistory.indexOf(name), 1);
  $results.getElementsByTagName('tbody')[0].removeChild(node);
}

/**
 * Add column to given TR-element containing given name
 * @method addName
 * @param {Object} tr - row element
 * @param {String} name - contry name
 */
function addName(tr, name) {
  var column = document.createElement("TD");
  column.innerHTML = name;
  tr.appendChild(column);
}

/**
 * @desc Add column with time stamp of current time
 * @method addTimeStamp
 * @param {Object} tr - row element
 */
function addTimeStamp(tr) {
  var options = { year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' };
  var column = document.createElement("TD");
  column.innerHTML = new Date().toLocaleDateString("sv-se", options);
  tr.appendChild(column);
}

/**
 * @desc Add column with delete button to given TR
 * @method addDelete
 * @param {Object} tr - row element 
 * @param {String} country - Country name
 */
function addDelete(tr, country) {
  var column = document.createElement("TD");
  column.setAttribute("class", "delete-column");
  var deleteBtn = document.createElement("BUTTON");
  deleteBtn.setAttribute("class", "delete-button")
  deleteBtn.innerHTML = "X";
  deleteBtn.onclick = function () { removeItem(country, tr) };
  column.appendChild(deleteBtn);
  tr.appendChild(column);
}

/**
 * @desc Saves a country to search history.
 * Create a row element and add appropriate columns 
 * then appending created row to search history
 * @method saveItem
 * @param {String} country - Name of country to be saved 
 */
function saveItem(country) {
  $results.setAttribute("style", "display: table;")
  var tr = document.createElement("TR");
  addName(tr, country);
  addTimeStamp(tr);
  addDelete(tr, country);
  resultHistory.push(country);
  $results.getElementsByTagName('tbody')[0].appendChild(tr);
  $search.value = "";
}
