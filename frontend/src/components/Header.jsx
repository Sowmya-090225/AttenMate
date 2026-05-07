import React from 'react';
import { Download } from 'lucide-react';

const Header = ({ onExport, user, onLogout }) => {
  return (
    <header className="action-bar glass">
      <div className="header-actions-left">
        <h2 className="text-lg font-bold text-white hidden md:block">Dashboard Overview</h2>
      </div>

      <div className="header-actions">
        <button className="btn-secondary export-btn" onClick={onExport} title="Export Report">
          <Download size={18} />
          <span>Export Report</span>
        </button>

        <div className="user-profile">
          <div className="user-info">
            <span className="user-name">{user?.displayName || 'User'}</span>
            <span className="user-email">{user?.email}</span>
          </div>
          <img src={user?.photoURL || `https://ui-avatars.com/api/?name=${user?.displayName || 'U'}&background=6366f1&color=fff`} alt="Profile" className="user-avatar" />
          
          <div className="profile-dropdown glass shadow-2xl">
             <button onClick={onLogout} className="logout-btn">
               Log Out
             </button>
          </div>
        </div>
      </div>

      <style jsx="true">{`
        .action-bar {
          padding: 0.75rem 1.5rem;
          margin-bottom: 2rem;
          border-radius: 1.25rem;
          background: var(--surface-color);
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .header-actions {
          display: flex;
          align-items: center;
          gap: 1.5rem;
        }

        .export-btn {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.6rem 1.25rem;
          font-size: 0.85rem;
          font-weight: 700;
          border-radius: 0.75rem;
        }

        .user-profile {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding-left: 1.5rem;
          border-left: 1px solid rgba(255, 255, 255, 0.1);
          position: relative;
          cursor: pointer;
        }

        .user-info {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          line-height: 1.2;
        }

        .user-name {
          font-size: 0.85rem;
          font-weight: 700;
          color: var(--text-primary);
        }

        .user-email {
          font-size: 0.7rem;
          color: var(--text-secondary);
        }

        .user-avatar {
          width: 40px;
          height: 40px;
          border-radius: 12px;
          border: 2px solid rgba(255, 255, 255, 0.1);
          object-fit: cover;
        }

        .profile-dropdown {
          position: absolute;
          top: 120%;
          right: 0;
          width: 160px;
          padding: 0.5rem;
          opacity: 0;
          visibility: hidden;
          transform: translateY(10px);
          transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
          z-index: 100;
          border-radius: 1rem;
          border: 1px solid rgba(255, 255, 255, 0.05);
        }

        .user-profile:hover .profile-dropdown {
          opacity: 1;
          visibility: visible;
          transform: translateY(0);
        }

        .logout-btn {
          width: 100%;
          padding: 0.75rem;
          border-radius: 0.75rem;
          color: #ef4444;
          font-weight: 700;
          font-size: 0.85rem;
          text-align: left;
          transition: background 0.2s;
          background: transparent;
        }

        .logout-btn:hover {
          background: rgba(239, 68, 68, 0.1);
        }

        @media (max-width: 768px) {
          .action-bar { padding: 0.75rem 1rem; }
          .export-btn span { display: none; }
          .export-btn { padding: 0.6rem; }
          .user-info { display: none; }
        }
      `}</style>
    </header>
  );
};

export default Header;
