document.getElementById('send-button').addEventListener('click', function() {
    var messageInput = document.getElementById('message-input');
    var chatHistory = document.getElementById('chat-history');
    
    if (messageInput.value) {
        var newMessage = document.createElement('p');
        newMessage.textContent = messageInput.value;
        chatHistory.appendChild(newMessage);
        messageInput.value ='';
    }
});

document.getElementById("send-button").onclick = function(e){
    e.preventDefault();
    alert("This feature is still under development!")
}