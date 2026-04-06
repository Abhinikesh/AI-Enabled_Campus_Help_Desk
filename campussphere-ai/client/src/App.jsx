import { useState, useCallback } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import SplashScreen from './components/SplashScreen/SplashScreen';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';

// ── Pages (lazy-load compatible in future) ─────────────────
import Landing            from './pages/Landing/index';
import StudentDashboard   from './pages/StudentDashboard/index';
import FacultyDashboard   from './pages/FacultyDashboard/index';
import AdminDashboard     from './pages/AdminDashboard/index';
import ParentDashboard    from './pages/ParentDashboard/index';
import AdmissionDashboard from './pages/AdmissionDashboard/index';
import Attendance         from './pages/Attendance/index';
import Exams              from './pages/Exams/index';
import Results            from './pages/Results/index';
import AIHelpDesk         from './pages/AIHelpDesk/index';
import VirtualTour        from './pages/VirtualTour/index';
import Complaints         from './pages/Complaints/index';
import Drive              from './pages/Drive/index';

const App = () => {
  // Splash only shown once per session
  const [splashDone, setSplashDone] = useState(false);
  const handleSplashDone = useCallback(() => setSplashDone(true), []);

  return (
    <AuthProvider>
      {/* Splash — only on first load */}
      {!splashDone && <SplashScreen onDone={handleSplashDone} />}

      {/* Main app — rendered underneath (hidden by splash until splashDone) */}
      <div style={{ visibility: splashDone ? 'visible' : 'hidden' }}>
        <Routes>
          {/* ── Public ── */}
          <Route path="/" element={<Landing />} />

          {/* ── Student ── */}
          <Route
            path="/student/dashboard"
            element={<ProtectedRoute role="student"><StudentDashboard /></ProtectedRoute>}
          />
          <Route
            path="/student/attendance"
            element={<ProtectedRoute role="student"><Attendance /></ProtectedRoute>}
          />
          <Route
            path="/student/exams"
            element={<ProtectedRoute role="student"><Exams /></ProtectedRoute>}
          />
          <Route
            path="/student/results"
            element={<ProtectedRoute role="student"><Results /></ProtectedRoute>}
          />
          <Route
            path="/student/drive"
            element={<ProtectedRoute role="student"><Drive /></ProtectedRoute>}
          />
          <Route
            path="/student/complaints"
            element={<ProtectedRoute role="student"><Complaints /></ProtectedRoute>}
          />
          <Route
            path="/student/ai-help"
            element={<ProtectedRoute role="student"><AIHelpDesk /></ProtectedRoute>}
          />
          <Route
            path="/student/virtual-tour"
            element={<ProtectedRoute role="student"><VirtualTour /></ProtectedRoute>}
          />

          {/* ── Faculty ── */}
          <Route
            path="/faculty/dashboard"
            element={<ProtectedRoute role="faculty"><FacultyDashboard /></ProtectedRoute>}
          />
          <Route
            path="/faculty/ai-help"
            element={<ProtectedRoute role="faculty"><AIHelpDesk /></ProtectedRoute>}
          />
          <Route
            path="/faculty/virtual-tour"
            element={<ProtectedRoute role="faculty"><VirtualTour /></ProtectedRoute>}
          />
          <Route
            path="/faculty/complaints"
            element={<ProtectedRoute role="faculty"><Complaints /></ProtectedRoute>}
          />

          {/* ── Parent ── */}
          <Route
            path="/parent/dashboard"
            element={<ProtectedRoute role="parent"><ParentDashboard /></ProtectedRoute>}
          />
          <Route
            path="/parent/ai-help"
            element={<ProtectedRoute role="parent"><AIHelpDesk /></ProtectedRoute>}
          />
          <Route
            path="/parent/virtual-tour"
            element={<ProtectedRoute role="parent"><VirtualTour /></ProtectedRoute>}
          />

          {/* ── Admission ── */}
          <Route
            path="/admission/dashboard"
            element={<ProtectedRoute role="admission"><AdmissionDashboard /></ProtectedRoute>}
          />

          {/* ── Admin ── */}
          <Route
            path="/admin/dashboard"
            element={<ProtectedRoute role="admin"><AdminDashboard /></ProtectedRoute>}
          />

          {/* ── Catch-all ── */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </AuthProvider>
  );
};

export default App;
