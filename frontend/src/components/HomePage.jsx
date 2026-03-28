import React from 'react';
import { useApp } from '../context/AppContext';
import SponsorBanner from './SponsorBanner';
import { FileText, Search, Stethoscope, MapPin, Users, Camera, Mic, Leaf, FolderArchive, Bell, Shield, Zap, ArrowRight, Activity, Sparkles } from 'lucide-react';

const features = [
  { id: 'report', icon: <FileText size={32} />, title: 'MedReport AI', titleHi: 'मेडरिपोर्ट AI', desc: 'Upload medical reports — AI explains results in plain language', descHi: 'मेडिकल रिपोर्ट अपलोड करें — AI सरल भाषा में समझाए', gradient: 'rgba(0, 100, 146, 0.05)', tag: 'AI Powered' },
  { id: 'schemes', icon: <Search size={32} />, title: 'SchemeMatch', titleHi: 'स्कीममैच', desc: 'Find government schemes you qualify for instantly', descHi: 'तुरंत पता लगाएं कौन सी सरकारी योजनाएं आपके लिए हैं', gradient: 'rgba(242, 153, 74, 0.08)', tag: 'Hero Feature' },
  { id: 'diagnosis', icon: <Activity size={32} />, title: 'AI Self-Diagnosis', titleHi: 'AI स्व-निदान', desc: 'Describe symptoms — get instant AI health advice', descHi: 'लक्षण बताएं — तुरंत AI स्वास्थ्य सलाह पाएं', gradient: 'rgba(16, 185, 129, 0.05)', tag: 'Smart' },
  { id: 'hospitals', icon: <MapPin size={32} />, title: 'Nearby Facilities', titleHi: 'नजदीकी सुविधाएं', desc: 'Find hospitals, clinics & Jan Aushadhi stores near you', descHi: 'नजदीकी अस्पताल, क्लिनिक और जन औषधि स्टोर खोजें', gradient: 'rgba(0, 100, 146, 0.05)', tag: 'Map' },
  { id: 'doctors', icon: <Users size={32} />, title: 'Doctor Consult', titleHi: 'डॉक्टर परामर्श', desc: 'Connect with doctors at minimal fees — AI-assisted consultation', descHi: 'न्यूनतम शुल्क पर डॉक्टरों से जुड़ें — AI-सहायता परामर्श', gradient: 'rgba(45, 156, 219, 0.05)', tag: 'Consult' },
  { id: 'camera', icon: <Camera size={32} />, title: 'Camera Diagnosis', titleHi: 'कैमरा निदान', desc: 'Point camera at affected area — AI analyzes visually', descHi: 'प्रभावित क्षेत्र पर कैमरा करें — AI दृश्य विश्लेषण करे', gradient: 'rgba(6, 182, 212, 0.05)', tag: 'Vision AI' },
  { id: 'voice', icon: <Mic size={32} />, title: 'Voice Agent', titleHi: 'वॉइस एजेंट', desc: 'Speak your symptoms in Hindi or English — AI listens & responds', descHi: 'हिंदी या अंग्रेजी में बोलें — AI सुने और जवाब दे', gradient: 'rgba(186, 26, 26, 0.05)', tag: 'ElevenLabs' },
  { id: 'remedies', icon: <Leaf size={32} />, title: 'Natural Remedies', titleHi: 'प्राकृतिक उपचार', desc: 'Ayurvedic & home remedies for common ailments', descHi: 'सामान्य बीमारियों के लिए आयुर्वेदिक और घरेलू उपचार', gradient: 'rgba(16, 185, 129, 0.05)', tag: 'Ayurveda' },
  { id: 'vault', icon: <FolderArchive size={32} />, title: 'Medical Vault', titleHi: 'मेडिकल वॉल्ट', desc: 'All medical reports saved in one secure place', descHi: 'सभी मेडिकल रिपोर्ट एक सुरक्षित जगह', gradient: 'rgba(0, 100, 146, 0.05)', tag: 'Storage' },
];

