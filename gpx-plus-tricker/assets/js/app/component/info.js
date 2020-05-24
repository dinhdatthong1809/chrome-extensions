export default class Info {
    interval = null;
    isRunning = false;

    init = () => {
        this.initUI();
        this.initFunctions();
    }

    initUI = () => {
        $("#dynamicPart").append(`
            <h2><img src="assets/img/trainer-gold.png"> Feeder<h2>
            <button type="button" id="btnAuto" class="button button-red" autofocus>Start feeding!</button>
        `);
    }

    initFunctions = () => {
        $("#btnAuto").on("click", this.btnAutoClickHandler);
    }

    btnAutoClickHandler = () => {
        if (this.isRunning) {
            clearInterval(this.interval);
            $("#btnAuto").html("Start feeding!");
        }
        else {
            this.interval = setInterval(this.interactAutomatically, 500);
            $("#btnAuto").html("Stop feeding!");
        }

        this.isRunning = !this.isRunning;
    }

    interactAutomatically = () => {
        chrome.tabs.executeScript(null, { file: "assets/plugins/jquery/jquery-3.4.1.min.js" }, function () {
            chrome.tabs.executeScript(null, { file: "assets/js/execute/interactAutomatically.js" });
        });
    }
}
