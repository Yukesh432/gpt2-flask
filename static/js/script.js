document.getElementById('send-btn').addEventListener('click', function() {
    var userInput = document.getElementById('user-input').value;
    if(userInput.trim() === '') return; // Prevent sending empty messages
    document.getElementById('user-input').value = ''; // Clear input field

    fetch('/talk', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: userInput }),
    })
    .then(response => response.json())
    .then(data => {
        var chatBox = document.getElementById('chat-box');

        // Create a div for the user message
        var userDiv = document.createElement('div');
        userDiv.textContent = 'User: ' + userInput;
        userDiv.className = 'user-message'; // Add class for styling if needed
        chatBox.appendChild(userDiv); // Append user message at the bottom

        // Create a div for the bot response
        var botDiv = document.createElement('div');
        botDiv.textContent = 'Bot: ' + data.response;
        botDiv.className = 'bot-message'; // Add class for styling if needed
        chatBox.appendChild(botDiv); // Append bot response at the bottom

        // Scroll to the bottom to show new message
        chatBox.scrollTop = chatBox.scrollHeight;
    })
    .catch(error => console.error('Error:', error));
});
