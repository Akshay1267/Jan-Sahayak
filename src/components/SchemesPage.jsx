import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { schemes, statesList, occupationsList, healthSchemeMap } from '../data/schemes';
import { Search, ArrowRight, ExternalLink, Filter, Zap, MapPin } from 'lucide-react';

export default function SchemesPage() {
  const { t, healthFlags, userProfile, setUserProfile, setCurrentPage } = useApp();
  const [form, setForm] = useState(userProfile || { state: '', age: '', gender: '', occupation: '', income: '' });
  const [results, setResults] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [showForm, setShowForm] = useState(!userProfile);

  const matchSchemes = () => {
    const profile = { ...form, age: parseInt(form.age), income: parseInt(form.income) };
    setUserProfile(profile);
    let matched = schemes.filter(s => {
      if (s.states[0] !== 'all' && !s.states.includes(profile.state)) return false;
      if (s.eligibility.maxIncome < profile.income) return false;
      if (s.eligibility.minAge && profile.age < s.eligibility.minAge) return false;
      if (s.eligibility.maxAge && profile.age > s.eligibility.maxAge) return false;
      if (s.eligibility.gender && s.eligibility.gender !== profile.gender) return false;
      if (s.occupations[0] !== 'all' && !s.occupations.includes(profile.occupation)) return false;
      return true;
    });
    // Boost health-related schemes if healthFlags exist
    if (healthFlags.length > 0) {
      matched = matched.map(s => {
        const relevance = healthFlags.filter(f => {
          const map = healthSchemeMap[f.toLowerCase()];
          return map && s.healthTags.some(t => map.tags.includes(t));
        }).length;
        return { ...s, relevance };
      }).sort((a, b) => b.relevance - a.relevance);
    }
    setResults(matched);
    setShowForm(false);
  };

  const filtered = results ? results.filter(s =>
    !searchTerm || s.name.toLowerCase().includes(searchTerm.toLowerCase()) || s.description.toLowerCase().includes(searchTerm.toLowerCase())
  ) : null;

  const healthMatched = filtered?.filter(s => s.relevance > 0) || [];
  const generalMatched = filtered?.filter(s => !s.relevance || s.relevance === 0) || [];

  return (
    <div className="animate-fade-in">
      <div className="page-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <h1>🏛️ {t('SchemeMatch', 'स्कीममैच')}</h1>
          <span className="badge badge-warning">⭐ HERO</span>
        </div>
        <p>{t('AI-Powered Health Scheme Recommender — Find schemes based on your profile + health conditions',
          'AI-संचालित स्वास्थ्य योजना सिफारिशकर्ता — प्रोफ़ाइल + स्वास्थ्य स्थितियों पर आधारित योजनाएं खोजें')}</p>
      </div>

      {healthFlags.length > 0 && (
        <div className="glass-card highlight" style={{ marginBottom: '16px', padding: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
            <Zap size={16} style={{ color: 'var(--accent-amber)' }} />
            <strong>{t('Smart Connector Active', 'स्मार्ट कनेक्टर सक्रिय')}</strong>
          </div>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '8px' }}>
            {t('Health conditions detected from your report:', 'आपकी रिपोर्ट से पाई गई स्वास्थ्य स्थितियां:')}
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {healthFlags.map((f, i) => <span key={i} className="badge badge-danger">⚠️ {f}</span>)}
          </div>
        </div>
      )}

      {showForm ? (
        <div className="glass-card">
          <h3 style={{ marginBottom: '20px' }}>📋 {t('Your Profile (5 Quick Questions)', 'आपकी प्रोफ़ाइल (5 सवाल)')}</h3>
          <div className="form-group">
            <label className="form-label">{t('State', 'राज्य')}</label>
            <select className="form-select" value={form.state} onChange={e => setForm({ ...form, state: e.target.value })}>
              <option value="">{t('Select State', 'राज्य चुनें')}</option>
              {statesList.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
          <div className="grid-2">
            <div className="form-group">
              <label className="form-label">{t('Age', 'उम्र')}</label>
              <input type="number" className="form-input" placeholder="25" value={form.age} onChange={e => setForm({ ...form, age: e.target.value })} />
            </div>
            <div className="form-group">
              <label className="form-label">{t('Gender', 'लिंग')}</label>
              <select className="form-select" value={form.gender} onChange={e => setForm({ ...form, gender: e.target.value })}>
                <option value="">{t('Select', 'चुनें')}</option>
                <option value="male">{t('Male', 'पुरुष')}</option>
                <option value="female">{t('Female', 'महिला')}</option>
                <option value="other">{t('Other', 'अन्य')}</option>
              </select>
            </div>
          </div>
          <div className="form-group">
            <label className="form-label">{t('Occupation', 'व्यवसाय')}</label>
            <select className="form-select" value={form.occupation} onChange={e => setForm({ ...form, occupation: e.target.value })}>
              <option value="">{t('Select', 'चुनें')}</option>
              {occupationsList.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
            </select>
          </div>
          <div className="form-group">
            <label className="form-label">{t('Annual Family Income (₹)', 'वार्षिक पारिवारिक आय (₹)')}</label>
            <input type="number" className="form-input" placeholder="200000" value={form.income} onChange={e => setForm({ ...form, income: e.target.value })} />
          </div>
          <button className="btn btn-primary btn-lg w-full" onClick={matchSchemes}
            disabled={!form.state || !form.age || !form.gender || !form.occupation || !form.income}>
            <Search size={20} /> {t('Find My Schemes', 'मेरी योजनाएं खोजें')}
          </button>
        </div>
      ) : (
        <div>
          <div style={{ display: 'flex', gap: '12px', marginBottom: '16px', flexWrap: 'wrap' }}>
            <input type="text" className="form-input" style={{ flex: 1 }} placeholder={t('Search schemes...', 'योजनाएं खोजें...')}
              value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
            <button className="btn btn-secondary" onClick={() => setShowForm(true)}>
              <Filter size={16} /> {t('Edit Profile', 'प्रोफ़ाइल बदलें')}
            </button>
          </div>

          <div className="glass-card" style={{ marginBottom: '16px', padding: '16px', textAlign: 'center' }}>
            <span style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--accent-emerald)' }}>{filtered?.length || 0}</span>
            <span style={{ color: 'var(--text-secondary)', marginLeft: '8px' }}>{t('schemes matched!', 'योजनाएं मिलीं!')}</span>
          </div>

          {healthMatched.length > 0 && (
            <>
              <div className="section-title" style={{ color: 'var(--accent-rose)' }}>
                ⚠️ {t('Health-Matched Schemes (Based on Your Report)', 'स्वास्थ्य-मिलान योजनाएं (रिपोर्ट के आधार पर)')}
              </div>
              {healthMatched.map(s => <SchemeCard key={s.id} scheme={s} t={t} isHealthMatch setCurrentPage={setCurrentPage} />)}
            </>
          )}

          <div className="section-title">
            📋 {t('All Eligible Schemes', 'सभी पात्र योजनाएं')}
          </div>
          {generalMatched.map(s => <SchemeCard key={s.id} scheme={s} t={t} setCurrentPage={setCurrentPage} />)}
        </div>
      )}
    </div>
  );
}

function SchemeCard({ scheme: s, t, isHealthMatch, setCurrentPage }) {
  const [expanded, setExpanded] = useState(false);
  return (
    <div className={`scheme-card ${s.category}`} onClick={() => setExpanded(!expanded)}
      style={isHealthMatch ? { border: '1px solid rgba(244,63,94,0.3)', background: 'rgba(244,63,94,0.05)' } : {}}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
        <div>
          <div className="scheme-emoji">{s.emoji}</div>
          <div className="scheme-name">{t(s.name, s.nameHi)}</div>
          <div className="scheme-benefit">{t(s.benefit, s.benefitHi)}</div>
        </div>
        {isHealthMatch && <span className="badge badge-danger">🔗 Health Match</span>}
      </div>
      <div className="scheme-desc">{t(s.description, s.descHi)}</div>
      {expanded && (
        <div className="animate-slide-up" style={{ marginTop: '12px', padding: '12px', background: 'var(--bg-glass)', borderRadius: 'var(--radius-md)' }}>
          <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '8px' }}>
            <strong>{t('Required Documents:', 'आवश्यक दस्तावेज:')}</strong> {s.documents.join(', ')}
          </div>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            <a href={s.applyUrl} target="_blank" rel="noopener noreferrer" className="btn btn-primary btn-sm">
              <ExternalLink size={14} /> {t('Apply Now', 'अभी आवेदन करें')}
            </a>
            <button className="btn btn-success btn-sm" onClick={e => { e.stopPropagation(); setCurrentPage('hospitals'); }}>
              <MapPin size={14} /> {t('Nearby Centers', 'नजदीकी केंद्र')}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
