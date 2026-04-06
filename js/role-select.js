// Role Selection and Login

let currentSelectedRole = '';

document.addEventListener('DOMContentLoaded', function() {
  // Check if role already selected
  const savedRole = sessionStorage.getItem('userRole');
  if (savedRole) {
    redirectToHome();
    return;
  }

  // Role selection
  const roleCards = document.querySelectorAll('.role-card');
  roleCards.forEach(card => {
    card.addEventListener('click', function() {
      const role = this.dataset.role;
      handleRoleSelection(role);
    });
  });

  const loginForm = document.getElementById('loginForm');
  if (loginForm) {
    loginForm.addEventListener('submit', handleLoginSubmit);
  }
});

function handleRoleSelection(role) {
  currentSelectedRole = role;
  const loginError = document.getElementById('loginError');
  if(loginError) loginError.style.display = 'none';

  // Always show modal for everyone to collect info (Name/Purpose or ID/Password)
  showLoginModal(role);
}

function showLoginModal(role) {
  const modal = document.getElementById('loginModal');
  const loginTitle = document.getElementById('loginTitle');
  const idLabel = document.getElementById('idLabel');
  const secondaryLabel = document.getElementById('secondaryLabel');
  const userIdInput = document.getElementById('userId');
  const userSecondaryInput = document.getElementById('userSecondary');
  
  if (!modal) return;

  // Reset fields
  userIdInput.value = '';
  userSecondaryInput.value = '';

  if (role === 'student') {
    loginTitle.textContent = 'Student Login';
    idLabel.textContent = 'Roll Number (8 Digits)';
    userIdInput.placeholder = 'Enter your 8-digit roll number';
    userIdInput.type = 'text';
    secondaryLabel.textContent = 'Password';
    userSecondaryInput.placeholder = 'Minimum 8 characters';
    userSecondaryInput.type = 'password';
  } else if (role === 'faculty' || role === 'admin') {
    loginTitle.textContent = role === 'admin' ? 'Admin Login' : 'Faculty Login';
    idLabel.textContent = role === 'admin' ? 'Admin Username' : 'Employee ID';
    userIdInput.placeholder = 'Enter your ID';
    userIdInput.type = 'text';
    secondaryLabel.textContent = 'Password';
    userSecondaryInput.placeholder = 'Minimum 8 characters';
    userSecondaryInput.type = 'password';
  } else {
    // parent, new_admission
    loginTitle.textContent = role === 'parent' ? 'Parent / Visitor Entry' : 'New Admission Entry';
    idLabel.textContent = 'Full Name';
    userIdInput.placeholder = 'Enter your full name';
    userIdInput.type = 'text';
    secondaryLabel.textContent = 'Purpose of Visit';
    userSecondaryInput.placeholder = 'E.g., Campus Tour, Enquiry';
    userSecondaryInput.type = 'text';
  }

  modal.classList.add('active');
}

function handleLoginSubmit(e) {
  e.preventDefault();
  
  const userIdInput = document.getElementById('userId');
  const userSecondaryInput = document.getElementById('userSecondary');
  const loginError = document.getElementById('loginError');
  
  const userId = userIdInput.value.trim();
  const userSecondary = userSecondaryInput.value.trim();

  if (!userId || !userSecondary) {
    showError('Please fill in all fields.');
    return;
  }

  // Validate limits
  if (currentSelectedRole === 'student') {
    // Exactly 8 digits
    const rollNumRegex = /^\d{8}$/;
    if (!rollNumRegex.test(userId)) {
      showError('Roll Number must be exactly 8 digits.');
      return;
    }
    if (userSecondary.length < 8) {
      showError('Password must be at least 8 characters long.');
      return;
    }
  } else if (currentSelectedRole === 'faculty' || currentSelectedRole === 'admin') {
    if (userSecondary.length < 8) {
      showError('Password must be at least 8 characters long.');
      return;
    }
  } else {
    // Visitor/Parent: just basic exists check done above (Name, Purpose).
  }

  // Store login info in Session Storage
  sessionStorage.setItem('userRole', currentSelectedRole);
  sessionStorage.setItem('userId', userId);
  
  // Close modal and redirect
  const modal = document.getElementById('loginModal');
  if(modal) modal.classList.remove('active');
  
  redirectToHome();
}

function showError(msg) {
  const loginError = document.getElementById('loginError');
  if (loginError) {
    loginError.textContent = msg;
    loginError.style.display = 'block';
  } else {
    alert(msg);
  }
}

function redirectToHome() {
  const role = sessionStorage.getItem('userRole');
  if (role === 'admin') {
    window.location.href = 'dashboard.html';
  } else {
    window.location.href = 'index.html';
  }
}
