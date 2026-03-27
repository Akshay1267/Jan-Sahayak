import React from 'react';
import { useApp } from '../context/AppContext';
import SponsorBanner from './SponsorBanner';
import { FileText, Search, Stethoscope, MapPin, Users, Camera, Mic, Leaf, FolderArchive, Bell, Shield, Zap, ArrowRight } from 'lucide-react';

const features = [
  { id: 'report', icon: '🏥', title: 'MedReport AI', titleHi: 'मेडरिपोर्ट AI', desc: 'Upload medical reports — AI explains results in plain language', descHi: 'मेडिकल रिपोर्ट अपलोड करें — AI सरल भाषा में समझाए', gradient: 'linear-gradient(135deg, #6C63FF22, #EC489922)', tag: 'AI Powered' },
  { id: 'schemes', icon: '🏛️', title: 'SchemeMatch', titleHi: 'स्कीममैच', desc: 'Find government schemes you qualify for instantly', descHi: 'तुरंत पता लगाएं कौन सी सरकारी योजनाएं आपके लिए हैं', gradient: 'linear-gradient(135deg, #F59E0B22, #F9731622)', tag: 'Hero Feature' },
  { id: 'diagnosis', icon: '🤖', title: 'AI Self-Diagnosis', titleHi: 'AI स्व-निदान', desc: 'Describe symptoms — get instant AI health advice', descHi: 'लक्षण बताएं — तुरंत AI स्वास्थ्य सलाह पाएं', gradient: 'linear-gradient(135deg, #10B98122, #06B6D422)', tag: 'Smart' },
  { id: 'hospitals', icon: '📍', title: 'Nearby Facilities', titleHi: 'नजदीकी सुविधाएं', desc: 'Find hospitals, clinics & Jan Aushadhi stores near you', descHi: 'नजदीकी अस्पताल, क्लिनिक और जन औषधि स्टोर खोजें', gradient: 'linear-gradient(135deg, #F43F5E22, #EC489922)', tag: 'Map' },
  { id: 'doctors', icon: '👨‍⚕️', title: 'Doctor Consult', titleHi: 'डॉक्टर परामर्श', desc: 'Connect with doctors at minimal fees — AI-assisted consultation', descHi: 'न्यूनतम शुल्क पर डॉक्टरों से जुड़ें — AI-सहायता परामर्श', gradient: 'linear-gradient(135deg, #8B83FF22, #6C63FF22)', tag: 'Consult' },
  { id: 'camera', icon: '📸', title: 'Camera Diagnosis', titleHi: 'कैमरा निदान', desc: 'Point camera at affected area — AI analyzes visually', descHi: 'प्रभावित क्षेत्र पर कैमरा करें — AI दृश्य विश्लेषण करे', gradient: 'linear-gradient(135deg, #06B6D422, #10B98122)', tag: 'Vision AI' },
  { id: 'voice', icon: '🎤', title: 'Voice Agent', titleHi: 'वॉइस एजेंट', desc: 'Speak your symptoms in Hindi or English — AI listens & responds', descHi: 'हिंदी या अंग्रेजी में बोलें — AI सुने और जवाब दे', gradient: 'linear-gradient(135deg, #EC489922, #F59E0B22)', tag: 'ElevenLabs' },
  { id: 'remedies', icon: '🌿', title: 'Natural Remedies', titleHi: 'प्राकृतिक उपचार', desc: 'Ayurvedic & home remedies for common ailments', descHi: 'सामान्य बीमारियों के लिए आयुर्वेदिक और घरेलू उपचार', gradient: 'linear-gradient(135deg, #10B98122, #F59E0B22)', tag: 'Ayurveda' },
  { id: 'vault', icon: '📁', title: 'Medical Vault', titleHi: 'मेडिकल वॉल्ट', desc: 'All medical reports saved in one secure place', descHi: 'सभी मेडिकल रिपोर्ट एक सुरक्षित जगह', gradient: 'linear-gradient(135deg, #4F46E522, #8B83FF22)', tag: 'Storage' },
];

