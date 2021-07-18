main();

function main() {
    chooseOneEgg();
    hitEscapeKey();
    refreshLab();
}

function chooseOneEgg() {
    $(`img[src='${eggId}']`).click();
}

function hitEscapeKey() {
    $("body").trigger($.Event("keydown", {keyCode: 27}));
}

function refreshLab() {
    $("#labLoad").click();
}