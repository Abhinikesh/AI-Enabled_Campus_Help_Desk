import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import axios from 'axios';

const AuthContext = createContext(null);

const ROLE_DASHBOARDS = {
  student:   '/student/dashboard',
  faculty:   '/faculty/dashboard',
  parent:    '/parent/dashboard',
  admission: '/admission/dashboard',
  admin:     '/admin/dashboard',
};

export const AuthProvider = ({ children }) => {
  const [user, setUser]       = useState(null);   // { name, role, email }
  const [loading, setLoading] = useState(true);   // true while verifying JWT on boot

  // ── Fetch current user from cookie JWT ────────────────────
  const fetchUser = useCallback(async () => {
    try {
      const { data } = await axios.get('/api/auth/me', { withCredentials: true });
      if (data.success) setUser(data.user);
      else              setUser(null);
    } catch {
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  // Run once on app boot
  useEffect(() => { fetchUser(); }, [fetchUser]);

  // ── Login ──────────────────────────────────────────────────
  const login = async (identifier, password, role) => {
    // For students, identifier is rollNumber (used as email lookup via API)
    // Backend expects email — student logs in with roll number mapped to email
    const payload = {
      email:    role === 'student' ? `${identifier}@campus.edu` : identifier,
      password,
      role,
    };
    const { data } = await axios.post('/api/auth/login', payload, { withCredentials: true });
    if (data.success) {
      await fetchUser();
      return data; // { success, role, name, redirectTo }
    }
    throw new Error(data.message || 'Login failed');
  };

  // ── Logout ─────────────────────────────────────────────────
  const logout = async (navigate) => {
    try {
      await axios.post('/api/auth/logout', {}, { withCredentials: true });
    } catch { /* ignore */ }
    setUser(null);
    if (navigate) navigate('/');
  };

  const getDashboard = (role) => ROLE_DASHBOARDS[role] || '/';

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, fetchUser, getDashboard }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider');
  return ctx;
};
