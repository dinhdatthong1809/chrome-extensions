export default class ShelterEgg {
    interval = null;
    isSearching = false;

    init = () => {
        this.initUI();
        this.initFunctions();
    };

    initUI = () => {
        $("#dynamicPart").append(this.buildTemplate());
    };

    buildTemplate = () => {
        let template = "";

        template += `<h2><img src="assets/img/egg.png"> Egg Shelter<h2>`;
        for (let i = 1; i <= 6; i++) {
            template += (`
                <input id="eggName${i}" type="text" class="text-box-yellow" placeholder="Name" autofocus>
            `);
        }
        template += `<button type="button" id="btnSearchEgg" class="button button-yellow">Start searching!</button>`;

        return template;
    };

    initFunctions = () => {
        $("#btnSearchEgg").on("click", this.btnSearchEggClickHandler);
    };

    btnSearchEggClickHandler = () => {
        if (this.isSearching) {
            this.stopSearching();
        } else {
            let eggs = this.getEggsForSearching();
            if (eggs.length === 0) {
                return;
            }
            this.startSearching(eggs);
        }

        this.isSearching = !this.isSearching;
    };

    getEggsForSearching = () => {
        let eggs = [];

        for (let i = 1; i <= 6; i++) {
            let egg = {
                name: $(`#eggName${i}`).val().trim()
            };

            if (egg.name) {
                eggs.push(egg);
            }
        }

        return eggs;
    };

    startSearching = (eggs) => {
        this.disableAllInputFields();
        this.interval = setInterval(this.searchEggInShelter, 2000, eggs);
        $("#btnSearchEgg").html("Stop searching!");
    };

    stopSearching = () => {
        this.enableAllInputFields();
        clearInterval(this.interval);
        $("#btnSearchEgg").html("Start searching!");
    };

    searchEggInShelter = (eggs) => {
        chrome.tabs.executeScript(null, {file: "assets/plugins/jquery/jquery-3.4.1.min.js"}, function () {
            chrome.tabs.executeScript(null, {code: `eggs = ${JSON.stringify(eggs)}`}, function () {
                chrome.tabs.executeScript(null, {file: "assets/js/execute/search-egg-in-shelter.js"});
            });
        });
    };

    setStateInput = (enable) => {
        for (let i = 1; i <= 6; i++) {
            $(`#eggName${i}`).prop('disabled', !enable);
        }
    };

    disableAllInputFields = () => {
        this.setStateInput(false);
    };

    enableAllInputFields = () => {
        this.setStateInput(true);
    };
}
