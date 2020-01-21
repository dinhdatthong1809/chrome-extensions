openPokechests();

function openPokechests() {
    let amountOfPokechestsBlueS = $("#notification-pokechests").html();
    
    if (amountOfPokechestsBlueS == "") {
        return;
    }
    
    for (let i = 1; i <= amountOfPokechestsBlueS; i++) {
        $.ajax({
            type: "POST",
            url: "https://gpx.plus/AJAX/OpenPokechest",
            data: {
                currentPage: 'users'
            }
        });
    }
}