export default class Safari {
    interval = null;
    isRunning = false;

    init = () => {
        this.initUI();
        this.initFunctions();
    }

    initUI = () => {
        let template = "";
        template += `<h2><img src="assets/img/bulbasaur.png"> Safari Zone<h2>`;
        for (let i = 1; i <= 6; i++) {
            template += (`
                <input id="pokemonName${i}" type="text" class="text-box-green pokemonName" placeholder="Name" autofocus>
                <input id="pokemonLevel${i}" type="number" class="text-box-green pokemonLevel" placeholder="Level" min="1" max="100">
            `);
        }
        template += `<button type="button" id="btnSearchPokemon" class="button button-green">Search pokemon!</button>`;

        $("#dynamicPart").append(template);
    }

    initFunctions = () => {
        $("#btnSearchPokemon").on("click", this.btnSearchPokemonClickHandler);
    }

    btnSearchPokemonClickHandler = () => {
        let pokemons = this.getPokemons();

        if (pokemons.length == 0) {
            return;
        }

        if (this.isRunning) {
            this.setStateInput(true);
            clearInterval(this.interval);
            $("#btnSearchPokemon").html("Search pokemon!");
        }
        else {
            this.setStateInput(false);
            this.interval = setInterval(this.searchPokemon, 2000, pokemons);
            $("#btnSearchPokemon").html("Stop searching!");
        }

        this.isRunning = !this.isRunning;
    }

    getPokemons = () => {
        let pokemons = [];

        for (let i = 1; i <= 6; i++) {
            let pokemon = {
                name: $(`#pokemonName${i}`).val().trim(),
                level: $(`#pokemonLevel${i}`).val().trim()
            };

            if (pokemon.name == "") continue;

            pokemons.push(pokemon);
        }

        return pokemons;
    }

    searchPokemon = (pokemons) => {
        chrome.tabs.executeScript(null, { file: "assets/plugins/jquery/jquery-3.4.1.min.js" }, function () {
            chrome.tabs.executeScript(null, { code: `pokemons = ${JSON.stringify(pokemons)}` }, function () {
                chrome.tabs.executeScript(null, { file: "assets/js/execute/searchPokemon.js" });
            });
        });
    }

    setStateInput = (enable) => {
        for (let i = 1; i <= 6; i++) {
            $(`#pokemonName${i}`).prop('disabled', !enable);
            $(`#pokemonLevel${i}`).prop('disabled', !enable);
        }
    }
}
