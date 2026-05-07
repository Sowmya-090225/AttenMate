import React from 'react';
import { Target, ArrowRight } from 'lucide-react';
import { calculateRequirement } from '../utils/attendanceUtils';

const RequirementCalculator = ({ attended, total }) => {
  const target = 75;
  const needed = calculateRequirement(attended, total, target);
  const currentPercentage = total > 0 ? (attended / total) * 100 : 0;

  if (currentPercentage >= target) {
    return (
      <section className="requirement-section glass success">
        <div className="req-header">
          <Target size={20} />
          <h3>Target: {target}%</h3>
        </div>
        <p>You have already achieved your target attendance. Keep it up!</p>
        <style jsx="true">{`
          .requirement-section { padding: 1.5rem; margin-bottom: 2rem; border-left: 4px solid var(--success); }
          .req-header { display: flex; align-items: center; gap: 0.75rem; margin-bottom: 0.5rem; color: var(--success); }
          h3 { font-size: 1.1rem; }
        `}</style>
      </section>
    );
  }

  return (
    <section className="requirement-section glass info">
      <div className="req-header">
        <Target size={20} />
        <h3>How to reach {target}%?</h3>
      </div>
      <div className="req-content">
        <div className="needed-count">
          <span>You need to attend</span>
          <span className="count-badge">{needed}</span>
          <span>more classes consecutively.</span>
        </div>
        <div className="math-preview">
          <span>{attended} / {total}</span>
          <ArrowRight size={14} />
          <span>{attended + needed} / {total + needed}</span>
          <span className="final-perc">({target}%)</span>
        </div>
      </div>

      <style jsx="true">{`
        .requirement-section {
          padding: 1.5rem;
          margin-bottom: 2rem;
          border-left: 4px solid var(--accent-primary);
        }
        .req-header {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          margin-bottom: 1rem;
          color: var(--accent-primary);
        }
        h3 {
          font-size: 1.1rem;
        }
        .req-content {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }
        .needed-count {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          flex-wrap: wrap;
          font-weight: 500;
        }
        .count-badge {
          background: var(--accent-primary);
          color: white;
          padding: 0.25rem 0.75rem;
          border-radius: 0.5rem;
          font-size: 1.25rem;
          font-weight: 700;
        }
        .math-preview {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          font-size: 0.875rem;
          color: var(--text-secondary);
          background: rgba(0, 0, 0, 0.03);
          padding: 0.5rem 1rem;
          border-radius: 0.5rem;
          width: fit-content;
        }
        [data-theme='dark'] .math-preview {
          background: rgba(255, 255, 255, 0.03);
        }
        .final-perc {
          font-weight: 600;
          color: var(--text-primary);
        }
      `}</style>
    </section>
  );
};

export default RequirementCalculator;
