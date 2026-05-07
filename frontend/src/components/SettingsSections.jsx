import React from 'react';
import { 
  User, 
  Mail, 
  Bell, 
  Palette, 
  Shield, 
  Info, 
  Camera, 
  Trash2, 
  Moon, 
  Sun, 
  Github, 
  ExternalLink,
  ChevronRight,
  ShieldCheck,
  Zap,
  Globe,
  Monitor,
  Download,
  Calendar,
  AlertCircle,
  BarChart3,
  Megaphone,
  Mail as MailIcon
} from 'lucide-react';
import ProfileAvatar from './ProfileAvatar';

// Reusable Settings Card Wrapper
export const SettingsCard = ({ title, subtitle, children, headerAction }) => (
  <div className="bg-slate-900/40 backdrop-blur-xl border border-white/5 rounded-[2rem] p-8 mb-6 overflow-hidden">
    <div className="flex items-start justify-between mb-8">
      <div>
        <h3 className="text-lg font-bold text-white tracking-tight">{title}</h3>
        <p className="text-sm text-slate-500 mt-1">{subtitle}</p>
      </div>
      {headerAction && <div>{headerAction}</div>}
    </div>
    {children}
  </div>
);

// Account / Profile Information Section
export const ProfileInformation = ({ user, displayName, setDisplayName, previewURL, handleAvatarUpload, handleRemoveAvatar, isUpdating }) => (
  <SettingsCard 
    title="Profile Information" 
    subtitle="Update your photo and personal details"
    headerAction={
      <button className="bg-indigo-500 hover:bg-indigo-600 text-white px-6 py-2.5 rounded-xl font-bold text-sm transition-all shadow-lg shadow-indigo-500/20">
        Save Changes
      </button>
    }
  >
    <div className="flex flex-col lg:flex-row gap-12">
      <div className="flex flex-col items-center gap-4">
        <ProfileAvatar 
          src={previewURL} 
          name={user?.displayName} 
          onUpload={handleAvatarUpload}
          onRemove={handleRemoveAvatar}
          loading={isUpdating}
        />
        <p className="text-[10px] text-slate-600 font-bold uppercase tracking-wider">PNG, JPG or GIF. Max size 2MB.</p>
      </div>

      <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
        <div className="space-y-2">
          <label className="text-[11px] font-bold text-slate-500 uppercase tracking-widest ml-1">Full Name</label>
          <input 
            type="text" 
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
            className="w-full h-12 bg-slate-950/50 border border-white/5 rounded-xl px-5 text-white text-sm focus:outline-none focus:border-indigo-500/50 transition-all"
            placeholder="Sowmya Nagarajan"
          />
        </div>

        <div className="space-y-2">
          <label className="text-[11px] font-bold text-slate-500 uppercase tracking-widest ml-1">Department / Course</label>
          <div className="relative">
            <select className="w-full h-12 bg-slate-950/50 border border-white/5 rounded-xl px-5 text-white text-sm focus:outline-none appearance-none cursor-pointer">
              <option>B.Tech - Computer Science</option>
              <option>B.Sc - Physics</option>
              <option>M.Tech - AI</option>
            </select>
            <ChevronRight size={16} className="absolute right-5 top-1/2 -translate-y-1/2 rotate-90 text-slate-500 pointer-events-none" />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-[11px] font-bold text-slate-500 uppercase tracking-widest ml-1">Email Address</label>
          <input 
            type="email" 
            value={user?.email}
            disabled
            className="w-full h-12 bg-slate-950/30 border border-white/5 rounded-xl px-5 text-slate-500 text-sm focus:outline-none cursor-not-allowed"
          />
        </div>

        <div className="space-y-2">
          <label className="text-[11px] font-bold text-slate-500 uppercase tracking-widest ml-1">Semester</label>
          <div className="relative">
            <select className="w-full h-12 bg-slate-950/50 border border-white/5 rounded-xl px-5 text-white text-sm focus:outline-none appearance-none cursor-pointer">
              <option>4th Semester</option>
              <option>5th Semester</option>
              <option>6th Semester</option>
            </select>
            <ChevronRight size={16} className="absolute right-5 top-1/2 -translate-y-1/2 rotate-90 text-slate-500 pointer-events-none" />
          </div>
        </div>
      </div>
    </div>
  </SettingsCard>
);

