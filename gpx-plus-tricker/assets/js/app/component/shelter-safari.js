export default class ShelterSafari {
    interval = null;
    isSearching = false;

    MAX_NUMBER_OF_POKEMONS = 6;
    PARTY_SLOT = Array.from(Array(this.MAX_NUMBER_OF_POKEMONS));
    
    init = () => {
        this.initUI();
        this.initFunctions();
    };

    initUI = () => {
        $("#dynamicPart").append(this.buildTemplate());
    };

    buildTemplate = () => {
        let template = "";

        template += `<h2><img src="assets/img/bulbasaur.png"> Safari Zone<h2>`;
        
        this.PARTY_SLOT.forEach((x, i) => {
            template += (`
                <input id="pokemonName${i}" type="text" class="text-box-green pokemonName" placeholder="Name" autofocus>
                <input id="pokemonLevel${i}" type="number" class="text-box-green pokemonLevel" placeholder="Level" min="1" max="100">
            `);
        });
        
        template += `<button type="button" id="btnSearchPokemon" class="button button-green">Search pokemon!</button>`;

        return template;
    };

    initFunctions = () => {
        $("#btnSearchPokemon").on("click", this.btnSearchPokemonClickHandler);
    };

    btnSearchPokemonClickHandler = () => {
        if (this.isSearching) {
            this.stopSearching();
        } else {
            let pokemons = this.getPokemonsForSearching();
            if (pokemons.length === 0) {
                return;
            }
            this.startSearching(pokemons);
        }

        this.isSearching = !this.isSearching;
    };

    getPokemonsForSearching = () => {
        const pokemons = [];

        this.PARTY_SLOT.forEach((x, i) => {
            let pokemon = {
                name: $(`#pokemonName${i}`).val().trim(),
                level: $(`#pokemonLevel${i}`).val().trim()
            };

            if (pokemon.name) {
                pokemons.push(pokemon);
            }
        });

        return pokemons;
    };

    startSearching = (pokemons) => {
        this.disableAllInputFields();
        this.interval = setInterval(this.searchPokemonInSafari, 2000, pokemons);
        $("#btnSearchPokemon").html("Stop searching!");
    };

    stopSearching = () => {
        this.enableAllInputFields();
        clearInterval(this.interval);
        $("#btnSearchPokemon").html("Search pokemon!");
    };

    searchPokemonInSafari = (pokemons) => {
        chrome.tabs.executeScript(null, {file: "assets/plugins/jquery/jquery-3.4.1.min.js"}, function () {
            chrome.tabs.executeScript(null, {code: `pokemons = ${JSON.stringify(pokemons)}`}, function () {
                chrome.tabs.executeScript(null, {file: "assets/js/execute/search-pokemon-in-safari.js"});
            });
        });
    };

    setStateInput = (enable) => {
        this.PARTY_SLOT.forEach((x, i) => {
            $(`#pokemonName${i}`).prop("disabled", !enable);
            $(`#pokemonLevel${i}`).prop("disabled", !enable);
        });
        
    };

    disableAllInputFields = () => {
        this.setStateInput(false);
    };

    enableAllInputFields = () => {
        this.setStateInput(true);
    };
}
