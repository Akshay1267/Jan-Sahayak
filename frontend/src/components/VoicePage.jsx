import React, { useState, useRef } from 'react';
import { useApp } from '../context/AppContext';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { Mic, MicOff, Volume2, VolumeX, Globe, Loader } from 'lucide-react';

export default function VoicePage() {
  const { apiKey, elevenLabsKey, t, language, addToast, healthFlags, medVault } = useApp();
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);
  const [voiceLang, setVoiceLang] = useState('hi-IN');
  const recognitionRef = useRef(null);
  const audioRef = useRef(null);

  const startListening = () => {
    if (!('webkitSpeechRecognition' in window || 'SpeechRecognition' in window)) {
      addToast('Speech recognition not supported', 'error'); return;
    }
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SR();
    recognition.lang = voiceLang;
    recognition.interimResults = true;
    recognition.continuous = true;
    recognition.onresult = (e) => {
      const t = Array.from(e.results).map(r => r[0].transcript).join('');
      setTranscript(t);
    };
    recognition.onend = () => setIsListening(false);
    recognition.onerror = () => setIsListening(false);
    recognition.start();
    recognitionRef.current = recognition;
    setIsListening(true);
    setResponse('');
  };

  const stopAndProcess = async () => {
    recognitionRef.current?.stop();
    setIsListening(false);
    if (!transcript.trim()) return;
    if (!apiKey) { addToast('Set Gemini API key in Settings', 'error'); return; }
    setLoading(true);

    try {
      const genAI = new GoogleGenerativeAI(apiKey);
      const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });
      const userHistory = medVault.length > 0
        ? `User has ${medVault.length} medical reports. Last conditions: ${healthFlags.join(', ') || 'None'}.`
        : 'No previous medical history.';
      
      const prompt = `You are JanSahayak Voice Agent — a caring AI health assistant that speaks ${voiceLang === 'hi-IN' ? 'Hindi' : 'English'}.
User's medical history: ${userHistory}
Known health conditions: ${healthFlags.join(', ') || 'None'}

The user just said: "${transcript}"

Respond naturally as a voice assistant would. Be:
- Empathetic and caring
- Practical with advice
- Suggest medicines (Indian brands), home remedies, when to see doctor
- If they have known conditions, reference them
- Keep response conversational and under 200 words
- Respond in ${voiceLang === 'hi-IN' ? 'Hindi (using Devanagari script)' : 'English'}`;

      const res = await model.generateContent(prompt);
      const text = res.response.text();
      setResponse(text);
      
      // Text-to-Speech
      if (elevenLabsKey) {
        await speakElevenLabs(text);
      } else {
        speakBrowser(text);
      }
    } catch (err) {
      addToast('Error: ' + err.message, 'error');
    }
    setLoading(false);
  };

  const speakElevenLabs = async (text) => {
    try {
      setIsSpeaking(true);
      const voiceId = voiceLang === 'hi-IN' ? 'pFZP5JQG7iQjIQuC4Bku' : '21m00Tcm4TlvDq8ikWAM';
      const resp = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'xi-api-key': elevenLabsKey },
        body: JSON.stringify({ text: text.slice(0, 500), model_id: 'eleven_multilingual_v2', voice_settings: { stability: 0.5, similarity_boost: 0.5 } })
      });
      if (resp.ok) {
        const blob = await resp.blob();
        const url = URL.createObjectURL(blob);
        if (audioRef.current) { audioRef.current.src = url; audioRef.current.play(); }
        audioRef.current.onended = () => setIsSpeaking(false);
      } else { speakBrowser(text); }
    } catch { speakBrowser(text); }
  };

  const speakBrowser = (text) => {
    setIsSpeaking(true);
    const utterance = new SpeechSynthesisUtterance(text.slice(0, 300));
    utterance.lang = voiceLang;
    utterance.onend = () => setIsSpeaking(false);
    speechSynthesis.speak(utterance);
  };

  const stopSpeaking = () => {
    speechSynthesis.cancel();
    if (audioRef.current) { audioRef.current.pause(); audioRef.current.currentTime = 0; }
    setIsSpeaking(false);
  };

  return (
    <div className="animate-fade-in">
      <div className="page-header">
        <h1>🎤 {t('Voice Agent', 'वॉइस एजेंट')}</h1>
        <p>{t('Speak your health concerns — AI listens, understands & responds', 'अपनी स्वास्थ्य चिंताएं बोलें — AI सुने, समझे और जवाब दे')}</p>
        <div style={{ display: 'flex', gap: '8px', marginTop: '8px' }}>
          <span className="badge badge-primary">🔊 ElevenLabs</span>
          <span className="badge badge-info">{healthFlags.length > 0 ? `${healthFlags.length} conditions tracked` : 'New User'}</span>
        </div>
      </div>

      {/* Language Selector */}
      <div className="glass-card" style={{ marginBottom: '24px', padding: '16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <Globe size={18} style={{ color: 'var(--primary-light)' }} />
          <span style={{ fontWeight: 600 }}>{t('Voice Language:', 'वॉइस भाषा:')}</span>
          <div className="lang-selector">
            <button className={`lang-btn ${voiceLang === 'hi-IN' ? 'active' : ''}`} onClick={() => setVoiceLang('hi-IN')}>हिन्दी</button>
            <button className={`lang-btn ${voiceLang === 'en-IN' ? 'active' : ''}`} onClick={() => setVoiceLang('en-IN')}>English</button>
          </div>
        </div>
      </div>

      <div className="voice-agent-container">
        <div className={`voice-orb ${isListening ? 'listening' : ''} ${isSpeaking ? 'animate-pulse-glow': ''}`}
          onClick={isListening ? stopAndProcess : startListening}
          style={{ cursor: 'pointer' }}>
          {loading ? <Loader size={48} className="animate-spin" style={{ color: 'white' }} /> 
            : isListening ? <MicOff size={48} /> 
            : isSpeaking ? <Volume2 size={48} />
            : <Mic size={48} />}
        </div>

        <div className="voice-status">
          {loading ? t('Processing...', 'प्रोसेसिंग...') 
            : isListening ? t('🎤 Listening... Tap to stop & process', '🎤 सुन रहा है... रोकने के लिए टैप करें')
            : isSpeaking ? t('🔊 Speaking...', '🔊 बोल रहा है...')
            : t('Tap the mic to start speaking', 'बोलने के लिए माइक पर टैप करें')}
        </div>

        {transcript && (
          <div className="voice-transcript">
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '8px' }}>🎤 {t('You said:', 'आपने कहा:')}</div>
            {transcript}
          </div>
        )}

        {response && (
          <div className="voice-transcript" style={{ borderColor: 'var(--primary)', maxHeight: '300px', overflowY: 'auto' }}>
            <div style={{ fontSize: '0.75rem', color: 'var(--primary-light)', marginBottom: '8px' }}>
              🤖 {t('AI Response:', 'AI जवाब:')}
              {isSpeaking && <button className="btn btn-sm btn-danger" style={{ marginLeft: '12px', padding: '2px 8px' }} onClick={stopSpeaking}><VolumeX size={12} /> Stop</button>}
            </div>
            <div style={{ whiteSpace: 'pre-wrap' }}>{response}</div>
          </div>
        )}
      </div>

      <audio ref={audioRef} style={{ display: 'none' }} />
    </div>
  );
}
