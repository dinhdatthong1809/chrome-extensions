let interval = null;
let auto = false;

main();

function main() {
    initUI();
}

function initUI() {
    $("#dynamicPart").empty();

    chrome.tabs.query({ 'active': true, 'currentWindow': true }, function (tabs) {
        let url = tabs[0].url;

        if (url.match(/https:\/\/gpx\.plus\/info\/.*/g)) {
            initInfoPageUI();
        }

        else if (url.match(/https:\/\/gpx\.plus\/lab.*/g)) {
            initLabPageUI();
        }

        else if (url.match(/https:\/\/gpx\.plus\/shelter\/safari.*/g)) {
            initSafariPageUI();
        }

        else {
            initOtherPageUI();
        }
    });
}

function initInfoPageUI() {
    $("#dynamicPart")
        .append('<button type="button" id="btnAuto" class="button button-red" autofocus>Start automize!</button>')
        .append('<button type="button" id="btnInteractFast" class="button button-black">Interact fast!</button>')
        ;
    $("#btnAuto").on("click", btnAutoClickHandler);
    $("#btnInteractFast").on("click", btnInteractFastClickHandler);
}

function initLabPageUI() {
    $("#dynamicPart")
        .append('<input id="eggId" type="text" placeholder="Image url of egg" autofocus>')
        .append('<button type="button" id="btnSearchEgg" class="button button-red">Search egg!</button>')
        ;
    $("#btnSearchEgg").on("click", btnSearchEggClickHandler);
}

function initSafariPageUI() {
    $("#dynamicPart")
        .append('<input id="pokemonName" type="text" placeholder="Name of pokemon" autofocus>')
        .append('<button type="button" id="btnSearchPokemon" class="button button-red">Search pokemon!</button>')
        ;
    $("#btnSearchPokemon").on("click", btnSearchPokemonClickHandler);
}

function initOtherPageUI() {
    $("#dynamicPart")
        .append('<button type="button" id="btnOpenPokechest" class="button button-black" autofocus>Open Pokéchests!</button>')
        ;
    $("#btnOpenPokechest").on("click", btnOpenPokechestClickHandler);
}

function btnAutoClickHandler(element) {
    if (auto) {
        $("#btnAuto").html("Start automize!");
        clearInterval(interval);
    }
    else {
        $("#btnAuto").html("Stop automize!");
        interval = setInterval(function () {
            $("#btnInteractFast").click();
        }, 500);
    }

    auto = !auto;
}

function btnInteractFastClickHandler(element) {
    chrome.tabs.executeScript(null, { file: "./assets/plugins/jquery/jquery-3.4.1.min.js" }, function () {
        chrome.tabs.executeScript(null, { file: "./assets/js/interactFast.js" });
    });
}

function btnOpenPokechestClickHandler(element) {
    chrome.tabs.executeScript(null, { file: "./assets/plugins/jquery/jquery-3.4.1.min.js" }, function () {
        chrome.tabs.executeScript(null, { file: "./assets/js/openPokechest.js" });
    });
}

function btnSearchEggClickHandler(element) {
    let value = $("#eggId").val().trim();

    if (value == "") {
        return;
    }

    if (auto) {
        $("#btnSearchEgg").html("Search egg!");
        clearInterval(interval);
    }
    else {
        $("#btnSearchEgg").html("Stop searching!");
        interval = setInterval(function () {
            searchEgg(value);
        }, 2000);
    }

    auto = !auto;
}

function searchEgg(eggId) {
    chrome.tabs.executeScript(null, { file: "./assets/plugins/jquery/jquery-3.4.1.min.js" }, function () {
        chrome.tabs.executeScript(null, { code: `eggId = "${eggId}"` }, function () {
            chrome.tabs.executeScript(null, { file: "./assets/js/searchEgg.js" });
        });
    });
}

function btnSearchPokemonClickHandler(element) {
    let value = $("#pokemonName").val().trim();

    if (value == "") {
        return;
    }

    if (auto) {
        $("#btnSearchPokemon").html("Search pokemon!");
        clearInterval(interval);
    }
    else {
        $("#btnSearchPokemon").html("Stop searching!");
        interval = setInterval(function () {
            searchPokemon(value);
        }, 2000);
    }

    auto = !auto;
}

function searchPokemon(pokemonName) {
    chrome.tabs.executeScript(null, { file: "./assets/plugins/jquery/jquery-3.4.1.min.js" }, function () {
        chrome.tabs.executeScript(null, { code: `pokemonName = "${pokemonName}"` }, function () {
            chrome.tabs.executeScript(null, { file: "./assets/js/searchPokemon.js" });
        });
    });
}