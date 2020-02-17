export default class Lab {
    interval = null;
    isRunning = false;

    init = () => {
        this.initUI();
        this.initFunctions();
    }

    initUI = () => {
        $("#dynamicPart").append(`
            <h2><img src="assets/img/egg.png"> Lab<h2>
            <input id="eggId" type="text" class="text-box-yellow" placeholder="Image url of egg" autocomplete="off" autofocus>
            <button type="button" id="btnSearchEgg" class="button button-yellow">Start searching!</button>
        `);
    }

    initFunctions = () => {
        $("#btnSearchEgg").on("click", this.btnSearchEggClickHandler);
    }

    btnSearchEggClickHandler = () => {
        let eggId = $("#eggId").val().trim();

        if (eggId == "") {
            return;
        }

        if (this.isRunning) {
            this.setStateInput(true);
            clearInterval(this.interval);
            $("#btnSearchEgg").html("Start searching!");
        }
        else {
            this.setStateInput(false);
            this.interval = setInterval(this.huntLabEgg, 2000, eggId);
            $("#btnSearchEgg").html("Stop searching!");
        }

        this.isRunning = !this.isRunning;
    }

    huntLabEgg = (eggId) => {
        chrome.tabs.executeScript(null, { file: "assets/plugins/jquery/jquery-3.4.1.min.js" }, function () {
            chrome.tabs.executeScript(null, { code: `eggId = "${eggId}"` }, function () {
                chrome.tabs.executeScript(null, { file: "assets/js/execute/huntLabEgg.js" });
            });
        });
    }

    setStateInput = (enable) => {
        $("#eggId").prop('disabled', !enable);
    }

}
