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

  // Total queries
  const totalQueriesEl = document.getElementById('totalQueries');
  if (totalQueriesEl) {
    animateValue(totalQueriesEl, 0, analytics.totalQueries, 1000);
  }

  // Most used agent
  const mostUsedAgentEl = document.getElementById('mostUsedAgent');
  if (mostUsedAgentEl) {
    mostUsedAgentEl.textContent = analytics.mostUsedAgent;
  }

  // Active complaints
  const activeComplaintsEl = document.getElementById('activeComplaints');
  if (activeComplaintsEl) {
    const activeCount = campusData.complaints.filter(c => c.status !== 'Resolved').length;
    animateValue(activeComplaintsEl, 0, activeCount, 1000);
  }

  // Resolution rate
  const resolutionRateEl = document.getElementById('resolutionRate');
  if (resolutionRateEl) {
    const total = campusData.complaints.length;
    const resolved = campusData.complaints.filter(c => c.status === 'Resolved').length;
    const rate = total > 0 ? Math.round((resolved / total) * 100) : 0;
    animateValue(resolutionRateEl, 0, rate, 1000, '%');
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

  const recentComplaints = campusData.analytics.recentComplaints;
  tableBody.innerHTML = '';

  recentComplaints.forEach(complaint => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td><strong>${complaint.id}</strong></td>
      <td>${complaint.category}</td>
      <td><span class="status-badge status-${complaint.status.toLowerCase().replace(' ', '-')}">${complaint.status}</span></td>
      <td>${complaint.date}</td>
      <td><span class="priority-${complaint.priority.toLowerCase()}">${complaint.priority}</span></td>
    `;
    tableBody.appendChild(row);
  });
}

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
