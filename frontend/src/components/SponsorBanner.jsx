import React from 'react';

const sponsors = [
  { name: 'TRAE', icon: '⚡', color: '#6C63FF' },
  { name: 'WebReinvent', icon: '🌐', color: '#10B981' },
  { name: 'GitHub', icon: '🐙', color: '#F1F1F8' },
  { name: 'Bump FM', icon: '📻', color: '#F59E0B' },
  { name: '.xyz', icon: '🌍', color: '#06B6D4' },
  { name: 'useqr', icon: '📱', color: '#EC4899' },
  { name: 'ElevenLabs', icon: '🔊', color: '#8B83FF' },
  { name: 'v0', icon: '▲', color: '#F1F1F8' },
];

export default function SponsorBanner() {
  return (
    <div className="sponsor-banner">
      <div className="sponsor-label">Powered by our Sponsors</div>
      <div className="sponsor-logos" style={{ animation: 'none', justifyContent: 'center', flexWrap: 'wrap', gap: '12px' }}>
        {sponsors.map(s => (
          <div key={s.name} className="sponsor-logo" style={{ borderColor: s.color + '33' }}>
            <span className="sponsor-icon">{s.icon}</span>
            <span>{s.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
