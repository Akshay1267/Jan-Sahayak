import React, { createContext, useState, useContext, useEffect } from 'react';

// Global App Context
export const AppContext = createContext();

export function AppProvider({ children }) {
  const [currentPage, setCurrentPage] = useState('home');
  const [language, setLanguage] = useState('en');
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [userProfile, setUserProfile] = useState(null);
  const [healthFlags, setHealthFlags] = useState([]);
  const [medVault, setMedVault] = useState(() => {
    try { return JSON.parse(localStorage.getItem('jansahayak_vault') || '[]'); } catch { return []; }
  });
  const [reminders, setReminders] = useState(() => {
    try { return JSON.parse(localStorage.getItem('jansahayak_reminders') || '[]'); } catch { return []; }
  });
  const [apiKey, setApiKey] = useState(() => import.meta.env.VITE_GEMINI_API_KEY || localStorage.getItem('jansahayak_gemini_key') || '');
  const [elevenLabsKey, setElevenLabsKey] = useState(() => import.meta.env.VITE_ELEVENLABS_API_KEY || localStorage.getItem('jansahayak_eleven_key') || '');
  const [toasts, setToasts] = useState([]);
  const [theme, setTheme] = useState(() => localStorage.getItem('jansahayak_theme') || 'light');

  useEffect(() => {
    localStorage.setItem('jansahayak_vault', JSON.stringify(medVault));
  }, [medVault]);

  useEffect(() => {
    localStorage.setItem('jansahayak_reminders', JSON.stringify(reminders));
  }, [reminders]);

  useEffect(() => {
    localStorage.setItem('jansahayak_theme', theme);
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const addToast = (message, type = 'info') => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), 4000);
  };

  const addToVault = (report) => {
    setMedVault(prev => [{ ...report, id: Date.now(), date: new Date().toISOString() }, ...prev]);
    addToast('Report saved to Medical Vault!', 'success');
  };

  const addReminder = (reminder) => {
    const r = { ...reminder, id: Date.now(), created: new Date().toISOString(), active: true };
    setReminders(prev => [r, ...prev]);
    if ('Notification' in window && Notification.permission === 'granted') {
      setTimeout(() => {
        new Notification('JanSahayak Health Reminder', { body: reminder.message, icon: '🏥' });
      }, (reminder.delayHours || 4) * 3600000);
    }
    addToast('Reminder set!', 'success');
  };

  const t = (en, hi) => language === 'hi' && hi ? hi : en;

  return (
    <AppContext.Provider value={{
      currentPage, setCurrentPage, language, setLanguage, isAnonymous, setIsAnonymous,
      userProfile, setUserProfile, healthFlags, setHealthFlags,
      medVault, addToVault, reminders, addReminder, setReminders,
      apiKey, setApiKey, elevenLabsKey, setElevenLabsKey,
      toasts, addToast, theme, setTheme, t
    }}>
      {children}
    </AppContext.Provider>
  );
}

export const useApp = () => useContext(AppContext);
