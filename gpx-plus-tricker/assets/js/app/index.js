import PokemonInfo from './component/pokemon-info.js'
import Lab from './component/lab.js'
import Other from './component/other.js';
import ShelterEgg from './component/shelter-egg.js';
import ShelterSafari from './component/shelter-safari.js';

main();

function main() {
    initUI();
}

function initUI() {
    $("#dynamicPart").empty();

    chrome.tabs.query({'active': true, 'currentWindow': true}, function (tabs) {
        let url = tabs[0].url;
        let content;

        const isPagePokemonInfo = url.startsWith("https://gpx.plus/info");
        const isPageLab = url.startsWith("https://gpx.plus/lab");
        const isPageShelterEgg = url.startsWith("https://gpx.plus/shelter/eggs");
        const isPageShelterSafari = url.startsWith("https://gpx.plus/shelter/safari");


        if (isPagePokemonInfo) {
            content = new PokemonInfo();

        } else if (isPageLab) {
            content = new Lab();

        } else if (isPageShelterEgg) {
            content = new ShelterEgg();

        } else if (isPageShelterSafari) {
            content = new ShelterSafari();

        } else {
            content = new Other();
        }

        content.init();
    });
}