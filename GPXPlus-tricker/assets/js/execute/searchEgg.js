searchEgg();

function searchEgg() {
    for (let i = 0; i < eggNames.length; i++) {
        let eggName = eggNames[i] + " Egg";

        $(`img[data-tooltip='Mystery Egg']`).click();
        $("button[data-value='1']").click();

        $(`img[data-tooltip='${eggName}']`).click();
        $("button[data-value='1']").click();

        $(".shelterLoad").click();
    }
}