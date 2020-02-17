export default class Safari {
    interval = null;
    isRunning = false;

    init = () => {
        this.initUI();
        this.initFunctions();
    }

    initUI = () => {
        $("#dynamicPart").append(`
            <h2><img src="assets/img/bulbasaur.png"> Safari Zone<h2>
            <input id="pokemonName" type="text" class="text-box-green" placeholder="Name of pokemon" autofocus>
            <button type="button" id="btnSearchPokemon" class="button button-green">Search pokemon!</button>
        `);
    }

    initFunctions = () => {
        $("#btnSearchPokemon").on("click", this.btnSearchPokemonClickHandler);
    }

    btnSearchPokemonClickHandler = () => {
        let pokemonName = $("#pokemonName").val().trim();

        if (pokemonName == "") {
            return;
        }

        if (this.isRunning) {
            setStateInput(true);
            clearInterval(this.interval);
            $("#btnSearchPokemon").html("Search pokemon!");
        }
        else {
            setStateInput(false);
            this.interval = setInterval(this.searchPokemon, 2000, pokemonName);
            $("#btnSearchPokemon").html("Stop searching!");
        }

        this.isRunning = !this.isRunning;
    }

    searchPokemon = (pokemonName) => {
        chrome.tabs.executeScript(null, { file: "assets/plugins/jquery/jquery-3.4.1.min.js" }, function () {
            chrome.tabs.executeScript(null, { code: `pokemonName = "${pokemonName}"` }, function () {
                chrome.tabs.executeScript(null, { file: "assets/js/execute/searchPokemon.js" });
            });
        });
    }

    setStateInput = (enable) => {
        $("#pokemonName").prop('disabled', !enable);
    }
}
