document.addEventListener('DOMContentLoaded', function() {
    const sendMessageButton = document.getElementById('send-message');
    const chatInput = document.getElementById('chat-input');
    const chatMessages = document.getElementById('chat-messages');
  
    sendMessageButton.addEventListener('click', function() {
      const message = chatInput.value.trim();
  
      if (message) {
        // Create a new message element
        const messageElement = document.createElement('li');
        messageElement.classList.add('user');
        messageElement.innerHTML = `<p>${message}</p>`;
        chatMessages.appendChild(messageElement);
  
        // Scroll to the bottom of the chat
        chatMessages.scrollTop = chatMessages.scrollHeight;
  
        // Clear the input field
        chatInput.value = '';
  
        // Simulate a reply from the admin
        setTimeout(() => {
          const replyElement = document.createElement('li');
          replyElement.classList.add('admin');
          replyElement.innerHTML = `<p>Thank you for your message! We will get back to you shortly.</p>`;
          chatMessages.appendChild(replyElement);
          chatMessages.scrollTop = chatMessages.scrollHeight;
        }, 1000);
      }
    });
  });
  