// Global app functionality - Navigation and common features

// Check role and redirect if needed
function checkRoleAndRedirect() {
  const userRole = sessionStorage.getItem('userRole');
  if (!userRole) {
    window.location.href = 'role-select.html';
    return false;
  }
  return true;
}

// Get user role
function getUserRole() {
  return sessionStorage.getItem('userRole') || 'guest';
}

// Check if user has access
function hasAccess(requiredRoles) {
  const userRole = getUserRole();
  return requiredRoles.includes(userRole);
}

// Mobile menu toggle
document.addEventListener('DOMContentLoaded', function() {
  // Check role first
  if (!checkRoleAndRedirect()) return;

  // Setup navigation based on role
  setupNavigation();

  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('navLinks');

  if (hamburger && navLinks) {
    hamburger.addEventListener('click', function() {
      navLinks.classList.toggle('active');
      hamburger.classList.toggle('active');
    });

    // Close menu when clicking on a link
    const links = navLinks.querySelectorAll('a');
    links.forEach(link => {
      link.addEventListener('click', function() {
        navLinks.classList.remove('active');
        hamburger.classList.remove('active');
      });
    });

    // Close menu when clicking outside
    document.addEventListener('click', function(event) {
      if (!hamburger.contains(event.target) && !navLinks.contains(event.target)) {
        navLinks.classList.remove('active');
        hamburger.classList.remove('active');
      }
    });
  }

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href !== '#' && href.length > 1) {
        const target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      }
    });
  });

  // Initialize home page sections (wait for data.js to load)
  setTimeout(() => {
    // Load role-based content
    loadRoleBasedContent();

    if (document.getElementById('programsGrid')) {
      loadPrograms();
    }

    if (document.querySelector('.placement-stats')) {
      loadPlacementStats();
      animateCountUp();
    }

    if (document.getElementById('newsGrid')) {
      loadNews();
    }

    if (document.getElementById('timelineTrack')) {
      loadTimeline();
    }

    // Initialize floating chatbot
    if (document.getElementById('floatingChatbot')) {
      initFloatingChatbot();
    }
  }, 100);
});

// Setup navigation based on role
function setupNavigation() {
  const navLinks = document.getElementById('navLinks');
  if (!navLinks) return;

  const userRole = getUserRole();
  let links = [];

  if (userRole === 'admin') {
    links = [
      { href: 'index.html', text: 'Home' },
      { href: 'dashboard.html', text: 'Dashboard' },
      { href: 'helpdesk.html', text: 'Complaints' }
    ];
  } else if (userRole === 'student') {
    links = [
      { href: 'index.html', text: 'Home' },
      { href: 'attendance.html', text: 'Attendance' },
      { href: 'exams.html', text: 'Exams' },
      { href: 'results.html', text: 'Results' },
      { href: 'chat.html', text: 'AI Help Desk' },
      { href: 'tour.html', text: 'Virtual Tour' },
      { href: 'drive.html', text: 'Drive' },
      { href: 'helpdesk.html', text: 'Complaints' }
    ];
  } else if (userRole === 'faculty') {
    links = [
      { href: 'index.html', text: 'Home' },
      { href: 'chat.html', text: 'AI Help Desk' },
      { href: 'tour.html', text: 'Virtual Tour' },
      { href: 'drive.html', text: 'Drive' },
      { href: 'helpdesk.html', text: 'Complaints' }
    ];
  } else {
    // Parent, New Admission
    links = [
      { href: 'index.html', text: 'Home' },
      { href: 'chat.html', text: 'AI Help Desk' },
      { href: 'tour.html', text: 'Virtual Tour' }
    ];
  }

  navLinks.innerHTML = links.map(link => 
    `<li><a href="${link.href}">${link.text}</a></li>`
  ).join('');

  // Add role badge
  const logo = document.querySelector('.logo');
  if (logo && !logo.querySelector('.role-badge')) {
    const roleBadge = document.createElement('span');
    roleBadge.className = 'role-badge';
    roleBadge.textContent = userRole.charAt(0).toUpperCase() + userRole.slice(1).replace('-', ' ');
    logo.appendChild(roleBadge);
  }
}

// Load role-based content
function loadRoleBasedContent() {
  const userRole = getUserRole();

  // Load classes for student and faculty
  if (userRole === 'student' || userRole === 'faculty') {
    loadClassSchedule();
    loadDailyPlans();
  }

  // Load attendance for students only
  if (userRole === 'student') {
    loadAttendance();
  }

  // Load parent dashboard
  if (userRole === 'parent') {
    loadParentDashboard();
  }
}

