import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, AlertCircle, CheckCircle2 } from 'lucide-react';

const ResultsDisplay = ({ results }) => {
  if (!results) return null;

  const { percentage, status, statusColor } = results;
  const isGood = statusColor === 'success';

  return (
    <motion.section 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="results-section glass"
    >
      <div className="percentage-container">
        <div className={`percentage-circle ${statusColor}`}>
          <span className="number">{percentage}%</span>
          <span className="label">Attendance</span>
        </div>
      </div>

      <div className="status-box">
        <div className={`status-badge ${statusColor}`}>
          {isGood ? <CheckCircle2 size={18} /> : <AlertCircle size={18} />}
          <span>{status}</span>
        </div>
        <p className="status-description">
          {isGood 
            ? "Keep it up! You are above the recommended threshold." 
            : "Your attendance is below 75%. You might need to attend more classes."}
        </p>
      </div>

      <style jsx="true">{`
        .results-section {
          padding: 2rem;
          margin-bottom: 2rem;
          display: grid;
          grid-template-columns: 1fr 1.5fr;
          gap: 2rem;
          align-items: center;
        }
        .percentage-container {
          display: flex;
          justify-content: center;
        }
        .percentage-circle {
          width: 140px;
          height: 140px;
          border-radius: 50%;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          border: 8px solid rgba(0, 0, 0, 0.05);
          position: relative;
        }
        [data-theme='dark'] .percentage-circle {
          border-color: rgba(255, 255, 255, 0.05);
        }
        .percentage-circle.success {
          border-top-color: var(--success);
          border-right-color: var(--success);
        }
        .percentage-circle.warning {
          border-top-color: var(--warning);
          border-right-color: var(--warning);
          border-bottom-color: var(--warning);
        }
        .percentage-circle.danger {
          border-top-color: var(--danger);
        }
        .number {
          font-size: 1.75rem;
          font-weight: 700;
          color: var(--text-primary);
        }
        .label {
          font-size: 0.75rem;
          color: var(--text-secondary);
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }
        .status-box {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }
        .status-badge {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.5rem 1rem;
          border-radius: 2rem;
          font-weight: 600;
          width: fit-content;
        }
        .status-badge.success {
          background: rgba(16, 185, 129, 0.1);
          color: var(--success);
        }
        .status-badge.warning {
          background: rgba(245, 158, 11, 0.1);
          color: var(--warning);
        }
        .status-badge.danger {
          background: rgba(239, 68, 68, 0.1);
          color: var(--danger);
        }
        .status-description {
          color: var(--text-secondary);
          line-height: 1.5;
        }
        @media (max-width: 640px) {
          .results-section {
            grid-template-columns: 1fr;
            text-align: center;
          }
          .status-badge {
            margin: 0 auto;
          }
        }
      `}</style>
    </motion.section>
  );
};

export default ResultsDisplay;