// Preferences Section
export const Preferences = ({ theme, toggleTheme }) => (
  <SettingsCard title="Preferences" subtitle="Customize your app experience">
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {/* Appearance */}
      <div className="space-y-3">
        <label className="text-[11px] font-bold text-slate-500 uppercase tracking-widest ml-1">Appearance</label>
        <p className="text-[11px] text-slate-600 mb-2">Choose your theme</p>
        <div className="flex gap-2 p-1 bg-slate-950/50 border border-white/5 rounded-2xl">
          {[
            { id: 'light', icon: Sun, label: 'Light' },
            { id: 'dark', icon: Moon, label: 'Dark' },
            { id: 'system', icon: Monitor, label: 'System' }
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => item.id !== 'system' && toggleTheme()}
              className={`flex-1 flex flex-col items-center gap-1.5 py-3 rounded-xl transition-all relative ${
                theme === item.id 
                  ? 'bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 shadow-lg' 
                  : 'text-slate-500 hover:text-slate-300'
              }`}
            >
              <item.icon size={18} />
              <span className="text-[10px] font-bold">{item.label}</span>
              {theme === item.id && <div className="absolute top-1.5 right-1.5 w-3 h-3 bg-indigo-500 rounded-full flex items-center justify-center border-2 border-slate-900"><div className="w-1 h-1 bg-white rounded-full"/></div>}
            </button>
          ))}
        </div>
      </div>

      {/* Language */}
      <div className="space-y-3">
        <label className="text-[11px] font-bold text-slate-500 uppercase tracking-widest ml-1">Language</label>
        <p className="text-[11px] text-slate-600 mb-2">Select your preferred language</p>
        <div className="relative">
          <select className="w-full h-12 bg-slate-950/50 border border-white/5 rounded-2xl px-5 text-white text-sm focus:outline-none appearance-none cursor-pointer">
            <option>English</option>
            <option>Tamil</option>
            <option>Hindi</option>
          </select>
          <ChevronRight size={16} className="absolute right-5 top-1/2 -translate-y-1/2 rotate-90 text-slate-500 pointer-events-none" />
        </div>
      </div>

      {/* Date Format */}
      <div className="space-y-3">
        <label className="text-[11px] font-bold text-slate-500 uppercase tracking-widest ml-1">Date Format</label>
        <p className="text-[11px] text-slate-600 mb-2">Choose your preferred format</p>
        <div className="relative">
          <select className="w-full h-12 bg-slate-950/50 border border-white/5 rounded-2xl px-5 text-white text-sm focus:outline-none appearance-none cursor-pointer">
            <option>DD - MM - YYYY</option>
            <option>MM / DD / YYYY</option>
            <option>YYYY - MM - DD</option>
          </select>
          <ChevronRight size={16} className="absolute right-5 top-1/2 -translate-y-1/2 rotate-90 text-slate-500 pointer-events-none" />
        </div>
        <p className="text-[10px] text-slate-600 italic">Example: 20 - 04 - 2026</p>
      </div>

      {/* Dashboard Layout */}
      <div className="space-y-3">
        <label className="text-[11px] font-bold text-slate-500 uppercase tracking-widest ml-1">Dashboard Layout</label>
        <p className="text-[11px] text-slate-600 mb-2">Choose your default layout</p>
        <div className="flex gap-4">
          <button className="flex-1 h-14 bg-indigo-500/10 border border-indigo-500/50 rounded-2xl flex items-center justify-center text-indigo-400 relative">
            <div className="grid grid-cols-2 gap-1 w-6 h-6">
              <div className="bg-indigo-400 rounded-sm"/>
              <div className="bg-indigo-400/40 rounded-sm"/>
              <div className="bg-indigo-400/40 rounded-sm"/>
              <div className="bg-indigo-400/40 rounded-sm"/>
            </div>
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-indigo-500 rounded-full flex items-center justify-center border-2 border-slate-900"><div className="w-1.5 h-1.5 bg-white rounded-full"/></div>
          </button>
          <button className="flex-1 h-14 bg-white/[0.02] border border-white/5 rounded-2xl flex items-center justify-center text-slate-600 hover:border-white/20 transition-all">
            <div className="grid grid-cols-1 gap-1 w-6 h-6">
              <div className="bg-slate-600/40 h-2 rounded-sm"/>
              <div className="bg-slate-600/40 h-2 rounded-sm"/>
              <div className="bg-slate-600/40 h-2 rounded-sm"/>
            </div>
          </button>
        </div>
      </div>
    </div>
  </SettingsCard>
);