// Load class schedule
function loadClassSchedule() {
  const classesSection = document.getElementById('classesSection');
  const classesGrid = document.getElementById('classesGrid');
  if (!classesSection || !classesGrid) return;

  const userRole = getUserRole();
  const schedules = campusData.classSchedules[userRole] || [];

  if (schedules.length === 0) {
    classesSection.style.display = 'none';
    return;
  }

  classesSection.style.display = 'block';
  classesGrid.innerHTML = '';

  schedules.forEach(cls => {
    const now = new Date();
    const currentTime = now.getHours() * 60 + now.getMinutes();
    const classStart = parseTime(cls.timeFrom);
    const classEnd = parseTime(cls.timeTo);
    
    let status = 'upcoming';
    if (currentTime >= classStart && currentTime <= classEnd) {
      status = 'ongoing';
    } else if (currentTime > classEnd) {
      status = 'completed';
    }

    const card = document.createElement('div');
    card.className = `class-card ${status}`;
    card.innerHTML = `
      <div class="class-status-badge">${status === 'ongoing' ? 'Ongoing' : status === 'completed' ? 'Completed' : 'Upcoming'}</div>
      <h3>${cls.className}</h3>
      <div class="class-details">
        <p><i class="fas fa-code"></i> ${cls.subjectCode}</p>
        <p><i class="fas fa-clock"></i> ${cls.timeFrom} - ${cls.timeTo}</p>
        <p><i class="fas fa-door-open"></i> ${cls.room}</p>
        ${cls.batch ? `<p><i class="fas fa-users"></i> ${cls.batch}</p>` : ''}
      </div>
    `;
    classesGrid.appendChild(card);
  });
}

function parseTime(timeStr) {
  const [hours, minutes] = timeStr.split(':').map(Number);
  return hours * 60 + minutes;
}

// Load daily plans
function loadDailyPlans() {
  const plansSection = document.getElementById('plansSection');
  const plansList = document.getElementById('plansList');
  if (!plansSection || !plansList) return;

  const userRole = getUserRole();
  const plans = campusData.dailyPlans[userRole] || [];

  if (plans.length === 0) {
    plansSection.style.display = 'none';
    return;
  }

  plansSection.style.display = 'block';
  plansList.innerHTML = '';

  plans.forEach(plan => {
    const planItem = document.createElement('div');
    planItem.className = `plan-item ${plan.completed ? 'completed' : ''}`;
    planItem.innerHTML = `
      <input type="checkbox" id="plan-${plan.id}" ${plan.completed ? 'checked' : ''} onchange="togglePlan(${plan.id})">
      <label for="plan-${plan.id}">
        <span class="plan-icon">${getPlanIcon(plan.type)}</span>
        <span class="plan-text">${plan.task}</span>
      </label>
    `;
    plansList.appendChild(planItem);
  });
}

function getPlanIcon(type) {
  const icons = {
    assignment: '<i class="fas fa-file-alt"></i>',
    study: '<i class="fas fa-book"></i>',
    meeting: '<i class="fas fa-users"></i>',
    research: '<i class="fas fa-search"></i>',
    preparation: '<i class="fas fa-chalkboard"></i>',
    grading: '<i class="fas fa-check-circle"></i>',
    admin: '<i class="fas fa-tasks"></i>'
  };
  return icons[type] || '<i class="fas fa-circle"></i>';
}

function togglePlan(id) {
  const userRole = getUserRole();
  const plans = campusData.dailyPlans[userRole] || [];
  const plan = plans.find(p => p.id === id);
  if (plan) {
    plan.completed = !plan.completed;
  }
}

// Load Attendance (Students Only)
function loadAttendance() {
  const attendanceSection = document.getElementById('attendanceSection');
  const attendanceGrid = document.getElementById('attendanceGrid');
  if (!attendanceSection || !attendanceGrid) return;

  const attendance = campusData.attendance.student || [];

  if (attendance.length === 0) {
    attendanceSection.style.display = 'none';
    return;
  }

  attendanceSection.style.display = 'block';
  attendanceGrid.innerHTML = '';

  attendance.forEach(item => {
    const card = document.createElement('div');
    card.className = 'attendance-card';
    
    // Determine color based on percentage
    let statusColor = '#ef4444'; // Red
    if (item.percentage >= 75) {
      statusColor = '#10b981'; // Green
    } else if (item.percentage >= 60) {
      statusColor = '#f59e0b'; // Yellow
    }

    card.innerHTML = `
      <div class="attendance-card-header">
        <h3>${item.subjectName}</h3>
        <span class="subject-code">${item.subjectCode}</span>
      </div>
      <div class="attendance-stats">
        <div class="attendance-progress-container">
          <canvas class="attendance-chart" data-percentage="${item.percentage}" data-color="${statusColor}"></canvas>
          <div class="attendance-percentage">${item.percentage}%</div>
        </div>
        <div class="attendance-details">
          <p><span>Attended:</span> ${item.classesAttended}</p>
          <p><span>Total:</span> ${item.totalClasses}</p>
        </div>
      </div>
    `;
    attendanceGrid.appendChild(card);
  });

  // Initialize charts after DOM update
  setTimeout(() => {
    initializeAttendanceCharts();
  }, 100);
}

