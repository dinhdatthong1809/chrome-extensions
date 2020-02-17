searchPokemon();

function searchPokemon() {
    $(`img[data-name='${pokemonName}']`).click();
    $("button[data-value='1']").click();
    $(".shelterLoad").click();
}