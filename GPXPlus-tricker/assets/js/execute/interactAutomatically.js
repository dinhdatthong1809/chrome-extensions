interactFast();

function interactFast() {
    for (let time = 1; time <= 20; time++) {
        let typeOfBerry = $("#infoInteract > div > em > u").html();

        if (typeOfBerry == undefined) {
            $(".infoInteractButton").click();
            continue;
        }
        else {
            typeOfBerry = typeOfBerry.split(" ")[0];
        }

        let berry = "";

        if (typeOfBerry == "sour")
            berry = 1;
        else if (typeOfBerry == "spicy")
            berry = 2;
        else if (typeOfBerry == "dry")
            berry = 3;
        else if (typeOfBerry == "sweet")
            berry = 4;
        else if (typeOfBerry == "bitter")
            berry = 5;

        $(".infoInteractButton[value=" + berry + "]").click();
    }
}