export default function HomePage() {
  const { setCurrentPage, t, isAnonymous } = useApp();

  return (
    <div className="animate-fade-in">
      {/* Hero Section */}
      <div style={{ textAlign: 'center', padding: '20px 0 32px', marginBottom: '24px' }}>
        <div style={{ fontSize: '3.5rem', marginBottom: '8px' }}>🏥</div>
        <h1 style={{ marginBottom: '8px' }}>
          <span className="gradient-text">JanSahayak</span>
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '1.15rem', maxWidth: '500px', margin: '0 auto 16px' }}>
          {t('Your Health + Your Rights — AI-Powered Citizen Health & Welfare Assistant',
            'आपका स्वास्थ्य + आपके अधिकार — AI-संचालित नागरिक स्वास्थ्य और कल्याण सहायक')}
        </p>
        {isAnonymous && (
          <div className="badge badge-primary" style={{ fontSize: '0.8rem', padding: '6px 16px' }}>
            🔒 {t('Anonymous Mode Active', 'गुमनाम मोड सक्रिय')}
          </div>
        )}
      </div>

      {/* Hero Feature CTA */}
      <div className="glass-card highlight" style={{ textAlign: 'center', padding: '32px', marginBottom: '24px', background: 'linear-gradient(135deg, rgba(108,99,255,0.15), rgba(245,158,11,0.1))' }}
        onClick={() => setCurrentPage('schemes')}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', marginBottom: '12px' }}>
          <Zap size={20} style={{ color: 'var(--accent-amber)' }} />
          <span className="badge badge-warning">⭐ HERO FEATURE</span>
        </div>
        <h2 style={{ marginBottom: '8px' }}>
          {t('AI Health Scheme Recommender', 'AI स्वास्थ्य योजना सिफारिशकर्ता')}
        </h2>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '16px', maxWidth: '500px', margin: '0 auto 16px' }}>
          {t('Upload report OR describe symptoms → Get matched government schemes + nearby hospitals + medicine suggestions',
            'रिपोर्ट अपलोड करें या लक्षण बताएं → मिलान की गई सरकारी योजनाएं + नजदीकी अस्पताल + दवा सुझाव पाएं')}
        </p>
        <button className="btn btn-primary btn-lg" style={{ cursor: 'pointer' }}>
          {t('Get Started', 'शुरू करें')} <ArrowRight size={20} />
        </button>
      </div>

      <SponsorBanner />

      {/* Feature Grid */}
      <div className="section-title">{t('All Features', 'सभी सुविधाएं')}</div>
      <div className="grid-3" style={{ marginBottom: '32px' }}>
        {features.map((f, i) => (
          <div key={f.id} className="feature-card animate-slide-up" style={{ background: f.gradient, animationDelay: `${i * 0.05}s` }}
            onClick={() => setCurrentPage(f.id)}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '12px' }}>
              <div className="feature-icon" style={{ fontSize: '2rem' }}>{f.icon}</div>
              <span className="badge badge-primary" style={{ fontSize: '0.65rem' }}>{f.tag}</span>
            </div>
            <div className="feature-title">{t(f.title, f.titleHi)}</div>
            <div className="feature-desc">{t(f.desc, f.descHi)}</div>
          </div>
        ))}
      </div>

      {/* Stats */}
      <div className="glass-card" style={{ display: 'flex', justifyContent: 'space-around', textAlign: 'center', padding: '24px' }}>
        {[
          { num: '50+', label: t('Govt Schemes', 'सरकारी योजनाएं') },
          { num: '24+', label: t('Natural Remedies', 'प्राकृतिक उपचार') },
          { num: '23+', label: t('Doctors', 'डॉक्टर') },
          { num: '24+', label: t('Hospitals', 'अस्पताल') },
          { num: '10', label: t('Languages', 'भाषाएं') },
        ].map((s, i) => (
          <div key={i}>
            <div style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--primary-light)' }}>{s.num}</div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{s.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
