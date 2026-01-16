// Attendance page functionality

document.addEventListener('DOMContentLoaded', function() {
  loadAttendancePage();
});

function loadAttendancePage() {
  const attendanceGrid = document.getElementById('attendanceGrid');
  if (!attendanceGrid) return;

  const attendance = campusData.attendance.student || [];
  attendanceGrid.innerHTML = '';

  attendance.forEach(item => {
    const card = document.createElement('div');
    card.className = 'attendance-card';
    
    let statusColor = '#ef4444';
    let statusClass = 'low';
    if (item.percentage >= 75) {
      statusColor = '#10b981';
      statusClass = 'good';
    } else if (item.percentage >= 60) {
      statusColor = '#f59e0b';
      statusClass = 'warning';
    }

    card.innerHTML = `
      <div class="attendance-card-header">
        <h3>${item.subjectName}</h3>
        <span class="subject-code">${item.subjectCode}</span>
      </div>
      <div class="attendance-stats">
        <div class="attendance-chart-container">
          <canvas class="attendance-chart" width="120" height="120" data-percentage="${item.percentage}" data-color="${statusColor}"></canvas>
        </div>
        <div class="attendance-details">
          <div class="attendance-percentage-large ${statusClass}">${item.percentage}%</div>
          <p><span>Attended:</span> ${item.classesAttended} / ${item.totalClasses}</p>
          <p><span>Remaining:</span> ${item.totalClasses - item.classesAttended}</p>
        </div>
      </div>
    `;
    attendanceGrid.appendChild(card);
  });

  setTimeout(() => {
    initializeAttendanceCharts();
  }, 100);
}

function initializeAttendanceCharts() {
  const charts = document.querySelectorAll('.attendance-chart');
  charts.forEach(canvas => {
    const percentage = parseInt(canvas.dataset.percentage);
    const color = canvas.dataset.color;
    
    new Chart(canvas, {
      type: 'doughnut',
      data: {
        datasets: [{
          data: [percentage, 100 - percentage],
          backgroundColor: [color, 'var(--bg-tertiary)'],
          borderWidth: 0
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: true,
        cutout: '75%',
        plugins: {
          legend: { display: false },
          tooltip: { enabled: false }
        }
      }
    });
  });
}
