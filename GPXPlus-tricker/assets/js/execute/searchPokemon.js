searchPokemon();

function searchPokemon() {
    for (let i = 0; i < pokemons.length; i++) {
        grabPokemon(pokemons[i]);
    }

    $(".shelterLoad").click();
}

function grabPokemon(pokemon) {
    if (pokemon.level == "")
        $(`img[data-name='${pokemon.name}']`).click();
    else
        $(`img[data-tooltip^='Lv. ${pokemon.level} ${pokemon.name}']`).click();

    chooseYes();
}

function chooseYes() {
    $("button[data-value='1']").click();
}