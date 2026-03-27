import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { Send, Mic, MicOff, Loader, Stethoscope, Bell, Shield } from 'lucide-react';

export default function DiagnosisPage() {
  const { apiKey, t, isAnonymous, addReminder, setHealthFlags, setCurrentPage, addToast } = useApp();
  const [messages, setMessages] = useState([
    { role: 'ai', text: t(
      '👋 Hello! I\'m your AI Health Assistant. Tell me your symptoms and I\'ll help you understand what might be happening.\n\n🔒 Your information is kept private' + (isAnonymous ? ' (Anonymous mode active)' : '') + '.\n\nDescribe your symptoms in detail (e.g., "I have fever since 2 days, headache, and body pain")',
      '👋 नमस्ते! मैं आपका AI स्वास्थ्य सहायक हूं। अपने लक्षण बताएं और मैं समझने में मदद करूंगा।\n\n🔒 आपकी जानकारी गोपनीय है।\n\nअपने लक्षण विस्तार से बताएं (जैसे "मुझे 2 दिन से बुखार है, सिरदर्द और बदन दर्द")'
    )}
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const chatEndRef = useRef(null);
  const recognitionRef = useRef(null);

  useEffect(() => { chatEndRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [messages]);

  const startVoice = () => {
    if (!('webkitSpeechRecognition' in window || 'SpeechRecognition' in window)) {
      addToast('Speech recognition not supported in this browser', 'error');
      return;
    }
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SR();
    recognition.lang = 'hi-IN';
    recognition.interimResults = true;
    recognition.continuous = false;
    recognition.onresult = (e) => {
      const transcript = Array.from(e.results).map(r => r[0].transcript).join('');
      setInput(transcript);
    };
    recognition.onend = () => setIsListening(false);
    recognition.start();
    setIsListening(true);
    recognitionRef.current = recognition;
  };

  const stopVoice = () => {
    recognitionRef.current?.stop();
    setIsListening(false);
  };

  const sendMessage = async () => {
    if (!input.trim() || loading) return;
    if (!apiKey) { addToast('Set Gemini API key in Settings', 'error'); return; }
    const userMsg = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setLoading(true);

    try {
      const genAI = new GoogleGenerativeAI(apiKey);
      const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });
      const history = messages.map(m => `${m.role === 'user' ? 'Patient' : 'Doctor'}: ${m.text}`).join('\n');
      const prompt = `You are a compassionate AI doctor assistant for Indian citizens. You provide preliminary health guidance (NOT final diagnosis).
Previous conversation:
${history}
Patient: ${userMsg}

Respond as a caring doctor would. Include:
1. What the symptoms might indicate (possible conditions)
2. Suggested basic medicines (Indian brands like Crocin, Dolo, etc.)
3. Home remedies / natural remedies
4. When to see a real doctor
5. If relevant, suggest blood tests or checkups
6. Diet and lifestyle advice

Also at the end, add a JSON block like this (wrap in \`\`\`json markers):
\`\`\`json
{"healthFlags": ["detected conditions"], "followUp": "reminder message if applicable", "followUpHours": 4, "urgency": "normal|attention|urgent"}
\`\`\`

Be empathetic. Use simple language. If the user speaks Hindi, respond in Hindi.`;

      const res = await model.generateContent(prompt);
      let reply = res.response.text();
      
      // Extract JSON metadata
      const jsonMatch = reply.match(/```json\s*([\s\S]*?)```/);
      if (jsonMatch) {
        try {
          const meta = JSON.parse(jsonMatch[1]);
          if (meta.healthFlags?.length) setHealthFlags(prev => [...new Set([...prev, ...meta.healthFlags])]);
          if (meta.followUp) {
            addReminder({ message: meta.followUp, delayHours: meta.followUpHours || 4, type: 'follow-up' });
          }
        } catch {}
        reply = reply.replace(/```json[\s\S]*?```/, '').trim();
      }
      setMessages(prev => [...prev, { role: 'ai', text: reply }]);
    } catch (err) {
      setMessages(prev => [...prev, { role: 'ai', text: '❌ Error: ' + err.message }]);
    }
    setLoading(false);
  };

  return (
    <div className="animate-fade-in">
      <div className="page-header" style={{ marginBottom: '12px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <h1>🤖 {t('AI Self-Diagnosis', 'AI स्व-निदान')}</h1>
          {isAnonymous && <span className="badge badge-primary">🔒 Anonymous</span>}
        </div>
        <p>{t('Describe symptoms → Get AI health advice, medicines & remedies', 'लक्षण बताएं → AI स्वास्थ्य सलाह, दवाइयां और उपचार पाएं')}</p>
      </div>

      <div className="chat-container">
        <div className="chat-messages">
          {messages.map((m, i) => (
            <div key={i} className={`chat-message ${m.role === 'user' ? 'user' : 'ai'}`}>
              <div className="msg-sender">{m.role === 'user' ? (isAnonymous ? '🔒 Anonymous' : '👤 You') : '🤖 AI Doctor'}</div>
              <div style={{ whiteSpace: 'pre-wrap' }}>{m.text}</div>
            </div>
          ))}
          {loading && (
            <div className="chat-message ai">
              <div className="loading-dots"><span></span><span></span><span></span></div>
            </div>
          )}
          <div ref={chatEndRef} />
        </div>
        <div className="chat-input-area">
          <button className={`btn btn-icon ${isListening ? 'btn-danger' : 'btn-secondary'}`}
            onClick={isListening ? stopVoice : startVoice} title="Voice input (Hindi)">
            {isListening ? <MicOff size={18} /> : <Mic size={18} />}
          </button>
          <input type="text" className="form-input" placeholder={t('Describe your symptoms...', 'अपने लक्षण बताएं...')}
            value={input} onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && sendMessage()} />
          <button className="btn btn-primary btn-icon" onClick={sendMessage} disabled={loading || !input.trim()}>
            <Send size={18} />
          </button>
        </div>
      </div>
      <div style={{ display: 'flex', gap: '8px', marginTop: '12px', justifyContent: 'center' }}>
        <button className="btn btn-sm btn-outline" onClick={() => setCurrentPage('schemes')}>🏛️ {t('Check Schemes', 'योजनाएं देखें')}</button>
        <button className="btn btn-sm btn-outline" onClick={() => setCurrentPage('remedies')}>🌿 {t('Natural Remedies', 'प्राकृतिक उपचार')}</button>
        <button className="btn btn-sm btn-outline" onClick={() => setCurrentPage('doctors')}>👨‍⚕️ {t('Talk to Doctor', 'डॉक्टर से बात करें')}</button>
      </div>
    </div>
  );
}
