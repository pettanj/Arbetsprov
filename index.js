var temp = "hello";
var url = "https://restcountries.eu/rest/v2/name/";
function submit() {
    document.getElementById("result-table").setAttribute("style", "display: none;")
    name = document.getElementById("search-input").value;
    fetch(url + name).then(function (response) {
        return response.json();
    }).then(function (value) {
        document.getElementById("result-table").getElementsByTagName('tbody')[0].innerHTML = "";
        value.forEach(function (item) {
            var tr = document.createElement("TR");
            var nameColumn = document.createElement("TD");
            nameColumn.innerHTML = item.name;
            var timeColumn = document.createElement("TD");
            timeColumn.innerHTML = new Date().toLocaleDateString("sv-se");
            tr.appendChild(nameColumn);
            tr.appendChild(timeColumn);
            document.getElementById("result-table").getElementsByTagName('tbody')[0].appendChild(tr);
        })
        document.getElementById("result-table").setAttribute("style", "display: block;")
    }).catch(function (response) {
        document.getElementById("result-table").setAttribute("style", "display: block;")
        document.getElementById("result-table").getElementsByTagName('tbody')[0].innerHTML = "No response";
    });
}
function keypressFunction(event) {
    if (event.keyCode == 13) {
        submit();
    }
}