var input = document.getElementsByClassName("message-input")[0];

input.addEventListener("keyup", function (event) {
    // Number 13 is the "Enter" key on the keyboard
    if (event.keyCode === 13) {
        // add message to the list
        var msgs = document.getElementsByClassName("chat-message-list")[0];
        var msg = document.createElement("li");
        msg.classList.add("message");
        msg.classList.add("user-message");
        msg.appendChild(document.createTextNode(input.value));
        msgs.appendChild(msg);

        // clear input's value
        input.value = "";

        scrollToBottom();

        setTimeout(sendBotMessage, 500);
    }
});

function scrollToBottom() {
    var msgs = document.getElementsByClassName("chat-message-list")[0];
    last = msgs.lastChild;
    last.scrollIntoView();
}

function sendBotMessage() {
    var msgs = document.getElementsByClassName("chat-message-list")[0];
    var msg = document.createElement("li");
    msg.classList.add("message");
    msg.classList.add("bot-message");
    msg.appendChild(document.createTextNode("Response from the bot"));
    msgs.appendChild(msg);

    scrollToBottom();
}
