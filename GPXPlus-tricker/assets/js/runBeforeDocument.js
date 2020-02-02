runBeforeDocument();

function runBeforeDocument() {
    editDataInLocalStorage();
}

function editDataInLocalStorage() {
    // usersHide
    localStorage["usersHide"] = 1;

    // usersDisplay
    localStorage["usersDisplay"] = JSON.stringify(
        {
            list: "today",
            sort: "",
            count: 1000,
            stat: 0,
            achievement: 0,
            list_type: "party",
            page: 1
        }
    );

    // usersOpen
    localStorage["usersOpen"] = JSON.stringify(
        {
            number: "3000",
            type: "0",
            area: "2"
        }
    );

    // usersURL
    if (localStorage["usersURL"] == undefined) {
        localStorage["usersURL"] = "today/1";
    }
}
