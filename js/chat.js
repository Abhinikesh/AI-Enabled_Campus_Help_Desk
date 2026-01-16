// Chat functionality for AI Help Desk

let currentAgent = 'academic';
let currentLanguage = 'en';
let isTyping = false;

// Initialize chat
document.addEventListener('DOMContentLoaded', function() {
  const agentSelector = document.getElementById('agentSelector');
  const chatInput = document.getElementById('chatInput');
  const sendBtn = document.getElementById('sendBtn');
  const voiceBtn = document.getElementById('voiceBtn');
  const langButtons = document.querySelectorAll('.lang-btn');

  // Agent selector change
  if (agentSelector) {
    agentSelector.addEventListener('change', function() {
      currentAgent = this.value;
      addAIMessage(`Switched to ${this.options[this.selectedIndex].text}. How can I help you?`);
    });
  }

  // Language switcher
  langButtons.forEach(btn => {
    btn.addEventListener('click', function() {
      langButtons.forEach(b => b.classList.remove('active'));
      this.classList.add('active');
      currentLanguage = this.dataset.lang;
      // In a real app, this would trigger translation
    });
  });

  // Voice button (UI only)
  if (voiceBtn) {
    voiceBtn.addEventListener('click', function() {
      this.style.background = 'rgba(255, 255, 255, 0.4)';
      setTimeout(() => {
        this.style.background = 'rgba(255, 255, 255, 0.2)';
      }, 200);
      // In a real app, this would trigger voice recognition
      alert('Voice input feature would be enabled here with Web Speech API');
    });
  }

  // Send message on button click
  if (sendBtn) {
    sendBtn.addEventListener('click', sendMessage);
  }

  // Send message on Enter key
  if (chatInput) {
    chatInput.addEventListener('keypress', function(e) {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        sendMessage();
      }
    });
  }

  // Handle URL parameters for pre-filled messages (from tour page)
  const urlParams = new URLSearchParams(window.location.search);
  const message = urlParams.get('message');
  const agent = urlParams.get('agent');

  if (message && agent) {
    // Set agent selector
    if (agentSelector && agentSelector.querySelector(`option[value="${agent}"]`)) {
      agentSelector.value = agent;
      currentAgent = agent;
      // Trigger change event to show agent switch message
      agentSelector.dispatchEvent(new Event('change'));
    }
    
    // Auto-send message after a short delay
    setTimeout(() => {
      if (chatInput) {
        chatInput.value = message;
        sendMessage();
      }
    }, 1500);
  }
});

// Send message function
function sendMessage() {
  const chatInput = document.getElementById('chatInput');
  const message = chatInput.value.trim();

  if (!message || isTyping) return;

  // Add user message
  addUserMessage(message);
  chatInput.value = '';

  // Show typing indicator
  showTypingIndicator();

  // Simulate AI response delay
  setTimeout(() => {
    hideTypingIndicator();
    const response = getAIResponse(message, currentAgent);
    addAIMessage(response);
  }, 1000 + Math.random() * 1000); // Random delay between 1-2 seconds
}

// Add user message to chat
function addUserMessage(message) {
  const chatMessages = document.getElementById('chatMessages');
  const messageDiv = document.createElement('div');
  messageDiv.className = 'message user';
  messageDiv.innerHTML = `
    <div>
      <div class="message-bubble">${escapeHtml(message)}</div>
      <div class="message-time">${formatTime()}</div>
    </div>
  `;
  chatMessages.appendChild(messageDiv);
  scrollToBottom();
}

// Add AI message to chat
function addAIMessage(message) {
  const chatMessages = document.getElementById('chatMessages');
  const messageDiv = document.createElement('div');
  messageDiv.className = 'message ai';
  messageDiv.innerHTML = `
    <div>
      <div class="message-bubble">${escapeHtml(message)}</div>
      <div class="message-time">${formatTime()}</div>
    </div>
  `;
  chatMessages.appendChild(messageDiv);
  scrollToBottom();
}

// Show typing indicator
function showTypingIndicator() {
  isTyping = true;
  const chatMessages = document.getElementById('chatMessages');
  const typingDiv = document.createElement('div');
  typingDiv.className = 'message ai';
  typingDiv.id = 'typingIndicator';
  typingDiv.innerHTML = `
    <div>
      <div class="message-bubble">
        <div class="typing-indicator">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    </div>
  `;
  chatMessages.appendChild(typingDiv);
  scrollToBottom();
}

// Hide typing indicator
function hideTypingIndicator() {
  isTyping = false;
  const typingIndicator = document.getElementById('typingIndicator');
  if (typingIndicator) {
    typingIndicator.remove();
  }
}

// Get AI response based on message and agent
function getAIResponse(message, agent) {
  const lowerMessage = message.toLowerCase();
  const agentResponses = campusData.aiResponses[agent];

  // Check for specific keywords
  for (const [key, response] of Object.entries(agentResponses)) {
    if (key !== 'default' && lowerMessage.includes(key)) {
      return response;
    }
  }

  // Return default response
  return agentResponses.default || "I'm here to help! Could you please provide more details?";
}

// Scroll chat to bottom
function scrollToBottom() {
  const chatMessages = document.getElementById('chatMessages');
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Escape HTML to prevent XSS
function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}
