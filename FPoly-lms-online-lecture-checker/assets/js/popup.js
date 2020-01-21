main();

function main() {
    init();
}

function init() {
    $("#btnCheckRightAnswer").on("click", btnCheckRightAnswerClickHandler);
}

function btnCheckRightAnswerClickHandler(element) {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.tabs.executeScript(null, { file: "./assets/plugins/jquery/jquery-3.4.1.min.js" }, function () {
            chrome.tabs.executeScript(null, { file: "./assets/js/checkRightAnswer.js" });
        });
    });
}
