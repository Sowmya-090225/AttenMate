import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  User, 
  Bell, 
  Palette, 
  Shield, 
  Info, 
  LogOut,
  ChevronLeft,
  Settings as SettingsIcon,
  LayoutDashboard,
  RefreshCw,
  Moon,
  Sun,
  Share2,
  Download,
  Trash2,
  Camera,
  Loader2,
  Monitor,
  Calendar,
  AlertCircle,
  Megaphone,
  BarChart3,
  Mail,
  ChevronRight,
  Globe,
  LayoutGrid,
  Pencil
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

// --- CLEAN & SLEEK REUSABLE COMPONENTS ---

const ProfileAvatar = ({ src, name, onUpload, loading, size = 'w-32 h-32' }) => {
  const fileInputRef = useRef(null);
  const sizeClasses = size;
  return (
    <div className="flex flex-col items-center gap-6 shrink-0">
      <div 
        className="relative group cursor-pointer"
        onClick={() => !loading && fileInputRef.current?.click()}
      >
        <div className={`${sizeClasses} rounded-full p-[3.5px] bg-gradient-to-tr from-[#6366f1] via-[#a855f7] to-[#ec4899] shadow-[0_0_30px_rgba(99,102,241,0.4)] group-hover:scale-105 transition-all duration-500`}>
          <div className="w-full h-full rounded-full overflow-hidden relative border-[3px] border-white/20 bg-slate-800 flex items-center justify-center">
            {src ? (
              <img src={src} alt={name} className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full bg-indigo-500/10 flex items-center justify-center text-indigo-400">
                <User size={48} />
              </div>
            )}
            {loading && (
              <div className="absolute inset-0 bg-slate-950/60 backdrop-blur-sm flex items-center justify-center z-10">
                <Loader2 className="animate-spin text-white" size={24} />
              </div>
            )}
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity duration-300">
               <Camera size={24} className="text-white" />
            </div>
          </div>
        </div>
      </div>
      <input type="file" ref={fileInputRef} onChange={(e) => e.target.files[0] && onUpload(e.target.files[0])} className="hidden" accept="image/*" />
    </div>
  );
};

const SettingsCard = ({ title, subtitle, children, headerAction }) => (
  <div className="bg-[#0b1120] border border-white/5 rounded-[2rem] p-8 mb-8 shadow-2xl overflow-hidden">
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 mb-12">
      <div>
        <h3 className="text-2xl font-bold text-white tracking-tight">{title}</h3>
        <p className="text-base text-slate-500 mt-1 font-medium">{subtitle}</p>
      </div>
      {headerAction && <div className="w-full sm:w-auto">{headerAction}</div>}
    </div>
    {children}
  </div>
);

