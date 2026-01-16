// Role Selection and Login

document.addEventListener('DOMContentLoaded', function() {
  // Check if role already selected
  const savedRole = localStorage.getItem('userRole');
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
});

function handleRoleSelection(role) {
  // Store role
  localStorage.setItem('userRole', role);

  // Check if login required
  if (role === 'student' || role === 'faculty') {
    showLoginModal(role);
  } else {
    // No login required for parent, new-admission, admin
    redirectToHome();
  }
}

function showLoginModal(role) {
  const modal = document.getElementById('loginModal');
  const loginTitle = document.getElementById('loginTitle');
  const idLabel = document.getElementById('idLabel');
  const classLabel = document.getElementById('classLabel');
  const userIdInput = document.getElementById('userId');
  const loginForm = document.getElementById('loginForm');

  if (!modal) return;

  // Update labels based on role
  if (role === 'student') {
    loginTitle.textContent = 'Student Login';
    idLabel.textContent = 'Roll Number';
    userIdInput.placeholder = 'Enter your roll number';
    classLabel.textContent = 'Class';
  } else if (role === 'faculty') {
    loginTitle.textContent = 'Faculty Login';
    idLabel.textContent = 'Employee ID';
    userIdInput.placeholder = 'Enter your employee ID';
    classLabel.textContent = 'Department';
  }

  modal.classList.add('active');

  // Handle form submission
  loginForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const userId = userIdInput.value.trim();
    const userClass = document.getElementById('userClass').value.trim();

    if (!userId || !userClass) {
      alert('Please fill in all fields');
      return;
    }

    // Store login info
    localStorage.setItem('userId', userId);
    localStorage.setItem('userClass', userClass);

    // Close modal and redirect
    modal.classList.remove('active');
    redirectToHome();
  });
}

function redirectToHome() {
  window.location.href = 'index.html';
}
