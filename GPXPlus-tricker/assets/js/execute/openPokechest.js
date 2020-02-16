openPokechests();

async function openPokechests() {
    let pokeChestAmount = $("#notification-pokechests").html();

    if (pokeChestAmount == "") {
        return;
    }

    for (let i = 1; i <= pokeChestAmount; i++) {
        openChest();
        await sleep(50);
    }
}

function openChest() {
    return $.ajax(
        {
            type: "POST",
            url: "https://gpx.plus/AJAX/OpenPokechest",
            data: {
                currentPage: 'users'
            }
        }
    );
}

async function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}