// Notifications Section (Enhanced)
export const NotificationsList = ({ settings, onUpdate }) => {
  const toggles = [
    { id: 'dailyReminderEnabled', label: 'Daily Reminder', subtitle: 'Get reminded to attend classes daily', icon: Bell, color: 'indigo' },
    { id: 'examReminders', label: 'Exam Reminders', subtitle: 'Get notified about upcoming exams', icon: Calendar, color: 'sky' },
    { id: 'lowAttendance', label: 'Low Attendance Alerts', subtitle: 'Get notified when attendance is below threshold', icon: AlertCircle, color: 'red' },
    { id: 'announcements', label: 'Announcements', subtitle: 'Important updates and announcements', icon: Megaphone, color: 'purple' },
    { id: 'weeklySummary', label: 'Weekly Summary', subtitle: 'Receive weekly attendance summary', icon: BarChart3, color: 'emerald' },
    { id: 'emailNotifications', label: 'Email Notifications', subtitle: 'Receive updates via email', icon: MailIcon, color: 'slate' },
  ];

  const getColorClasses = (color) => {
    const map = {
      indigo: 'bg-indigo-500/10 text-indigo-400',
      sky: 'bg-sky-500/10 text-sky-400',
      red: 'bg-red-500/10 text-red-400',
      purple: 'bg-purple-500/10 text-purple-400',
      emerald: 'bg-emerald-500/10 text-emerald-400',
      slate: 'bg-slate-500/10 text-slate-400'
    };
    return map[color] || map.indigo;
  };

  return (
    <SettingsCard title="Notifications" subtitle="Manage how you receive notifications">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
        {toggles.map((item) => (
          <div key={item.id} className="flex items-center justify-between group">
            <div className="flex items-center gap-4">
              <div className={`p-3 rounded-2xl transition-transform group-hover:scale-110 ${getColorClasses(item.color)}`}>
                <item.icon size={20} />
              </div>
              <div>
                <p className="text-sm font-bold text-white">{item.label}</p>
                <p className="text-[11px] text-slate-500 mt-0.5">{item.subtitle}</p>
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" checked={settings[item.id] !== false} onChange={() => onUpdate({ ...settings, [item.id]: !settings[item.id] })} />
              <div className="w-11 h-6 bg-slate-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-slate-400 after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-500 peer-checked:after:bg-white"></div>
            </label>
          </div>
        ))}
      </div>
    </SettingsCard>
  );
};

// Account Actions
export const AccountActions = () => (
  <div className="flex flex-col md:flex-row items-center justify-between p-8 rounded-[2rem] bg-slate-900/40 backdrop-blur-xl border border-white/5">
    <div>
      <h3 className="text-lg font-bold text-white tracking-tight">Account Actions</h3>
      <p className="text-sm text-slate-500 mt-1">Manage your account</p>
    </div>
    <div className="flex items-center gap-4 mt-6 md:mt-0">
      <button className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-white/5 border border-white/5 text-slate-400 font-bold text-sm hover:bg-white/10 transition-all">
        <Download size={18} />
        <span>Export My Data</span>
      </button>
      <button className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 font-bold text-sm hover:bg-red-500/20 transition-all">
        <Trash2 size={18} />
        <span>Delete Account</span>
      </button>
    </div>
  </div>
);
