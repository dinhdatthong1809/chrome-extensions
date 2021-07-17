'use strict';

chrome.runtime.onInstalled.addListener(function () {
    chrome.declarativeContent.onPageChanged.removeRules(undefined, function () {
        chrome.declarativeContent.onPageChanged.addRules([{
            conditions: [
                new chrome.declarativeContent.PageStateMatcher(
                    {
                        pageUrl: {
                            urlMatches: ".*-lms.poly.edu.vn/ilias.php\\?ref_id=.*&active_id=.*&pass=.*&evaluation=.*&cmd=outCorrectSolution&cmdClass=.*&cmdNode=.*&baseClass=.*"
                        }
                    }
                )
            ],
            actions: [new chrome.declarativeContent.ShowPageAction()]
        }]);
    });
});
