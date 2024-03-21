let searchInputEl = document.getElementById("searchInput");
let searchResultsEl = document.getElementById("searchResults");
let spinnerEl = document.getElementById("spinner");

function createAndAppendSearchResult(result) {
    let {
        link,
        title,
        description
    } = result;
    //container to store whole data
    let resulItemE1 = document.createElement("div");
    resulItemE1.classList.add("result-item");
    // title of data 
    let titleEl = document.createElement("a");
    titleEl.classList.add("result-title");
    titleEl.href = link;
    titleEl.target = "_blank";
    titleEl.textContent = title;
    resulItemE1.appendChild(titleEl);
    //break line 
    let titleBreakEl = document.createElement("br");
    resulItemE1.appendChild(titleBreakEl);
    let urlEl = document.createElement("a");
    urlEl.classList.add("result-url");
    urlEl.href = link;
    urlEl.target = "_blank";
    urlEl.textContent = link;
    resulItemE1.appendChild(urlEl);
    let linkBreakEl = document.createElement("br");
    resulItemE1.appendChild(linkBreakEl);

    let descriptionEl = document.createElement("p");
    descriptionEl.classList.add("link-description");
    descriptionEl.textContent = description;
    resulItemE1.appendChild(descriptionEl);
    searchResultsEl.appendChild(resulItemE1);
}

function displayResult(searchResults) {
    spinnerEl.classList.add("d-none");
    for (let result of searchResults) {
        createAndAppendSearchResult(result);
    }
}

function wikisearch(event) {
    if (event.key === "Enter") {
        spinnerEl.classList.remove("d-none");
        searchResultsEl.textContent = "";
        let searchInputvalue = searchInputEl.value;
        let options = {
            method: "GET"
        };
        let url = "https://apis.ccbp.in/wiki-search?search=" + searchInputvalue;
        fetch(url, options)
            .then(function(response) {
                return response.json();

            })
            .then(function(jsonData) {
                let {
                    search_results
                } = jsonData;
                displayResult(search_results);
            });
    }

}

searchInputEl.addEventListener("keydown", wikisearch);