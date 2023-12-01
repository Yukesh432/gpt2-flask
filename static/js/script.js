document.addEventListener('DOMContentLoaded', () => {
    const chatBox = document.getElementById('chat-box');
    const sendButton = document.getElementById('send-btn');
    const userInputField = document.getElementById('user-input');
    const botSelector = document.getElementById('bot-selector');
    const botActivatedMessage = document.getElementById('bot-activated-message');
    const chatContainer = document.getElementById('chat-container');
    const activateBotButton = document.getElementById('activate-btn');
    const minimizeButton = document.getElementById('minimize-chat'); // Ensure this ID matches the button in your HTML

    // Minimize functionality
    minimizeButton.addEventListener('click', () => {
        const isChatBoxVisible = chatBox.style.display !== 'none';
        chatBox.style.display = isChatBoxVisible ? 'none' : 'block';
        minimizeButton.textContent = isChatBoxVisible ? '+' : '-';
        userInputField.disabled = isChatBoxVisible;
        sendButton.disabled = isChatBoxVisible;
    });

    // Initially disable input and send button until a bot is selected
    userInputField.disabled = true;
    sendButton.disabled = true;

    // Function to handle bot activation
    function activateBot() {
        const selectedBot = botSelector.value;
        chatContainer.style.display = 'block';
        userInputField.disabled = false; // Enable the input field
        sendButton.disabled = false; // Enable the send button
        botActivatedMessage.textContent = `${selectedBot.charAt(0).toUpperCase() + selectedBot.slice(1)} activated!`;

        // Enable chat input if the selected bot is 'sentiment-analysis', otherwise disable it.
        if (selectedBot !== 'sentiment-analysis') {
            userInputField.disabled = true;
            sendButton.disabled = true;
            botActivatedMessage.textContent = 'Please select a chatbot.';
        }
    }

    activateBotButton.addEventListener('click', activateBot);

    // Function to send the message to the server and handle the response
    async function sendMessage() {
        const userInput = userInputField.value.trim();
        if (userInput === '') return; // Prevent sending empty messages

        userInputField.value = ''; // Clear input field

        try {
            const response = await fetch('/talk', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ message: userInput }),
            });

            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

            const data = await response.json();

            // Append user and bot messages
            appendMessage('User', userInput, 'user-message');
            appendMessage('Bot', data.response, 'bot-message');

            // Scroll to the bottom to show new message
            chatBox.scrollTop = chatBox.scrollHeight;
        } catch (error) {
            console.error('Error:', error);
        }
    }

    // Function to create and append messages to the chat box
    function appendMessage(sender, message, className) {
        const messageDiv = document.createElement('div');
        messageDiv.textContent = `${sender}: ${message}`;
        messageDiv.className = className; // Add class for styling
        chatBox.appendChild(messageDiv);
    }

    // Event listener for the send button
    sendButton.addEventListener('click', sendMessage);

    // Event listener for the 'Enter' key in the input field
    userInputField.addEventListener('keypress', function(e) {
        if (e.key === 'Enter' && !userInputField.disabled) {
            sendMessage();
        }
    });
});
