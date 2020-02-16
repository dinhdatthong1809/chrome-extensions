import Info from './component/info.js'
import Lab from './component/lab.js'
import Safari from './component/safari.js';
import Other from './component/other.js';

main();

function main() {
    initUI();
}

function initUI() {
    $("#dynamicPart").empty();

    chrome.tabs.query({ 'active': true, 'currentWindow': true }, function (tabs) {
        let url = tabs[0].url;
        let content;

        if (url.match(/https:\/\/gpx\.plus\/info\/.*/g)) {
            content = new Info();
        }

        else if (url.match(/https:\/\/gpx\.plus\/lab.*/g)) {
            content = new Lab();
        }

        else if (url.match(/https:\/\/gpx\.plus\/shelter\/safari.*/g)) {
            content = new Safari();
        }

        else {
            content = new Other();
        }

        content.init();
    });
}