import React from 'react';
import { Bell, Calendar, Settings2 } from 'lucide-react';

const NotificationSettings = ({ settings, onUpdate }) => {
  const handleChange = (field, value) => {
    onUpdate({ ...settings, [field]: value });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 text-slate-400 mb-6">
        <Settings2 size={18} />
        <h3 className="text-sm font-semibold uppercase tracking-wider">Alert Preferences</h3>
      </div>

      <div className="space-y-4">
        {/* Daily Reminder Toggle */}
        <div className="group flex items-center justify-between p-4 rounded-2xl bg-white/[0.03] border border-white/5 hover:bg-white/[0.05] transition-all">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-indigo-500/10 flex items-center justify-center text-indigo-400 group-hover:scale-110 transition-transform">
              <Bell size={20} />
            </div>
            <div>
              <p className="text-sm font-semibold text-white">Daily Reminder</p>
              <p className="text-xs text-slate-400">Receive "Attend class today!" notifications</p>
            </div>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input 
              type="checkbox" 
              className="sr-only peer"
              checked={settings.dailyReminderEnabled}
              onChange={(e) => handleChange('dailyReminderEnabled', e.target.checked)}
            />
            <div className="w-11 h-6 bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-500"></div>
          </label>
        </div>

        {/* Exam Date Picker */}
        <div className="group flex flex-col gap-4 p-4 rounded-2xl bg-white/[0.03] border border-white/5 hover:bg-white/[0.05] transition-all">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-sky-500/10 flex items-center justify-center text-sky-400 group-hover:scale-110 transition-transform">
              <Calendar size={20} />
            </div>
            <div>
              <p className="text-sm font-semibold text-white">Exam Schedule</p>
              <p className="text-xs text-slate-400">Set your next major exam for countdowns</p>
            </div>
          </div>
          <div className="relative">
            <input 
              type="date" 
              className="w-full bg-slate-950 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 transition-all [color-scheme:dark]"
              value={settings.examDate || ''}
              onChange={(e) => handleChange('examDate', e.target.value)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationSettings;
