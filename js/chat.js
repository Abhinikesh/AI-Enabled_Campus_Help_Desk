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
    const routerResult = getAIResponse(message);
    addAIMessage(routerResult.response, routerResult.agent);
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
function addAIMessage(message, agentName = 'AI Agent') {
  const chatMessages = document.getElementById('chatMessages');
  const messageDiv = document.createElement('div');
  messageDiv.className = 'message ai';
  
  // Format the agent name based on the ID
  let displayAgent = agentName;
  if(agentName === 'academic') displayAgent = 'Academic Agent';
  if(agentName === 'admin') displayAgent = 'Admin Agent';
  if(agentName === 'navigation') displayAgent = 'Navigation Agent';
  if(agentName === 'complaint') displayAgent = 'Complaint Agent';
  if(agentName === 'Router Assistant') displayAgent = 'Campus AI Router';

  messageDiv.innerHTML = `
    <div>
      <div style="font-size: 0.75rem; color: var(--primary-color); margin-bottom: 0.25rem; font-weight: 600;">${displayAgent}</div>
      <div class="message-bubble">${message}</div>
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

// Get AI response based on message intent routing
function getAIResponse(message) {
  const lowerMessage = message.toLowerCase();
  
  // 1. Detect Intent Agent
  let detectedAgent = null;
  
  const keywords = {
    academic: ['timetable', 'results', 'attendance', 'courses', 'exam', 'class', 'grade'],
    admin: ['fees', 'id card', 'documents', 'certificate', 'hostel', 'payment'],
    navigation: ['room', 'find', 'where', 'direction', 'campus', 'department', 'locate'],
    complaint: ['raise', 'track', 'resolve', 'complaint', 'broken', 'issue', 'wifi', 'water', 'electricity']
  };

  for (const [agent, words] of Object.entries(keywords)) {
    if (words.some(word => lowerMessage.includes(word))) {
      detectedAgent = agent;
      break;
    }
  }

  // Handle unclear intent
  if (!detectedAgent) {
    return {
      agent: 'Router Assistant',
      response: "I'm not quite sure which department you need. Could you please clarify if your query is regarding Academics, Admin services, Campus Navigation, or raising a Complaint?"
    };
  }

  // 2. Know User Role
  // In a real app, logic would deeply check the session/user role. We grab it from our helper function.
  let role = 'guest';
  if (typeof getUserRole === 'function') {
    role = getUserRole();
  } else if (sessionStorage.getItem('userRole')) {
    role = sessionStorage.getItem('userRole');
  }

  let greeting = '';
  if (role === 'student') greeting = 'Hi there, student! ';
  else if (role === 'faculty') greeting = 'Hello, professor. ';
  else if (role === 'admin') greeting = 'Hello, admin. ';
  else greeting = 'Hello there! ';

  // 3. Find matched answer
  const agentResponses = campusData.aiResponses[detectedAgent];
  let answer = '';
  for (const [key, response] of Object.entries(agentResponses)) {
    if (key !== 'default' && lowerMessage.includes(key)) {
      answer = response;
      break;
    }
  }

  if (!answer) answer = agentResponses.default || "I am processing your specific request, please wait or check the portal.";

  // 4. Structured Output
  let actionSuggestion = "Is there anything else you need help with regarding " + detectedAgent + " matters?";
  
  return {
    agent: detectedAgent,
    response: `${greeting}${answer} <br><br><i>${actionSuggestion}</i>`
  };
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
