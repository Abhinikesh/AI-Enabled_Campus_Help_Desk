import React, { useState, useEffect } from 'react';
import Navbar from '../../components/Navbar/Navbar';
import { Search, Plus, Download, Share2, FileText, File, FileArchive, CheckCircle } from 'lucide-react';
import './Drive.css';

const allFiles = [
  // Notes
  { id: 1, name: 'Data_Structures_Unit1.pdf', cat: 'Notes', sub: 'CS201 • Sem 3', type: 'PDF', size: '2.3 MB', date: 'Apr 1' },
  { id: 2, name: 'DBMS_Complete_Notes.pdf', cat: 'Notes', sub: 'CS203 • Sem 3', type: 'PDF', size: '4.1 MB', date: 'Mar 28' },
  { id: 3, name: 'Web_Dev_React_Guide.pdf', cat: 'Notes', sub: 'CS205 • Sem 3', type: 'PDF', size: '1.8 MB', date: 'Mar 25' },
  { id: 4, name: 'OS_Memory_Management.pdf', cat: 'Notes', sub: 'CS209 • Sem 4', type: 'PDF', size: '3.2 MB', date: 'Mar 20' },
  // Question Papers
  { id: 5, name: 'DS_MidSem_2025.pdf', cat: 'Question Papers', sub: 'CS201 • Sem 3', type: 'PDF', size: '892 KB', date: 'Mar 15' },
  { id: 6, name: 'DBMS_EndSem_2024.pdf', cat: 'Question Papers', sub: 'CS203 • Sem 3', type: 'PDF', size: '1.1 MB', date: 'Mar 10' },
  { id: 7, name: 'WebDev_MidSem_2025.pdf', cat: 'Question Papers', sub: 'CS205 • Sem 3', type: 'PDF', size: '756 KB', date: 'Mar 5' },
  // Assignments
  { id: 8, name: 'DS_Assignment_3.docx', cat: 'Assignments', sub: 'CS201 • Sem 3', type: 'DOC', size: '234 KB', date: 'Apr 3' },
  { id: 9, name: 'DBMS_ER_Diagram.pdf', cat: 'Assignments', sub: 'CS203 • Sem 3', type: 'PDF', size: '567 KB', date: 'Apr 1' },
  // Lab Manuals
  { id: 10, name: 'Networks_Lab_Manual.pdf', cat: 'Lab Manuals', sub: 'CS207 • Sem 4', type: 'PDF', size: '3.8 MB', date: 'Feb 28' },
  { id: 11, name: 'OS_Lab_Experiments.pdf', cat: 'Lab Manuals', sub: 'CS209 • Sem 4', type: 'PDF', size: '2.9 MB', date: 'Feb 25' },
  // Syllabus
  { id: 12, name: 'CSE_Sem4_Syllabus.pdf', cat: 'Syllabus', sub: 'All • Sem 4', type: 'PDF', size: '1.2 MB', date: 'Jan 15' }
];

const getFileIcon = (type) => {
  switch (type) {
    case 'PDF': return <FileText size={40} color="#ef4444" />; // Red
    case 'DOC': return <FileText size={40} color="#3b82f6" />; // Blue
    case 'PPT': return <File size={40} color="#f97316" />;     // Orange
    case 'ZIP': return <FileArchive size={40} color="#64748b" />;// Gray
    default: return <File size={40} color="#94a3b8" />;
  }
};

const Drive = () => {
  const [activeTab, setActiveTab] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [downloadingItems, setDownloadingItems] = useState({});

  const tabs = ['All', 'Notes', 'Question Papers', 'Assignments', 'Lab Manuals', 'Syllabus'];

  const filteredFiles = allFiles.filter(file => {
    const matchesTab = activeTab === 'All' || file.cat === activeTab;
    const searchLower = searchQuery.toLowerCase();
    const matchesSearch = file.name.toLowerCase().includes(searchLower) || file.sub.toLowerCase().includes(searchLower);
    return matchesTab && matchesSearch;
  });

  const handleDownload = (id) => {
    if (downloadingItems[id]) return;

    setDownloadingItems(prev => ({ ...prev, [id]: 'downloading' }));

    setTimeout(() => {
      setDownloadingItems(prev => ({ ...prev, [id]: 'done' }));
      setTimeout(() => {
        setDownloadingItems(prev => {
          const newState = { ...prev };
          delete newState[id];
          return newState;
        });
      }, 2000); // clear "Downloaded" text after 2s
    }, 1500); // Fake 1.5s download
  };

  return (
    <div className="drive-layout">
      <Navbar />

      <main className="drive-content">
        {/* HEADER */}
        <div className="drive-header">
          <div className="dh-left">
            <h1 className="dh-title">📁 Academic Drive</h1>
            <p className="dh-subtitle">Access notes, papers and resources</p>
          </div>
          <div className="dh-right">
            <div className="search-box">
              <Search size={18} color="#64748b" />
              <input 
                type="text" 
                placeholder="Search files, subjects..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* TABS */}
        <div className="drive-tabs">
          {tabs.map(tab => (
            <button 
              key={tab} 
              className={`drive-tab ${activeTab === tab ? 'active' : ''}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* STORAGE INFO */}
        <div className="drive-storage-bar">
          <div className="ds-left">
            <span className="ds-text">Used 2.4 GB of 5 GB</span>
            <div className="ds-progress-bg">
              <div className="ds-progress-fill" style={{ width: '48%' }}></div>
            </div>
          </div>
          <button className="btn btn-outline ds-btn">
            <Plus size={16}/> Upload
          </button>
        </div>

        {/* FILES GRID */}
        {filteredFiles.length === 0 ? (
          <div className="drive-empty">
            <FileArchive size={48} color="#334155" />
            <p className="empty-text">No files found matching your search.</p>
          </div>
        ) : (
          <div className="drive-grid">
            {filteredFiles.map(file => {
              const dlState = downloadingItems[file.id];

              return (
                <div key={file.id} className="file-card">
                  <div className="file-top-icon">
                    {getFileIcon(file.type)}
                  </div>
                  
                  <div className="file-info">
                    <h3 className="file-name" title={file.name}>{file.name}</h3>
                    <p className="file-sub">{file.sub}</p>
                    <div className="file-meta">
                      <span>{file.size}</span>
                      <span>•</span>
                      <span>{file.date}</span>
                    </div>
                  </div>

                  {/* FAKE DOWNLOAD PROGRESS BAR */}
                  {dlState === 'downloading' && (
                    <div className="file-dl-progress">
                      <div className="dl-fill animated"></div>
                    </div>
                  )}

                  <div className="file-actions">
                    {dlState === 'done' ? (
                      <span className="dl-success"><CheckCircle size={14}/> Downloaded!</span>
                    ) : (
                      <>
                        <button 
                          className="f-btn f-btn-dl" 
                          onClick={() => handleDownload(file.id)}
                          disabled={dlState === 'downloading'}
                        >
                          <Download size={16} /> 
                          {dlState === 'downloading' ? 'Downloading...' : 'Download'}
                        </button>
                        <button className="f-btn f-btn-share"><Share2 size={16}/></button>
                      </>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}

      </main>
    </div>
  );
};

export default Drive;
