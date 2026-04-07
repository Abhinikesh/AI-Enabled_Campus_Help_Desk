import React, { useState } from 'react';
import Navbar from '../../components/Navbar/Navbar';
import { useAuth } from '../../context/AuthContext';
import { Plus, X, ListCollapse, Clock, CheckCircle } from 'lucide-react';
import './Complaints.css';

const initialComplaints = [
  { id: '#CS-001', category: 'Academic', title: 'Mid-sem result not updated', desc: 'My marks for DS mid-sem are not visible on the portal despite others getting it.', date: 'Apr 1', status: 'Pending' },
  { id: '#CS-002', category: 'Administrative', title: 'ID card not issued yet', desc: 'Applied for a replacement ID card last week but haven\'t received any update.', date: 'Mar 28', status: 'In Progress' },
  { id: '#CS-003', category: 'Hostel', title: 'Water heater not working', desc: 'The geyser in Room 204 Block B is completely dead.', date: 'Mar 25', status: 'Resolved', resolvedOn: 'Apr 5' },
  { id: '#CS-004', category: 'Academic', title: 'Lab access after 6pm', desc: 'Need access to AI lab after 6pm for final year project.', date: 'Mar 20', status: 'Resolved', resolvedOn: 'Mar 22' },
  { id: '#CS-005', category: 'Infrastructure', title: 'Projector broken in Room 204', desc: 'The HDMI cable is broken and projector does not turn on.', date: 'Mar 15', status: 'Resolved', resolvedOn: 'Mar 16' },
];

const categoryIcons = {
  'Academic': { icon: '📚', color: '#3b82f6' },
  'Administrative': { icon: '🏢', color: '#f59e0b' },
  'Hostel': { icon: '🏠', color: '#22c55e' },
  'Infrastructure': { icon: '🔧', color: '#a855f7' },
  'Other': { icon: '📋', color: '#64748b' },
};