const CustomSelect = ({ label, options, defaultValue, icon: Icon, subtext, footerText }) => (
  <div className="space-y-3">
    <label className="text-sm font-bold text-white tracking-tight ml-1">{label}</label>
    {subtext && <p className="text-xs text-slate-500 ml-1 -mt-1 font-medium">{subtext}</p>}
    <div className="relative group">
      {Icon && <div className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-400 transition-colors"><Icon size={18} /></div>}
      <select className={`w-full h-[60px] bg-slate-900/50 border border-white/5 rounded-2xl ${Icon ? 'pl-14' : 'px-6'} pr-12 text-white text-[15px] font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500/40 appearance-none cursor-pointer transition-all hover:bg-slate-900/80`}>
        {options.map(opt => <option key={opt} className="bg-slate-900 font-medium">{opt}</option>)}
      </select>
      <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none text-slate-500">
        <ChevronRight size={18} className="rotate-90" />
      </div>
    </div>
    {footerText && <p className="text-xs text-slate-500 ml-1 font-medium">{footerText}</p>}
  </div>
);

// --- MAIN DASHBOARD ---

const SettingsDashboard = ({ isOpen, onClose, theme, toggleTheme, settings, onUpdateSettings }) => {
  const { user, updateUserInfo, deleteUserAccount } = useAuth();
  const [isUpdating, setIsUpdating] = useState(false);

  if (!isOpen) return null;

  const handleAvatarUpload = async (file) => {
    setIsUpdating(true);
    try {
      await updateUserInfo({ displayName: user.displayName, photoFile: file });
    } finally {
      setIsUpdating(false);
    }
  };

  const handleDeleteAccount = async () => {
    if (window.confirm("Are you sure you want to delete your account? This action cannot be undone.")) {
      try {
        await deleteUserAccount();
        onClose();
      } catch (err) {
        // Error handled in context
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div className="min-h-screen bg-[#0b1120] text-slate-200 flex flex-col items-center py-16 px-6 md:px-20 relative overflow-x-hidden">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-[1000px] bg-transparent relative z-10"
      >
        <header className="w-full flex items-center justify-between mb-28">
          <div className="space-y-4">
            <h1 className="text-8xl font-black text-[#ffffff] tracking-tighter leading-none">Profile Settings</h1>
            <p className="text-2xl text-[#cbd5e1] font-medium tracking-tight">Manage your digital identity and account appearance</p>
          </div>
          <button onClick={onClose} className="w-20 h-20 rounded-[2rem] bg-[#1e293b] border-2 border-white/20 flex items-center justify-center text-white hover:bg-[#334155] transition-all shadow-2xl group">
            <ChevronLeft size={36} className="group-hover:-translate-x-2 transition-transform" />
          </button>
        </header>

        <div className="w-full flex flex-col lg:flex-row items-center lg:items-start gap-32 lg:gap-40 py-12">
          <div className="shrink-0 mb-20 lg:mb-0">
             <ProfileAvatar 
               src={user?.photoURL} 
               name={user?.displayName} 
               onUpload={handleAvatarUpload} 
               loading={isUpdating}
               size="w-56 h-56 lg:w-72 lg:h-72" 
             />
          </div>
          
          <div className="flex-1 space-y-24 text-center lg:text-left pt-10">
            <div className="space-y-12">
              <div className="inline-block px-6 py-2 rounded-full bg-indigo-500/20 border border-indigo-400/30">
                <p className="text-sm font-black text-[#818cf8] uppercase tracking-[0.6em]">Active Account Profile</p>
              </div>
              <h2 className="text-8xl font-bold text-[#ffffff] tracking-tight leading-tight">{user?.displayName || 'User'}</h2>
              <div className="inline-flex items-center gap-6 px-10 py-5 rounded-[2.5rem] bg-[#1e293b] border-2 border-white/10 mt-10 shadow-2xl">
                 <div className="w-4 h-4 rounded-full bg-[#10b981] shadow-[0_0_20px_#10b981]" />
                 <p className="text-2xl font-bold text-[#f1f5f9] tracking-tight">{user?.email}</p>
              </div>
            </div>

            <div className="w-full h-px bg-gradient-to-r from-white/20 to-transparent" />

            <div className="flex flex-col sm:flex-row gap-10 pt-10">
              <button 
                onClick={onClose}
                className="px-14 py-7 bg-[#6366f1] hover:bg-[#4f46e5] text-white rounded-[2rem] font-black text-lg tracking-[0.1em] transition-all shadow-[0_25px_60px_rgba(99,102,241,0.4)] active:scale-95 group flex items-center justify-center gap-4"
              >
                <span>SAVE & RETURN</span>
                <ChevronRight size={22} className="group-hover:translate-x-1 transition-transform" />
              </button>
              
              <button 
                onClick={onClose}
                className="px-14 py-7 bg-[#1e293b] border-2 border-white/10 text-[#cbd5e1] rounded-[2rem] font-black text-lg tracking-[0.1em] hover:bg-[#334155] hover:text-white transition-all flex items-center justify-center shadow-xl"
              >
                DISCARD CHANGES
              </button>
            </div>

            <div className="pt-24 border-t border-white/5">
              <button 
                onClick={handleDeleteAccount}
                className="px-8 py-4 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-500 font-bold text-sm tracking-widest hover:bg-red-500 hover:text-white transition-all shadow-[0_0_20px_rgba(239,68,68,0.15)] hover:shadow-[0_0_30px_rgba(239,68,68,0.4)] group flex items-center gap-3 active:scale-95"
              >
                <Trash2 size={18} className="group-hover:rotate-12 transition-transform" />
                <span>DELETE ACCOUNT PERMANENTLY</span>
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default SettingsDashboard;
