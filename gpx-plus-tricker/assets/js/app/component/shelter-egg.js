export default class ShelterEgg {
    interval = null;
    isSearching = false;
    
    MAX_NUMBER_OF_EGGS = 6;
    PARTY_SLOT = Array.from(Array(this.MAX_NUMBER_OF_EGGS));

    init = () => {
        this.initUI();
        this.initFunctions();
    };

    initUI = () => {
        $("#dynamicPart").append(this.buildTemplate());
    };

    buildTemplate = () => {
        let template = "";

        template += `<h2><img src="assets/img/egg.png"> Egg Finder<h2>`;
        template += `<h4 class="text-red">If all input fields are empty, <br>I will search for eggs in shiny hunt<h4>`;

        this.PARTY_SLOT.forEach((x, i) => {
            template += (`
                <input id="eggName${i}" type="text" class="text-box-yellow" placeholder="Name" autofocus>
            `);
        });
        
        template += `<button type="button" id="btnSearchEgg" class="button button-yellow">Start searching!</button>`;

        return template;
    };

    initFunctions = () => {
        $("#btnSearchEgg").on("click", this.btnSearchEggClickHandler);
    };

    btnSearchEggClickHandler = () => {
        if (this.isSearching) {
            this.stopSearching();
        } else {
            this.startSearching();
        }

        this.isSearching = !this.isSearching;
    };

    stopSearching = () => {
        this.enableAllInputFields();
        clearInterval(this.interval);
        $("#btnSearchEgg").html("Start searching!");
    };

    startSearching = () => {
        let eggs = this.getEggsFromInputFields();

        if (eggs.length !== 0) {
            this.startSearchingEggs(eggs);
        } else {
            this.startSearchingFromShinyHunt();
        }
    };

    getEggsFromInputFields = () => {
        let eggs = [];

        this.PARTY_SLOT.forEach((x, i) => {
            let egg = {
                name: $(`#eggName${i}`).val().trim()
            };

            if (egg.name) {
                eggs.push(egg);
            }
        });

        return eggs;
    };

    getEggsFromShinyHunt = (html) => {
        const eggs = [];

        const startPointOfPresentShinyHunt = html.indexOf("<h2 class='subheader'>P");
        const endPointOfPresentShinyHunt = html.indexOf("<h2 class='subheader'>C");
        const htmlStringContainsPresentShinyHunt = html.substring(startPointOfPresentShinyHunt, endPointOfPresentShinyHunt);

        const htmlElementsContainEggName = $($.parseHTML(htmlStringContainsPresentShinyHunt)).filter(".shineHunt");
        
        for (const element of htmlElementsContainEggName) {
            const textInElement = $(`div:nth-child(1)`, element).html().trim();
            const eggName = textInElement.substring(textInElement.indexOf(" "), textInElement.length).trim();
            eggs.push(eggName);
        }

        return eggs;
    };
    
    startSearchingEggs = (eggs) => {
        this.disableAllInputFields();
        this.interval = setInterval(this.searchEggInShelter, 2000, eggs);
        $("#btnSearchEgg").html("Stop searching!");
    };
    
    startSearchingFromShinyHunt = () => {
        $.ajax(
            {
                type: "POST",
                url: "https://gpx.plus/AJAX/page",
                headers: {
                    "X-Requested-With": "XMLHttpRequest",
                },
                data: {
                    tab: "shinerecorder",
                    ajax: "page",
                    disabled: 1,
                    page: "user",
                    user: 20462,
                    currentPage: "user",
                },
                success: (response) => {
                    const html = response.html;
                    if (html) {
                        const eggs = this.getEggsFromShinyHunt(html);
                        this.startSearchingEggs(eggs);
                    }
                }
            }
        );
    };

    searchEggInShelter = (eggs) => {
        chrome.tabs.executeScript(null, {file: "assets/plugins/jquery/jquery-3.4.1.min.js"}, function () {
            chrome.tabs.executeScript(null, {code: `eggs = ${JSON.stringify(eggs)}`}, function () {
                chrome.tabs.executeScript(null, {file: "assets/js/execute/search-egg-in-shelter.js"});
            });
        });
    };

    setStateInput = (enable) => {
        this.PARTY_SLOT.forEach((x, i) => {
            $(`#eggName${i}`).prop("disabled", !enable);
        });
    };

    disableAllInputFields = () => {
        this.setStateInput(false);
    };

    enableAllInputFields = () => {
        this.setStateInput(true);
    };
}
