import React from 'react';
import Navbar from '../../components/Navbar/Navbar';
import { useAuth } from '../../context/AuthContext';
import { AlertTriangle, CheckCircle, CreditCard, Calendar, Phone, Mail } from 'lucide-react';
import './Parent.css';

const ParentDashboard = () => {
  const { user } = useAuth() || { user: { name: 'Ramesh Sharma', role: 'parent' } };
  const parentName = user?.name || 'Ramesh Sharma';

  return (
    <div className="parent-layout">
      <Navbar />
      
      <main className="parent-content">
        {/* HERO BANNER */}
        <section className="parent-hero">
          <div className="p-hero-left">
            <p className="p-hero-greeting">Welcome, {parentName} 👋</p>
            <h1 className="p-hero-title">Monitoring: Arjun Sharma</h1>
            <p className="p-hero-subtitle">Roll Number: 20240001 • B.Tech CSE</p>
            
            <div className="p-hero-actions">
              <button className="btn btn-primary">Ask Campus AI</button>
              <button className="btn btn-outline">Virtual Tour</button>
            </div>
          </div>
          <div className="p-hero-right">
            {/* 🖼️ REPLACE: put 'parent-hero.jpg' in client/public/assets/images/ */}
            <div className="image-fallback p-fallback">
              <span className="fallback-emoji">👨‍👧</span>
              <span className="fallback-text">Parent Portal</span>
            </div>
            <img 
              src={`/assets/images/parent-hero.jpg`} 
              alt="Parent" 
              className="p-hero-img"
              onError={(e) => {
                e.target.style.display = 'none';
                e.target.previousSibling.style.display = 'flex';
              }}
            />
          </div>
        </section>

        {/* CHILD STATS ROW */}
        <section className="p-stats-grid">
          <div className="p-stat-card">
            <div className="p-stat-header">
              <span className="p-stat-label">Overall Attendance</span>
              <AlertTriangle size={32} color="#f59e0b" />
            </div>
            <div className="p-stat-val">78%</div>
            <div className="p-stat-subtext text-gold">⚠ Below 80%</div>
          </div>
          <div className="p-stat-card">
            <div className="p-stat-header">
              <span className="p-stat-label">Current CGPA</span>
              <CheckCircle size={32} color="#22c55e" />
            </div>
            <div className="p-stat-val">8.4 / 10</div>
            <div className="p-stat-subtext text-green">✅ Good standing</div>
          </div>
          <div className="p-stat-card">
            <div className="p-stat-header">
              <span className="p-stat-label">Fee Due</span>
              <CreditCard size={32} color="#ef4444" />
            </div>
            <div className="p-stat-val">₹40,000</div>
            <div className="p-stat-subtext text-red">Due Apr 20</div>
          </div>
          <div className="p-stat-card">
            <div className="p-stat-header">
              <span className="p-stat-label">Upcoming Exam</span>
              <Calendar size={32} color="#3b82f6" />
            </div>
            <div className="p-stat-val">Apr 12</div>
            <div className="p-stat-subtext text-blue">Data Structures</div>
          </div>
        </section>

        {/* THREE COLUMN SECTION */}
        <section className="p-three-col">
          {/* Announcements */}
          <div className="p-col-card">
            <h2 className="section-title">Announcements</h2>
            <div className="p-announcements-list">
              <div className="p-announce-item">
                <div className="p-announce-top">
                  <span className="fw-bold fs-14">Parent-Teacher Meeting</span>
                  <span className="p-announce-date">Mar 25</span>
                </div>
                <p className="p-announce-body">Please join us for the mid-semester updates.</p>
              </div>
              <div className="p-divider"></div>
              <div className="p-announce-item">
                <div className="p-announce-top">
                  <span className="fw-bold fs-14">Fee Payment Reminder</span>
                  <span className="p-announce-date">Mar 20</span>
                </div>
                <p className="p-announce-body">Last date to clear dues without penalty.</p>
              </div>
              <div className="p-divider"></div>
              <div className="p-announce-item">
                <div className="p-announce-top">
                  <span className="fw-bold fs-14">Summer Break Notice</span>
                  <span className="p-announce-date">Apr 15</span>
                </div>
                <p className="p-announce-body">Campus will be closed for regular classes.</p>
              </div>
            </div>
          </div>

          {/* Academic Calendar */}
          <div className="p-col-card">
            <h2 className="section-title">Academic Calendar</h2>
            <div className="p-timeline-list">
              <div className="p-time-item">
                <span className="p-time-pill blue-pill">Apr 12</span>
                <span className="p-time-text">Mid-Semester Exams Begin</span>
              </div>
              <div className="p-time-item">
                <span className="p-time-pill green-pill">Apr 25</span>
                <span className="p-time-text">Parent-Teacher Meeting</span>
              </div>
              <div className="p-time-item">
                <span className="p-time-pill gold-pill">May 1</span>
                <span className="p-time-text">Holiday - Spring Break</span>
              </div>
              <div className="p-time-item">
                <span className="p-time-pill red-pill">May 15</span>
                <span className="p-time-text">Summer Break Starts</span>
              </div>
              <div className="p-time-item">
                <span className="p-time-pill green-pill">Jun 1</span>
                <span className="p-time-text">Classes Resume</span>
              </div>
            </div>
          </div>

          {/* Student Guidance */}
          <div className="p-col-card">
            <h2 className="section-title">Student Guidance</h2>
            <div className="p-guidance-list">
              <div className="p-guide-box">
                <div className="fw-bold fs-14 mb-2">Grading System</div>
                <p className="p-guide-text">A+(90-100), A(80-89), B(70-79), C(60-69), F(&lt;50)</p>
              </div>
              <div className="p-guide-box">
                <div className="fw-bold fs-14 mb-2">Attendance Policy</div>
                <p className="p-guide-text">Minimum 75% aggregate required for exams.</p>
              </div>
              <div className="p-guide-box">
                <div className="fw-bold fs-14 mb-2">Examination Rules</div>
                <p className="p-guide-text">Carry valid ID card, no mobile phones allowed.</p>
              </div>
            </div>
          </div>
        </section>

        {/* CONTACT SECTION */}
        <section className="p-contact-section">
          <h2 className="section-title">Campus Contact Directory</h2>
          <div className="p-contact-grid">
            <div className="p-contact-card">
              <div className="p-contact-icon-bg"><Phone size={24} color="#3b82f6" /></div>
              <div className="p-contact-info">
                <h3 className="p-contact-dept">Academic Office</h3>
                <p className="p-contact-detail">+91-9876-543-210</p>
                <p className="p-contact-detail flex-email" onClick={() => navigator.clipboard.writeText('academic@campus.edu')} title="Click to copy"><Mail size={14}/> academic@campus.edu</p>
              </div>
            </div>
            <div className="p-contact-card">
              <div className="p-contact-icon-bg"><Phone size={24} color="#8b5cf6" /></div>
              <div className="p-contact-info">
                <h3 className="p-contact-dept">Administration</h3>
                <p className="p-contact-detail">+91-9876-543-211</p>
                <p className="p-contact-detail flex-email" onClick={() => navigator.clipboard.writeText('admin@campus.edu')} title="Click to copy"><Mail size={14}/> admin@campus.edu</p>
              </div>
            </div>
            <div className="p-contact-card">
              <div className="p-contact-icon-bg"><Phone size={24} color="#f59e0b" /></div>
              <div className="p-contact-info">
                <h3 className="p-contact-dept">Student Affairs</h3>
                <p className="p-contact-detail">+91-9876-543-212</p>
                <p className="p-contact-detail flex-email" onClick={() => navigator.clipboard.writeText('studentaffairs@campus.edu')} title="Click to copy"><Mail size={14}/> studentaffairs@campus.edu</p>
              </div>
            </div>
            <div className="p-contact-card">
              <div className="p-contact-icon-bg"><Phone size={24} color="#22c55e" /></div>
              <div className="p-contact-info">
                <h3 className="p-contact-dept">Fee Payment</h3>
                <p className="p-contact-detail">+91-9876-543-213</p>
                <p className="p-contact-detail flex-email" onClick={() => navigator.clipboard.writeText('fees@campus.edu')} title="Click to copy"><Mail size={14}/> fees@campus.edu</p>
              </div>
            </div>
          </div>
        </section>

      </main>
    </div>
  );
};

export default ParentDashboard;
