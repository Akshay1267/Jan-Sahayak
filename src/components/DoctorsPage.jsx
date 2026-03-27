import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { doctors, specialties } from '../data/doctors';
import { Search, Star, MapPin, Phone, MessageCircle, Calendar, IndianRupee } from 'lucide-react';
import { GoogleGenerativeAI } from '@google/generative-ai';

export default function DoctorsPage() {
  const { t, apiKey, addToast, healthFlags } = useApp();
  const [specialtyFilter, setSpecialtyFilter] = useState('');
  const [cityFilter, setCityFilter] = useState('');
  const [chatDoctor, setChatDoctor] = useState(null);
  const [chatMsgs, setChatMsgs] = useState([]);
  const [chatInput, setChatInput] = useState('');
  const [chatLoading, setChatLoading] = useState(false);

  const filtered = doctors.filter(d =>
    (!specialtyFilter || d.specialty === specialtyFilter) &&
    (!cityFilter || d.city === cityFilter)
  );

  const startConsult = (doc) => {
    setChatDoctor(doc);
    setChatMsgs([{ role: 'ai', text: t(
      `Hello! I'm ${doc.name}, ${doc.specialty} at ${doc.hospital}. How can I help you today?\n\nPlease describe your problem in detail.`,
      `नमस्ते! मैं ${doc.name}, ${doc.hospital} में ${doc.specialtyHi} हूं। मैं आज आपकी कैसे मदद कर सकता/सकती हूं?\n\nकृपया अपनी समस्या विस्तार से बताएं।`
    )}]);
  };

  const sendChat = async () => {
    if (!chatInput.trim() || chatLoading) return;
    if (!apiKey) { addToast('Set Gemini API key in Settings', 'error'); return; }
    const msg = chatInput.trim();
    setChatInput('');
    setChatMsgs(prev => [...prev, { role: 'user', text: msg }]);
    setChatLoading(true);
    try {
      const genAI = new GoogleGenerativeAI(apiKey);
      const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });
      const history = chatMsgs.map(m => `${m.role === 'user' ? 'Patient' : 'Doctor'}: ${m.text}`).join('\n');
      const prompt = `You are Dr. ${chatDoctor.name}, a ${chatDoctor.specialty} with ${chatDoctor.experience} years experience at ${chatDoctor.hospital}, ${chatDoctor.city}. 
Patient's known health conditions: ${healthFlags.join(', ') || 'None disclosed'}
Previous conversation:\n${history}\nPatient: ${msg}\n\nRespond as this specific doctor would — professional, empathetic, specific. Give medical advice, suggest tests, prescribe common medicines (Indian brands). If serious, recommend in-person visit. Keep response concise.`;
      const res = await model.generateContent(prompt);
      setChatMsgs(prev => [...prev, { role: 'ai', text: res.response.text() }]);
    } catch (err) {
      setChatMsgs(prev => [...prev, { role: 'ai', text: '❌ ' + err.message }]);
    }
    setChatLoading(false);
  };

  if (chatDoctor) {
    return (
      <div className="animate-fade-in">
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
          <button className="btn btn-secondary btn-sm" onClick={() => setChatDoctor(null)}>← Back</button>
          <div className="doctor-avatar" style={{ width: 40, height: 40, fontSize: '0.9rem' }}>{chatDoctor.avatar}</div>
          <div>
            <div style={{ fontWeight: 700 }}>{chatDoctor.name}</div>
            <div style={{ fontSize: '0.8rem', color: 'var(--primary-light)' }}>{chatDoctor.specialty} • {chatDoctor.hospital}</div>
          </div>
        </div>
        <div className="chat-container">
          <div className="chat-messages">
            {chatMsgs.map((m, i) => (
              <div key={i} className={`chat-message ${m.role === 'user' ? 'user' : 'ai'}`}>
                <div className="msg-sender">{m.role === 'user' ? '👤 You' : `🩺 ${chatDoctor.name}`}</div>
                <div style={{ whiteSpace: 'pre-wrap' }}>{m.text}</div>
              </div>
            ))}
            {chatLoading && <div className="chat-message ai"><div className="loading-dots"><span></span><span></span><span></span></div></div>}
          </div>
          <div className="chat-input-area">
            <input type="text" className="form-input" placeholder={t('Describe your problem...', 'अपनी समस्या बताएं...')}
              value={chatInput} onChange={e => setChatInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && sendChat()} />
            <button className="btn btn-primary btn-icon" onClick={sendChat}><MessageCircle size={18} /></button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="animate-fade-in">
      <div className="page-header">
        <h1>👨‍⚕️ {t('Doctor Consultation', 'डॉक्टर परामर्श')}</h1>
        <p>{t('Connect with doctors at minimal fees — AI-assisted consultation', 'न्यूनतम शुल्क पर डॉक्टरों से जुड़ें')}</p>
      </div>
      <div style={{ display: 'flex', gap: '8px', marginBottom: '16px', flexWrap: 'wrap' }}>
        <select className="form-select" style={{ flex: 1 }} value={specialtyFilter} onChange={e => setSpecialtyFilter(e.target.value)}>
          <option value="">{t('All Specialties', 'सभी विशेषज्ञ')}</option>
          {specialties.map(s => <option key={s} value={s}>{s}</option>)}
        </select>
        <select className="form-select" style={{ width: '120px' }} value={cityFilter} onChange={e => setCityFilter(e.target.value)}>
          <option value="">{t('All Cities', 'सभी शहर')}</option>
          <option value="Meerut">Meerut</option>
          <option value="Delhi">Delhi</option>
        </select>
      </div>

      {filtered.map(d => (
        <div key={d.id} className="doctor-card" style={{ marginBottom: '12px', cursor: 'pointer' }} onClick={() => startConsult(d)}>
          <div className="doctor-avatar">{d.avatar}</div>
          <div className="doctor-info">
            <div className="doctor-name">{d.name}</div>
            <div className="doctor-specialty">{t(d.specialty, d.specialtyHi)}</div>
            <div className="doctor-hospital">{d.hospital}, {d.city}</div>
            <div className="doctor-meta">
              <span>⭐ {d.rating}</span>
              <span>🏥 {d.experience} yrs</span>
              <span>📅 {d.available.join(', ')}</span>
            </div>
          </div>
          <div className="doctor-fee">
            <div className="fee-amount">{d.fee === 0 ? 'FREE' : `₹${d.fee}`}</div>
            <div className="fee-label">{t('per consultation', 'प्रति परामर्श')}</div>
            <button className="btn btn-sm btn-primary" style={{ marginTop: '8px' }}>
              <MessageCircle size={14} /> {t('Consult', 'परामर्श')}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
