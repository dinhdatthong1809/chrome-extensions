// 573360 quizes in 60 hours
// myConfig
downloadAllQuizes();

async function downloadAllQuizes() {
    let currentUrl = location.href;
    let quizes = Object.create(null);
    let errorPageCount = 0;

    let requests = [];

    let waitBeforeSave = 60000;

    for (let i = myConfig.fromId; i <= myConfig.toId; i++) {
        let url = currentUrl.replace(/(evaluation=\d+)/g, `evaluation=${i}`);

        let request = $.ajax(
            {
                url: url,
                type: "GET",
                async: true,
            }
        );
        requests.push(request);

        request.done(
            (response) => {
                if (isErrorPage(response)) {
                    errorPageCount++;
                    console.log("error page: " + i);
                    return;
                }

                let question = getQuestion(response);
                let answer = getAnswer(response);

                if (answer == "special") {
                    console.log(`special error: ${i}`);
                }

                quizes[i] = {
                    question: question,
                    answer: answer
                };
            }
        );

        request.catch((response) => {
            console.log("catch: " + i);
        });

        await sleep(200);
    }

    await sleep(waitBeforeSave);

    console.log(errorPageCount + " error pages");
    saveJSON(quizes, parseInt(myConfig.fromId / 5000));
}

function isErrorPage(html) {
    let doc = new DOMParser().parseFromString(html, "text/html");
    let keyElement = doc.getElementsByClassName("ilc_question_Standard")[0];

    if (keyElement == undefined) {
        return true;
    }

    return false;
}

function getQuestion(html) {
    let conversationQuestion = $(html).find(".ilc_question_Standard:first").children('p');

    if (conversationQuestion.length >= 2) {
        let question = "";
        for (item of conversationQuestion) {
            question += ($(item).text() + "\n");
        }

        return question;
    }

    let keyElementQ = $(html).find(".ilc_question_Standard:first").html().trim();
    let question = keyElementQ.substring(0, keyElementQ.indexOf("\n"));

    if (question.match(/<p>.*<\/p>/g)) {
        question = $(question).html();
    }

    question = question.replace(/\s\s/g, "").replace(/<br>/g, "\n");

    if (question == "&nbsp;") {
        question = $(html).find(".ilc_question_Standard:first strong:first").html();
    }

    return question;
}

function getAnswer(html) {
    let keyElementA = $(html).find("input:checked");
    let answer;

    if (keyElementA.html() == undefined) {
        try {
            keyElementA = $(html).find(".ilc_question_Standard")[1].getElementsByTagName("option");
        }
        catch (err) {
            return "special";
        }
        answer = [];
        for (item of keyElementA) {
            answer.push(item.text);
        }
    }
    else {
        keyElementA = keyElementA.parent().parent().find("td:nth-child(2)").html().trim();
        answer = $(keyElementA).html();

        if (answer.match(/<p>.*<\/p>/g)) {
            answer = $(answer).html();
        }

        answer = answer.replace(/<br>/g, "\n").replace(/\s\s/g, "");
    }

    return answer;
}

function saveJSON(data, name) {
    let bl = new Blob([JSON.stringify(data)], { type: "application/json" });
    let a = document.createElement("a");
    a.href = URL.createObjectURL(bl);
    a.download = `${name}.json`;
    a.hidden = true;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
