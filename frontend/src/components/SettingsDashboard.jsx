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
  ChevronRight
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

// --- CLEAN & SLEEK REUSABLE COMPONENTS ---

const ProfileAvatar = ({ src, name, onUpload, loading }) => {
  const fileInputRef = useRef(null);
  return (
    <div className="flex flex-col items-center gap-4 shrink-0">
      <div className="relative group">
        <div className="w-28 h-28 rounded-full overflow-hidden relative border-4 border-white/5 shadow-[0_20px_50px_rgba(0,0,0,0.3)] bg-slate-800 flex items-center justify-center transition-all duration-500 group-hover:border-indigo-500/30">
          {src ? (
            <img src={src} alt={name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
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
        </div>
        {!loading && (
          <button 
            onClick={() => fileInputRef.current?.click()}
            className="absolute bottom-1 right-1 w-9 h-9 bg-indigo-500 text-white rounded-full flex items-center justify-center shadow-lg border-4 border-[#0b1120] z-20 hover:bg-indigo-600 hover:scale-110 transition-all active:scale-95"
          >
            <Camera size={16} />
          </button>
        )}
      </div>
      <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Avatar</p>
      <input type="file" ref={fileInputRef} onChange={(e) => e.target.files[0] && onUpload(e.target.files[0])} className="hidden" accept="image/*" />
    </div>
  );
};

const SettingsCard = ({ title, subtitle, children, headerAction }) => (
  <div className="bg-slate-900/40 backdrop-blur-3xl border border-white/5 rounded-[2.5rem] p-10 mb-8 shadow-2xl transition-all hover:bg-slate-900/50 hover:border-white/10">
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 mb-10">
      <div>
        <h3 className="text-xl font-black text-white tracking-tight">{title}</h3>
        <p className="text-sm text-slate-500 mt-1 font-medium">{subtitle}</p>
      </div>
      {headerAction && <div className="w-full sm:w-auto">{headerAction}</div>}
    </div>
    {children}
  </div>
);

const CustomSelect = ({ label, options, defaultValue }) => (
  <div className="space-y-2">
    <label className="text-[11px] font-black text-slate-500 uppercase tracking-[0.15em] ml-1">{label}</label>
    <div className="relative group">
      <select className="w-full h-14 bg-slate-950/50 border border-white/5 rounded-2xl px-6 text-white text-sm font-bold focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500/30 appearance-none cursor-pointer transition-all hover:bg-slate-950/80">
        {options.map(opt => <option key={opt} className="bg-slate-900">{opt}</option>)}
      </select>
      <ChevronRight size={18} className="absolute right-6 top-1/2 -translate-y-1/2 rotate-90 text-slate-600 group-hover:text-indigo-400 transition-colors pointer-events-none" />
    </div>
  </div>
);

// --- MAIN DASHBOARD ---

const SettingsDashboard = ({ isOpen, onClose, theme, toggleTheme, settings, onUpdateSettings }) => {
  const { user, updateUserInfo, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('account');
  const [displayName, setDisplayName] = useState(user?.displayName || '');
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    if (user) setDisplayName(user.displayName || '');
  }, [user]);

  if (!isOpen) return null;

  const handleAvatarUpload = async (file) => {
    setIsUpdating(true);
    try {
      await updateUserInfo({ displayName, photoFile: file });
    } finally {
      setIsUpdating(false);
    }
  };

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'account', label: 'Account', icon: User },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'appearance', label: 'Appearance', icon: Palette },
    { id: 'subjects', label: 'Subjects', icon: Info },
    { id: 'privacy', label: 'Data & Privacy', icon: Shield },
    { id: 'sync', label: 'Backup & Sync', icon: RefreshCw },
    { id: 'about', label: 'About', icon: Info },
  ];

  return (
    <div className="fixed inset-0 z-[10000] bg-[#0b1120] flex flex-col md:flex-row overflow-hidden text-slate-200">
      {/* Sleek Sidebar */}
      <aside className="w-full md:w-[320px] border-r border-white/5 bg-[#0b1120] flex flex-col flex-shrink-0 z-50">
        <div className="p-10 flex-1 flex flex-col">
          <div className="flex items-center gap-4 mb-14 group cursor-pointer" onClick={onClose}>
            <div className="w-12 h-12 bg-indigo-600 rounded-2xl flex items-center justify-center shadow-[0_10px_30px_rgba(79,70,229,0.4)] group-hover:scale-110 transition-transform">
              <Share2 size={24} className="text-white" />
            </div>
            <h2 className="text-2xl font-black text-white tracking-tighter">AttenMate</h2>
          </div>

          <nav className="space-y-2">
            <p className="text-[10px] font-black text-slate-600 uppercase tracking-[0.3em] ml-5 mb-6">Application</p>
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => item.id === 'dashboard' ? onClose() : setActiveTab(item.id)}
                className={`w-full flex items-center gap-4 px-5 py-4 rounded-[1.25rem] transition-all duration-300 group ${
                  activeTab === item.id 
                    ? 'bg-indigo-600 text-white shadow-[0_15px_30px_rgba(79,70,229,0.25)]' 
                    : 'text-slate-500 hover:bg-white/5 hover:text-slate-300'
                }`}
              >
                <item.icon size={20} className={activeTab === item.id ? 'text-white' : 'group-hover:text-slate-200 transition-colors'} />
                <span className="text-sm font-bold tracking-tight">{item.label}</span>
                {activeTab === item.id && <div className="ml-auto w-2 h-2 rounded-full bg-white shadow-[0_0_10px_white]" />}
              </button>
            ))}
          </nav>
        </div>

        <div className="mt-auto p-10 border-t border-white/5 space-y-6">
          <div className="flex items-center justify-between px-2">
            <div className="flex items-center gap-3 text-slate-400 font-bold text-sm">
              <Moon size={18} />
              <span>Dark Mode</span>
            </div>
            <button 
              onClick={toggleTheme}
              className={`w-12 h-7 rounded-full relative transition-colors duration-500 ${theme === 'dark' ? 'bg-indigo-600' : 'bg-slate-800'}`}
            >
              <div className={`absolute top-1 w-5 h-5 rounded-full bg-white shadow-md transition-all duration-500 ${theme === 'dark' ? 'right-1' : 'left-1'}`} />
            </button>
          </div>
          <button onClick={logout} className="w-full flex items-center justify-center gap-3 py-4 rounded-[1.25rem] bg-red-500/10 text-red-500 font-black text-sm hover:bg-red-500 hover:text-white transition-all shadow-lg hover:shadow-red-500/20 group">
            <LogOut size={18} className="group-hover:translate-x-1 transition-transform" />
            <span>LOGOUT</span>
          </button>
        </div>
      </aside>

      {/* Main Professional Content area */}
      <main className="flex-1 flex flex-col bg-[#0b1120] overflow-hidden relative">
        <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-indigo-600/5 blur-[150px] -z-10 rounded-full" />
        <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-purple-600/5 blur-[150px] -z-10 rounded-full" />

        <header className="px-12 py-10 flex items-center justify-between border-b border-white/5 backdrop-blur-md sticky top-0 z-40 bg-[#0b1120]/80">
          <div className="flex items-center gap-8">
            <button onClick={onClose} className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-slate-400 hover:bg-white/10 hover:text-white transition-all shadow-lg">
              <ChevronLeft size={24} />
            </button>
            <div>
              <h1 className="text-4xl font-black text-white tracking-tight leading-none">Settings</h1>
              <p className="text-sm text-slate-500 mt-2 font-medium tracking-wide">Manage your preferences and security</p>
            </div>
          </div>
          <div className="flex items-center gap-6 pr-4">
            <button className="hidden sm:flex items-center gap-2 px-6 py-3 rounded-xl bg-white/5 border border-white/10 text-slate-300 font-bold text-sm hover:bg-white/10 transition-all">
              <Download size={18} />
              <span>Export Data</span>
            </button>
            <div className="h-10 w-px bg-white/10 hidden sm:block" />
            <div className="flex items-center gap-4">
              <div className="text-right hidden lg:block">
                <p className="text-sm font-black text-white leading-tight">{user?.displayName || 'User'}</p>
                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{user?.email}</p>
              </div>
              <div className="w-12 h-12 rounded-2xl overflow-hidden border-2 border-indigo-500/30 shadow-xl">
                <img src={user?.photoURL || 'https://ui-avatars.com/api/?name=U&background=6366f1&color=fff'} className="w-full h-full object-cover" alt="Profile" />
              </div>
            </div>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto px-12 py-12 custom-scrollbar">
          <div className="max-w-[1200px] mx-auto space-y-10">
            {activeTab === 'account' ? (
              <>
                <SettingsCard 
                  title="Profile Information" 
                  subtitle="Update your digital identity and personal details" 
                  headerAction={
                    <button className="w-full sm:w-auto bg-indigo-600 hover:bg-indigo-500 text-white px-10 py-4 rounded-2xl font-black text-sm transition-all shadow-[0_15px_40px_rgba(79,70,229,0.3)] active:scale-95">
                      SAVE CHANGES
                    </button>
                  }
                >
                  <div className="flex flex-col lg:flex-row gap-16">
                    <ProfileAvatar src={user?.photoURL} name={displayName} onUpload={handleAvatarUpload} loading={isUpdating} />
                    <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-8">
                      <div className="space-y-2">
                        <label className="text-[11px] font-black text-slate-500 uppercase tracking-[0.15em] ml-1">Full Name</label>
                        <input type="text" value={displayName} onChange={(e) => setDisplayName(e.target.value)} placeholder="e.g. John Doe" className="w-full h-14 bg-slate-950/50 border border-white/5 rounded-2xl px-6 text-white text-sm font-bold focus:outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all hover:bg-slate-950/80" />
                      </div>
                      <CustomSelect label="Department / Course" options={['B.Tech - Computer Science', 'B.Sc - Mathematics', 'M.A - Economics', 'B.Com - Finance']} />
                      <div className="space-y-2">
                        <label className="text-[11px] font-black text-slate-500 uppercase tracking-[0.15em] ml-1">Email Address</label>
                        <input type="text" value={user?.email} disabled className="w-full h-14 bg-slate-950/20 border border-white/5 rounded-2xl px-6 text-slate-600 text-sm font-bold cursor-not-allowed" />
                      </div>
                      <CustomSelect label="Current Semester" options={['1st Semester', '2nd Semester', '3rd Semester', '4th Semester', '5th Semester', '6th Semester', '7th Semester', '8th Semester']} />
                    </div>
                  </div>
                </SettingsCard>

                <SettingsCard title="General Preferences" subtitle="Fine-tune your application behavior and visuals">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-10">
                    <CustomSelect label="Application Language" options={['English (US)', 'Tamil', 'Hindi', 'Spanish']} />
                    <CustomSelect label="Date Format" options={['DD - MM - YYYY', 'MM / DD / YYYY', 'YYYY - MM - DD']} />
                    <div className="space-y-2">
                      <label className="text-[11px] font-black text-slate-500 uppercase tracking-[0.15em] ml-1">Dashboard Layout</label>
                      <div className="flex gap-4 p-1 bg-slate-950/50 border border-white/5 rounded-2xl h-14">
                        <button className="flex-1 bg-indigo-600/10 text-indigo-400 rounded-xl flex items-center justify-center border border-indigo-600/30"><LayoutDashboard size={20}/></button>
                        <button className="flex-1 hover:bg-white/5 text-slate-600 rounded-xl flex items-center justify-center transition-all"><BarChart3 size={20}/></button>
                      </div>
                    </div>
                  </div>
                </SettingsCard>

                <div className="p-10 rounded-[2.5rem] bg-red-500/5 border border-red-500/10 flex flex-col sm:flex-row items-center justify-between gap-6 mb-20">
                  <div>
                    <h4 className="text-lg font-black text-red-500 tracking-tight">Danger Zone</h4>
                    <p className="text-sm text-slate-500 mt-1">Permanently delete your account and all associated data</p>
                  </div>
                  <button className="px-8 py-3 rounded-xl bg-red-500 text-white font-black text-xs tracking-widest hover:bg-red-600 transition-all shadow-lg shadow-red-500/20 active:scale-95">
                    DELETE ACCOUNT
                  </button>
                </div>
              </>
            ) : (
              <div className="py-40 text-center">
                <div className="w-24 h-24 bg-indigo-600/10 rounded-[2rem] flex items-center justify-center mx-auto mb-8 animate-pulse">
                  <SettingsIcon size={40} className="text-indigo-500" />
                </div>
                <h3 className="text-2xl font-black text-white">Under Development</h3>
                <p className="text-slate-500 mt-2 max-w-xs mx-auto">We're working hard to bring you more control over your experience.</p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default SettingsDashboard;
