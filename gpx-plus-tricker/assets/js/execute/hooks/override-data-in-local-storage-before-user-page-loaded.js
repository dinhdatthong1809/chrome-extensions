main();

function main() {
    editDataInLocalStorage();
}

function editDataInLocalStorage() {
    // usersHide
    localStorage["usersHide"] = 1;

    // usersDisplay
    if (!localStorage["usersDisplay"]) {
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
    }

    // usersOpen
    localStorage["usersOpen"] = JSON.stringify(
        {
            number: "4000",
            type: "0",
            area: "1"
        }
    );

    // usersURL
    if (!localStorage["usersURL"]) {
        localStorage["usersURL"] = "today/1";
    }
}
