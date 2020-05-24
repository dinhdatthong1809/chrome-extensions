searchEgg();

function searchEgg() {
    grabEgg({ name: "Mystery" });

    for (let i = 0; i < eggs.length; i++) {
        grabEgg(eggs[i]);
    }

    $(".shelterLoad").click();
}

function grabEgg(egg) {
    $(`img[data-tooltip='${egg.name} Egg']`).click();
    chooseYes();
}

function chooseYes() {
    $("button[data-value='1']").click();
}
