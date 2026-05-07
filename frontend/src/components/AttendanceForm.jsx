import React, { useState } from 'react';
import { Calculator } from 'lucide-react';

const AttendanceForm = ({ onCalculate }) => {
  const [total, setTotal] = useState('');
  const [attended, setAttended] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (total && attended) {
      onCalculate(Number(attended), Number(total));
    }
  };

  return (
    <section className="calculator-section glass">
      <h2>Calculate Attendance</h2>
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <label htmlFor="totalClasses">Total Classes Held</label>
          <input
            id="totalClasses"
            type="number"
            placeholder="e.g. 50"
            value={total}
            onChange={(e) => setTotal(e.target.value)}
            required
            min="1"
          />
        </div>
        
        <div className="input-group">
          <label htmlFor="attendedClasses">Classes Attended</label>
          <input
            id="attendedClasses"
            type="number"
            placeholder="e.g. 38"
            value={attended}
            onChange={(e) => setAttended(e.target.value)}
            required
            min="0"
          />
        </div>

        <button type="submit" className="btn-primary calculate-btn">
          <Calculator size={18} />
          <span>Calculate</span>
        </button>
      </form>

      <style jsx="true">{`
        .calculator-section {
          padding: 2rem;
          margin-bottom: 2rem;
        }
        h2 {
          font-size: 1.25rem;
          margin-bottom: 1.5rem;
          color: var(--text-primary);
        }
        form {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }
        .input-group {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }
        label {
          font-size: 0.875rem;
          font-weight: 500;
          color: var(--text-secondary);
        }
        .calculate-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.75rem;
          margin-top: 0.5rem;
        }
      `}</style>
    </section>
  );
};

export default AttendanceForm;