function initializeAttendanceCharts() {
  const charts = document.querySelectorAll('.attendance-chart');
  charts.forEach(canvas => {
    const percentage = parseInt(canvas.dataset.percentage);
    const color = canvas.dataset.color;
    const ctx = canvas.getContext('2d');
    
    // Simple circular progress using canvas
    const centerX = 60;
    const centerY = 60;
    const radius = 50;
    const lineWidth = 8;

    // Background circle
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
    ctx.strokeStyle = 'var(--bg-tertiary)';
    ctx.lineWidth = lineWidth;
    ctx.stroke();

    // Progress circle
    ctx.beginPath();
    const angle = (percentage / 100) * 2 * Math.PI - Math.PI / 2;
    ctx.arc(centerX, centerY, radius, -Math.PI / 2, angle);
    ctx.strokeStyle = color;
    ctx.lineWidth = lineWidth;
    ctx.lineCap = 'round';
    ctx.stroke();
  });
}

// Load Parent Dashboard
function loadParentDashboard() {
  const parentSection = document.getElementById('parentDashboardSection');
  const parentGrid = document.getElementById('parentCardsGrid');
  if (!parentSection || !parentGrid) return;

  parentSection.style.display = 'block';
  const data = campusData.parentDashboard;

  parentGrid.innerHTML = `
    <div class="parent-card">
      <h3><i class="fas fa-bullhorn"></i> Announcements</h3>
      <div class="parent-announcements">
        ${data.announcements.map(ann => `
          <div class="announcement-item">
            <div class="announcement-date">${new Date(ann.date).toLocaleDateString()}</div>
            <h4>${ann.title}</h4>
            <p>${ann.content}</p>
          </div>
        `).join('')}
      </div>
    </div>

    <div class="parent-card">
      <h3><i class="fas fa-calendar-alt"></i> Academic Calendar</h3>
      <div class="parent-calendar">
        ${data.academicCalendar.map(item => `
          <div class="calendar-item">
            <span class="calendar-date">${new Date(item.date).toLocaleDateString()}</span>
            <span class="calendar-event">${item.event}</span>
          </div>
        `).join('')}
      </div>
    </div>

    <div class="parent-card">
      <h3><i class="fas fa-info-circle"></i> Student Guidance</h3>
      <div class="parent-guidance">
        ${data.guidance.map(item => `
          <div class="guidance-item">
            <h4>${item.title}</h4>
            <p>${item.content}</p>
          </div>
        `).join('')}
      </div>
    </div>

    <div class="parent-card">
      <h3><i class="fas fa-phone"></i> Contact Information</h3>
      <div class="parent-contacts">
        ${data.contacts.map(contact => `
          <div class="contact-item">
            <h4>${contact.department}</h4>
            <p><i class="fas fa-phone"></i> ${contact.phone}</p>
            <p><i class="fas fa-envelope"></i> ${contact.email}</p>
          </div>
        `).join('')}
      </div>
    </div>
  `;
}

// Utility function to format time
function formatTime(date = new Date()) {
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const ampm = hours >= 12 ? 'PM' : 'AM';
  const formattedHours = hours % 12 || 12;
  const formattedMinutes = minutes.toString().padStart(2, '0');
  return `${formattedHours}:${formattedMinutes} ${ampm}`;
}

// Utility function to get relative time
function getRelativeTime(date) {
  const now = new Date();
  const diff = now - date;
  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);

  if (seconds < 60) return 'Just now';
  if (minutes < 60) return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
  if (hours < 24) return `${hours} hour${hours > 1 ? 's' : ''} ago`;
  return date.toLocaleDateString();
}

// Load Programs
function loadPrograms() {
  const programsGrid = document.getElementById('programsGrid');
  if (!programsGrid || !campusData.programs) return;

  programsGrid.innerHTML = '';
  campusData.programs.forEach(program => {
    const card = document.createElement('div');
    card.className = 'program-card';
    card.innerHTML = `
      <img src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=400&h=300" alt="${program.name}" onerror="this.src='https://via.placeholder.com/400x300/1e293b/6366f1?text=${encodeURIComponent(program.name)}'" />
      <h3>${program.name}</h3>
    `;
    programsGrid.appendChild(card);
  });
}

