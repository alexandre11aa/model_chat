const chatSocket = new WebSocket(
    'ws://' + window.location.host + '/ws/chat/group/{{ group_chat.id }}/'
);

chatSocket.onmessage = function(e) {
    const data = JSON.parse(e.data);
    const message = data.message;
    const sender = message.sender;
    const timestamp = new Date(message.timestamp);
    const chatLog = document.getElementById('chat-log');
    const newMessage = document.createElement('div');
    newMessage.innerHTML = `<strong>${sender}:</strong> ${message.message} <em>(${timestamp.getHours()}:${timestamp.getMinutes()})</em>`;
    chatLog.appendChild(newMessage);
    chatLog.scrollTop = chatLog.scrollHeight;  // Auto scroll to bottom
};

document.getElementById('send-message').onclick = function(e) {
    const messageInputDom = document.getElementById('chat-message-input');
    const message = messageInputDom.value;

    chatSocket.send(JSON.stringify({
        'message': message,
        'sender_id': '{{ logged_user.id }}'
    }));

    messageInputDom.value = '';
};