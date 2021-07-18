export default class PokemonInfo {
    interval = null;
    isClicking = false;

    init = () => {
        this.initUI();
        this.initFunctions();
    };

    initUI = () => {
        $("#dynamicPart").append(this.buildTemplate());
    };

    buildTemplate = () => {
        return `
            <h2><img src="assets/img/trainer-gold.png"> Feeder<h2>
            <button type="button" id="btnAutoClick" class="button button-red" autofocus>Start feeding!</button>
        `;
    };

    initFunctions = () => {
        $("#btnAutoClick").on("click", this.btnAutoClickHandler);
    };

    btnAutoClickHandler = () => {
        if (this.isClicking) {
            this.stopClicking();
        } else {
            this.startClicking();
        }

        this.isClicking = !this.isClicking;
    };

    interactAutomatically = () => {
        chrome.tabs.executeScript(null, {file: "assets/plugins/jquery/jquery-3.4.1.min.js"}, function () {
            chrome.tabs.executeScript(null, {file: "assets/js/execute/interact-automatically.js"});
        });
    };

    startClicking = () => {
        this.interval = setInterval(this.interactAutomatically, 500);
        $("#btnAutoClick").html("Stop feeding!");
    };

    stopClicking = () => {
        clearInterval(this.interval);
        $("#btnAutoClick").html("Start feeding!");
    }

}
