runBeforeDocument();

function runBeforeDocument() {
    editDataInLocalStorage();
}

function editDataInLocalStorage() {
    // usersHide
    localStorage["usersHide"] = 1;

    // usersDisplay
    localStorage["usersDisplay"].achievement = 0;
    localStorage["usersDisplay"].count = 1000;
    localStorage["usersDisplay"].list_type = "party";
    localStorage["usersDisplay"].sort = "";

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
