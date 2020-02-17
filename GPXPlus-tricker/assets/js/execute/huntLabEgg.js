huntLabEgg();

function huntLabEgg() {
    $(`img[src='${eggId}']`).click();
    $("body").trigger($.Event("keydown", { keyCode: 27 }));
    $("#labLoad").click();
}