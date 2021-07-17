showRightAnswers();

function showRightAnswers() {
    let value = $("#res").attr("src").split("/")[4];
    let url = `http://hcm-lms.poly.edu.vn/data/lmsfpoly/lm_data/${value}/mobile/data.js`;
    console.log(url);
    $.ajax(
        {
            url: url,
            type: "GET",
        }
    ).then(
        (response) => {
            // decrypt the content of data.js
            let decryptedResponse = unPackBlueS(response);

            decryptedResponse = decryptedResponse.replace('CreateData("', '').replace('");', ''); // cut the wierd part

            let questions = getQuestionArrays(decryptedResponse);
            let answers = getAnswerArrays(decryptedResponse);

            openOtherWindow(questions, answers);
        });
}

function checkRightAnswer() {
    
}

function getQuestionArrays(decryptedResponse) {
    // get arrays of question strings
    let questions = decryptedResponse.match(/(<interaction ([^>]+)issurvey='false'>)/g); // get only open tag
    for (let i = 0; i < questions.length; i++) {
        // get the actual string
        questions[i] = $(questions[i]).attr("lmstext");
    }

    return questions;
}

function getAnswerArrays(decryptedResponse) {
    // get arrays of right answers
    let answers = decryptedResponse.match(/<\s*answer[^>]*status='correct'>(.*?)<\s*\/\s*answer>/g); // get both open and close tags, and the whole inside
    
    for (let i = 0; i < answers.length; i++) {
        // right answers of this question (can be 1 or more)
        let ids = $(answers[i]).find("evaluate:first").find("equals");
        
        answers[i] = [];
        for (let j = 0; j < ids.length; j++) { // loop through the right answers of this question
            // find the id
            let id = $(ids[j]).attr("choiceid").replace("choices.", "");

            // get the actual answer tag
            let re = new RegExp(`(<choice id='${id}'([^>]+)\/>)`, 'g');
            let answerTag = decryptedResponse.match(re)[0];
            
            // get the text of this tag
            let text = $(answerTag).attr("lmstext");

            answers[i].push(text);
        }
    }

    return answers;
}

function openOtherWindow(questions, answers) {
    var myWindow = window.open("", "myWindow", "width=500,height=500");
    for (let i = 0; i < questions.length; i++) {
        myWindow.document.write(`<h3>${questions[i]}</h3>`);

        for (let j = 0; j < answers[i].length; j++) {
            myWindow.document.write(`<h4>${answers[i][j]}</h4>`);
        }

        myWindow.document.write(`<br><hr>`);
    }
}

//////////////////////////////////////////
//  Un pack the code from the /packer/  //
//  By matthew@matthewfl.com            //
//  http://matthewfl.com/unPacker.html  //
//////////////////////////////////////////
// version 1.2

// ông thử sửa tên hàm lại thành unPack xem có bị lỗi trùng tên biến không
function unPackBlueS(code) {
    function indent(code) {
        try {
            var tabs = 0, old = -1, add = '';
            for (var i = 0; i < code.length; i++) {
                if (code[i].indexOf("{") != -1) tabs++;
                if (code[i].indexOf("}") != -1) tabs--;

                if (old != tabs) {
                    old = tabs;
                    add = "";
                    while (old > 0) {
                        add += "\t";
                        old--;
                    }
                    old = tabs;
                }

                code[i] = add + code[i];
            }
        } finally {
            tabs = null;
            old = null;
            add = null;
        }
        return code;
    }

    var env = {
        eval: function (c) {
            code = c;
        },
        window: {},
        document: {}
    };

    eval("with(env) {" + code + "}");

    code = (code + "").replace(/;/g, ";\n").replace(/{/g, "\n{\n").replace(/}/g, "\n}\n").replace(/\n;\n/g, ";\n").replace(/\n\n/g, "\n");

    code = code.split("\n");
    code = indent(code);

    code = code.join("\n");
    return code;
} 
