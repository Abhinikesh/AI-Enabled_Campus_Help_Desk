import React, { useState } from 'react';
import Navbar from '../../components/Navbar/Navbar';
import './Exams.css';

const Exams = () => {
  const [activeTab, setActiveTab] = useState('upcoming');

  const upcomingExams = [
    { subject: 'Data Structures', code: 'CS201', date: 'Apr 12, 2026', time: '10:00 AM', room: 'Room 204', days: 'In 5 days', urgency: 'yellow' },
    { subject: 'Database Mgmt', code: 'CS203', date: 'Apr 14, 2026', time: '2:00 PM', room: 'Room 301', days: 'In 7 days', urgency: 'yellow' },
    { subject: 'Web Development', code: 'CS205', date: 'Apr 16, 2026', time: '10:00 AM', room: 'Room 105', days: 'In 9 days', urgency: 'green' },
    { subject: 'Computer Networks', code: 'CS207', date: 'Apr 18, 2026', time: '2:00 PM', room: 'Room 202', days: 'In 11 days', urgency: 'green' },
    { subject: 'Operating Systems', code: 'CS209', date: 'Apr 20, 2026', time: '10:00 AM', room: 'Room 304', days: 'In 13 days', urgency: 'green' },
  ];

  return (
    <div className="exams-layout">
      <Navbar />
      
      <main className="exams-content">
        <h1 className="page-title">Exam Schedule</h1>

        <div className="tabs-container">
          <button 
            className={`tab-btn ${activeTab === 'upcoming' ? 'active' : ''}`}
            onClick={() => setActiveTab('upcoming')}
          >
            Upcoming
          </button>
          <button 
            className={`tab-btn ${activeTab === 'completed' ? 'active' : ''}`}
            onClick={() => setActiveTab('completed')}
          >
            Completed
          </button>
        </div>

        {activeTab === 'upcoming' && (
          <div className="exams-list">
            {upcomingExams.map((exam, i) => {
              const [month, day, year] = exam.date.replace(',', '').split(' ');
              
              return (
                <div className="exam-card" key={i}>
                  <div className="exam-date-block">
                    <span className="date-day">{day}</span>
                    <span className="date-month">{month}</span>
                  </div>
                  
                  <div className="exam-details">
                    <div className="exam-header">
                      <h3 className="exam-subject">{exam.subject}</h3>
                      <span className="exam-code">{exam.code}</span>
                    </div>
                    <div className="exam-meta">
                      <span className="exam-time">🕒 {exam.time}</span>
                      <span className="exam-room">🚪 {exam.room}</span>
                    </div>
                  </div>

                  <div className="exam-actions">
                    <span className={`days-badge ${exam.urgency}-badge`}>{exam.days}</span>
                    <button className="btn btn-outline download-btn">Download Hall Ticket</button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {activeTab === 'completed' && (
          <div className="empty-state">
            <p>No completed exams for this semester.</p>
          </div>
        )}

      </main>
    </div>
  );
};

export default Exams;
