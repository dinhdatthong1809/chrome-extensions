main();

let interval = null;
let auto = false;

function main() {
    initUI();
}

function initUI() {
    $("#dynamicPart").empty();

    chrome.tabs.query({ 'active': true, 'currentWindow': true }, function (tabs) {
        let url = tabs[0].url;

        if (url.match(/https:\/\/gpx\.plus\/info\/.*/g)) {
            $("#dynamicPart")
                .append('<button type="button" id="btnAuto" class="button button-red" autofocus>Start automize!</button>')
                .append('<button type="button" id="btnInteractFast" class="button button-black">Interact fast!</button>')
                ;
            $("#btnAuto").on("click", btnAutoClickHandler);
            $("#btnInteractFast").on("click", btnInteractFastClickHandler);
        }

        else if (url.match(/https:\/\/gpx\.plus\/lab.*/g)) {
            $("#dynamicPart")
                .append('<input id="eggId" type="text" autofocus>')
                .append('<button type="button" id="btnFindEgg" class="button button-red">Find egg!</button>')
                ;
            $("#btnFindEgg").on("click", btnFindEggClickHandler);
        }

        else {
            $("#dynamicPart")
                .append('<button type="button" id="btnOpenPokechest" class="button button-black" autofocus>Open Pokéchests!</button>')
                ;
            $("#btnOpenPokechest").on("click", btnOpenPokechestClickHandler);
        }
    });
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

function btnFindEggClickHandler(element) {
    if (auto) {
        $("#btnFindEgg").html("Find egg!");
        clearInterval(interval);
    }
    else {
        $("#btnFindEgg").html("Stop finding!");
        interval = setInterval(function () {
            findEgg($("#eggId").val());
        }, 2000);
    }

    auto = !auto;
}

function findEgg(eggId) {
    chrome.tabs.executeScript(null, { file: "./assets/plugins/jquery/jquery-3.4.1.min.js" }, function () {
        chrome.tabs.executeScript(null, { code: `eggId = "${eggId}"` }, function () {
            chrome.tabs.executeScript(null, { file: "./assets/js/findEgg.js" });
        });
    });
}