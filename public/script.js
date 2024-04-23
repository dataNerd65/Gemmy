document.getElementById("send-button").onclick = function(e) {
    var messageInput = document.getElementById('message-input');
    var chatHistory = document.getElementById('chat-history');

    if (messageInput.value.trim() !== '') { // Added trim to check for non-empty messages
        var newMessage = document.createElement('p');
        newMessage.textContent = messageInput.value;
        newMessage.classList.add('message', 'user-message');
        chatHistory.appendChild(newMessage);
        messageInput.value = '';

        showSpinner();

        fetch('http://localhost:3000/sendMessage', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ message: newMessage.textContent })
        })
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.text();
        })
        .then(data => {
            hideSpinner();
            if (data) {
                try {
                    var parsedData = JSON.parse(data);
                    var botMessage = document.createElement('p');
                    botMessage.textContent = parsedData.botResponse;
                    botMessage.classList.add('message', 'bot-message');
                    chatHistory.appendChild(botMessage);
                } catch (e) {
                    console.error('Error parsing JSON:', e);
                }
            }
        })
        .catch(error => {
            hideSpinner();
            console.error('Error:', error);
        });
    }
};

function showSpinner() {
    document.getElementById('loading-spinner').classList.remove('hidden');
}

function hideSpinner() {
    document.getElementById('loading-spinner').classList.add('hidden');
}

