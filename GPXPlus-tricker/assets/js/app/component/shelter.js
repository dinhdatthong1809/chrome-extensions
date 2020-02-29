export default class Shelter {
    interval = null;
    isRunning = false;

    init = () => {
        this.initUI();
        this.initFunctions();
    }

    initUI = () => {
        let template = "";
        template += `<h2><img src="assets/img/egg.png"> Egg Shelter<h2>`;
        for (let i = 1; i <= 6; i++) {
            template += (`
                <input id="eggName${i}" type="text" class="text-box-yellow" placeholder="Name" autofocus>
            `);
        }
        template += `<button type="button" id="btnSearchEgg" class="button button-yellow">Start searching!</button>`;

        $("#dynamicPart").append(template);
    }

    initFunctions = () => {
        $("#btnSearchEgg").on("click", this.btnSearchEggClickHandler);
    }

    btnSearchEggClickHandler = () => {
        let eggs = this.getEggs();

        if (eggs.length == 0) {
            return;
        }

        if (this.isRunning) {
            this.setStateInput(true);
            clearInterval(this.interval);
            $("#btnSearchEgg").html("Start searching!");
        }
        else {
            this.setStateInput(false);
            this.interval = setInterval(this.searchEgg, 2000, eggs);
            $("#btnSearchEgg").html("Stop searching!");
        }

        this.isRunning = !this.isRunning;
    }

    getEggs = () => {
        let eggs = [];

        for (let i = 1; i <= 6; i++) {
            let egg = {
                name: $(`#eggName${i}`).val().trim()
            };
            if (egg.name == "") continue;

            eggs.push(egg);
        }

        return eggs;
    }

    searchEgg = (eggs) => {
        eggs = JSON.stringify(eggs);

        chrome.tabs.executeScript(null, { file: "assets/plugins/jquery/jquery-3.4.1.min.js" }, function () {
            chrome.tabs.executeScript(null, { code: `eggs = ${eggs}` }, function () {
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
