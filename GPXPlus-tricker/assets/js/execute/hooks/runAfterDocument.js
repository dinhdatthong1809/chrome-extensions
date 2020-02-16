let hasLocalStorage = true;
let max = 3000;

runAfterDocument();

function runAfterDocument() {
    editMaxValueOfOpenFeeder();
    modifyUsersScript();
}

function editMaxValueOfOpenFeeder() {
    $("#usersOpenTotal").attr("max", max);
}

function berryFeeder(fnames, src, srcName, newWindow) {
    let config = {
        url: {
            base: 'https://gpx.plus/',
        }
    };

    if (!hasLocalStorage) {
        alert("Your browser must support local storage to use this feature!  To proceed you'll have to either update to the latest version or switch to Google Chrome.");
        return false;
    }
    if (fnames.length == 0) {
        alert("No Pokemon could be opened!");
        return;
    }
    var proceed = function () {
        var first = fnames.pop();
        fnames.reverse();
        localStorage.berryFeeder = fnames.join(",");
        localStorage.berryFeederSrc = src;
        localStorage.berryFeederSrcName = srcName;
        localStorage.berryFeederSubmitted = 0;
        if (newWindow)
            window.open(config.url.base + "info/" + first + "/feeder");
        else
            location = config.url.base + "info/" + first + "/feeder";
    }

    if (localStorage.berryFeederSrc)
        input("You may already have a Berry Feeder session open!  Opening another one can interfere with the first one.  Would you like to proceed?", function (a) {
            if (a)
                proceed();
        }, "Okay, proceed");
    else
        proceed();
}

function modifyUsersScript() {
    // modify a part of users.js script
    $("#usersOpen").off("submit");

    $("#usersOpen").submit(function (e) {
        e.preventDefault();
        if ($("#usersTable").is(":empty"))
            return;

        var options = $(this).serializeJSON();
        if (options.number > max) {
            alert("Please enter a number 3000 or below!");
            return false;
        }
        var links = function () {
            if (options.type == '2')
                var a = $('a.pIcons[data-egg!=1]:not(.transparent):lt(' + options.number + ')');
            else if (options.type == '3')
                var a = $('a.pIcons[data-wild=1]:not(.transparent):lt(' + options.number + ')');
            else if (options.type == '4')
                var a = $('a.pIcons[data-bred=1]:not(.transparent):lt(' + options.number + ')');
            else if (options.type == '1')
                var a = $('a.pIcons[data-egg=1]:not(.transparent):lt(' + options.number + ')');
            else
                var a = $('a.pIcons:not(.transparent):lt(' + options.number + ')');
            return a;
        }
        if (options.area != "0") {
            var fnames = [];
            links = links();
            links.each(function () {
                fnames.push($(this).data("fname"));
            });
            links.addClass('transparent');
            localStorage.usersOpen = JSON.stringify(options);
            berryFeeder(fnames, "users", "the Users List", options.area == "2");
        } else {
            if (navigator.appVersion.toLowerCase().indexOf("chrome") != -1 && options.number > 25)
                if (confirm("For security reasons, Chrome prevents more than 25 windows from being opened at a time!  Would you like to reduce the number to 25? (Note that if you wish to open a larger number, you can alternatively just click the 'Open' button multiple times)")) {
                    options.number = 25;
                    $(this).find("[type='number']").val(25);
                }
            links = links();
            if (links.length == 0) {
                alert("No Pokemon could be opened!");
                return;
            }
            links.each(function () {
                window.open($(this).attr("href") + '/open');
            });
            links.addClass('transparent');
        }
        if (hasLocalStorage)
            localStorage.usersOpen = JSON.stringify(options);
    });
}
