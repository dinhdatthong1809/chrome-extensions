'use strict';

chrome.runtime.onInstalled.addListener(function () {
    chrome.declarativeContent.onPageChanged.removeRules(undefined, function () {
        chrome.declarativeContent.onPageChanged.addRules([{
            conditions: [
                new chrome.declarativeContent.PageStateMatcher(
                    {
                        pageUrl: {
                            urlMatches: "https://globalpokedexplus.fandom.com/wiki/Egg_Guide"
                        }
                    }
                )
            ],
            actions: [new chrome.declarativeContent.ShowPageAction()]
        }]);
    });
});

chrome.runtime.onMessage.addListener(function (object) {
    chrome.downloads.download(
        {
            url: object.url,
            filename: `EggDex/${object.name}.png`,
            method: "GET"
        }
    )
});
