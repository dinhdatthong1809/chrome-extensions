export default class Shelter {
    interval = null;
    isRunning = false;

    init = () => {
        this.initUI();
        this.initFunctions();
    }

    initUI = () => {
        $("#dynamicPart").append(`
            <h2><img src="assets/img/egg.png"> Egg Shelter<h2>
            <input id="eggName1" type="text" class="text-box-yellow" placeholder="Name of egg" autofocus>
            <input id="eggName2" type="text" class="text-box-yellow" placeholder="Name of egg" autofocus>
            <input id="eggName3" type="text" class="text-box-yellow" placeholder="Name of egg" autofocus>
            <input id="eggName4" type="text" class="text-box-yellow" placeholder="Name of egg" autofocus>
            <input id="eggName5" type="text" class="text-box-yellow" placeholder="Name of egg" autofocus>
            <input id="eggName6" type="text" class="text-box-yellow" placeholder="Name of egg" autofocus>
            <button type="button" id="btnSearchEgg" class="button button-yellow">Start searching!</button>
        `);
    }

    initFunctions = () => {
        $("#btnSearchEgg").on("click", this.btnSearchEggClickHandler);
    }

    btnSearchEggClickHandler = () => {
        let eggNames = [];

        for (let i = 1; i <= 6; i++) {
            let eggName = $(`#eggName${i}`).val().trim();

            if (eggName == "") continue;

            eggNames.push(eggName);
        }

        if (eggNames.length == 0) {
            return;
        }

        if (this.isRunning) {
            this.setStateInput(true);
            clearInterval(this.interval);
            $("#btnSearchEgg").html("Start searching!");
        }
        else {
            this.setStateInput(false);
            this.interval = setInterval(this.searchEgg, 2000, eggNames);
            $("#btnSearchEgg").html("Stop searching!");
        }

        this.isRunning = !this.isRunning;
    }

    searchEgg = (eggNames) => {
        eggNames = JSON.stringify(eggNames);

        chrome.tabs.executeScript(null, { file: "assets/plugins/jquery/jquery-3.4.1.min.js" }, function () {
            chrome.tabs.executeScript(null, { code: `eggNames = ${eggNames}` }, function () {
                chrome.tabs.executeScript(null, { file: "assets/js/execute/searchEgg.js" });
            });
        });
    }

    setStateInput = (enable) => {
        for (let i = 1; i <= 6; i++) {
            $(`#eggName${i}`).prop('disabled', !enable);
        }
    }
}
