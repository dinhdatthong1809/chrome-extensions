export default class Lab {
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
        return `
            <h2><img src="assets/img/egg.png"> Lab<h2>
            <input id="eggId" type="text" class="text-box-yellow" placeholder="Image url of egg" autocomplete="off" autofocus>
            <button type="button" id="btnSearchEgg" class="button button-yellow">Start searching!</button>
        `;
    };

    initFunctions = () => {
        $("#btnSearchEgg").on("click", this.btnSearchEggClickHandler);
    };

    btnSearchEggClickHandler = () => {
        if (this.isSearching) {
            this.stopSearching();
        } else {
            let eggId = $("#eggId").val().trim();
            if (!eggId) {
                return;
            }

            this.startSearching(eggId);
        }

        this.isSearching = !this.isSearching;
    };

    stopSearching = () => {
        this.enableAllInputFields();
        clearInterval(this.interval);
        $("#btnSearchEgg").html("Start searching!");
    };

    startSearching = (eggId) => {
        this.disableAllInputFields();
        this.interval = setInterval(this.searchEggInLab, 2000, eggId);
        $("#btnSearchEgg").html("Stop searching!");
    };

    searchEggInLab = (eggId) => {
        chrome.tabs.executeScript(null, {file: "assets/plugins/jquery/jquery-3.4.1.min.js"}, function () {
            chrome.tabs.executeScript(null, {code: `eggId = "${eggId}"`}, function () {
                chrome.tabs.executeScript(null, {file: "assets/js/execute/search-egg-in-lab.js"});
            });
        });
    };

    setStateInput = (enable) => {
        $("#eggId").prop('disabled', !enable);
    };

    disableAllInputFields = () => {
        this.setStateInput(false);
    };

    enableAllInputFields = () => {
        this.setStateInput(true);
    };

}
