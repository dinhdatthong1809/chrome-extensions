'use strict';

chrome.runtime.onInstalled.addListener(function () {
    chrome.declarativeContent.onPageChanged.removeRules(undefined, function () {
        chrome.declarativeContent.onPageChanged.addRules([{
            conditions: [
                new chrome.declarativeContent.PageStateMatcher(
                    {
                        pageUrl: {
                            urlMatches: "hcm-lms.poly.edu.vn/ilias.php\\?baseClass=ilSAHSPresentationGUI&ref_id=*"
                        }
                    }
                )
            ],
            actions: [new chrome.declarativeContent.ShowPageAction()]
        }]);
    });
});
