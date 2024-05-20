const chatBox = document.getElementById('chat-box');
const messageInput = document.querySelector('.chat-msg-block__input');
const sendButton = document.getElementById('send-btn');
const locationButton = document.getElementById('location-btn');
const socket = new WebSocket('wss://echo-ws-service.herokuapp.com');

socket.onerror = function(error) {
    writeToChat(error);
    console.error('Error:', error);
};

socket.onmessage = function(event) {
    addMessageToChat(`${event.data}`, 'echo');
};

function addMessageToChat(message, messageType) {
    const messageElement = document.createElement('div');
    messageElement.innerHTML = message;
    messageElement.classList.add('message');
    if (messageType === 'user') {
        messageElement.classList.add('user-message');
    } else {
        messageElement.classList.add('echo-message');
    }
    chatBox.appendChild(messageElement);
    chatBox.scrollTop = chatBox.scrollHeight;
}

function sendMessage() {
    const message = messageInput.value;
    if (message !== '') {
        addMessageToChat(`${message}`, 'user');
        socket.send(message);
        messageInput.value = '';
    }
}


sendButton.addEventListener('click', sendMessage);
messageInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        sendMessage();
    }
});

const error = () => {
    addMessageToChat('It is impossible to get your location', 'echo');
}

const success = (position) => {
    const latitude  = position.coords.latitude;
    const longitude = position.coords.longitude;
    const mapLink = document.createElement('a');

    mapLink.href = `https://www.openstreetmap.org/#map=18/${latitude}/${longitude}`;
    mapLink.innerText = 'Map link';
    mapLink.target = '_blank';
    mapLink.style.textDecoration = 'none';
    
    addMessageToChat(mapLink.outerHTML, 'echo');
}

locationButton.addEventListener('click', () => {
    addMessageToChat('Find my geolocation', 'user');
    if (!navigator.geolocation) {
        addMessageToChat('Geolocation is not supported by your browser', 'echo');
      } else {
        addMessageToChat('Location determination…', 'echo');
        navigator.geolocation.getCurrentPosition(success, error);
      }
});

window.addEventListener('beforeunload', () => {
    socket.close();
});