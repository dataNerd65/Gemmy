document.getElementById("send-button").onclick = function(e) {
    var messageInput = document.getElementById('message-input');
    var chatHistory = document.getElementById('chat-history');

    if (messageInput.value.trim() !== '') {
        var newMessage = document.createElement('p');
        newMessage.textContent = messageInput.value;
        newMessage.classList.add('message', 'user-message');
        chatHistory.appendChild(newMessage);
        messageInput.value = '';

        showSpinner();

        fetch('http://localhost:3000/startChat', { // Adjust endpoint to match your server route
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ message: newMessage.textContent }) // Send user's input message
        })
        .then(handleResponse)
        .catch(handleError);
    }
};

function handleResponse(response) {
    hideSpinner();
    if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response.json().then(data => {
        console.log('Response data:', data); // Log the response data
        if (data && data.response) {
            var newBotMessage = document.createElement('p');
            newBotMessage.textContent = data.response;
            newBotMessage.classList.add('message', 'bot-message');
            document.getElementById('chat-history').appendChild(newBotMessage);

            console.log('New bot message created:', newBotMessage); // Log the new bot message
        } else if (data && data.message) {
            // Handle the case when data contains a message but not a response
            var newBotMessage = document.createElement('p');
            newBotMessage.textContent = data.message;
            newBotMessage.classList.add('message', 'bot-message');
            document.getElementById('chat-history').appendChild(newBotMessage);

            console.log('New bot message created:', newBotMessage); // Log the new bot message
        }
    });
}


function handleError(error) {
    console.error('Fetch error:', error);
    hideSpinner();
}

function showSpinner() {
    document.getElementById('loading-spinner').classList.remove('hidden');
}

function hideSpinner() {
    document.getElementById('loading-spinner').classList.add('hidden');
}
