main();

function main() {
    init();
}

function init() {
    $("#btnDownloadAllQuizes").on("click", btnDownloadAllQuizesClickHandler);
}

function btnDownloadAllQuizesClickHandler(element) {
    let fromId = $("input[name='fromId']").val();
    let toId = $("input[name='toId']").val();

    if (fromId == "" || toId == "") {
        return;
    }

    fromId = parseInt(fromId);
    toId = parseInt(toId);

    if (fromId >= toId) {
        return;
    }

    let myConfig = {
        fromId: fromId,
        toId: toId
    };

    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.tabs.executeScript(null, { file: "./assets/plugins/jquery/jquery-3.4.1.min.js" }, function () {
            chrome.tabs.executeScript(null, { code: 'let myConfig = ' + JSON.stringify(myConfig) }, function () {
                chrome.tabs.executeScript(null, { file: "./assets/js/downloadAllQuizes.js" });
            });
        });
    });
}