// Load Placement Stats
function loadPlacementStats() {
  if (!campusData.placements) return;
  
  const stats = campusData.placements;
  const statElements = document.querySelectorAll('.stat-value');
  
  statElements.forEach(el => {
    const target = parseInt(el.dataset.target);
    if (isNaN(target)) return;
    
    if (el.textContent.includes('₹')) {
      el.textContent = '₹0';
    } else if (el.textContent.includes('%')) {
      el.textContent = '0%';
    } else {
      el.textContent = '0';
    }
  });
}

// Animate Count Up
function animateCountUp() {
  const observers = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const element = entry.target;
        const target = parseInt(element.dataset.target);
        if (isNaN(target)) return;
        
        const isCurrency = element.textContent.includes('₹');
        const isPercentage = element.textContent.includes('%');
        const duration = 2000;
        const steps = 60;
        const increment = target / steps;
        let current = 0;
        
        const timer = setInterval(() => {
          current += increment;
          if (current >= target) {
            current = target;
            clearInterval(timer);
          }
          
          if (isCurrency) {
            element.textContent = '₹' + Math.floor(current).toLocaleString('en-IN');
          } else if (isPercentage) {
            element.textContent = Math.floor(current) + '%';
          } else {
            element.textContent = Math.floor(current);
          }
        }, duration / steps);
        
        observers.unobserve(element);
      }
    });
  }, { threshold: 0.5 });
  
  document.querySelectorAll('.stat-value').forEach(el => {
    observers.observe(el);
  });
}

// Load News
function loadNews() {
  const newsGrid = document.getElementById('newsGrid');
  if (!newsGrid || !campusData.news) return;

  newsGrid.innerHTML = '';
  campusData.news.forEach(item => {
    const card = document.createElement('div');
    card.className = 'news-card';
    card.innerHTML = `
      <img src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=600&h=400" alt="${item.title}" onerror="this.src='https://via.placeholder.com/600x400/1e293b/6366f1?text=${encodeURIComponent(item.title)}'" />
      <div class="news-card-overlay">
        <h3 class="news-card-title">${item.title}</h3>
      </div>
    `;
    newsGrid.appendChild(card);
  });
}

// Load Timeline
function loadTimeline() {
  const timelineTrack = document.getElementById('timelineTrack');
  if (!timelineTrack || !campusData.timeline) return;

  // Duplicate items for seamless loop (3 sets for smooth infinite scroll)
  const items = [...campusData.timeline, ...campusData.timeline, ...campusData.timeline];
  
  timelineTrack.innerHTML = '';
  items.forEach(item => {
    const timelineItem = document.createElement('div');
    timelineItem.className = 'timeline-item';
    timelineItem.innerHTML = `
      <img src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=400&h=300" alt="${item.title}" onerror="this.src='https://via.placeholder.com/400x300/1e293b/6366f1?text=${encodeURIComponent(item.title)}'" />
      <div class="timeline-item-content">
        <div class="timeline-item-year">${item.year}</div>
        <h3 class="timeline-item-title">${item.title}</h3>
        <p class="timeline-item-desc">${item.description}</p>
      </div>
    `;
    timelineTrack.appendChild(timelineItem);
  });

  // Adjust animation duration based on content width
  setTimeout(() => {
    const firstSetWidth = campusData.timeline.length * 352; // 320px width + 32px gap
    const totalWidth = items.length * 352;
    const duration = (totalWidth / 50) * 1000; // 50px per second
    timelineTrack.style.animationDuration = `${duration}ms`;
  }, 100);
}

// Floating Chatbot
let chatbotOpen = false;
let chatbotCurrentAgent = 'academic';
let chatbotFirstOpen = true;
let chatbotTypingIndicator = null;

