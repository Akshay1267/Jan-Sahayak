import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Heart, Shield, Settings, Eye, EyeOff, Globe } from 'lucide-react';
import { languages } from '../data/medicalRanges';

export default function Navbar() {
  const { language, setLanguage, isAnonymous, setIsAnonymous, setCurrentPage, apiKey, setApiKey, elevenLabsKey, setElevenLabsKey } = useApp();
  const [showSettings, setShowSettings] = useState(false);
  const [showLangMenu, setShowLangMenu] = useState(false);

  return (
    <>
      <nav className="navbar">
        <div className="navbar-logo" onClick={() => setCurrentPage('home')} style={{ cursor: 'pointer' }}>
          <div className="logo-icon"><Heart size={20} /></div>
          <span className="gradient-text">JanSahayak</span>
        </div>
        <div className="navbar-actions">
          <div style={{ position: 'relative' }}>
            <button className="settings-btn" onClick={() => setShowLangMenu(!showLangMenu)} title="Language">
              <Globe size={16} />
            </button>
            {showLangMenu && (
              <div style={{ position: 'absolute', top: '44px', right: 0, background: 'var(--bg-secondary)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-md)', padding: '8px', zIndex: 200, minWidth: '150px' }}>
                {languages.map(l => (
                  <button key={l.code} onClick={() => { setLanguage(l.code); setShowLangMenu(false); }}
                    style={{ display: 'block', width: '100%', padding: '8px 12px', background: language === l.code ? 'var(--primary-glow)' : 'transparent', border: 'none', color: 'var(--text-primary)', borderRadius: 'var(--radius-sm)', cursor: 'pointer', textAlign: 'left', fontSize: '0.85rem', marginBottom: '2px' }}>
                    {l.nativeName} ({l.name})
                  </button>
                ))}
              </div>
            )}
          </div>
          <button className={`anon-toggle ${isAnonymous ? 'active' : ''}`} onClick={() => setIsAnonymous(!isAnonymous)}>
            {isAnonymous ? <EyeOff size={14} /> : <Eye size={14} />}
            {isAnonymous ? 'Anonymous' : 'Normal'}
          </button>
          <button className="settings-btn" onClick={() => setShowSettings(true)}><Settings size={16} /></button>
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
