main();

function main() {
    pickMysteryEgg();

    for (let egg of eggs) {
        pickEgg(egg);
    }

    refreshShelter();
}

function pickMysteryEgg() {
    pickEgg({name: "Mystery"});
}

function pickEgg(egg) {
    $(`img[data-tooltip='${egg.name} Egg']`).click();
    chooseYes();
}

function chooseYes() {
    $("button[data-value='1']").click();
}

function refreshShelter() {
    $(".shelterLoad").click();
}
