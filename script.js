document.getElementById("send-button").onclick = function(e){
    var messageInput = document.getElementById('message-input');
    var chatHistory = document.getElementById('chat-history');

    if (messageInput.value) {
        var newMessage = document.createElement('p');
        newMessage.textContent = messageInput.value;
        newMessage.classList.add('message', 'user-message');
        chatHistory.appendChild(newMessage);
        messageInput.value = '';

        showSpinner();

        fetch('/sendMessage', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                message: newMessage.textContent
            })
        })
        .then(response => response.json())
        .then(data => {
            hideSpinner();

            var botMessage = document.createElement('p');
            botMessage.textContent = data.botResponse;
            botMessage.classList.add('message', 'bot-message');
            chatHistory.appendChild(botMessage);
        })
        .catch(error => {
            hideSpinner();
            console.error('Error:', error);
        });
    }
}

function showSpinner() {
    document.getElementById('loading-spinner').classList.remove('hidden');
}

function hideSpinner() {
    document.getElementById('loading-spinner').classList.add('hidden');
}

