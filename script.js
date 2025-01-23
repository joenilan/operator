// DOM Elements
const statusLight = document.querySelector('.status-light');
const statusText = document.getElementById('status-text');
const username = document.getElementById('username');
const lineNumber = document.getElementById('line-number');
const callStatus = document.getElementById('call-status');
const messageInput = document.getElementById('message-input');
const sendButton = document.getElementById('send-button');

// Connection States
const States = {
    CONNECTING: 'connecting',
    WAITING: 'waiting',
    ACTIVE: 'active',
    ERROR: 'error'
};

// Current state
let currentState = States.CONNECTING;

// Update the UI based on state
function updateState(state, data = {}) {
    currentState = state;
    statusLight.className = 'status-light ' + state;

    switch (state) {
        case States.CONNECTING:
            statusText.textContent = 'Connecting...';
            callStatus.textContent = 'Connecting...';
            messageInput.disabled = true;
            sendButton.disabled = true;
            break;

        case States.WAITING:
            statusText.textContent = 'Waiting for line...';
            callStatus.textContent = 'In Queue';
            messageInput.disabled = true;
            sendButton.disabled = true;
            if (data.position) {
                statusText.textContent += ` (Position: ${data.position})`;
            }
            break;

        case States.ACTIVE:
            statusText.textContent = 'On Air';
            callStatus.textContent = 'Active';
            messageInput.disabled = false;
            sendButton.disabled = false;
            break;

        case States.ERROR:
            statusText.textContent = data.message || 'Connection Error';
            callStatus.textContent = 'Error';
            messageInput.disabled = true;
            sendButton.disabled = true;
            break;
    }
}

// Handle sending messages
function sendMessage() {
    if (currentState !== States.ACTIVE || !messageInput.value.trim()) return;

    // TODO: Send message to WebSocket server
    console.log('Sending message:', messageInput.value);
    
    messageInput.value = '';
    messageInput.focus();
}

// Event Listeners
messageInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        sendMessage();
    }
});

sendButton.addEventListener('click', sendMessage);

// Parse URL parameters
const urlParams = new URLSearchParams(window.location.search);
const userParam = urlParams.get('user');
const lineParam = urlParams.get('line');
const tokenParam = urlParams.get('token');

// Set initial values from URL
if (userParam) username.textContent = userParam;
if (lineParam) lineNumber.textContent = lineParam;

// Start in connecting state
updateState(States.CONNECTING);

// TODO: Establish WebSocket connection
// This will be implemented in the next step 
