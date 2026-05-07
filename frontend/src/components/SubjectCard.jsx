import React, { useEffect, useState } from 'react';
import { Check, X, Trash2, Info } from 'lucide-react';
import { calculateAttendance } from '../utils/attendanceUtils';
import { getColorConfig } from '../utils/colorUtils';
import { motion, animate } from 'framer-motion';

const AnimatedNumber = ({ value }) => {
  const [displayValue, setDisplayValue] = useState(value);

  useEffect(() => {
    const controls = animate(displayValue, value, {
      duration: 1,
      onUpdate: (latest) => setDisplayValue(Math.round(latest))
    });
    return () => controls.stop();
  }, [value]);

  return <span>{displayValue}%</span>;
};

const SubjectCard = ({ subject, onMark, onDelete }) => {
  const { percentage, statusColor } = calculateAttendance(subject.attended, subject.total);
  const colorConfig = getColorConfig(subject.color || 'blue');
  
  // SVG Progress Ring Constants
  const radius = 30;
  const stroke = 6;
  const normalizedRadius = radius - stroke * 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <motion.div 
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ 
        y: -5, 
        boxShadow: `0 20px 25px -5px ${colorConfig.glow}, 0 8px 10px -6px ${colorConfig.glow}`,
        borderColor: colorConfig.color
      }}
      className="subject-card glass"
      style={{ 
        '--subject-color': colorConfig.color,
        '--subject-glow': colorConfig.glow,
        '--subject-bg': colorConfig.bg,
        '--subject-secondary': colorConfig.secondary
      }}
    >
      <div className="card-header">
        <div className="name-wrapper">
          <div className="color-tag" style={{ backgroundColor: colorConfig.color }}></div>
          <h3 className="subject-name">{subject.name}</h3>
        </div>
        <button className="delete-mini" onClick={() => onDelete(subject.id)} aria-label="Delete subject">
          <Trash2 size={14} />
        </button>
      </div>

      <div className="card-body">
        <div className="progress-container">
          <svg height={radius * 2} width={radius * 2}>
            <circle
              stroke="rgba(0,0,0,0.05)"
              fill="transparent"
              strokeWidth={stroke}
              r={normalizedRadius}
              cx={radius}
              cy={radius}
            />
            <motion.circle
              className="progress-ring-custom"
              stroke={colorConfig.color}
              strokeDasharray={circumference + ' ' + circumference}
              animate={{ strokeDashoffset }}
              transition={{ duration: 1, ease: "easeOut" }}
              strokeWidth={stroke}
              strokeLinecap="round"
              fill="transparent"
              r={normalizedRadius}
              cx={radius}
              cy={radius}
            />
          </svg>
          <div className="perc-text" style={{ color: colorConfig.color }}>
            <AnimatedNumber value={percentage} />
          </div>
        </div>

        <div className="stats-mini">
          <div className="stat-item">
            <span className="stat-label">Attended</span>
            <span className="stat-value">{subject.attended}</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">Total</span>
            <span className="stat-value">{subject.total}</span>
          </div>
        </div>
      </div>

      <div className="card-actions">
        <motion.button 
          whileTap={{ scale: 0.95 }}
          className="action-btn present-custom" 
          onClick={() => onMark(subject.id, 'present')}
          title="Mark Present"
        >
          <Check size={18} />
          <span>Present</span>
        </motion.button>
        <motion.button 
          whileTap={{ scale: 0.95 }}
          className="action-btn absent-custom" 
          onClick={() => onMark(subject.id, 'absent')}
          title="Mark Absent"
        >
          <X size={18} />
          <span>Absent</span>
        </motion.button>
      </div>

      <style jsx="true">{`
        .subject-card {
          padding: 1.25rem;
          display: flex;
          flex-direction: column;
          gap: 1rem;
          background: var(--surface-color);
          border-radius: 1.5rem;
          border: 1px solid var(--glass-border);
          box-shadow: var(--shadow);
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          position: relative;
          overflow: hidden;
        }
        
        .subject-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: radial-gradient(circle at top right, var(--subject-bg), transparent 70%);
          opacity: 0.5;
          pointer-events: none;
        }

        .card-header { display: flex; justify-content: space-between; align-items: flex-start; position: relative; z-index: 1; }
        .name-wrapper { display: flex; align-items: center; gap: 0.75rem; }
        .color-tag { width: 8px; height: 8px; border-radius: 50%; box-shadow: 0 0 8px var(--subject-color); }
        .subject-name { font-size: 1.1rem; font-weight: 700; color: var(--text-primary); }
        
        .delete-mini { background: transparent; color: var(--text-secondary); opacity: 0.4; transition: opacity 0.2s; position: relative; z-index: 2; }
        .delete-mini:hover { opacity: 1; color: var(--danger); }
        
        .card-body { display: flex; align-items: center; gap: 1.5rem; position: relative; z-index: 1; }
        .progress-container { position: relative; display: flex; align-items: center; justify-content: center; }
        .perc-text { position: absolute; font-size: 0.85rem; font-weight: 800; }
        .progress-ring-custom { filter: drop-shadow(0 0 4px var(--subject-glow)); }
        
        .stats-mini { display: flex; flex-direction: column; gap: 0.25rem; }
        .stat-item { display: flex; justify-content: space-between; gap: 1rem; font-size: 0.85rem; }
        .stat-label { color: var(--text-secondary); font-weight: 500; }
        .stat-value { font-weight: 700; color: var(--text-primary); }

        .card-actions { display: grid; grid-template-columns: 1fr 1fr; gap: 0.75rem; position: relative; z-index: 1; }
        .action-btn { display: flex; align-items: center; justify-content: center; gap: 0.4rem; padding: 0.7rem; border-radius: 1rem; font-size: 0.85rem; font-weight: 700; transition: all 0.2s; }
        
        .action-btn.present-custom { 
          background: var(--subject-bg); 
          color: var(--subject-color); 
          border: 1px solid transparent;
        }
        .action-btn.present-custom:hover { 
          background: var(--subject-color); 
          color: white; 
          box-shadow: 0 4px 12px var(--subject-glow);
        }
        
        .action-btn.absent-custom { 
          background: rgba(0, 0, 0, 0.05); 
          color: var(--text-secondary); 
          border: 1px solid transparent;
        }
        .action-btn.absent-custom:hover { 
          background: var(--text-primary); 
          color: var(--bg-color); 
        }

        [data-theme='dark'] .action-btn.absent-custom { background: rgba(255, 255, 255, 0.05); }
        [data-theme='dark'] circle { stroke: rgba(255,255,255,0.03); }
      `}</style>
    </motion.div>
  );
};

export default SubjectCard;

