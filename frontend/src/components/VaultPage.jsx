import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Trash2, Eye, Download, FolderArchive, FileText, Clock, AlertTriangle } from 'lucide-react';

export default function VaultPage() {
  const { t, medVault, setReminders, reminders } = useApp();
  const [viewReport, setViewReport] = useState(null);

  const formatDate = (iso) => {
    const d = new Date(iso);
    return d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="animate-fade-in">
      <div className="page-header">
        <h1>📁 {t('Medical Vault', 'मेडिकल वॉल्ट')}</h1>
        <p>{t('All your medical reports in one secure place', 'आपकी सभी मेडिकल रिपोर्ट एक सुरक्षित जगह')}</p>
      </div>

      {/* Reminders */}
      {reminders.filter(r => r.active).length > 0 && (
        <div className="glass-card highlight" style={{ marginBottom: '20px' }}>
          <h3 style={{ marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Clock size={18} style={{ color: 'var(--accent-amber)' }} />
            {t('Active Reminders', 'सक्रिय रिमाइंडर')}
          </h3>
          {reminders.filter(r => r.active).map((r, i) => (
            <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 12px', background: 'var(--bg-glass)', borderRadius: 'var(--radius-sm)', marginBottom: '8px' }}>
              <div>
                <span style={{ fontSize: '0.85rem' }}>🔔 {r.message}</span>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{t('Set:', 'सेट:')} {formatDate(r.created)}</div>
              </div>
              <button className="btn btn-sm btn-outline" onClick={() => setReminders(prev => prev.map(rem => rem.id === r.id ? { ...rem, active: false } : rem))}>
                ✓ Done
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Stats */}
      <div className="glass-card" style={{ display: 'flex', justifyContent: 'space-around', textAlign: 'center', padding: '20px', marginBottom: '20px' }}>
        <div>
          <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--primary-light)' }}>{medVault.length}</div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{t('Reports', 'रिपोर्ट')}</div>
        </div>
        <div>
          <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--accent-emerald)' }}>{reminders.filter(r => r.active).length}</div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{t('Reminders', 'रिमाइंडर')}</div>
        </div>
      </div>

      {medVault.length === 0 ? (
        <div className="glass-card" style={{ textAlign: 'center', padding: '48px' }}>
          <FolderArchive size={48} style={{ color: 'var(--text-muted)', margin: '0 auto 16px' }} />
          <h3 style={{ color: 'var(--text-secondary)' }}>{t('No reports yet', 'अभी तक कोई रिपोर्ट नहीं')}</h3>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
            {t('Upload a medical report to save it here', 'यहां सहेजने के लिए मेडिकल रिपोर्ट अपलोड करें')}
          </p>
        </div>
      ) : (
        <div className="timeline">
          {medVault.map((report, i) => (
            <div key={report.id} className="timeline-item animate-slide-up" style={{ animationDelay: `${i * 0.1}s` }}>
              <div className="timeline-date">{formatDate(report.date)}</div>
              <div className="result-card">
                <div className="result-header" style={{ marginBottom: '8px' }}>
                  <div className="result-icon" style={{ background: 'rgba(108,99,255,0.2)' }}>
                    <FileText size={20} style={{ color: 'var(--primary-light)' }} />
                  </div>
                  <div style={{ flex: 1 }}>
                    <div className="result-title">{report.type || 'Medical Report'}</div>
                    {report.result?.summary && <div className="result-subtitle">{report.result.summary}</div>}
                  </div>
                  {report.result?.urgency && (
                    <span className={`badge badge-${report.result.urgency === 'urgent' ? 'danger' : report.result.urgency === 'attention' ? 'warning' : 'success'}`}>
                      {report.result.urgency}
                    </span>
                  )}
                </div>
                {report.result?.healthFlags?.length > 0 && (
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px', marginBottom: '8px' }}>
                    {report.result.healthFlags.map((f, j) => <span key={j} className="badge badge-danger" style={{ fontSize: '0.7rem' }}>⚠️ {f}</span>)}
                  </div>
                )}
                <div className="result-actions">
                  <button className="btn btn-sm btn-primary" onClick={() => setViewReport(report)}><Eye size={14} /> {t('View', 'देखें')}</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* View Report Modal */}
      {viewReport && (
        <div className="modal-overlay" onClick={() => setViewReport(null)}>
          <div className="modal-content" onClick={e => e.stopPropagation()} style={{ maxWidth: '700px' }}>
            <div className="modal-header">
              <h2>📋 {t('Report Details', 'रिपोर्ट विवरण')}</h2>
              <button className="modal-close" onClick={() => setViewReport(null)}>✕</button>
            </div>
            {viewReport.image && (
              <img src={viewReport.image} alt="Report" style={{ width: '100%', borderRadius: 'var(--radius-md)', marginBottom: '16px' }} />
            )}
            {viewReport.result && (
              <div>
                <h4 style={{ marginBottom: '8px' }}>{viewReport.result.summary}</h4>
                {viewReport.result.parameters?.map((p, i) => (
                  <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 12px', background: 'var(--bg-glass)', borderRadius: 'var(--radius-sm)', marginBottom: '4px', borderLeft: `3px solid ${p.status === 'normal' ? 'var(--accent-emerald)' : 'var(--accent-rose)'}` }}>
                    <span>{p.name}</span>
                    <span className={`badge badge-${p.status === 'normal' ? 'success' : 'danger'}`}>{p.value} {p.unit}</span>
                  </div>
                ))}
                {viewReport.result.overallAdvice && (
                  <div style={{ marginTop: '12px', padding: '12px', background: 'rgba(108,99,255,0.1)', borderRadius: 'var(--radius-md)' }}>
                    <strong>💊 Advice:</strong> {viewReport.result.overallAdvice}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
