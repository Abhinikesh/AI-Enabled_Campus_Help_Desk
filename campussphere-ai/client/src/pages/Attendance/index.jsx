import React from 'react';
import Navbar from '../../components/Navbar/Navbar';
import './Attendance.css';

const Attendance = () => {
  return (
    <div className="attendance-layout">
      <Navbar />
      
      <main className="attendance-content">
        <div className="page-header">
          <h1 className="page-title">My Attendance</h1>
          <span className="semester-badge">Semester 4</span>
        </div>

        {/* Warning Banner */}
        {/* Active since overall is 78%, but let's say the user wanted it conditionally or we'll show a warning for below 75 */}
        <div className="warning-banner" style={{ display: 'none' }}>
          ⚠ Your attendance is below 75%. You may be barred from exams.
        </div>

        <div className="overall-attendance-card">
          <h2 className="overall-stat">Overall: 78%</h2>
        </div>

        <div className="attendance-grid">
          {/* Default Data Structures */}
          <div className="attendance-card">
            <div className="att-card-header">
              <h3 className="att-subject-name">Data Structures</h3>
              <span className="att-subject-code">CS201</span>
            </div>
            
            <div className="progress-ring-container-large">
              <svg className="progress-ring-large" viewBox="0 0 100 100">
                <circle className="ring-bg" cx="50" cy="50" r="40" />
                <circle className="ring-progress green-ring" cx="50" cy="50" r="40" strokeDasharray="251.2" strokeDashoffset={251.2 * (1 - 84/100)} />
                <text x="50" y="55" className="ring-text-large">84%</text>
              </svg>
            </div>
            
            <div className="att-stats">
              <p className="att-ratio">Attended: 42 / Total: 50</p>
              <p className="att-last-attended">Last attended: Apr 6, 2026</p>
            </div>
            
            <div className="att-trend trend-improving">
              ↑ Improving
            </div>
          </div>

          {/* Database Management */}
          <div className="attendance-card">
            <div className="att-card-header">
              <h3 className="att-subject-name">Database Management</h3>
              <span className="att-subject-code">CS203</span>
            </div>
            
            <div className="progress-ring-container-large">
              <svg className="progress-ring-large" viewBox="0 0 100 100">
                <circle className="ring-bg" cx="50" cy="50" r="40" />
                <circle className="ring-progress green-ring" cx="50" cy="50" r="40" strokeDasharray="251.2" strokeDashoffset={251.2 * (1 - 76/100)} />
                <text x="50" y="55" className="ring-text-large">76%</text>
              </svg>
            </div>
            
            <div className="att-stats">
              <p className="att-ratio">Attended: 38 / Total: 50</p>
              <p className="att-last-attended">Last attended: Apr 5, 2026</p>
            </div>
            
            <div className="att-trend trend-declining">
              ↓ Declining
            </div>
          </div>

          {/* Web Development */}
          <div className="attendance-card">
            <div className="att-card-header">
              <h3 className="att-subject-name">Web Development</h3>
              <span className="att-subject-code">CS205</span>
            </div>
            
            <div className="progress-ring-container-large">
              <svg className="progress-ring-large" viewBox="0 0 100 100">
                <circle className="ring-bg" cx="50" cy="50" r="40" />
                <circle className="ring-progress green-ring" cx="50" cy="50" r="40" strokeDasharray="251.2" strokeDashoffset={251.2 * (1 - 90/100)} />
                <text x="50" y="55" className="ring-text-large">90%</text>
              </svg>
            </div>
            
            <div className="att-stats">
              <p className="att-ratio">Attended: 45 / Total: 50</p>
              <p className="att-last-attended">Last attended: Apr 6, 2026</p>
            </div>
            
            <div className="att-trend trend-improving">
              ↑ Improving
            </div>
          </div>

          {/* Computer Networks */}
          <div className="attendance-card warning-card">
            <div className="att-card-header">
              <h3 className="att-subject-name">Computer Networks</h3>
              <span className="att-subject-code">CS207</span>
            </div>
            
            <div className="progress-ring-container-large">
              <svg className="progress-ring-large" viewBox="0 0 100 100">
                <circle className="ring-bg" cx="50" cy="50" r="40" />
                <circle className="ring-progress red-ring" cx="50" cy="50" r="40" strokeDasharray="251.2" strokeDashoffset={251.2 * (1 - 56/100)} />
                <text x="50" y="55" className="ring-text-large">56%</text>
              </svg>
            </div>
            
            <div className="att-stats">
              <p className="att-ratio text-red">Attended: 28 / Total: 50</p>
              <p className="att-last-attended">Last attended: Apr 2, 2026</p>
              <div className="att-classes-needed">You need 8 more classes to reach 75%</div>
            </div>
            
            <div className="att-trend trend-declining">
              ↓ Declining
            </div>
          </div>

          {/* Operating Systems */}
          <div className="attendance-card">
            <div className="att-card-header">
              <h3 className="att-subject-name">Operating Systems</h3>
              <span className="att-subject-code">CS209</span>
            </div>
            
            <div className="progress-ring-container-large">
              <svg className="progress-ring-large" viewBox="0 0 100 100">
                <circle className="ring-bg" cx="50" cy="50" r="40" />
                <circle className="ring-progress green-ring" cx="50" cy="50" r="40" strokeDasharray="251.2" strokeDashoffset={251.2 * (1 - 80/100)} />
                <text x="50" y="55" className="ring-text-large">80%</text>
              </svg>
            </div>
            
            <div className="att-stats">
              <p className="att-ratio">Attended: 40 / Total: 50</p>
              <p className="att-last-attended">Last attended: Apr 5, 2026</p>
            </div>
            
            <div className="att-trend trend-improving">
              ↑ Improving
            </div>
          </div>

        </div>
      </main>
    </div>
  );
};

export default Attendance;
