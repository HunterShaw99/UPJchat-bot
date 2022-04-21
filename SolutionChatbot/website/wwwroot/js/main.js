var input = document.getElementsByClassName("message-input")[0];
var msgList = document.querySelector(".chat-message-list");

input.addEventListener("keyup", function (event) {
    // Number 13 is the "Enter" key on the keyboard
    if (event.keyCode === 13) {
        sendUserMessage(input.value);

        // clear input's value
        input.value = "";

        setTimeout(function () {
            sendBotMessage(true);
        }, 500);
    }
});

function sendUserMessage(text) {
    sendChatMessage(text, "user");
}

// param = null --- normal message with no feedback buttons
// param != null --- message with feedback buttons
function sendBotMessage(feedback) {
    var text = "Response from the bot.";

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
        var q = "q: " + msgList.children[index - 1].textContent;

        // container's first child is always the message, grab text
        var a = "a: " + container.children[0].textContent;

        //get sibling button and disable it (change style)
        var siblings = container.children;
        for (const s of siblings) {
            if (s.nodeName == "BUTTON" && !s.classList.contains(response)) {
                s.classList.add("disabled-button");
                break;
            }
        }

        container.classList.add("feedback-given");

        console.log(q);
        console.log(a);
        console.log("response: " + response);
    });
}

function scrollToBottom() {
    msgList.lastChild.scrollIntoView();
}
