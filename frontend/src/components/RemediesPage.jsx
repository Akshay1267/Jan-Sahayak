import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { remedies, remedyCategories } from '../data/remedies';
import { Search, Leaf, AlertTriangle } from 'lucide-react';

export default function RemediesPage() {
  const { t, healthFlags } = useApp();
  const [category, setCategory] = useState('all');
  const [search, setSearch] = useState('');
  const [expanded, setExpanded] = useState(null);

  const filtered = remedies.filter(r =>
    (category === 'all' || r.category === category) &&
    (!search || r.name.toLowerCase().includes(search.toLowerCase()) || r.condition.toLowerCase().includes(search.toLowerCase()))
  );

  // Suggest remedies based on health flags
  const suggested = healthFlags.length > 0
    ? remedies.filter(r => healthFlags.some(f => r.category.includes(f.toLowerCase()) || r.condition.toLowerCase().includes(f.toLowerCase())))
    : [];

  return (
    <div className="animate-fade-in">
      <div className="page-header">
        <h1>🌿 {t('Natural Remedies', 'प्राकृतिक उपचार')}</h1>
        <p>{t('Ayurvedic & home remedies for common ailments', 'सामान्य बीमारियों के लिए आयुर्वेदिक और घरेलू उपचार')}</p>
      </div>

      <div style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
        <div style={{ flex: 1, position: 'relative' }}>
          <Search size={16} style={{ position: 'absolute', left: '12px', top: '14px', color: 'var(--text-muted)' }} />
          <input type="text" className="form-input" style={{ paddingLeft: '36px' }}
            placeholder={t('Search remedies...', 'उपचार खोजें...')}
            value={search} onChange={e => setSearch(e.target.value)} />
        </div>
      </div>

      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '20px' }}>
        {remedyCategories.map(c => (
          <button key={c.value} className={`btn btn-sm ${category === c.value ? 'btn-primary' : 'btn-outline'}`}
            onClick={() => setCategory(c.value)}>
            {t(c.label, c.labelHi)}
          </button>
        ))}
      </div>

      {suggested.length > 0 && category === 'all' && !search && (
        <>
          <div className="section-title" style={{ color: 'var(--accent-emerald)' }}>
            ✨ {t('Suggested for You (Based on Health Conditions)', 'आपके लिए सुझाव (स्वास्थ्य स्थितियों के आधार पर)')}
          </div>
          {suggested.map(r => <RemedyCard key={r.id + '-sug'} remedy={r} t={t} expanded={expanded} setExpanded={setExpanded} highlight />)}
          <hr style={{ border: 'none', borderTop: '1px solid var(--border-subtle)', margin: '24px 0' }} />
        </>
      )}

      <div className="section-title">
        <Leaf size={16} style={{ display: 'inline', verticalAlign: 'middle' }} /> {t(`All Remedies (${filtered.length})`, `सभी उपचार (${filtered.length})`)}
      </div>
      <div className="grid-2">
        {filtered.map(r => <RemedyCard key={r.id} remedy={r} t={t} expanded={expanded} setExpanded={setExpanded} />)}
      </div>
    </div>
  );
}

function RemedyCard({ remedy: r, t, expanded, setExpanded, highlight }) {
  const isOpen = expanded === r.id;
  return (
    <div className="remedy-card" onClick={() => setExpanded(isOpen ? null : r.id)} style={{ cursor: 'pointer', ...(highlight ? { border: '1px solid rgba(16,185,129,0.3)' } : {}) }}>
      <div className="remedy-icon">{r.emoji}</div>
      <div className="remedy-name">{t(r.name, r.nameHi)}</div>
      <div className="remedy-for">{t(r.condition, r.conditionHi)}</div>
      <div className="remedy-ingredients">
        {(t(r.ingredients, r.ingredientsHi) || r.ingredients).slice(0, 3).map((ing, i) => (
          <span key={i} className="ingredient-tag">{ing}</span>
        ))}
        {r.ingredients.length > 3 && <span className="ingredient-tag">+{r.ingredients.length - 3}</span>}
      </div>
      {isOpen && (
        <div className="animate-slide-up" style={{ marginTop: '12px' }}>
          <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '12px' }}>
            <strong>📋 {t('Preparation:', 'तैयारी:')}</strong><br />
            {t(r.preparation, r.preparationHi)}
          </div>
          <div style={{ display: 'flex', alignItems: 'start', gap: '8px', padding: '8px 12px', background: 'rgba(245,158,11,0.1)', borderRadius: 'var(--radius-sm)', fontSize: '0.8rem' }}>
            <AlertTriangle size={14} style={{ color: 'var(--accent-amber)', flexShrink: 0, marginTop: '2px' }} />
            <span style={{ color: 'var(--accent-amber)' }}>{r.warning}</span>
          </div>
        </div>
      )}
    </div>
  );
}
