// Exam Schedule page functionality

document.addEventListener('DOMContentLoaded', function() {
  loadExamsPage();
});

function loadExamsPage() {
  const examsGrid = document.getElementById('examsGrid');
  if (!examsGrid) return;

  const exams = campusData.examSchedule.student || [];
  const today = new Date().toISOString().split('T')[0];
  
  examsGrid.innerHTML = '';

  exams.forEach(exam => {
    const card = document.createElement('div');
    card.className = 'exam-card';
    
    let status = 'upcoming';
    if (exam.examDate === today) {
      status = 'today';
    } else if (exam.examDate < today) {
      status = 'past';
    }

    card.classList.add(status);

    const examDate = new Date(exam.examDate);
    const formattedDate = examDate.toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });

    card.innerHTML = `
      <div class="exam-status-badge">${status === 'today' ? 'Today' : status === 'past' ? 'Past' : 'Upcoming'}</div>
      <div class="exam-header">
        <h3>${exam.subjectName}</h3>
        <span class="subject-code">${exam.subjectCode}</span>
      </div>
      <div class="exam-details">
        <p><i class="fas fa-calendar"></i> <strong>Date:</strong> ${formattedDate}</p>
        <p><i class="fas fa-clock"></i> <strong>Time:</strong> ${exam.time}</p>
        <p><i class="fas fa-door-open"></i> <strong>Room:</strong> ${exam.room}</p>
      </div>
    `;
    examsGrid.appendChild(card);
  });
}
