import React, { useState, useEffect } from 'react';
import Navbar from '../../components/Navbar/Navbar';
import { Users, UserCheck, AlertTriangle, CheckCircle, Megaphone, Activity } from 'lucide-react';
import './Admin.css';

const AdminDashboard = () => {
  const [time, setTime] = useState(new Date().toLocaleTimeString());
  const [complaints, setComplaints] = useState([
    { id: '#001', name: 'Arjun Sharma', type: 'Academic', title: 'Result not updated', date: 'Apr 6', status: 'Pending' },
    { id: '#002', name: 'Priya Patel', type: 'Admin', title: 'ID card not issued', date: 'Apr 5', status: 'In Progress' },
    { id: '#003', name: 'Ravi Kumar', type: 'Hostel', title: 'Water supply issue', date: 'Apr 4', status: 'Pending' },
    { id: '#004', name: 'Sneha Rao', type: 'Academic', title: 'Library access', date: 'Apr 3', status: 'Resolved' },
    { id: '#005', name: 'Amit Singh', type: 'Admin', title: 'Fee receipt missing', date: 'Apr 2', status: 'Pending' },
    { id: '#006', name: 'Kavya Nair', type: 'Academic', title: 'Timetable clash', date: 'Apr 1', status: 'In Progress' },
    { id: '#007', name: 'Rohit Verma', type: 'Hostel', title: 'Room allotment', date: 'Mar 30', status: 'Resolved' },
    { id: '#008', name: 'Meera Joshi', type: 'Admin', title: 'Bus pass renewal', date: 'Mar 29', status: 'Resolved' }
  ]);

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date().toLocaleTimeString()), 1000);
    return () => clearInterval(timer);
  }, []);

  const handleResolve = (index) => {
    const newComplaints = [...complaints];
    newComplaints[index].status = 'Resolved';
    setComplaints(newComplaints);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Pending': return 'status-red';
      case 'In Progress': return 'status-gold';
      case 'Resolved': return 'status-green';
      default: return '';
    }
  };

  const getInitialsColor = (name) => {
    const colors = ['#f87171', '#60a5fa', '#34d399', '#fbbf24', '#a78bfa'];
    let hash = 0;
    for (let i = 0; i < name.length; i++) hash = name.charCodeAt(i) + ((hash << 5) - hash);
    return colors[Math.abs(hash) % colors.length];
  };

  return (
    <div className="admin-layout">
      <Navbar />
      
      <main className="admin-content">
        {/* HERO BANNER */}
        <section className="admin-hero">
          <div className="a-hero-left">
            <h1 className="a-hero-title">Admin Control Panel</h1>
            <p className="a-hero-subtitle">Full system overview and management</p>
            <div className="a-hero-actions">
              <button className="btn btn-primary">View All Complaints</button>
              <button className="btn btn-outline">Post Announcement</button>
            </div>
          </div>
          <div className="a-hero-right">
            <div className="clock-container">
              <span className="live-clock">{time}</span>
            </div>
          </div>
        </section>

        {/* ANALYTICS STATS ROW */}
        <section className="a-stats-grid">
          <div className="a-stat-card">
            <Users className="a-stat-icon" color="#3b82f6" />
            <div className="a-stat-val">5,240</div>
            <div className="a-stat-label">Total Students</div>
            <div className="a-stat-subtext text-blue">📈 +120 this month</div>
          </div>
          <div className="a-stat-card">
            <UserCheck className="a-stat-icon" color="#a78bfa" />
            <div className="a-stat-val">187</div>
            <div className="a-stat-label">Total Faculty</div>
            <div className="a-stat-subtext text-purple">📈 +5 this month</div>
          </div>
          <div className="a-stat-card">
            <AlertTriangle className="a-stat-icon" color="#ef4444" />
            <div className="a-stat-val">24</div>
            <div className="a-stat-label">Open Complaints</div>
            <div className="a-stat-subtext text-red">⚠ Needs attention</div>
          </div>
          <div className="a-stat-card">
            <CheckCircle className="a-stat-icon" color="#22c55e" />
            <div className="a-stat-val">8</div>
            <div className="a-stat-label">Resolved Today</div>
            <div className="a-stat-subtext text-green">✅ Good progress</div>
          </div>
          <div className="a-stat-card">
            <Megaphone className="a-stat-icon" color="#f59e0b" />
            <div className="a-stat-val">12</div>
            <div className="a-stat-label">Announcements</div>
            <div className="a-stat-subtext text-gold">📢 This month</div>
          </div>
          <div className="a-stat-card">
            <Activity className="a-stat-icon" color="#14b8a6" />
            <div className="a-stat-val">1,842</div>
            <div className="a-stat-label">Active Users</div>
            <div className="a-stat-subtext text-teal">🟢 Online now</div>
          </div>
        </section>

        {/* COMPLAINTS MANAGEMENT TABLE */}
        <section className="a-complaints-section">
          <div className="a-card">
            <div className="a-card-header">
              <h2 className="section-title">Complaint Management</h2>
              <div className="a-header-actions">
                <select className="a-select">
                  <option>All</option>
                  <option>Pending</option>
                  <option>In Progress</option>
                  <option>Resolved</option>
                </select>
                <input type="text" placeholder="Search..." className="a-input search-input" />
              </div>
            </div>
            <div className="table-wrapper">
              <table className="a-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Student</th>
                    <th>Type</th>
                    <th>Title</th>
                    <th>Date</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {complaints.map((comp, i) => (
                    <tr key={i}>
                      <td>{comp.id}</td>
                      <td className="fw-bold">{comp.name}</td>
                      <td><span className="code-badge">{comp.type}</span></td>
                      <td>"{comp.title}"</td>
                      <td>{comp.date}</td>
                      <td><span className={`status-badge ${getStatusColor(comp.status)}`}>{comp.status}</span></td>
                      <td>
                        <div className="table-actions">
                          {comp.status !== 'Resolved' && (
                            <button className="btn-small-resolve" onClick={() => handleResolve(i)}>Resolve</button>
                          )}
                          <button className="btn-small-view">View</button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* TWO COLUMN SECTION */}
        <section className="a-two-col">
          {/* Recent Registrations */}
          <div className="a-card">
            <h2 className="section-title">Recent Registrations</h2>
            <div className="a-reg-list">
              {[
                { init: 'AS', name: 'Arjun Sharma', roll: '20240001', branch: 'CSE', date: 'Apr 1, 2026' },
                { init: 'PP', name: 'Priya Patel', roll: '20240002', branch: 'CSE', date: 'Apr 1, 2026' },
                { init: 'RK', name: 'Ravi Kumar', roll: '20240003', branch: 'ECE', date: 'Apr 2, 2026' },
                { init: 'SR', name: 'Sneha Rao', roll: '20240004', branch: 'MBA', date: 'Apr 2, 2026' },
                { init: 'AJ', name: 'Aakash Jain', roll: '20240005', branch: 'CSE', date: 'Apr 3, 2026' }
              ].map((student, i) => (
                <div className="reg-item" key={i}>
                  <div className="reg-avatar" style={{ backgroundColor: getInitialsColor(student.name) }}>{student.init}</div>
                  <div className="reg-info">
                    <span className="fw-bold">{student.name}</span>
                    <span className="reg-subtext">{student.roll} • {student.branch}</span>
                  </div>
                  <div className="reg-date">{student.date}</div>
                </div>
              ))}
            </div>
          </div>

          {/* System Announcements */}
          <div className="a-card">
            <h2 className="section-title">System Announcements</h2>
            <div className="a-announce-form">
              <input type="text" placeholder="Announcement Title" className="a-input mb-2" />
              <textarea placeholder="Write body..." rows="3" className="a-textarea mb-2"></textarea>
              <div className="checkbox-group mb-2">
                <label><input type="checkbox" /> Students</label>
                <label><input type="checkbox" /> Faculty</label>
                <label><input type="checkbox" /> Parents</label>
                <label><input type="checkbox" /> All</label>
              </div>
              <button className="btn btn-primary w-100">Post Announcement</button>
            </div>
            <div className="a-history mt-4">
              <div className="a-hist-item">
                <div className="a-hist-left">
                  <span className="fw-bold fs-14">System Maintenance</span>
                  <span className="a-hist-sub">To: All • Apr 6</span>
                </div>
                <div className="a-hist-actions">
                  <span className="edit-icon">✏️</span>
                  <span className="del-icon">🗑️</span>
                </div>
              </div>
              <div className="a-hist-item">
                <div className="a-hist-left">
                  <span className="fw-bold fs-14">Holidays List Updated</span>
                  <span className="a-hist-sub">To: All • Apr 3</span>
                </div>
                <div className="a-hist-actions">
                  <span className="edit-icon">✏️</span>
                  <span className="del-icon">🗑️</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* PLACEMENT STATS */}
        <section className="a-placement-banner">
          <div className="place-stat">
            <div className="place-val">₹45,00,000</div>
            <div className="place-label">Highest Package</div>
          </div>
          <div className="place-stat">
            <div className="place-val">₹8,50,000</div>
            <div className="place-label">Average Package</div>
          </div>
          <div className="place-stat">
            <div className="place-val">180</div>
            <div className="place-label">Companies Visited</div>
          </div>
          <div className="place-stat">
            <div className="place-val">94%</div>
            <div className="place-label">Placement Rate</div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default AdminDashboard;
