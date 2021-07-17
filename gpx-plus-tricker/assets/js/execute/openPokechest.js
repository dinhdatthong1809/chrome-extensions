main();

async function main() {
    let currentNumberOfPokechest = $("#notification-pokechests").html();

    if (!currentNumberOfPokechest) {
        return;
    }

    for (let i = 0; i < currentNumberOfPokechest; i++) {
        openPokechest();
        await sleep(50);
    }
}

function openPokechest() {
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