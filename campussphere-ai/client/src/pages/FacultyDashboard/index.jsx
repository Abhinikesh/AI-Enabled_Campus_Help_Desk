import React, { useState } from 'react';
import Navbar from '../../components/Navbar/Navbar';
import { useAuth } from '../../context/AuthContext';
import { BookOpen, Users, ClipboardList, Megaphone, Trash2 } from 'lucide-react';
import './Faculty.css';

const FacultyDashboard = () => {
  const { user } = useAuth() || { user: { name: 'Priya', role: 'faculty' } };
  const facultyName = user?.name || 'Priya';
  const [announcement, setAnnouncement] = useState('');

  return (
    <div className="faculty-layout">
      <Navbar />
      
      <main className="faculty-content">
        {/* HERO WELCOME BANNER */}
        <section className="faculty-hero">
          <div className="f-hero-left">
            <p className="f-hero-greeting">Welcome back 👋</p>
            <h1 className="f-hero-title">Good Morning, Dr. {facultyName}!</h1>
            <p className="f-hero-subtitle">Department of Computer Science</p>
            
            <div className="f-hero-actions">
              <button className="btn btn-purple">Open AI Help Desk</button>
              <button className="btn btn-outline-purple">View Timetable</button>
            </div>
          </div>
          <div className="f-hero-right">
            {/* 🖼️ REPLACE: put 'faculty-hero.jpg' in client/public/assets/images/ */}
            <div className="image-fallback f-fallback">
              <span className="fallback-emoji">👨‍🏫</span>
              <span className="fallback-text">Faculty</span>
            </div>
            <img 
              src={`/assets/images/faculty-hero.jpg`} 
              alt="Faculty" 
              className="f-hero-img"
              onError={(e) => {
                e.target.style.display = 'none';
                e.target.previousSibling.style.display = 'flex';
              }}
            />
          </div>
        </section>

        {/* QUICK STATS ROW */}
        <section className="f-stats-grid">
          <div className="f-stat-card stat-classes">
            <div className="f-stat-top">
              <span className="f-stat-label">Classes Today</span>
              <BookOpen size={32} color="#8b5cf6" />
            </div>
            <div className="f-stat-val">6</div>
          </div>
          <div className="f-stat-card stat-students">
            <div className="f-stat-top">
              <span className="f-stat-label">Total Students</span>
              <Users size={32} color="#3b82f6" />
            </div>
            <div className="f-stat-val">240</div>
          </div>
          <div className="f-stat-card stat-complaints">
            <div className="f-stat-top">
              <span className="f-stat-label">Complaints to Review</span>
              <ClipboardList size={32} color="#f59e0b" />
            </div>
            <div className="f-stat-val">3</div>
          </div>
          <div className="f-stat-card stat-announcements">
            <div className="f-stat-top">
              <span className="f-stat-label">Posted This Week</span>
              <Megaphone size={32} color="#22c55e" />
            </div>
            <div className="f-stat-val">2</div>
          </div>
        </section>

        {/* TODAY'S TIMETABLE */}
        <section className="f-timetable-section">
          <h2 className="section-title">Today's Schedule</h2>
          <div className="f-table-card">
            <div className="table-wrapper">
              <table className="f-table">
                <thead>
                  <tr>
                    <th>Time</th>
                    <th>Subject</th>
                    <th>Code</th>
                    <th>Room</th>
                    <th>Students</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>9:00 AM</td>
                    <td className="fw-bold">Data Structures</td>
                    <td><span className="code-badge">CS201</span></td>
                    <td>Room 204</td>
                    <td>60</td>
                    <td><button className="btn-pill-blue">Mark Attendance</button></td>
                  </tr>
                  <tr className="current-row">
                    <td>11:00 AM</td>
                    <td className="fw-bold">Algorithm Design</td>
                    <td><span className="code-badge">CS301</span></td>
                    <td>Room 301</td>
                    <td>55</td>
                    <td><button className="btn-pill-blue">Mark Attendance</button></td>
                  </tr>
                  <tr>
                    <td>2:00 PM</td>
                    <td className="fw-bold">Database Mgmt</td>
                    <td><span className="code-badge">CS203</span></td>
                    <td>Room 105</td>
                    <td>62</td>
                    <td><button className="btn-pill-blue">Mark Attendance</button></td>
                  </tr>
                  <tr>
                    <td>4:00 PM</td>
                    <td className="fw-bold">Project Guidance</td>
                    <td><span className="code-badge">CS401</span></td>
                    <td>Lab 3</td>
                    <td>20</td>
                    <td><button className="btn-pill-blue">Mark Attendance</button></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* TWO COLUMN SECTION */}
        <section className="f-two-col">
          {/* My Subjects */}
          <div className="f-col-left">
            <h2 className="section-title">My Subjects</h2>
            <div className="f-subjects-list">
              <div className="f-subject-card">
                <div className="f-sub-info">
                  <span className="fw-bold fs-16">Data Structures</span>
                  <span className="code-badge">CS201</span>
                </div>
                <div className="f-sub-stats">
                  <span>60 students</span>
                  <span className="f-divider">|</span>
                  <span>82% avg attendance</span>
                </div>
              </div>
              <div className="f-subject-card">
                <div className="f-sub-info">
                  <span className="fw-bold fs-16">Algorithm Design</span>
                  <span className="code-badge">CS301</span>
                </div>
                <div className="f-sub-stats">
                  <span>55 students</span>
                  <span className="f-divider">|</span>
                  <span>78% avg attendance</span>
                </div>
              </div>
              <div className="f-subject-card">
                <div className="f-sub-info">
                  <span className="fw-bold fs-16">Database Mgmt</span>
                  <span className="code-badge">CS203</span>
                </div>
                <div className="f-sub-stats">
                  <span>62 students</span>
                  <span className="f-divider">|</span>
                  <span>74% avg attendance</span>
                </div>
              </div>
              <div className="f-subject-card">
                <div className="f-sub-info">
                  <span className="fw-bold fs-16">Project Guidance</span>
                  <span className="code-badge">CS401</span>
                </div>
                <div className="f-sub-stats">
                  <span>20 students</span>
                  <span className="f-divider">|</span>
                  <span>91% avg attendance</span>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Complaints */}
          <div className="f-col-right">
            <h2 className="section-title">Recent Complaints</h2>
            <div className="f-complaints-list">
              <div className="f-complaint-card">
                <div className="f-comp-top">
                  <span className="fw-bold">Ravi Kumar</span>
                  <span className="f-comp-date">Apr 5</span>
                </div>
                <p className="f-comp-title">"Library access issue"</p>
                <div className="f-comp-status status-red">Pending</div>
              </div>
              <div className="f-complaint-card">
                <div className="f-comp-top">
                  <span className="fw-bold">Sneha Rao</span>
                  <span className="f-comp-date">Apr 3</span>
                </div>
                <p className="f-comp-title">"Lab equipment broken"</p>
                <div className="f-comp-status status-gold">In Progress</div>
              </div>
              <div className="f-complaint-card">
                <div className="f-comp-top">
                  <span className="fw-bold">Amit Singh</span>
                  <span className="f-comp-date">Apr 1</span>
                </div>
                <p className="f-comp-title">"Timetable clash"</p>
                <div className="f-comp-status status-green">Resolved</div>
              </div>
            </div>
          </div>
        </section>

        {/* ANNOUNCEMENTS PANEL */}
        <section className="f-announcements-section">
          <div className="f-panel-card">
            <h2 className="section-title">Post Announcement</h2>
            
            <div className="f-announce-form">
              <input 
                type="text" 
                placeholder="Write announcement..." 
                className="f-input"
                value={announcement}
                onChange={(e) => setAnnouncement(e.target.value)}
              />
              <select className="f-select">
                <option>All Students</option>
                <option>CS Branch</option>
                <option>Exam Notice</option>
              </select>
              <button className="btn btn-primary">Post</button>
            </div>

            <div className="f-announce-history">
              <div className="f-history-item">
                <div className="f-hist-content">
                  <span className="f-hist-date">Apr 6, 2026</span>
                  <p className="f-hist-text">Tomorrow's CS301 lab is shifted to Lab 4.</p>
                </div>
                <button className="f-hist-del"><Trash2 size={16} /></button>
              </div>
              <div className="f-history-item">
                <div className="f-hist-content">
                  <span className="f-hist-date">Apr 4, 2026</span>
                  <p className="f-hist-text">Submit project abstracts by coming Friday.</p>
                </div>
                <button className="f-hist-del"><Trash2 size={16} /></button>
              </div>
              <div className="f-history-item">
                <div className="f-hist-content">
                  <span className="f-hist-date">Apr 2, 2026</span>
                  <p className="f-hist-text">Extra class for CS201 on weekend is cancelled.</p>
                </div>
                <button className="f-hist-del"><Trash2 size={16} /></button>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default FacultyDashboard;
