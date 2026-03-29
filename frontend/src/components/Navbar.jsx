import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Heart, Shield, Settings, Eye, EyeOff, Globe, Moon, Sun, User, LogOut } from 'lucide-react';
import { languages } from '../data/medicalRanges';
import { auth } from '../lib/firebase';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from 'firebase/auth';

export default function Navbar() {
  const { language, setLanguage, isAnonymous, setIsAnonymous, setCurrentPage, theme, setTheme, currentUser, addToast } = useApp();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showLangMenu, setShowLangMenu] = useState(false);
  const [isSignUP, setIsSignUp] = useState(false);
  const [authEmail, setAuthEmail] = useState('');
  const [authPassword, setAuthPassword] = useState('');
  const [authError, setAuthError] = useState('');

  const handleAuth = async () => {
    try {
      setAuthError('');
      if (isSignUP) {
        await createUserWithEmailAndPassword(auth, authEmail, authPassword);
        addToast('Account created successfully!', 'success');
      } else {
        await signInWithEmailAndPassword(auth, authEmail, authPassword);
        addToast('Successfully logged in!', 'success');
      }
      setShowAuthModal(false);
      setAuthEmail('');
      setAuthPassword('');
    } catch (err) {
      setAuthError(err.message);
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
    addToast('Logged out', 'info');
  };

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
          {currentUser ? (
            <button className="settings-btn" onClick={handleLogout} title="Logout"><LogOut size={18} /></button>
          ) : (
            <button className="settings-btn" onClick={() => setShowAuthModal(true)} title="Login/Signup"><User size={18} /></button>
          )}
        </div>
      </nav>

      {showAuthModal && (
        <div className="modal-overlay" onClick={() => setShowAuthModal(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h2>{isSignUP ? '📋 Sign Up' : '🔑 Sign In'}</h2>
              <button className="modal-close" onClick={() => setShowAuthModal(false)}>✕</button>
            </div>
            
            {authError && <div style={{ color: 'var(--accent-rose)', backgroundColor: '#ffdad6', padding: '10px', borderRadius: '8px', marginBottom: '10px', fontSize: '0.85rem' }}>{authError}</div>}

            <div className="form-group">
              <label className="form-label">Email</label>
              <input type="email" className="form-input" placeholder="Enter your email"
                value={authEmail} onChange={e => setAuthEmail(e.target.value)} />
            </div>
            <div className="form-group">
              <label className="form-label">Password</label>
              <input type="password" className="form-input" placeholder="Enter your password"
                value={authPassword} onChange={e => setAuthPassword(e.target.value)} />
            </div>
            
            <button className="btn btn-primary w-full" onClick={handleAuth}>
              {isSignUP ? 'Create Account' : 'Sign In'}
            </button>
            
            <div style={{ textAlign: 'center', marginTop: '1rem', fontSize: '0.9rem' }}>
              <span style={{ color: 'var(--text-muted)' }}>{isSignUP ? 'Already have an account? ' : "Don't have an account? "}</span>
              <button onClick={() => setIsSignUp(!isSignUP)} style={{ background: 'none', border: 'none', color: 'var(--primary)', cursor: 'pointer', fontWeight: 600 }}>
                {isSignUP ? 'Log In' : 'Sign Up'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
