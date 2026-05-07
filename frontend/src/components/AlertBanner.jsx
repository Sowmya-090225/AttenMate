import React from 'react';
import { Bell, AlertTriangle, AlarmClock, XCircle, Info, ChevronRight, ChevronLeft } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const IconMap = {
  Bell: Bell,
  AlertTriangle: AlertTriangle,
  AlarmClock: AlarmClock
};

const AlertBanner = ({ alerts }) => {
  if (!alerts || alerts.length === 0) return null;

  return (
    <div className="alert-banner-container">
      <AnimatePresence>
        {alerts.map((alert) => (
          <motion.div
            key={alert.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className={`alert-card ${alert.type}`}
          >
            <div className="alert-content">
              <div className="alert-icon">
                {React.createElement(IconMap[alert.icon] || Info, { size: 18 })}
              </div>
              <p className="alert-message">{alert.message}</p>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>

      <style jsx="true">{`
        .alert-banner-container {
          margin-bottom: 2rem;
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }
        .alert-card {
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 1rem 1.5rem;
          border-radius: 1rem;
          box-shadow: var(--shadow);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.1);
        }
        .alert-content {
          display: flex;
          align-items: center;
          gap: 1rem;
          max-width: 800px;
        }
        .alert-message {
          font-size: 0.95rem;
          font-weight: 600;
        }
        
        /* Alert Types */
        .alert-card.info {
          background: rgba(99, 102, 241, 0.15);
          color: var(--accent-primary);
          border-color: rgba(99, 102, 241, 0.2);
        }
        .alert-card.warning {
          background: rgba(245, 158, 11, 0.15);
          color: var(--warning);
          border-color: rgba(245, 158, 11, 0.2);
        }
        .alert-card.critical {
          background: rgba(239, 68, 68, 0.15);
          color: var(--danger);
          border-color: rgba(239, 68, 68, 0.2);
          animation: pulse 2s infinite;
        }

        @keyframes pulse {
          0% { transform: scale(1); }
          50% { transform: scale(1.02); }
          100% { transform: scale(1); }
        }

        [data-theme='dark'] .alert-card {
          border-color: rgba(255, 255, 255, 0.05);
        }
      `}</style>
    </div>
  );
};

export default AlertBanner;
