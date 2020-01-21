main();

function main() {
    init();
}

function init() {
    $("#btnDownloadEggDex").on("click", btnDownloadEggDexClickHandler);
}

function btnDownloadEggDexClickHandler(element) {

    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.tabs.executeScript(null, { file: "./assets/plugins/jquery/jquery-3.4.1.min.js" }, function () {
            chrome.tabs.executeScript(null, { file: "./assets/js/downloadEggDex.js" });
        });
    });
}
