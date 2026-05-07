import React from 'react';
import { History, Trash2, Calendar } from 'lucide-react';

const HistoryDashboard = ({ history, onDelete }) => {
  if (!history || history.length === 0) {
    return (
      <section className="history-section glass empty">
        <div className="section-header">
          <History size={20} />
          <h2>History</h2>
        </div>
        <p className="empty-msg">No calculations saved yet.</p>
        <style jsx="true">{`
          .history-section { padding: 2rem; margin-bottom: 2rem; }
          .section-header { display: flex; align-items: center; gap: 0.75rem; margin-bottom: 1rem; }
          .empty-msg { color: var(--text-secondary); text-align: center; padding: 2rem 0; }
        `}</style>
      </section>
    );
  }

  return (
    <section className="history-section glass">
      <div className="section-header">
        <History size={20} />
        <h2>History</h2>
      </div>
      
      <div className="history-list">
        {history.map((item) => (
          <div key={item.id} className="history-item">
            <div className="item-info">
              <div className="item-main">
                <span className={`item-perc ${item.percentage >= 75 ? 'success' : 'danger'}`}>
                  {item.percentage}%
                </span>
                <span className="item-ratio">{item.attended} / {item.total}</span>
              </div>
              <div className="item-meta">
                <Calendar size={12} />
                <span>{new Date(item.created_at).toLocaleDateString()}</span>
              </div>
            </div>
            
            <button 
              className="delete-btn" 
              onClick={() => onDelete(item.id)}
              aria-label="Delete record"
            >
              <Trash2 size={16} />
            </button>
          </div>
        ))}
      </div>

      <style jsx="true">{`
        .history-section {
          padding: 2rem;
          margin-bottom: 2rem;
        }
        .section-header {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          margin-bottom: 1.5rem;
        }
        h2 {
          font-size: 1.25rem;
        }
        .history-list {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }
        .history-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1rem;
          background: rgba(0, 0, 0, 0.03);
          border-radius: 1rem;
          transition: transform 0.2s ease;
        }
        [data-theme='dark'] .history-item {
          background: rgba(255, 255, 255, 0.03);
        }
        .history-item:hover {
          transform: scale(1.02);
        }
        .item-main {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin-bottom: 0.25rem;
        }
        .item-perc {
          font-weight: 700;
          font-size: 1.1rem;
        }
        .item-perc.success { color: var(--success); }
        .item-perc.danger { color: var(--danger); }
        .item-ratio {
          color: var(--text-secondary);
          font-size: 0.9rem;
        }
        .item-meta {
          display: flex;
          align-items: center;
          gap: 0.4rem;
          font-size: 0.75rem;
          color: var(--text-secondary);
        }
        .delete-btn {
          background: transparent;
          color: var(--text-secondary);
          padding: 0.5rem;
          border-radius: 0.5rem;
        }
        .delete-btn:hover {
          color: var(--danger);
          background: rgba(239, 68, 68, 0.1);
        }
      `}</style>
    </section>
  );
};

export default HistoryDashboard;
