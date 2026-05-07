import React, { useState } from 'react';
import { X, Plus } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import ColorPicker from './ColorPicker';

const AddSubjectModal = ({ isOpen, onClose, onAdd }) => {
  const [name, setName] = useState('');
  const [attended, setAttended] = useState('0');
  const [total, setTotal] = useState('0');
  const [selectedColor, setSelectedColor] = useState('blue');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const numAttended = Number(attended);
    const numTotal = Number(total);

    if (numTotal < numAttended) {
      setError('Total classes cannot be less than attended classes.');
      return;
    }

    if (name.trim()) {
      onAdd({
        name: name.trim(),
        attended: numAttended,
        total: numTotal,
        color: selectedColor
      });
      setName('');
      setAttended('0');
      setTotal('0');
      setSelectedColor('blue');
      setError('');
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="modal-overlay"
            onClick={onClose}
          />
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="modal-container glass"
          >
            <div className="modal-header">
              <h2>Add New Subject</h2>
              <button onClick={onClose} aria-label="Close modal"><X size={20} /></button>
            </div>
            
            <form onSubmit={handleSubmit}>
              <div className="input-group">
                <label>Subject Name</label>
                <input 
                  type="text" 
                  placeholder="e.g. Mathematics" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  autoFocus
                />
              </div>
              
              <div className="input-row">
                <div className="input-group">
                  <label>Initial Attended</label>
                  <input 
                    type="number" 
                    value={attended}
                    onChange={(e) => setAttended(e.target.value)}
                    min="0"
                  />
                </div>
                <div className="input-group">
                  <label>Initial Total</label>
                  <input 
                    type="number" 
                    value={total}
                    onChange={(e) => setTotal(e.target.value)}
                    min="0"
                  />
                </div>
              </div>

              <ColorPicker 
                selectedColor={selectedColor} 
                onSelect={setSelectedColor} 
              />

              <AnimatePresence>
                {error && (
                  <motion.div 
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="error-message"
                  >
                    {error}
                  </motion.div>
                )}
              </AnimatePresence>

              <button type="submit" className="btn-primary add-btn">
                <Plus size={18} />
                <span>Create Subject</span>
              </button>
            </form>
          </motion.div>
        </>
      )}

      <style jsx="true">{`
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.4);
          backdrop-filter: blur(4px);
          z-index: 1000;
        }
        .modal-container {
          position: fixed;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 90%;
          max-width: 450px;
          padding: 2rem;
          z-index: 1001;
          border-radius: 2rem;
        }
        .modal-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 2rem;
        }
        h2 { font-size: 1.25rem; }
        form { display: flex; flex-direction: column; gap: 1.5rem; }
        .input-row { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; }
        .input-group { display: flex; flex-direction: column; gap: 0.5rem; }
        label { font-size: 0.85rem; color: var(--text-secondary); font-weight: 500; }
        .error-message {
          color: var(--danger);
          font-size: 0.8rem;
          font-weight: 500;
          padding: 0.5rem;
          background: rgba(239, 68, 68, 0.1);
          border-radius: 0.5rem;
          text-align: center;
        }
        .add-btn { display: flex; align-items: center; justify-content: center; gap: 0.5rem; margin-top: 0.5rem; }
      `}</style>
    </AnimatePresence>
  );
};

export default AddSubjectModal;
