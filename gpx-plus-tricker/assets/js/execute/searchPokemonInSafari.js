main();

function main() {
    for (let pokemon of pokemons) {
        pickPokemon(pokemon);
    }

    refreshSafari();
}

function pickPokemon(pokemon) {
    if (pokemon.level) {
        pickPokemonWithLevel(pokemon);
    } else {
        pickPokemonWithoutLevel(pokemon);
    }

    chooseYes();
}

function pickPokemonWithLevel(pokemon) {
    $(`img[data-tooltip^='Lv. ${pokemon.level} ${pokemon.name}']`).click();
}

function pickPokemonWithoutLevel(pokemon) {
    $(`img[data-name='${pokemon.name}']`).click();
}

function chooseYes() {
    $("button[data-value='1']").click();
}

function refreshSafari() {
    $(".shelterLoad").click();
}