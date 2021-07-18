main();

async function main() {

    const isPageUser = window.location.href.startsWith("https://gpx.plus/users");
    
    if (isPageUser) {
        if (await hasNothingToInteract()) {
            goToNextPage();
        } else {
            await openNewFeeder();
        }
        
    } else {
        if (isErrorDialogAppear()) {
            location.reload();
            return;
        }

        interactPokemon();
    }
}

async function hasNothingToInteract() {
    await sleep(7000);
    let listUserToInteract = $(".light2 > div[class!='userClicked']");
    return !listUserToInteract || listUserToInteract.length === 0;
}

function goToNextPage() {
    const nextPage = calculateNextPage();
    const nextPageElement = $(`#usersTable > table > tbody > tr:nth-child(2) > th > div.buttonGroup > span:nth-child(${nextPage + 1})`);
    
    if (nextPageElement) {
        nextPageElement.click();
    }
}

function calculateNextPage() {
    const currentPage = $("#usersTable > table > tbody > tr:nth-child(2) > th > div.buttonGroup > span.disabled").index();
    return +currentPage + 1;
}

async function openNewFeeder() {
    await sleep(5000);
    
    const buttonOpenNewFeeder = $("#usersOpen > input[type='submit']");

    if (buttonOpenNewFeeder) {
        buttonOpenNewFeeder.click();
    }
}

function isErrorDialogAppear() {
    const dialogAlert = $(".ui-dialog-content");
    if (dialogAlert) {
        const textAlert = dialogAlert.html();
        if (textAlert === "There was an error; please try again later.") {
            return true;
        }
    }
    
    return false;
}

function interactPokemon() {
    const MAX_POKEMON_PER_GROUP = 20;
    for (let time = 0; time < MAX_POKEMON_PER_GROUP; time++) {
        if (isEgg()) {
            warnEgg();
        } else {
            feedPokemon();
        }
    }
}

function isEgg() {
    return !$("#infoInteract > div > em > u").html();
}

function warnEgg() {
    $(".infoInteractButton").click();
}

function feedPokemon() {
    let tasteOfPokemon = getTasteOfPokemon();
    let berry = getBerryBasedOnTaste(tasteOfPokemon);
    giveBerry(berry);
}

function getTasteOfPokemon() {
    let descriptionOfPokemon = $("#infoInteract > div > em > u").html();

    if (!descriptionOfPokemon) {
        return "";
    }

    return descriptionOfPokemon.split(" ")[0];
}

function getBerryBasedOnTaste(tasteOfPokemon) {
    const BerryType = {
        ASPEAR_BERRY: 1,
        CHERI_BERRY: 2,
        CHESTO_BERRY: 3,
        PECHA_BERRY: 4,
        RAWST_BERRY: 5
    };

    switch (tasteOfPokemon) {
        case "sour":
            return BerryType.ASPEAR_BERRY;
        case "spicy":
            return BerryType.CHERI_BERRY;
        case "dry":
            return BerryType.CHESTO_BERRY;
        case "sweet":
            return BerryType.PECHA_BERRY;
        case "bitter":
            return BerryType.RAWST_BERRY;
        default:
            return "";
    }
}

function giveBerry(berry) {
    $(".infoInteractButton[value=" + berry + "]").click();
}

async function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}