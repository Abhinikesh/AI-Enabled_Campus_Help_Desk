// Exam Results page functionality

document.addEventListener('DOMContentLoaded', function() {
  loadResultsPage();
});

function loadResultsPage() {
  const resultsGrid = document.getElementById('resultsGrid');
  if (!resultsGrid) return;

  const results = campusData.examResults.student || [];
  resultsGrid.innerHTML = '';

  results.forEach((result, index) => {
    const card = document.createElement('div');
    card.className = 'result-card';
    card.style.animationDelay = `${index * 0.1}s`;
    
    const gradeColor = getGradeColor(result.grade);
    const statusClass = result.status === 'Pass' ? 'pass' : 'fail';

    card.innerHTML = `
      <div class="result-header">
        <h3>${result.subjectName}</h3>
        <span class="subject-code">${result.subjectCode}</span>
      </div>
      <div class="result-grade-large" style="color: ${gradeColor}">
        ${result.grade}
      </div>
      <div class="result-scores">
        <div class="score-item">
          <span class="score-label">Internal</span>
          <span class="score-value">${result.internalMarks}/30</span>
        </div>
        <div class="score-item">
          <span class="score-label">External</span>
          <span class="score-value">${result.externalMarks}/70</span>
        </div>
        <div class="score-item total">
          <span class="score-label">Total</span>
          <span class="score-value">${result.total}/100</span>
        </div>
      </div>
      <div class="result-status ${statusClass}">
        <i class="fas fa-${statusClass === 'pass' ? 'check-circle' : 'times-circle'}"></i>
        ${result.status}
      </div>
    `;
    resultsGrid.appendChild(card);
  });
}

function getGradeColor(grade) {
  const colors = {
    'A+': '#10b981',
    'A': '#22c55e',
    'B': '#3b82f6',
    'C': '#f59e0b',
    'D': '#ef4444',
    'F': '#dc2626'
  };
  return colors[grade] || '#6b7280';
}