const Complaints = () => {
  const { user } = useAuth() || {};
  const [complaints, setComplaints] = useState(initialComplaints);
  const [activeTab, setActiveTab] = useState('My Complaints');
  const [isRaiseModalOpen, setRaiseModalOpen] = useState(false);
  const [isDetailModalOpen, setDetailModalOpen] = useState(false);
  const [selectedComplaint, setSelectedComplaint] = useState(null);
  const [toast, setToast] = useState(null);
  
  // Form state
  const [formData, setFormData] = useState({ title: '', category: 'Academic', desc: '', priority: 'Medium' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const pendingCount = complaints.filter(c => c.status === 'Pending' || c.status === 'In Progress').length;
  const resolvedCount = complaints.filter(c => c.status === 'Resolved').length;

  const handleOpenDetail = (complaint) => {
    setSelectedComplaint(complaint);
    setDetailModalOpen(true);
  };

  const handleRaiseSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    setTimeout(() => {
      const newComplaint = {
        id: `#CS-00${complaints.length + 1}`,
        category: formData.category,
        title: formData.title,
        desc: formData.desc,
        date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        status: 'Pending' // Always pending initially
      };
      
      setComplaints([newComplaint, ...complaints]);
      setIsSubmitting(false);
      setRaiseModalOpen(false);
      setFormData({ title: '', category: 'Academic', desc: '', priority: 'Medium' });
      
      showToast(`✅ Complaint ${newComplaint.id} submitted successfully!`);
    }, 1000);
  };

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  return (
    <div className="comp-layout">
      <Navbar />

      {/* TOAST */}
      {toast && (
        <div className="comp-toast">
          {toast}
        </div>
      )}

      <main className="comp-content">
        {/* HEADER */}
        <div className="comp-header">
          <div>
            <h1 className="comp-title">Complaints & Grievances</h1>
            <p className="comp-subtitle">Raise, track and resolve your campus issues</p>
          </div>
          <button className="btn btn-primary btn-icon" onClick={() => setRaiseModalOpen(true)}>
            <Plus size={18} /> Raise New Complaint
          </button>
        </div>

        {/* STATS */}
        <section className="comp-stats">
          <div className="comp-stat-card">
            <div className="comp-stat-top">
              <span className="comp-stat-val">{complaints.length}</span>
              <ListCollapse size={24} color="#3b82f6" />
            </div>
            <div className="comp-stat-label">Total Complaints</div>
            <p className="comp-stat-sub">your complaints</p>
          </div>
          <div className="comp-stat-card">
            <div className="comp-stat-top">
              <span className="comp-stat-val text-red">{pendingCount}</span>
              <Clock size={24} color="#f87171" />
            </div>
            <div className="comp-stat-label">Pending</div>
            <p className="comp-stat-sub">awaiting action</p>
          </div>
          <div className="comp-stat-card">
            <div className="comp-stat-top">
              <span className="comp-stat-val text-green">{resolvedCount}</span>
              <CheckCircle size={24} color="#34d399" />
            </div>
            <div className="comp-stat-label">Resolved</div>
            <p className="comp-stat-sub">completed</p>
          </div>
        </section>

        {/* TABS */}
        <div className="comp-tabs">
          <button className={`comp-tab ${activeTab === 'My Complaints' ? 'active' : ''}`} onClick={() => setActiveTab('My Complaints')}>My Complaints</button>
          <button className={`comp-tab ${activeTab === 'All Campus' ? 'active' : ''}`} onClick={() => setActiveTab('All Campus')}>All Campus</button>
        </div>

        {/* LIST */}
        <div className="comp-list">
          {complaints.map((c, i) => {
            const catMeta = categoryIcons[c.category] || categoryIcons['Other'];
            return (
              <div key={i} className="comp-card">
                <div className="comp-c-left">
                  <div className="comp-icon-circle" style={{ backgroundColor: `${catMeta.color}20`, color: catMeta.color }}>
                    {catMeta.icon}
                  </div>
                </div>

                <div className="comp-c-mid">
                  <div className="comp-id-row">
                    <span className="comp-id">{c.id}</span>
                    <span className="comp-date">• {c.date}</span>
                    <span className="comp-cat-badge" style={{ color: catMeta.color, borderColor: `${catMeta.color}40` }}>{c.category}</span>
                  </div>
                  <h3 className="comp-card-title">{c.title}</h3>
                  <p className="comp-card-desc">{c.desc}</p>
                </div>

                <div className="comp-c-right">
                  <div className={`comp-status-badge status-${c.status.replace(' ', '')}`}>
                    {c.status === 'Pending' && <span className="blink-dot"></span>}
                    {c.status === 'Resolved' && <CheckCircle size={14} />}
                    {c.status}
                  </div>
                  {c.status === 'Resolved' && <div className="comp-resolved-text">Resolved on {c.resolvedOn}</div>}
                  <button className="comp-view-btn" onClick={() => handleOpenDetail(c)}>View Details</button>
                </div>
              </div>
            )
          })}
        </div>
      </main>

      {/* RAISE MODAL */}
      {isRaiseModalOpen && (
        <div className="modal-backdrop" onClick={() => setRaiseModalOpen(false)}>
          <div className="modal-content slide-up" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h2 className="modal-title">Raise New Complaint</h2>
              <button className="modal-close" onClick={() => setRaiseModalOpen(false)}><X size={20}/></button>
            </div>
            <form className="modal-form" onSubmit={handleRaiseSubmit}>
              <div className="form-group">
                <label>Title <span className="text-red">*</span></label>
                <input type="text" required placeholder="Brief title of the issue" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} />
              </div>
              
              <div className="form-group">
                <label>Category <span className="text-red">*</span></label>
                <select value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})}>
                  <option value="Academic">Academic</option>
                  <option value="Administrative">Administrative</option>
                  <option value="Hostel">Hostel</option>
                  <option value="Infrastructure">Infrastructure</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div className="form-group">
                <label>Description <span className="text-red">*</span></label>
                <textarea rows={5} minLength={20} required placeholder="Detailed description (min 20 chars)" value={formData.desc} onChange={e => setFormData({...formData, desc: e.target.value})}></textarea>
              </div>

              <div className="form-group">
                <label>Priority</label>
                <div className="radio-group">
                  <label className="radio-label">
                    <input type="radio" name="priority" value="Low" checked={formData.priority === 'Low'} onChange={e => setFormData({...formData, priority: e.target.value})} /> Low
                  </label>
                  <label className="radio-label">
                    <input type="radio" name="priority" value="Medium" checked={formData.priority === 'Medium'} onChange={e => setFormData({...formData, priority: e.target.value})} /> Medium
                  </label>
                  <label className="radio-label">
                    <input type="radio" name="priority" value="High" checked={formData.priority === 'High'} onChange={e => setFormData({...formData, priority: e.target.value})} /> High
                  </label>
                </div>
              </div>

              <div className="modal-footer">
                <button type="button" className="btn btn-outline" onClick={() => setRaiseModalOpen(false)}>Cancel</button>
                <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
                  {isSubmitting ? <span className="spinner-small"></span> : 'Submit Complaint'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* DETAIL MODAL */}
      {isDetailModalOpen && selectedComplaint && (
        <div className="modal-backdrop" onClick={() => setDetailModalOpen(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h2 className="modal-title">Complaint {selectedComplaint.id}</h2>
              <button className="modal-close" onClick={() => setDetailModalOpen(false)}><X size={20}/></button>
            </div>
            <div className="modal-body">
              <div className="detail-meta">
                <span className="comp-cat-badge inline" style={{color: categoryIcons[selectedComplaint.category].color, borderColor: `${categoryIcons[selectedComplaint.category].color}40`}}>{selectedComplaint.category}</span>
                <div className={`comp-status-badge inline status-${selectedComplaint.status.replace(' ', '')}`}>{selectedComplaint.status}</div>
              </div>
              <h3 className="detail-title">{selectedComplaint.title}</h3>
              <p className="detail-desc">{selectedComplaint.desc}</p>

              <div className="detail-timeline">
                <h4 className="timeline-title">Resolution Timeline</h4>
                <div className="tl-item">
                  <div className="tl-dot blue"></div>
                  <div className="tl-content">
                    <span className="tl-date">{selectedComplaint.date}</span>
                    <span className="tl-text">Complaint Raised</span>
                  </div>
                </div>
                {(selectedComplaint.status === 'In Progress' || selectedComplaint.status === 'Resolved') && (
                  <div className="tl-item">
                    <div className="tl-dot gold"></div>
                    <div className="tl-content">
                      <span className="tl-date">Update</span>
                      <span className="tl-text">Under Review by Admin</span>
                    </div>
                  </div>
                )}
                {selectedComplaint.status === 'Resolved' && (
                  <div className="tl-item">
                    <div className="tl-dot green"></div>
                    <div className="tl-content">
                      <span className="tl-date">{selectedComplaint.resolvedOn}</span>
                      <span className="tl-text">Resolved</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default Complaints;
