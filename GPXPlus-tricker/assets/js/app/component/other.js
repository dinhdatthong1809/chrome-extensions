export default class Other {
    init = () => {
        this.initUI();
        this.initFunctions();
    }
    
    initUI = () => {
        $("#dynamicPart")
            .append('<button type="button" id="btnOpenPokechest" class="button button-black" autofocus>Open Pokéchests!</button>')
            ;
    }

    initFunctions = () => {
        $("#btnOpenPokechest").on("click", this.btnOpenPokechestClickHandler);
    }

    btnOpenPokechestClickHandler = () => {
        chrome.tabs.executeScript(null, { file: "assets/plugins/jquery/jquery-3.4.1.min.js" }, function () {
            chrome.tabs.executeScript(null, { file: "assets/js/execute/openPokechest.js" });
        });
    }
}
