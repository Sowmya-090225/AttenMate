import React from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { subjectColors } from '../utils/colorUtils';

const ColorPicker = ({ selectedColor, onSelect }) => {
  return (
    <div className="color-picker">
      <label className="picker-label">Choose Theme</label>
      <div className="color-options">
        {subjectColors.map((color) => (
          <motion.button
            key={color.id}
            type="button"
            whileHover={{ scale: 1.15 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => onSelect(color.id)}
            className={`color-circle ${selectedColor === color.id ? 'active' : ''}`}
            style={{ 
              backgroundColor: color.color,
              '--glow': color.glow 
            }}
            title={color.label}
          >
            {selectedColor === color.id && (
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              >
                <Check size={14} color="white" strokeWidth={3} />
              </motion.div>
            )}
          </motion.button>
        ))}
      </div>

      <style jsx="true">{`
        .color-picker {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
          margin-top: 0.5rem;
        }
        .picker-label {
          font-size: 0.85rem;
          color: var(--text-secondary);
          font-weight: 500;
        }
        .color-options {
          display: flex;
          flex-wrap: wrap;
          gap: 0.75rem;
        }
        .color-circle {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          border: 2px solid transparent;
          transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
        }
        .color-circle.active {
          border-color: white;
          box-shadow: 0 0 15px var(--glow);
          transform: scale(1.1);
        }
        [data-theme='dark'] .color-circle.active {
          border-color: rgba(255, 255, 255, 0.5);
        }
      `}</style>
    </div>
  );
};

export default ColorPicker;
