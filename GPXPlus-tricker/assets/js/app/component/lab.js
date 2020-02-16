export default class Lab {
    interval = null;
    auto = false;

    init = () => {
        this.initUI();
        this.initFunctions();
    }

    initUI = () => {
        $("#dynamicPart")
            .append('<input id="eggId" type="text" placeholder="Image url of egg" autofocus>')
            .append('<button type="button" id="btnSearchEgg" class="button button-red">Search egg!</button>')
            ;
    }

    initFunctions = () => {
        $("#btnSearchEgg").on("click", this.btnSearchEggClickHandler);
    }

    btnSearchEggClickHandler = () => {
        let eggId = $("#eggId").val().trim();

        if (eggId == "") {
            return;
        }

        if (this.auto) {
            $("#btnSearchEgg").html("Search egg!");
            clearInterval(this.interval);
        }
        else {
            $("#btnSearchEgg").html("Stop searching!");
            this.interval = setInterval(this.searchEgg, 2000, eggId);
        }

        this.auto = !this.auto;
    }

    searchEgg = (eggId) => {
        chrome.tabs.executeScript(null, { file: "assets/plugins/jquery/jquery-3.4.1.min.js" }, function () {
            chrome.tabs.executeScript(null, { code: `eggId = "${eggId}"` }, function () {
                chrome.tabs.executeScript(null, { file: "assets/js/execute/searchEgg.js" });
            });
        });
    }

}
