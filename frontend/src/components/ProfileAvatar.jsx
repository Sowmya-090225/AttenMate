import React, { useRef, useState } from 'react';
import { Camera, User, Trash2, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const ProfileAvatar = ({ src, name, onUpload, onRemove, loading }) => {
  const fileInputRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      onUpload(file);
    }
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <div 
        className="relative group"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Avatar Container */}
        <div className="w-24 h-24 rounded-full overflow-hidden relative border-4 border-white/5 shadow-2xl bg-slate-800 flex items-center justify-center">
          {src ? (
            <img 
              src={src} 
              alt={name} 
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
            />
          ) : (
            <div className="w-full h-full bg-indigo-500/20 flex items-center justify-center text-indigo-400">
              <User size={40} />
            </div>
          )}

          {/* Loading State Overlay */}
          {loading && (
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-10">
              <Loader2 className="w-6 h-6 text-white animate-spin" />
            </div>
          )}
        </div>

        {/* Camera Action Button (Bottom Right) */}
        {!loading && (
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => fileInputRef.current?.click()}
            className="absolute bottom-0 right-0 w-8 h-8 bg-indigo-500 text-white rounded-full flex items-center justify-center shadow-lg border-2 border-[#0b1120] z-20 hover:bg-indigo-600 transition-colors"
          >
            <Camera size={14} />
          </motion.button>
        )}

        {/* Floating Remove Button (Top Right) */}
        {src && !loading && isHovered && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={onRemove}
            className="absolute -top-1 -right-1 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center shadow-md border border-red-400/20 z-20"
            title="Remove Photo"
          >
            <Trash2 size={10} />
          </motion.button>
        )}
      </div>

      <input 
        type="file" 
        ref={fileInputRef} 
        onChange={handleFileChange} 
        className="hidden" 
        accept="image/*"
      />
    </div>
  );
};

export default ProfileAvatar;
