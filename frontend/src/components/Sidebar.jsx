import React from 'react';
import { 
  LayoutDashboard, 
  LogOut, 
  Sun, 
  Moon, 
  Share2
} from 'lucide-react';

const Sidebar = ({ theme, toggleTheme, onLogout }) => {
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

        <button className="nav-item logout-nav-item mt-2" onClick={onLogout}>
          <div className="icon-wrapper"><LogOut size={20} /></div>
          <span className="nav-label">Logout</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
