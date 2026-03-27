import React, { useState, useRef } from 'react';
import { useApp } from '../context/AppContext';
import { Upload, Camera, FileImage, Loader, AlertTriangle, CheckCircle, ArrowRight, Save } from 'lucide-react';
import { GoogleGenerativeAI } from '@google/generative-ai';

export default function MedReportPage() {
  const { apiKey, t, addToVault, setHealthFlags, setCurrentPage, addToast } = useApp();
  const [image, setImage] = useState(null);
  const [imageData, setImageData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const fileRef = useRef();

  const handleFile = (file) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      setImage(e.target.result);
      setImageData(e.target.result.split(',')[1]);
    };
    reader.readAsDataURL(file);
    setResult(null);
  };

  const analyzeReport = async () => {
    if (!apiKey) { addToast('Please set Gemini API key in Settings', 'error'); return; }
    if (!imageData) return;
    setLoading(true);
    try {
      const genAI = new GoogleGenerativeAI(apiKey);
      const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });
      const prompt = `You are a medical report analyzer for Indian patients. Analyze this medical report image and provide a JSON response with this exact structure:
{
  "summary": "Brief 1-line summary of report type",
  "parameters": [
    {"name": "Parameter Name", "value": "detected value", "unit": "unit", "status": "normal|low|high", "normalRange": "range", "explanation": "what this means in simple terms"}
  ],
  "healthFlags": ["list of detected conditions like anemia, diabetes etc"],
  "overallAdvice": "2-3 sentences of practical health advice",
  "urgency": "normal|attention|urgent",
  "suggestedMedicines": ["list of commonly suggested OTC medicines if applicable"],
  "dietAdvice": "specific diet recommendations"
}
Only return valid JSON. Be accurate with medical values. Explain in simple language that a rural Indian citizen can understand.`;

      const res = await model.generateContent([
        prompt,
        { inlineData: { mimeType: 'image/jpeg', data: imageData } }
      ]);
      const text = res.response.text();
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        const data = JSON.parse(jsonMatch[0]);
        setResult(data);
        if (data.healthFlags) setHealthFlags(data.healthFlags);
        addToast('Report analyzed successfully!', 'success');
      }
    } catch (err) {
      console.error(err);
      addToast('Analysis failed: ' + err.message, 'error');
    }
    setLoading(false);
  };

  const saveToVault = () => {
    addToVault({ image, result, type: 'Medical Report' });
  };

  return (
    <div className="animate-fade-in">
      <div className="page-header">
        <h1>🏥 {t('MedReport AI', 'मेडरिपोर्ट AI')}</h1>
        <p>{t('Upload medical report → AI explains in simple language', 'मेडिकल रिपोर्ट अपलोड करें → AI सरल भाषा में समझाए')}</p>
        <div className="badge badge-primary mt-sm">⚡ {t('Powered by TRAE', 'TRAE द्वारा संचालित')}</div>
      </div>

      {!image ? (
        <div className="upload-zone" onClick={() => fileRef.current?.click()}
          onDragOver={e => { e.preventDefault(); e.currentTarget.classList.add('drag-over'); }}
          onDragLeave={e => e.currentTarget.classList.remove('drag-over')}
          onDrop={e => { e.preventDefault(); e.currentTarget.classList.remove('drag-over'); handleFile(e.dataTransfer.files[0]); }}>
          <div className="upload-icon"><Upload size={48} /></div>
          <p style={{ fontSize: '1.1rem', fontWeight: 600 }}>{t('Upload Medical Report', 'मेडिकल रिपोर्ट अपलोड करें')}</p>
          <p className="upload-hint">{t('Drag & drop or click to select (Blood test, Sugar test, Thyroid, etc.)', 'खींचें और छोड़ें या चुनने के लिए क्लिक करें')}</p>
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', marginTop: '16px' }}>
            <button className="btn btn-primary"><Camera size={16} /> {t('Camera', 'कैमरा')}</button>
            <button className="btn btn-secondary"><FileImage size={16} /> {t('Gallery', 'गैलरी')}</button>
          </div>
          <input ref={fileRef} type="file" accept="image/*" capture="environment" style={{ display: 'none' }}
            onChange={e => handleFile(e.target.files[0])} />
        </div>
      ) : (
        <div>
          <div className="glass-card" style={{ marginBottom: '16px', textAlign: 'center' }}>
            <img src={image} alt="Report" style={{ maxHeight: '300px', borderRadius: 'var(--radius-md)', marginBottom: '16px' }} />
            <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
              <button className="btn btn-primary" onClick={analyzeReport} disabled={loading}>
                {loading ? <><Loader size={16} className="animate-spin" /> {t('Analyzing...', 'विश्लेषण...')}</> : <>{t('Analyze Report', 'रिपोर्ट विश्लेषण करें')} <ArrowRight size={16} /></>}
              </button>
              <button className="btn btn-secondary" onClick={() => { setImage(null); setResult(null); }}>{t('Change', 'बदलें')}</button>
            </div>
          </div>

          {loading && (
            <div className="glass-card" style={{ textAlign: 'center', padding: '48px' }}>
              <div className="loading-spinner" style={{ margin: '0 auto 16px' }}></div>
              <p style={{ color: 'var(--text-secondary)' }}>{t('AI is reading your report...', 'AI आपकी रिपोर्ट पढ़ रहा है...')}</p>
            </div>
          )}

          {result && (
            <div className="animate-slide-up">
              {/* Summary */}
              <div className={`result-card ${result.urgency === 'urgent' ? 'highlight' : ''}`} style={{ borderLeft: `4px solid ${result.urgency === 'urgent' ? 'var(--accent-rose)' : result.urgency === 'attention' ? 'var(--accent-amber)' : 'var(--accent-emerald)'}` }}>
                <div className="result-header">
                  <div className="result-icon" style={{ background: result.urgency === 'urgent' ? 'rgba(244,63,94,0.2)' : 'rgba(16,185,129,0.2)' }}>
                    {result.urgency === 'urgent' ? <AlertTriangle size={24} color="var(--accent-rose)" /> : <CheckCircle size={24} color="var(--accent-emerald)" />}
                  </div>
                  <div>
                    <div className="result-title">{result.summary}</div>
                    <span className={`badge badge-${result.urgency === 'urgent' ? 'danger' : result.urgency === 'attention' ? 'warning' : 'success'}`}>
                      {result.urgency?.toUpperCase()}
                    </span>
                  </div>
                </div>
              </div>

              {/* Parameters */}
              {result.parameters?.map((p, i) => (
                <div key={i} className="result-card" style={{ borderLeft: `4px solid ${p.status === 'normal' ? 'var(--accent-emerald)' : p.status === 'low' ? 'var(--accent-amber)' : 'var(--accent-rose)'}` }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                    <strong>{p.name}</strong>
                    <span className={`badge badge-${p.status === 'normal' ? 'success' : p.status === 'low' ? 'warning' : 'danger'}`}>
                      {p.status === 'normal' ? '✅' : '⚠️'} {p.value} {p.unit}
                    </span>
                  </div>
                  <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '4px' }}>Normal: {p.normalRange}</div>
                  <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>{p.explanation}</div>
                </div>
              ))}

              {/* Advice */}
              <div className="glass-card" style={{ borderLeft: '4px solid var(--primary)' }}>
                <h3 style={{ marginBottom: '12px' }}>💊 {t('Health Advice', 'स्वास्थ्य सलाह')}</h3>
                <p style={{ color: 'var(--text-secondary)', marginBottom: '12px' }}>{result.overallAdvice}</p>
                {result.dietAdvice && <p style={{ color: 'var(--accent-emerald)' }}>🥗 {result.dietAdvice}</p>}
                {result.suggestedMedicines?.length > 0 && (
                  <div style={{ marginTop: '12px' }}>
                    <strong>💊 {t('Suggested Medicines:', 'सुझाई गई दवाइयां:')}</strong>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '8px' }}>
                      {result.suggestedMedicines.map((m, i) => <span key={i} className="badge badge-info">{m}</span>)}
                    </div>
                  </div>
                )}
              </div>

              {/* Actions */}
              <div style={{ display: 'flex', gap: '12px', marginTop: '16px', flexWrap: 'wrap' }}>
                <button className="btn btn-success" onClick={saveToVault}><Save size={16} /> {t('Save to Vault', 'वॉल्ट में सहेजें')}</button>
                <button className="btn btn-primary" onClick={() => setCurrentPage('schemes')}>
                  <ArrowRight size={16} /> {t('Find Matching Schemes', 'मिलान योजनाएं खोजें')}
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
