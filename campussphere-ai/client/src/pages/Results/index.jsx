import React, { useState } from 'react';
import Navbar from '../../components/Navbar/Navbar';
import './Results.css';

const Results = () => {
  const [activeTab, setActiveTab] = useState('Sem 4');

  return (
    <div className="results-layout">
      <Navbar />
      
      <main className="results-content">
        <h1 className="page-title">My Results</h1>
        
        <div className="tabs-container">
          <button 
            className={`tab-btn ${activeTab === 'Sem 4' ? 'active' : ''}`}
            onClick={() => setActiveTab('Sem 4')}
          >
            Semester 4
          </button>
          <button 
            className={`tab-btn ${activeTab === 'Sem 3' ? 'active' : ''}`}
            onClick={() => setActiveTab('Sem 3')}
          >
            Semester 3
          </button>
          <button 
            className={`tab-btn ${activeTab === 'Sem 2' ? 'active' : ''}`}
            onClick={() => setActiveTab('Sem 2')}
          >
            Semester 2
          </button>
        </div>

        {activeTab === 'Sem 4' && (
          <div className="semester-results-view">
            
            {/* CGPA Card */}
            <div className="cgpa-card">
              <div className="cgpa-graphic-container">
                <svg className="cgpa-gauge" viewBox="0 0 100 50">
                  <path className="gauge-bg" d="M 10 50 A 40 40 0 0 1 90 50" fill="none" />
                  <path className="gauge-progress" d="M 10 50 A 40 40 0 0 1 90 50" fill="none" strokeDasharray="125.6" strokeDashoffset={125.6 * (1 - 8.4/10)} />
                </svg>
                <div className="cgpa-value-container">
                  <div className="cgpa-label">CGPA</div>
                  <div className="cgpa-value">8.4<span className="cgpa-max">/10</span></div>
                </div>
              </div>
            </div>

            {/* Results Table */}
            <div className="table-card">
              <div className="table-wrapper">
                <table className="results-table">
                  <thead>
                    <tr>
                      <th>Subject</th>
                      <th>Code</th>
                      <th>Credits</th>
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
                      <td>4</td>
                      <td className="fw-bold">88</td>
                      <td>100</td>
                      <td><span className="grade-pill grade-aplus">A+</span></td>
                      <td>Pass</td>
                    </tr>
                    <tr>
                      <td>Database Mgmt</td>
                      <td>CS203</td>
                      <td>4</td>
                      <td className="fw-bold">74</td>
                      <td>100</td>
                      <td><span className="grade-pill grade-b">B</span></td>
                      <td>Pass</td>
                    </tr>
                    <tr>
                      <td>Web Development</td>
                      <td>CS205</td>
                      <td>3</td>
                      <td className="fw-bold">91</td>
                      <td>100</td>
                      <td><span className="grade-pill grade-aplus">A+</span></td>
                      <td>Pass</td>
                    </tr>
                    <tr>
                      <td>Computer Networks</td>
                      <td>CS207</td>
                      <td>4</td>
                      <td className="fw-bold">52</td>
                      <td>100</td>
                      <td><span className="grade-pill grade-c">C</span></td>
                      <td>Pass</td>
                    </tr>
                    <tr>
                      <td>Operating Systems</td>
                      <td>CS209</td>
                      <td>4</td>
                      <td className="fw-bold">79</td>
                      <td>100</td>
                      <td><span className="grade-pill grade-a">A</span></td>
                      <td>Pass</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Semester Summary Card */}
            <div className="semester-summary-card">
              <div className="summary-left">
                <div className="summary-stat">
                  <span className="stat-label">Total Marks</span>
                  <span className="stat-val">384 / 500</span>
                </div>
                <div className="summary-stat">
                  <span className="stat-label">Percentage</span>
                  <span className="stat-val">76.8%</span>
                </div>
                <div className="summary-stat">
                  <span className="stat-label">Result</span>
                  <span className="stat-val text-green">PASS</span>
                </div>
              </div>
              <div className="summary-right">
                <button className="btn btn-primary">Download Marksheet</button>
              </div>
            </div>

          </div>
        )}

        {activeTab !== 'Sem 4' && (
          <div className="empty-state">
            <p>Fetching results for {activeTab}...</p>
          </div>
        )}
      </main>
    </div>
  );
};

export default Results;