export default function HomePage() {
  const { setCurrentPage, t, isAnonymous } = useApp();

  return (
    <div className="animate-fade-in" style={{ paddingBottom: 'var(--space-2xl)' }}>
      {/* Editorial Hero Section */}
      <div style={{ textAlign: 'left', padding: 'var(--space-2xl) 0 var(--space-xl)', maxWidth: '800px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
          <div className="badge badge-info"><Sparkles size={14} /> NEW ERA OF HEALTHCARE</div>
          {isAnonymous && (
            <div className="badge badge-primary">🔒 {t('Anonymous Mode', 'गुमनाम मोड')}</div>
          )}
        </div>
        <h1 style={{ lineHeight: 1.1, marginBottom: '1.5rem' }}>
          {t('Your Health Sanctuary,', 'आपका स्वास्थ्य अभयारण्य,')} <br/>
          <span style={{ color: 'var(--primary)' }}>{t('Powered by AI.', 'AI द्वारा संचालित।')}</span>
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '1.25rem', lineHeight: 1.6, marginBottom: '2.5rem', fontWeight: 500 }}>
          {t('JanSahayak bridges the gap between citizens and healthcare. Upload reports, find schemes, and talk to AI for instant health guidance.',
            'जनसहायक नागरिकों और स्वास्थ्य सेवा के बीच की दूरी को पाटता है। रिपोर्ट अपलोड करें, योजनाएं खोजें और त्वरित स्वास्थ्य मार्गदर्शन के लिए AI से बात करें।')}
        </p>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <button className="btn btn-primary btn-lg" onClick={() => setCurrentPage('schemes')}>
            {t('Find Schemes', 'योजनाएं खोजें')} <ArrowRight size={20} />
          </button>
          <button className="btn btn-secondary btn-lg" onClick={() => setCurrentPage('report')}>
            {t('Analyze Report', 'रिपोर्ट विश्लेषण')}
          </button>
        </div>
      </div>

      {/* High-Lift Signature CTA */}
      <div className="glass-card highlight animate-slide-up" 
        style={{ 
          margin: 'var(--space-xl) 0',
          padding: 'var(--space-xl)', 
          background: 'var(--gradient-card)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          border: '1px solid var(--border-light)',
          position: 'relative',
          overflow: 'hidden'
        }}
        onClick={() => setCurrentPage('schemes')}>
        
        {/* Decorative element */}
        <div style={{ position: 'absolute', top: -50, right: -50, width: 200, height: 200, background: 'var(--primary-glow)', borderRadius: '50%', filter: 'blur(60px)', zIndex: 0 }}></div>

        <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div className="badge badge-warning" style={{ marginBottom: '1.5rem' }}>
            <Zap size={14} fill="currentColor" /> {t('HERO FEATURE', 'मुख्य विशेषता')}
          </div>
          <h2 style={{ fontSize: '2.2rem', marginBottom: '1rem', letterSpacing: '-0.03em', color: 'var(--text-primary)' }}>
            {t('AI Health Scheme Recommender', 'AI स्वास्थ्य योजना सिफारिशकर्ता')}
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', marginBottom: '2rem', maxWidth: '600px' }}>
            {t('A revolutionary way to find welfare. Our AI analyzes your medical history or current symptoms to match you with over 100+ government health schemes instantly.',
              'कल्याण खोजने का एक क्रांतिकारी तरीका। हमारा AI आपकी मेडिकल हिस्ट्री या वर्तमान लक्षणों का विश्लेषण करता है ताकि आपको तुरंत 100+ सरकारी स्वास्थ्य योजनाओं से मिलान किया जा सके।')}
          </p>
          <button className="btn btn-primary btn-lg">
            {t('Search Schemes Now', 'अभी योजनाएं खोजें')}
          </button>
        </div>
      </div>

      <SponsorBanner />

      {/* Feature Grid - Organic Staggered Layout */}
      <div style={{ marginTop: 'var(--space-2xl)' }}>
        <div className="section-title">{t('Explore Capabilities', 'क्षमताओं का पता लगाएं')}</div>
        <div className="grid-3" style={{ gap: 'var(--space-lg)' }}>
          {features.map((f, i) => (
            <div key={f.id} 
              className={`feature-card animate-slide-up ${i % 2 === 0 ? '' : 'stagger-1'}`} 
              style={{ 
                background: f.gradient, 
                animationDelay: `${i * 0.1}s`,
                marginTop: i === 1 || i === 4 || i === 7 ? '2rem' : '0' // Organic staggering
              }}
              onClick={() => setCurrentPage(f.id)}>
              <div className="feature-icon">{f.icon}</div>
              <div style={{ flex: 1 }}>
                <div className="badge badge-info" style={{ marginBottom: '0.75rem', fontSize: '0.65rem' }}>{f.tag}</div>
                <div className="feature-title">{t(f.title, f.titleHi)}</div>
                <div className="feature-desc">{t(f.desc, f.descHi)}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Data Layers / Stats */}
      <div className="glass-card" style={{ marginTop: 'var(--space-2xl)', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '2rem', textAlign: 'center' }}>
        {[
          { icon: <Search size={24}/>, num: '100+', label: t('Govt Schemes', 'सरकारी योजनाएं'), color: 'var(--primary)' },
          { icon: <Leaf size={24}/>, num: '500+', label: t('Natural Remedies', 'प्राकृतिक उपचार'), color: 'var(--accent-emerald)' },
          { icon: <Users size={24}/>, num: '1,200', label: t('Health Pros', 'स्वास्थ्य विशेषज्ञ'), color: 'var(--primary-light)' },
          { icon: <MapPin size={24}/>, num: '1.5k', label: t('Medical Stores', 'मेडिकल स्टोर'), color: 'var(--accent-amber)' },
        ].map((s, i) => (
          <div key={i} className="animate-fade-in" style={{ animationDelay: `${i * 0.1}s` }}>
            <div style={{ color: s.color, marginBottom: '1rem', display: 'flex', justifyContent: 'center' }}>{s.icon}</div>
            <div style={{ fontSize: '2.2rem', fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.04em' }}>{s.num}</div>
            <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{s.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
