import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import SubjectCard from './components/SubjectCard';
import AddSubjectModal from './components/AddSubjectModal';
import StatsDashboard from './components/StatsDashboard';
import AlertBanner from './components/AlertBanner';
import LoginPage from './pages/LoginPage';
import ProtectedRoute from './components/ProtectedRoute';
import { useAuth } from './context/AuthContext';
import { Plus, LayoutGrid, Info, Loader2 } from 'lucide-react';
import { calculateOverallAverage, getAttendanceSummaryByPeriod, getActiveAlerts } from './utils/attendanceUtils';
import { exportToPDF } from './utils/exportUtils';
import { db } from './lib/supabaseClient';
import { motion, AnimatePresence } from 'framer-motion';
import SettingsDashboard from './components/SettingsDashboard';

function App() {
  const [theme, setTheme] = useState(() => localStorage.getItem('attenmate_theme') || 'dark');
  const { user, loading: authLoading, logout } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  
  const [subjects, setSubjects] = useState([]);
  const [logs, setLogs] = useState([]);
  const [settings, setSettings] = useState({ dailyReminderEnabled: true, examDate: '' });
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('attenmate_theme', theme);
  }, [theme]);

  // Fetch Data when auth changes
  useEffect(() => {
    if (authLoading || !user) return;
    
    const fetchData = async () => {
      setLoading(true);
      let s = await db.getSubjects(user.uid);
      const l = await db.getLogs(user.uid);
      const set = await db.getSettings(user.uid);
      
      // Seed dummy subjects if none exist
      if (s.length === 0) {
        s = [
          { id: 1, name: 'Advanced Mathematics', attended: 45, total: 50, color: 'blue' },
          { id: 2, name: 'Physics Laboratory', attended: 12, total: 15, color: 'purple' },
          { id: 3, name: 'Data Structures', attended: 28, total: 30, color: 'emerald' },
          { id: 4, name: 'Organic Chemistry', attended: 15, total: 25, color: 'orange' },
        ];
        await db.saveSubjects(s, user.uid);
      }
      
      setSubjects(s);
      setLogs(l);
      setSettings(set);
      setLoading(false);
    };
    fetchData();
  }, [user, authLoading]);

  const toggleTheme = () => setTheme(prev => prev === 'light' ? 'dark' : 'light');

  const handleExport = () => {
    exportToPDF(user?.email || 'User', 'dashboard-content');
  };

  const handleUpdateSettings = async (newSettings) => {
    setSettings(newSettings);
    await db.saveSettings(newSettings, user.uid);
  };

  const handleAddSubject = async (newSub) => {
    const updated = [...subjects, { ...newSub, id: Date.now() }];
    setSubjects(updated);
    await db.saveSubjects(updated, user.uid);
  };

  const handleDeleteSubject = async (id) => {
    const updated = subjects.filter(s => s.id !== id);
    setSubjects(updated);
    await db.deleteSubject(id, user.uid);
  };

  const handleMarkAttendance = async (subjectId, status) => {
    const updatedSubjects = subjects.map(s => {
      if (s.id === subjectId) {
        return {
          ...s,
          attended: status === 'present' ? s.attended + 1 : s.attended,
          total: s.total + 1
        };
      }
      return s;
    });
    setSubjects(updatedSubjects);
    await db.saveSubjects(updatedSubjects, user.uid);

    const newLog = await db.addLog({ subjectId, status }, user.uid);
    setLogs(prev => [newLog, ...prev]);
  };

  const overallAvg = calculateOverallAverage(subjects);
  const activeAlerts = getActiveAlerts(settings.examDate, overallAvg, settings.dailyReminderEnabled);

  if (authLoading) {
    return (
      <div className="loading-screen">
        <Loader2 className="spinner" size={48} />
      </div>
    );
  }

  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route 
        path="/" 
        element={
          <ProtectedRoute>
            <div className="app-layout" id="dashboard-content">
              <Sidebar 
                theme={theme} 
                toggleTheme={toggleTheme} 
                user={user}
                onLogout={logout}
              />
              
              <div className="main-viewport">
                <Header 
                  onExport={handleExport} 
                  user={user} 
                  onLogout={logout} 
                  onOpenSettings={() => navigate('/settings')}
                />
                
                <main className="content-area">
                  <AlertBanner alerts={activeAlerts} />

                  <div className="dashboard-grid">
                    <div className="main-content">
                      <div className="section-header">
                        <div className="title-area">
                          <LayoutGrid size={20} />
                          <h2>My Subjects</h2>
                        </div>
                        <button className="btn-primary add-subject-btn" onClick={() => setIsModalOpen(true)}>
                          <Plus size={18} />
                          <span>Add Subject</span>
                        </button>
                      </div>

                      <motion.div layout className="subjects-list">
                        <AnimatePresence mode="popLayout">
                          {loading ? (
                            <div className="col-span-full py-20 flex justify-center">
                              <Loader2 className="animate-spin text-indigo-500" size={40} />
                            </div>
                          ) : (
                            <>
                              {subjects.map(s => (
                                <SubjectCard 
                                  key={s.id} 
                                  subject={s} 
                                  onMark={handleMarkAttendance}
                                  onDelete={handleDeleteSubject}
                                />
                              ))}
                              {subjects.length === 0 && (
                                <div className="empty-state glass">
                                  <Info size={40} />
                                  <p>You haven't added any subjects yet. Click the button above to get started!</p>
                                </div>
                              )}
                            </>
                          )}
                        </AnimatePresence>
                      </motion.div>
                    </div>

                    <aside className="stats-sidebar">
                      <StatsDashboard 
                        subjects={subjects}
                        average={overallAvg} 
                        summaries={(period) => getAttendanceSummaryByPeriod(logs, period)} 
                      />
                    </aside>
                  </div>
                </main>
              </div>

              <AddSubjectModal 
                isOpen={isModalOpen} 
                onClose={() => setIsModalOpen(false)} 
                onAdd={handleAddSubject}
              />
            </div>
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/settings" 
        element={
          <ProtectedRoute>
            <SettingsDashboard 
              isOpen={true} 
              onClose={() => navigate('/')}
              theme={theme}
              toggleTheme={toggleTheme}
              settings={settings}
              onUpdateSettings={handleUpdateSettings}
            />
          </ProtectedRoute>
        }
      />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default App;