function initFloatingChatbot() {
  const chatbotButton = document.getElementById('chatbotButton');
  const chatbotWindow = document.getElementById('chatbotWindow');
  const chatbotClose = document.getElementById('chatbotClose');
  const chatbotSend = document.getElementById('chatbotSend');
  const chatbotInput = document.getElementById('chatbotInput');
  const chatbotMessages = document.getElementById('chatbotMessages');

  if (!chatbotButton || !chatbotWindow) return;

  // Toggle chat window
  chatbotButton.addEventListener('click', () => {
    chatbotOpen = !chatbotOpen;
    chatbotWindow.classList.toggle('active', chatbotOpen);
    chatbotButton.classList.toggle('active', chatbotOpen);
    
    // Prevent background scroll on mobile
    if (window.innerWidth <= 768) {
      if (chatbotOpen) {
        document.body.classList.add('chatbot-open');
      } else {
        document.body.classList.remove('chatbot-open');
      }
    }

    // Show greeting on first open
    if (chatbotOpen && chatbotFirstOpen) {
      chatbotFirstOpen = false;
      setTimeout(() => {
        addChatbotMessage("Hi! I'm CampusSphere AI. How can I help you today?", 'ai');
      }, 300);
    }

    // Focus input when opened
    if (chatbotOpen && chatbotInput) {
      setTimeout(() => chatbotInput.focus(), 350);
    }
  });

  // Close button
  if (chatbotClose) {
    chatbotClose.addEventListener('click', () => {
      chatbotOpen = false;
      chatbotWindow.classList.remove('active');
      chatbotButton.classList.remove('active');
      document.body.classList.remove('chatbot-open');
    });
  }

  // Update send button state
  function updateSendButton() {
    if (chatbotSend && chatbotInput) {
      const hasText = chatbotInput.value.trim().length > 0;
      chatbotSend.disabled = !hasText;
    }
  }

  // Send message function
  function sendChatbotMessage() {
    if (!chatbotInput) return;
    
    const message = chatbotInput.value.trim();
    if (!message) return;

    addChatbotMessage(message, 'user');
    chatbotInput.value = '';
    updateSendButton();

    // Show typing indicator
    showChatbotTyping();

    // Simulate AI response
    setTimeout(() => {
      hideChatbotTyping();
      const response = getChatbotResponse(message);
      addChatbotMessage(response, 'ai');
    }, 800 + Math.random() * 700);
  }

  // Send button
  if (chatbotSend) {
    chatbotSend.addEventListener('click', sendChatbotMessage);
    updateSendButton();
  }

  // Input events
  if (chatbotInput) {
    chatbotInput.addEventListener('input', updateSendButton);
    chatbotInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        sendChatbotMessage();
      }
    });
  }
}

function showChatbotTyping() {
  const chatbotMessages = document.getElementById('chatbotMessages');
  if (!chatbotMessages) return;

  hideChatbotTyping(); // Remove any existing indicator

  const typingDiv = document.createElement('div');
  typingDiv.className = 'message ai';
  typingDiv.id = 'chatbotTypingIndicator';
  typingDiv.innerHTML = `
    <div class="chatbot-typing">
      <span></span>
      <span></span>
      <span></span>
    </div>
  `;
  chatbotMessages.appendChild(typingDiv);
  chatbotTypingIndicator = typingDiv;
  scrollChatbotToBottom();
}

function hideChatbotTyping() {
  if (chatbotTypingIndicator) {
    chatbotTypingIndicator.remove();
    chatbotTypingIndicator = null;
  }
}

function addChatbotMessage(message, type) {
  const chatbotMessages = document.getElementById('chatbotMessages');
  if (!chatbotMessages) return;

  hideChatbotTyping();

  const messageDiv = document.createElement('div');
  messageDiv.className = `message ${type}`;
  messageDiv.innerHTML = `
    <div class="message-bubble">${escapeHtml(message)}</div>
  `;
  chatbotMessages.appendChild(messageDiv);
  scrollChatbotToBottom();
}

function scrollChatbotToBottom() {
  const chatbotMessages = document.getElementById('chatbotMessages');
  if (!chatbotMessages) return;
  
  // Use requestAnimationFrame for smooth scroll
  requestAnimationFrame(() => {
    chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
  });
}

function getChatbotResponse(message) {
  if (typeof campusData === 'undefined' || !campusData || !campusData.aiResponses) {
    return "I'm here to help! How can I assist you today?";
  }

  const lowerMessage = message.toLowerCase();
  const agentResponses = campusData.aiResponses[chatbotCurrentAgent] || campusData.aiResponses.academic;

  for (const [key, response] of Object.entries(agentResponses)) {
    if (key !== 'default' && lowerMessage.includes(key)) {
      return response;
    }
  }

  return agentResponses.default || "I'm here to help! Could you please provide more details?";
}

function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

document.addEventListener("DOMContentLoaded", () => {
  const programsGrid = document.getElementById("programsGrid");

  if (!programsGrid || !campusData?.programs) return;

  programsGrid.innerHTML = campusData.programs
    .map(program => `
      <div class="program-card">
        <img src="${program.image}" alt="${program.name}">
        <h3>${program.name}</h3>
      </div>
    `)
    .join("");
});
