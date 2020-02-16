export default class Safari {
    interval = null;
    auto = false;

    init = () => {
        this.initUI();
        this.initFunctions();
    }

    initUI = () => {
        $("#dynamicPart")
            .append('<input id="pokemonName" type="text" placeholder="Name of pokemon" autofocus>')
            .append('<button type="button" id="btnSearchPokemon" class="button button-red">Search pokemon!</button>')
            ;
    }

    initFunctions = () => {
        $("#btnSearchPokemon").on("click", this.btnSearchPokemonClickHandler);
    }

    btnSearchPokemonClickHandler = () => {
        let pokemonName = $("#pokemonName").val().trim();

        if (pokemonName == "") {
            return;
        }

        if (this.auto) {
            $("#btnSearchPokemon").html("Search pokemon!");
            clearInterval(this.interval);
        }
        else {
            $("#btnSearchPokemon").html("Stop searching!");
            this.interval = setInterval(this.searchPokemon, 2000, pokemonName);
        }

        this.auto = !this.auto;
    }

    searchPokemon = (pokemonName) => {
        chrome.tabs.executeScript(null, { file: "assets/plugins/jquery/jquery-3.4.1.min.js" }, function () {
            chrome.tabs.executeScript(null, { code: `pokemonName = "${pokemonName}"` }, function () {
                chrome.tabs.executeScript(null, { file: "assets/js/execute/searchPokemon.js" });
            });
        });
    }
}
