import React, { useState, useRef, useCallback } from 'react';
import { useApp } from '../context/AppContext';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { Camera, X, Loader, RotateCcw, Zap } from 'lucide-react';

export default function CameraPage() {
  const { apiKey, t, addToast, setHealthFlags } = useApp();
  const [streaming, setStreaming] = useState(false);
  const [captured, setCaptured] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const videoRef = useRef(null);
  const streamRef = useRef(null);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
      videoRef.current.srcObject = stream;
      streamRef.current = stream;
      setStreaming(true);
      setCaptured(null);
      setResult(null);
    } catch (err) { addToast('Camera access denied: ' + err.message, 'error'); }
  };

  const stopCamera = () => {
    streamRef.current?.getTracks().forEach(t => t.stop());
    setStreaming(false);
  };

  const capture = () => {
    const canvas = document.createElement('canvas');
    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;
    canvas.getContext('2d').drawImage(videoRef.current, 0, 0);
    const dataUrl = canvas.toDataURL('image/jpeg', 0.8);
    setCaptured(dataUrl);
    stopCamera();
  };

  const analyze = async () => {
    if (!apiKey) { addToast('Set Gemini API key in Settings', 'error'); return; }
    setLoading(true);
    try {
      const genAI = new GoogleGenerativeAI(apiKey);
      const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });
      const base64 = captured.split(',')[1];
      const prompt = `You are a visual health diagnostic AI assistant. Analyze this image of a person's body part or health condition.

Provide a detailed response:
1. **What you see**: Describe the visible condition/symptom
2. **Possible conditions**: List 2-3 possible conditions this could be
3. **Immediate actions**: What can the person do RIGHT NOW (wash with water, apply ice, etc.)
4. **Home remedies**: Natural treatments that may help
5. **Medicines**: Over-the-counter medicines that may help (Indian brands)
6. **When to see doctor**: Clear guidance on when professional help is needed
7. **Urgency level**: normal / attention / urgent

Common conditions to look for: eye redness/flu, skin rash, wound, swelling, burns, insect bites, fungal infection, acne, allergic reaction.

Be practical and empathetic. This is for Indian citizens who may not have easy access to doctors.`;

      const res = await model.generateContent([prompt, { inlineData: { mimeType: 'image/jpeg', data: base64 } }]);
      setResult(res.response.text());
    } catch (err) { addToast('Analysis failed: ' + err.message, 'error'); }
    setLoading(false);
  };

  return (
    <div className="animate-fade-in">
      <div className="page-header">
        <h1>📸 {t('Camera AI Diagnosis', 'कैमरा AI निदान')}</h1>
        <p>{t('Point camera at affected area → AI analyzes visually', 'प्रभावित क्षेत्र पर कैमरा दिखाएं → AI दृश्य विश्लेषण करे')}</p>
        <div className="badge badge-primary mt-sm">⚡ {t('Powered by TRAE', 'TRAE द्वारा संचालित')}</div>
      </div>

      {!streaming && !captured && (
        <div className="glass-card" style={{ textAlign: 'center', padding: '48px' }}>
          <div style={{ fontSize: '4rem', marginBottom: '16px' }}>📸</div>
          <h3>{t('Visual Health Check', 'दृश्य स्वास्थ्य जांच')}</h3>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '24px', maxWidth: '400px', margin: '0 auto 24px' }}>
            {t('Open camera and show the affected area (eye, skin, wound, etc.) — AI will analyze and suggest remedies',
              'कैमरा खोलें और प्रभावित क्षेत्र दिखाएं (आंख, त्वचा, घाव आदि) — AI विश्लेषण करेगा')}
          </p>
          <button className="btn btn-primary btn-lg" onClick={startCamera}>
            <Camera size={20} /> {t('Open Camera', 'कैमरा खोलें')}
          </button>
        </div>
      )}

      {streaming && (
        <div className="camera-container">
          <video ref={videoRef} autoPlay playsInline style={{ width: '100%' }} />
          <div className="camera-overlay">
            <button className="btn btn-danger btn-icon" onClick={stopCamera}><X size={20} /></button>
            <button className="camera-capture-btn" onClick={capture} />
          </div>
        </div>
      )}

      {captured && (
        <div>
          <div className="glass-card" style={{ textAlign: 'center', marginBottom: '16px' }}>
            <img src={captured} alt="Captured" style={{ maxHeight: '350px', borderRadius: 'var(--radius-md)', marginBottom: '16px' }} />
            <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
              <button className="btn btn-primary" onClick={analyze} disabled={loading}>
                {loading ? <><Loader size={16} /> {t('Analyzing...', 'विश्लेषण...')}</> : <><Zap size={16} /> {t('Analyze', 'विश्लेषण')}</>}
              </button>
              <button className="btn btn-secondary" onClick={() => { setCaptured(null); setResult(null); startCamera(); }}>
                <RotateCcw size={16} /> {t('Retake', 'दोबारा')}
              </button>
            </div>
          </div>

          {loading && (
            <div className="glass-card" style={{ textAlign: 'center', padding: '48px' }}>
              <div className="loading-spinner" style={{ margin: '0 auto 16px' }}></div>
              <p style={{ color: 'var(--text-secondary)' }}>{t('AI is analyzing the image...', 'AI छवि का विश्लेषण कर रहा है...')}</p>
            </div>
          )}

          {result && (
            <div className="glass-card animate-slide-up" style={{ borderLeft: '4px solid var(--primary)' }}>
              <h3 style={{ marginBottom: '12px' }}>🔍 {t('Analysis Result', 'विश्लेषण परिणाम')}</h3>
              <div style={{ whiteSpace: 'pre-wrap', color: 'var(--text-secondary)', lineHeight: 1.8 }}>{result}</div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
