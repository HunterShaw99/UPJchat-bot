var input = document.getElementsByClassName("message-input")[0];
var msgList = document.querySelector(".chat-message-list");

// Initialize the Amazon Cognito credentials provider
AWS.config.region = 'us-east-1'; // Region
AWS.config.credentials = new AWS.CognitoIdentityCredentials({
    IdentityPoolId: 'us-east-1:8416ff37-a05e-4cef-b0d3-164446edc49a',
});

var lexruntime = new AWS.LexRuntime();
var lexUserId = 'Schwabot-test' + Date.now();
var sessionAttributes = {};

input.addEventListener("keyup", function (event) {
    // Number 13 is the "Enter" key on the keyboard
    if (event.keyCode === 13) {
        sendUserMessage(input.value);

        if (input && input.value && input.value.trim().length > 0) {
            var text = input.value.trim();
            // clear input's value
            input.value = "";
            input.locked = true;

            var params = {
                botAlias: '$LATEST',
                botName: 'Schwabot',
                inputText: text,
                userId: lexUserId,
                sessionAttributes: sessionAttributes
            };

            lexruntime.postText(params, function (err, data) {
                if (err) {
                    console.log(err, err.stack);
                    setTimeout(function () {
                        sendBotMessage(err.message, true);
                    }, 500);
                }
                if (data) { 
                    sessionAttributes = data.sessionAttributes;
                    setTimeout(function () {
                        sendBotMessage(data.message, true);
                    }, 500);
                }
            });
            input.locked = false;
        }
        
    }
});

function sendUserMessage(text) {
    sendChatMessage(text, "user");
}

// param = null --- normal message with no feedback buttons
// param != null --- message with feedback buttons
function sendBotMessage(text, feedback) {
    var text = text;

    if (feedback === null) {
        sendChatMessage(text, "bot");
    } else {
        sendChatMessage(text, "bot-feedback");
    }
}

// param sender values:
// "user" -send normal user message
// "bot" -send normal bot message
// "bot-feedback" -send bot message with feedback buttons
/**
 * Send a message in the chat
 *
 * @param {string} text the text to be sent in the message
 * @param {string} sender who is sending the message {"user", "bot", "bot-feedback"}
 */
function sendChatMessage(text, sender) {
    var msg = document.createElement("li");
    msg.appendChild(document.createTextNode(text));
    msg.classList.add("message", "user-message");

    if (sender == "user") {
        msg.classList.add("user-message");
        msgList.appendChild(msg);
    } else if (sender == "bot") {
        msg.classList.add("bot-message");
        msgList.appendChild(msg);
    } else if (sender == "bot-feedback") {
        //send bot message with feedback buttons
        msg.classList.add("bot-message");

        //container to wrap message and buttons in
        var container = document.createElement("li");
        container.classList.add("message-container");
        container.appendChild(msg);

        var greenButton = document.createElement("button");
        greenButton.classList.add("feedback-button", "green");
        addFeedbackButtonListener(greenButton, "green");

        var redButton = document.createElement("button");
        redButton.classList.add("feedback-button", "red");
        addFeedbackButtonListener(redButton, "red");

        container.appendChild(greenButton);
        container.appendChild(redButton);

        msgList.appendChild(container);
    }

    scrollToBottom();
}

//response is "green" or "red", for green and red button differentiation
//event listeners are not removed, but pointer events are disabled via css.... if issues occur later consider this.
function addFeedbackButtonListener(node, response) {
    node.addEventListener("click", function handler() {
        // get index of button's container's li
        var container = node.parentNode;
        var index = [].slice.call(container.parentNode.children).indexOf(container);

        // use index to get li above this one, and grab text
        var q = msgList.children[index - 1].textContent;

        // container's first child is always the message, grab text
        var a = container.children[0].textContent;

        //get sibling button and disable it (change style)
        var siblings = container.children;
        for (const s of siblings) {
            if (s.nodeName == "BUTTON" && !s.classList.contains(response)) {
                s.classList.add("disabled-button");
                break;
            }
        }

        container.classList.add("feedback-given");

        postResponse(q, a, response);
    });
}

function postResponse(question, answer, r) {

    //GET ALL
    let t = fetch("https://localhost:7115/api/QuestionModels")
        .then(response => response.json())
        .then(data => {
            //json to array
            arr = Object.entries(data);

            //see if question has been asked before
            found = null;
            for (var i = 0; i < arr.length; i++) {
                if (arr[i][1].question == question) {
                    found = i;
                    break;
                }
            }

            var helpful;
            var nonhelpful;
            var id;
            //if question has been asked before; get # responses helpful or nonhelpful, based on which button was clicked.
            if (found != null) {
                id = arr[found][1].qID;
                if (r == "red") {
                    nonhelpful = arr[found][1].nonhelpful + 1;
                    helpful = arr[found][1].helpful;
                } else {
                    helpful = arr[found][1].helpful + 1;
                    nonhelpful = arr[found][1].nonhelpful;
                }
            } else { //if question has never been asked before, get its new qid
                id = arr[arr.length - 1][1].qID + 1;
                if (r == "red") {
                    nonhelpful = 1;
                    helpful = 0;
                } else {
                    helpful = 1;
                    nonhelpful = 0;
                }
            }

            // formulate json string
            const o = {
                question: question,
                qID: id,
                helpful: helpful,
                nonhelpful: nonhelpful
            }
            var json = JSON.stringify(o);

            // PUT request if question exists
            if (found != null) {

                const requestOptions = {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: json
                };
                fetch(`https://localhost:7115/api/QuestionModels/${id}`, requestOptions);

            } else { // POST request if question doesn't exist
                const requestOptions = {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: json
                };
                fetch(`https://localhost:7115/api/QuestionModels`, requestOptions);
            }
        });

}

function scrollToBottom() {
    msgList.lastChild.scrollIntoView();
}
