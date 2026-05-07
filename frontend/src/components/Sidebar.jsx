import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  Settings, 
  LogOut, 
  Sun, 
  Moon, 
  Share2,
  ChevronRight,
  User as UserIcon
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import SettingsDashboard from './SettingsDashboard';

const Sidebar = ({ theme, toggleTheme, user, onLogout, settings, onUpdateSettings }) => {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  return (
    <aside className="app-sidebar">
      <div className="sidebar-header">
        <div className="logo-container">
          <div className="logo-icon">
            <Share2 size={22} color="white" />
          </div>
          <span className="logo-text">AttenMate</span>
        </div>
      </div>

      <nav className="sidebar-nav">
        <button className="nav-item active">
          <div className="icon-wrapper"><LayoutDashboard size={20} /></div>
          <span className="nav-label">Dashboard</span>
        </button>
      </nav>

      <div className="sidebar-footer">
        <button className="theme-toggle" onClick={toggleTheme} title="Toggle Theme">
          <div className="icon-wrapper">
            {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
          </div>
          <span className="nav-label">{theme === 'light' ? 'Dark Mode' : 'Light Mode'}</span>
        </button>

        <div className="user-settings-container">
          <button 
            className={`settings-trigger ${isSettingsOpen ? 'active' : ''}`}
            onClick={() => setIsSettingsOpen(true)}
            title="Account Settings"
          >
            <div className="icon-wrapper"><Settings size={20} /></div>
            <span className="nav-label">Settings</span>
            <ChevronRight size={16} className={`arrow ${isSettingsOpen ? 'rotated' : ''}`} />
          </button>
          
          <button className="nav-item logout-nav-item mt-2" onClick={onLogout}>
            <div className="icon-wrapper"><LogOut size={20} /></div>
            <span className="nav-label">Logout</span>
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isSettingsOpen && (
          <SettingsDashboard 
            isOpen={isSettingsOpen} 
            onClose={() => setIsSettingsOpen(false)}
            theme={theme}
            toggleTheme={toggleTheme}
            settings={settings}
            onUpdateSettings={onUpdateSettings}
          />
        )}
      </AnimatePresence>

    </aside>
  );
};

export default Sidebar;
