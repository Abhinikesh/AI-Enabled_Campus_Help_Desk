import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Navbar from '../../components/Navbar/Navbar';
import { 
  CheckCircle, 
  Calendar, 
  CreditCard, 
  AlertCircle, 
  ChevronRight,
  BookOpen,
  FolderDot,
  MessageSquare,
  Map,
  FileWarning,
  GraduationCap
} from 'lucide-react';
import './Student.css';

const StudentDashboard = () => {
  const { user } = useAuth() || { user: { name: 'Arjun', role: 'student' } };
  const studentName = user?.name || 'Arjun';

  return (
    <div className="dashboard-layout">
      <Navbar />
      
      <main className="dashboard-content">
        {/* SUBSECTION A: HERO WELCOME BANNER */}
        <section className="hero-banner">
          <div className="hero-content">
            <p className="hero-greeting">Welcome back 👋</p>
            <h1 className="hero-title">Good Morning, {studentName}!</h1>
            <p className="hero-subtitle">Here's your campus update for today.</p>
            
            <div className="hero-actions">
              <Link to="/student/ai-help" className="btn btn-primary">Ask Campus AI</Link>
              <Link to="/student/attendance" className="btn btn-outline">View Attendance</Link>
            </div>
          </div>
          <div className="hero-image-container">
            {/* 🖼️ REPLACE: Put image named 'student-hero.jpg' in /client/public/assets/images/ */}
            <img 
              src={`/assets/images/student-hero.jpg`} 
              alt="Student studying" 
              className="hero-image"
              onError={(e) => {
                e.target.style.display = 'none'; // Hide if missing during dev
              }}
            />
          </div>
        </section>

        {/* SUBSECTION B: QUICK STATS ROW */}
        <section className="stats-grid">
          {/* Card 1 */}
          <div className="stat-card stat-attendance">
            <div className="stat-header">
              <span className="stat-label">Overall Attendance</span>
              <CheckCircle size={32} color="#22c55e" />
            </div>
            <div className="stat-value">78%</div>
            {/* Example condition for warning */}
            {/* <p className="stat-warning">⚠ Below required 75%</p> */}
          </div>

          {/* Card 2 */}
          <div className="stat-card stat-exam">
            <div className="stat-header">
              <span className="stat-label">Next Exam — Apr 12</span>
              <Calendar size={32} color="#3b82f6" />
            </div>
            <div className="stat-value">Data Structures</div>
          </div>

          {/* Card 3 */}
          <div className="stat-card stat-fee">
            <div className="stat-header">
              <span className="stat-label">Fee Due</span>
              <CreditCard size={32} color="#f59e0b" />
            </div>
            <div className="stat-value-row">
              <div className="stat-value">₹40,000</div>
              <Link to="#" className="btn-small-link">Pay Now</Link>
            </div>
          </div>

          {/* Card 4 */}
          <div className="stat-card stat-complaints">
            <div className="stat-header">
              <span className="stat-label">Complaints Pending</span>
              <AlertCircle size={32} color="#ef4444" />
            </div>
            <div className="stat-value">2</div>
          </div>
        </section>

        {/* SUBSECTION C: ATTENDANCE PREVIEW */}
        <section className="attendance-preview-section">
          <div className="section-header">
            <h2>Attendance Overview</h2>
            <Link to="/student/attendance" className="view-all-link">View All →</Link>
          </div>
          
          <div className="subject-cards-row">
            {/* Data Structures */}
            <div className="subject-card">
              <div className="subject-info">
                <h3 className="subject-name">Data Structures</h3>
                <span className="subject-code">CS201</span>
              </div>
              <div className="progress-ring-container">
                <svg className="progress-ring" viewBox="0 0 100 100">
                  <circle className="ring-bg" cx="50" cy="50" r="40" />
                  <circle className="ring-progress green-ring" cx="50" cy="50" r="40" strokeDasharray="251.2" strokeDashoffset={251.2 * (1 - 84/100)} />
                  <text x="50" y="55" className="ring-text">84%</text>
                </svg>
                <div className="attendance-ratio">Attended: 42 / Total: 50</div>
              </div>
            </div>

            {/* Database Management */}
            <div className="subject-card">
              <div className="subject-info">
                <h3 className="subject-name">Database Management</h3>
                <span className="subject-code">CS203</span>
              </div>
              <div className="progress-ring-container">
                <svg className="progress-ring" viewBox="0 0 100 100">
                  <circle className="ring-bg" cx="50" cy="50" r="40" />
                  <circle className="ring-progress green-ring" cx="50" cy="50" r="40" strokeDasharray="251.2" strokeDashoffset={251.2 * (1 - 76/100)} />
                  <text x="50" y="55" className="ring-text">76%</text>
                </svg>
                <div className="attendance-ratio">Attended: 38 / Total: 50</div>
              </div>
            </div>

            {/* Web Development */}
            <div className="subject-card">
              <div className="subject-info">
                <h3 className="subject-name">Web Development</h3>
                <span className="subject-code">CS205</span>
              </div>
              <div className="progress-ring-container">
                <svg className="progress-ring" viewBox="0 0 100 100">
                  <circle className="ring-bg" cx="50" cy="50" r="40" />
                  <circle className="ring-progress green-ring" cx="50" cy="50" r="40" strokeDasharray="251.2" strokeDashoffset={251.2 * (1 - 90/100)} />
                  <text x="50" y="55" className="ring-text">90%</text>
                </svg>
                <div className="attendance-ratio">Attended: 45 / Total: 50</div>
              </div>
            </div>

            {/* Computer Networks */}
            <div className="subject-card">
              <div className="subject-info">
                <h3 className="subject-name">Computer Networks</h3>
                <span className="subject-code">CS207</span>
              </div>
              <div className="progress-ring-container">
                <svg className="progress-ring" viewBox="0 0 100 100">
                  <circle className="ring-bg" cx="50" cy="50" r="40" />
                  <circle className="ring-progress red-ring" cx="50" cy="50" r="40" strokeDasharray="251.2" strokeDashoffset={251.2 * (1 - 56/100)} />
                  <text x="50" y="55" className="ring-text">56%</text>
                </svg>
                <div className="attendance-ratio warning-text">Attended: 28 / Total: 50</div>
              </div>
            </div>

            {/* Operating Systems */}
            <div className="subject-card">
              <div className="subject-info">
                <h3 className="subject-name">Operating Systems</h3>
                <span className="subject-code">CS209</span>
              </div>
              <div className="progress-ring-container">
                <svg className="progress-ring" viewBox="0 0 100 100">
                  <circle className="ring-bg" cx="50" cy="50" r="40" />
                  <circle className="ring-progress green-ring" cx="50" cy="50" r="40" strokeDasharray="251.2" strokeDashoffset={251.2 * (1 - 80/100)} />
                  <text x="50" y="55" className="ring-text">80%</text>
                </svg>
                <div className="attendance-ratio">Attended: 40 / Total: 50</div>
              </div>
            </div>
          </div>
        </section>

        {/* SUBSECTION D: RECENT RESULTS */}
        <section className="recent-results-section">
          <div className="section-header">
            <h2>Recent Results</h2>
            <Link to="/student/results" className="view-all-link">View All →</Link>
          </div>
          
          <div className="table-card">
            <div className="table-wrapper">
              <table className="results-table">
                <thead>
                  <tr>
                    <th>Subject</th>
                    <th>Code</th>
                    <th>Marks</th>
                    <th>Max</th>
                    <th>Grade</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Data Structures</td>
                    <td>CS201</td>
                    <td className="fw-bold">88</td>
                    <td>100</td>
                    <td><span className="grade-pill grade-aplus">A+</span></td>
                    <td>Pass</td>
                  </tr>
                  <tr>
                    <td>Database Mgmt</td>
                    <td>CS203</td>
                    <td className="fw-bold">74</td>
                    <td>100</td>
                    <td><span className="grade-pill grade-b">B</span></td>
                    <td>Pass</td>
                  </tr>
                  <tr>
                    <td>Web Development</td>
                    <td>CS205</td>
                    <td className="fw-bold">91</td>
                    <td>100</td>
                    <td><span className="grade-pill grade-aplus">A+</span></td>
                    <td>Pass</td>
                  </tr>
                  <tr>
                    <td>Computer Networks</td>
                    <td>CS207</td>
                    <td className="fw-bold">52</td>
                    <td>100</td>
                    <td><span className="grade-pill grade-c">C</span></td>
                    <td>Pass</td>
                  </tr>
                  <tr>
                    <td>Operating Systems</td>
                    <td>CS209</td>
                    <td className="fw-bold">79</td>
                    <td>100</td>
                    <td><span className="grade-pill grade-a">A</span></td>
                    <td>Pass</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* SUBSECTION E: ANNOUNCEMENTS + QUICK LINKS */}
        <section className="two-col-layout">
          {/* Announcements */}
          <div className="announcements-col">
            <div className="panel-card">
              <h2>📢 Announcements</h2>
              <div className="announcement-list">
                
                <div className="announcement-item">
                  <div className="announcement-top">
                    <h3 className="announcement-title">Mid-Semester Exams Begin</h3>
                    <span className="announcement-date">Apr 12, 2026</span>
                  </div>
                  <p className="announcement-body">Exams start from April 12. Check timetable on portal.</p>
                </div>

                <div className="divider"></div>

                <div className="announcement-item">
                  <div className="announcement-top">
                    <h3 className="announcement-title">Fee Payment Reminder</h3>
                    <span className="announcement-date">Apr 5, 2026</span>
                  </div>
                  <p className="announcement-body">Last date for fee payment is April 20, 2026.</p>
                </div>

                <div className="divider"></div>

                <div className="announcement-item">
                  <div className="announcement-top">
                    <h3 className="announcement-title">Hackathon 2026 Registration</h3>
                    <span className="announcement-date">Apr 1, 2026</span>
                  </div>
                  <p className="announcement-body">Register now for the annual campus hackathon.</p>
                </div>

              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="quicklinks-col">
            <div className="panel-card">
              <h2>⚡ Quick Links</h2>
              <div className="quicklinks-list">
                <Link to="/student/exams" className="quicklink-btn">
                  <div className="ql-left"><Calendar className="ql-icon" size={20} /> My Timetable</div>
                  <ChevronRight size={18} className="ql-chevron" />
                </Link>
                <Link to="/student/drive" className="quicklink-btn">
                  <div className="ql-left"><FolderDot className="ql-icon" size={20} /> Academic Drive</div>
                  <ChevronRight size={18} className="ql-chevron" />
                </Link>
                <Link to="/student/ai-help" className="quicklink-btn">
                  <div className="ql-left"><MessageSquare className="ql-icon" size={20} /> AI Help Desk</div>
                  <ChevronRight size={18} className="ql-chevron" />
                </Link>
                <Link to="/student/virtual-tour" className="quicklink-btn">
                  <div className="ql-left"><Map className="ql-icon" size={20} /> Virtual Tour</div>
                  <ChevronRight size={18} className="ql-chevron" />
                </Link>
                <Link to="/student/complaints" className="quicklink-btn">
                  <div className="ql-left"><FileWarning className="ql-icon" size={20} /> Raise Complaint</div>
                  <ChevronRight size={18} className="ql-chevron" />
                </Link>
                <Link to="/student/results" className="quicklink-btn">
                  <div className="ql-left"><GraduationCap className="ql-icon" size={20} /> Results</div>
                  <ChevronRight size={18} className="ql-chevron" />
                </Link>
              </div>
            </div>
          </div>
        </section>

      </main>
    </div>
  );
};

export default StudentDashboard;
