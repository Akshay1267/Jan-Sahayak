import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Heart, Shield, Settings, Eye, EyeOff, Globe, Moon, Sun } from 'lucide-react';
import { languages } from '../data/medicalRanges';

export default function Navbar() {
  const { language, setLanguage, isAnonymous, setIsAnonymous, setCurrentPage, apiKey, setApiKey, elevenLabsKey, setElevenLabsKey, theme, setTheme } = useApp();
  const [showSettings, setShowSettings] = useState(false);
  const [showLangMenu, setShowLangMenu] = useState(false);

  return (
    <>
      <nav className="navbar">
        <div className="navbar-logo" onClick={() => setCurrentPage('home')} style={{ cursor: 'pointer' }}>
          <div className="logo-icon"><Heart size={20} fill="currentColor" /></div>
          <span className="gradient-text">JanSahayak</span>
        </div>
        <div className="navbar-actions">
          <button className="settings-btn" onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')} title="Toggle Theme">
            {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
          </button>
          
          <div style={{ position: 'relative' }}>
            <button className={`settings-btn ${showLangMenu ? 'active' : ''}`} onClick={() => setShowLangMenu(!showLangMenu)} title="Language">
              <Globe size={18} />
            </button>
            {showLangMenu && (
              <div className="glass-card" style={{ position: 'absolute', top: '54px', right: 0, padding: '12px', zIndex: 200, minWidth: '180px', boxShadow: 'var(--shadow-lg)' }}>
                <p style={{ fontSize: '0.7rem', fontWeight: 800, color: 'var(--primary)', textTransform: 'uppercase', marginBottom: '8px', opacity: 0.6 }}>Select Language</p>
                {languages.map(l => (
                  <button key={l.code} onClick={() => { setLanguage(l.code); setShowLangMenu(false); }}
                    style={{ 
                      display: 'block', 
                      width: '100%', 
                      padding: '10px 14px', 
                      background: language === l.code ? 'var(--primary-glow)' : 'transparent', 
                      border: 'none', 
                      color: language === l.code ? 'var(--primary)' : 'var(--text-primary)', 
                      borderRadius: 'var(--radius-md)', 
                      cursor: 'pointer', 
                      textAlign: 'left', 
                      fontSize: '0.9rem', 
                      fontWeight: language === l.code ? 700 : 500,
                      marginBottom: '4px',
                      transition: 'var(--transition-fast)'
                    }}>
                    {l.nativeName}
                  </button>
                ))}
              </div>
            )}
          </div>
          <button className={`anon-toggle ${isAnonymous ? 'active' : ''}`} onClick={() => setIsAnonymous(!isAnonymous)}>
            {isAnonymous ? <EyeOff size={16} /> : <Eye size={16} />}
            <span>{isAnonymous ? 'Anonymous' : 'Normal'}</span>
          </button>
          <button className="settings-btn" onClick={() => setShowSettings(true)}><Settings size={18} /></button>
        </div>
      </nav>

      {showSettings && (
        <div className="modal-overlay" onClick={() => setShowSettings(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h2>⚙️ Settings</h2>
              <button className="modal-close" onClick={() => setShowSettings(false)}>✕</button>
            </div>
            <div className="form-group">
              <label className="form-label">Gemini API Key</label>
              <input type="password" className="form-input" placeholder="Enter Gemini API key..."
                value={apiKey} onChange={e => { setApiKey(e.target.value); localStorage.setItem('jansahayak_gemini_key', e.target.value); }} />
              <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '4px' }}>Required for AI features (report analysis, diagnosis, camera)</p>
            </div>
            <div className="form-group">
              <label className="form-label">ElevenLabs API Key</label>
              <input type="password" className="form-input" placeholder="Enter ElevenLabs API key..."
                value={elevenLabsKey} onChange={e => { setElevenLabsKey(e.target.value); localStorage.setItem('jansahayak_eleven_key', e.target.value); }} />
              <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '4px' }}>Required for voice agent (text-to-speech)</p>
            </div>
            <button className="btn btn-primary w-full" onClick={() => setShowSettings(false)}>Save & Close</button>
          </div>
        </div>
      )}
    </>
  );
}
