var url = "https://restcountries.eu/rest/v2/name/",
    partialResult = [],
    resultHistory = [],
    $search = document.getElementById("search-input"),
    $results = document.getElementById("result-table");


var ac = new autoComplete({
    selector: '#search-input',
    minChars: 1,
    source: function (country, response) {
        getCountries(country.toLowerCase()).then(function(data) {
            response(data);
        });
    },
    onSelect: function (e, country, item) {
        saveItem(country);
    }
});

function getCountries(country) {
    return fetch(url + country).then(function (res) {
        return res.json();
    }).then(function (data) {
        return data.map(function (country) {
            console.log(country);
            return country.name;
        });
    });
}

function removeItem(item, node) {
    resultHistory.splice(resultHistory.indexOf(item), 1);
    $results.getElementsByTagName('tbody')[0].removeChild(node);
}

function addName(tr, country) {
    var column = document.createElement("TD");
    column.innerHTML = country;
    tr.appendChild(column);
}

function addTimeStamp(tr) {
    var options = { year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' };
    var column = document.createElement("TD");
    column.innerHTML = new Date().toLocaleDateString("sv-se", options);
    tr.appendChild(column);
}

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
