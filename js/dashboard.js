// Dashboard functionality with Chart.js

let dailyQueriesChart = null;
let issueCategoriesChart = null;

document.addEventListener('DOMContentLoaded', function() {
  initializeDashboard();
});

function initializeDashboard() {
  // Load stats
  loadStats();

  // Initialize charts
  initializeCharts();

  // Load complaints table
  loadComplaintsTable();
}

function loadStats() {
  const analytics = campusData.analytics;

  // Total Students
  const totalStudentsEl = document.getElementById('totalStudents');
  if (totalStudentsEl) {
    animateValue(totalStudentsEl, 0, 4500, 1000); // Dummy data
  }

  // Total Teachers
  const totalTeachersEl = document.getElementById('totalTeachers');
  if (totalTeachersEl) {
    animateValue(totalTeachersEl, 0, 350, 1000); // Dummy data
  }

  // Active complaints
  const activeComplaintsEl = document.getElementById('activeComplaints');
  if (activeComplaintsEl) {
    const activeCount = campusData.complaints.filter(c => c.status !== 'Resolved').length;
    animateValue(activeComplaintsEl, 0, activeCount, 1000);
  }

  // Total complaints
  const totalComplaintsEl = document.getElementById('totalComplaints');
  if (totalComplaintsEl) {
    animateValue(totalComplaintsEl, 0, campusData.complaints.length, 1000);
  }
}

function initializeCharts() {
  // Daily Queries Line Chart
  const dailyQueriesCtx = document.getElementById('dailyQueriesChart');
  if (dailyQueriesCtx) {
    const data = campusData.analytics.dailyQueries;
    dailyQueriesChart = new Chart(dailyQueriesCtx, {
      type: 'line',
      data: {
        labels: data.map(d => d.day),
        datasets: [{
          label: 'Daily Queries',
          data: data.map(d => d.count),
          borderColor: '#4f46e5',
          backgroundColor: 'rgba(79, 70, 229, 0.1)',
          borderWidth: 3,
          fill: true,
          tension: 0.4,
          pointRadius: 5,
          pointHoverRadius: 7,
          pointBackgroundColor: '#4f46e5',
          pointBorderColor: '#ffffff',
          pointBorderWidth: 2
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            grid: {
              color: 'rgba(255, 255, 255, 0.05)'
            },
            ticks: {
              color: '#cbd5e1'
            }
          },
          x: {
            grid: {
              display: false
            },
            ticks: {
              color: '#cbd5e1'
            }
          }
        }
      }
    });
  }

  // Issue Categories Bar Chart
  const issueCategoriesCtx = document.getElementById('issueCategoriesChart');
  if (issueCategoriesCtx) {
    const data = campusData.analytics.issueCategories;
    issueCategoriesChart = new Chart(issueCategoriesCtx, {
      type: 'bar',
      data: {
        labels: data.map(d => d.category),
        datasets: [{
          label: 'Complaints',
          data: data.map(d => d.count),
          backgroundColor: [
            '#4f46e5',
            '#6366f1',
            '#818cf8',
            '#a5b4fc',
            '#c7d2fe'
          ],
          borderRadius: 8,
          borderSkipped: false
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            grid: {
              color: 'rgba(255, 255, 255, 0.05)'
            },
            ticks: {
              color: '#cbd5e1'
            }
          },
          x: {
            grid: {
              display: false
            },
            ticks: {
              color: '#cbd5e1'
            }
          }
        }
      }
    });
  }
}

function loadComplaintsTable() {
  const tableBody = document.getElementById('complaintsTableBody');
  if (!tableBody) return;

  tableBody.innerHTML = '';

  campusData.complaints.forEach((complaint, index) => {
    const row = document.createElement('tr');
    
    // Add dummy student names if not present
    const names = ['Rahul Sharma', 'Priya Patel', 'Amit Kumar', 'Sneha Gupta', 'Rohan Singh'];
    const studentName = complaint.studentName || names[index % names.length];
    
    const statusClasses = {
      'Open': 'status-open',
      'In Progress': 'status-in-progress',
      'Resolved': 'status-resolved',
      'Pending': 'status-pending'
    };
    
    // Convert to target state mapping
    const isResolved = complaint.status === 'Resolved';
    const statusClass = isResolved ? 'status-resolved' : 'status-pending';
    const displayStatus = isResolved ? 'Resolved' : 'Pending';

    row.innerHTML = `
      <td><strong>${complaint.id}</strong></td>
      <td>${studentName}</td>
      <td>${complaint.category}</td>
      <td><span class="status-badge ${statusClass}" id="badge-${index}">${displayStatus}</span></td>
      <td>
        <button class="btn btn-secondary" onclick="toggleComplaintStatus(${index}, this)" style="padding: 0.25rem 0.75rem; font-size: 0.75rem;">
          ${isResolved ? 'Re-open' : 'Resolve'}
        </button>
      </td>
    `;
    tableBody.appendChild(row);
  });
  
  loadActivityFeed();
}

// Global action handler
window.toggleComplaintStatus = function(index, btn) {
  const complaint = campusData.complaints[index];
  const isResolved = complaint.status === 'Resolved';
  
  // Toggle
  complaint.status = isResolved ? 'Pending' : 'Resolved';
  
  // Update badge immediately
  const badgeId = `badge-${index}`;
  const badge = document.getElementById(badgeId);
  if (badge) {
    badge.textContent = complaint.status;
    badge.className = `status-badge ${complaint.status === 'Resolved' ? 'status-resolved' : 'status-pending'}`;
  }
  
  // Update button text
  btn.textContent = complaint.status === 'Resolved' ? 'Re-open' : 'Resolve';
  
  // Refresh stats
  loadStats();
};

function loadActivityFeed() {
  const feed = document.getElementById('activityFeedList');
  if (!feed) return;
  
  const activities = [
    { text: "Admin User resolved complaint TKT-004", time: "10 mins ago" },
    { text: "New admission query registered by guest", time: "1 hour ago" },
    { text: "Student Amit Kumar uploaded document to Drive", time: "2 hours ago" },
    { text: "Faculty member processed attendance for CS-101", time: "4 hours ago" },
    { text: "Daily backup completed successfully", time: "5 hours ago" }
  ];
  
  feed.innerHTML = activities.map(act => `
    <div style="padding: 1rem; background: rgba(255,255,255,0.05); border-radius: var(--radius-lg); border-left: 3px solid var(--primary-color);">
      <p style="color: var(--text-primary); margin-bottom: 0.25rem;">${act.text}</p>
      <small style="color: var(--text-muted);">${act.time}</small>
    </div>
  `).join('');
}

window.exportData = function() {
  alert("Initiating report export. The CSV will download shortly.");
};

// Animate number value
function animateValue(element, start, end, duration, suffix = '') {
  const range = end - start;
  const increment = end > start ? 1 : -1;
  const stepTime = Math.abs(Math.floor(duration / range));
  let current = start;

  const timer = setInterval(() => {
    current += increment;
    element.textContent = current + suffix;
    if (current === end) {
      clearInterval(timer);
    }
  }, stepTime);
}
