import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Mock database to fallback to localStorage with FULL FEATURE support (Virtual Cloud)
class LocalDB {
  constructor() {
    this.sessionKey = 'attenmate_v_session';
    this.usersKey = 'attenmate_v_users';
  }

  // Auth Simulation
  async signUp(email, password) {
    const users = JSON.parse(localStorage.getItem(this.usersKey) || '[]');
    if (users.find(u => u.email === email)) throw new Error("User already exists");
    
    const newUser = { id: `v_${Date.now()}`, email, password };
    users.push(newUser);
    localStorage.setItem(this.usersKey, JSON.stringify(users));
    return { data: { user: newUser, session: { user: newUser } }, error: null };
  }

  async signIn(email, password) {
    const users = JSON.parse(localStorage.getItem(this.usersKey) || '[]');
    const user = users.find(u => u.email === email && u.password === password);
    if (!user) throw new Error("Invalid credentials");
    
    localStorage.setItem(this.sessionKey, JSON.stringify({ user }));
    return { data: { user, session: { user } }, error: null };
  }

  async signOut() {
    localStorage.removeItem(this.sessionKey);
    return { error: null };
  }

  async getSession() {
    const session = localStorage.getItem(this.sessionKey);
    return session ? JSON.parse(session) : null;
  }

  // Data Scaling logic
  _getUserPrefix(userId) {
    return `u_${userId}_`;
  }

  async getSubjects(userId) {
    const key = this._getUserPrefix(userId) + 'subjects';
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : [];
  }

  async saveSubjects(userId, subjects) {
    const key = this._getUserPrefix(userId) + 'subjects';
    localStorage.setItem(key, JSON.stringify(subjects));
    return subjects;
  }

  async getLogs(userId) {
    const key = this._getUserPrefix(userId) + 'logs';
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : [];
  }

  async saveLog(userId, log) {
    const logs = await this.getLogs(userId);
    const newLogs = [log, ...logs].slice(0, 500); 
    const key = this._getUserPrefix(userId) + 'logs';
    localStorage.setItem(key, JSON.stringify(newLogs));
    return log;
  }

  async getSettings(userId) {
    const key = this._getUserPrefix(userId) + 'settings';
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : { dailyReminderEnabled: true, examDate: '' };
  }

  async saveSettings(userId, settings) {
    const key = this._getUserPrefix(userId) + 'settings';
    localStorage.setItem(key, JSON.stringify(settings));
    return settings;
  }
}

export const localDB = new LocalDB();

export const supabase = (supabaseUrl && supabaseAnonKey) 
  ? createClient(supabaseUrl, supabaseAnonKey) 
  : null;

/**
 * Global database helper that handles Auth sessions and separates Cloud/Virtual data
 */
export const db = {
  // Auth Helpers
  signUp: async (email, password) => {
    if (supabase) return await supabase.auth.signUp({ email, password });
    return localDB.signUp(email, password);
  },

  signIn: async (email, password) => {
    if (supabase) return await supabase.auth.signInWithPassword({ email, password });
    return localDB.signIn(email, password);
  },

  signOut: async () => {
    if (supabase) return await supabase.auth.signOut();
    return localDB.signOut();
  },

  getSession: async () => {
    if (supabase) {
      const { data } = await supabase.auth.getSession();
      if (data.session) return data.session;
    }
    return localDB.getSession();
  },

  // Data Helpers
  getSubjects: async (providedUserId) => {
    const session = !providedUserId ? await db.getSession() : null;
    const userId = providedUserId || session?.user?.id;
    if (!userId) return [];
    
    if (supabase && userId && !userId.startsWith('v_')) {
      const { data, error } = await supabase
        .from('subjects')
        .select('*')
        .eq('user_id', userId);
      if (!error) return data;
    }
    return localDB.getSubjects(userId);
  },
  
  saveSubjects: async (subjects, providedUserId) => {
    const session = !providedUserId ? await db.getSession() : null;
    const userId = providedUserId || session?.user?.id;
    if (!userId) return subjects;

    if (supabase && userId && !userId.startsWith('v_')) {
      const subjectsWithUser = subjects.map(s => ({ ...s, user_id: userId }));
      const { data, error } = await supabase.from('subjects').upsert(subjectsWithUser);
      if (!error) return data;
    }
    return localDB.saveSubjects(userId, subjects);
  },

  getLogs: async (providedUserId) => {
    const session = !providedUserId ? await db.getSession() : null;
    const userId = providedUserId || session?.user?.id;
    if (!userId) return [];

    if (supabase && userId && !userId.startsWith('v_')) {
      const { data, error } = await supabase
        .from('attendance_logs')
        .select('*')
        .eq('user_id', userId)
        .order('timestamp', { ascending: false });
      if (!error) return data;
    }
    return localDB.getLogs(userId);
  },

  addLog: async (log, providedUserId) => {
    const session = !providedUserId ? await db.getSession() : null;
    const userId = providedUserId || session?.user?.id;
    if (!userId) return null;

    const logWithId = { ...log, id: Date.now(), timestamp: new Date().toISOString(), user_id: userId };
    
    if (supabase && userId && !userId.startsWith('v_')) {
       await supabase.from('attendance_logs').insert([logWithId]);
    }
    return localDB.saveLog(userId, logWithId);
  },

  deleteSubject: async (id, providedUserId) => {
    const session = !providedUserId ? await db.getSession() : null;
    const userId = providedUserId || session?.user?.id;
    if (!userId) return;

    if (supabase && userId && !userId.startsWith('v_')) {
      await supabase.from('subjects').delete().eq('id', id).eq('user_id', userId);
      await supabase.from('attendance_logs').delete().eq('subjectId', id).eq('user_id', userId);
    }
    
    const current = await localDB.getSubjects(userId);
    await localDB.saveSubjects(userId, current.filter(s => s.id !== id));
  },

  getSettings: async (providedUserId) => {
    const session = !providedUserId ? await db.getSession() : null;
    const userId = providedUserId || session?.user?.id;
    if (!userId) return { dailyReminderEnabled: true, examDate: '' };

    if (supabase && userId && !userId.startsWith('v_')) {
      const { data, error } = await supabase
        .from('settings')
        .select('*')
        .eq('user_id', userId)
        .single();
      if (!error) return data;
    }
    return localDB.getSettings(userId);
  },

  saveSettings: async (settings, providedUserId) => {
    const session = !providedUserId ? await db.getSession() : null;
    const userId = providedUserId || session?.user?.id;
    if (!userId) return settings;

    if (supabase && userId && !userId.startsWith('v_')) {
      const { data, error } = await supabase
        .from('settings')
        .upsert({ ...settings, user_id: userId });
      if (!error) return data;
    }
    return localDB.saveSettings(userId, settings);
  },
  isCloudReady: !!supabase
};
