import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { hospitals, facilityTypes } from '../data/hospitals';
import { MapPin, Phone, Navigation, Star, Filter, Building2 } from 'lucide-react';

export default function HospitalsPage() {
  const { t } = useApp();
  const [filter, setFilter] = useState('All');
  const [cityFilter, setCityFilter] = useState('All');
  const [userLoc, setUserLoc] = useState(null);
  const [showMap, setShowMap] = useState(true);

  useEffect(() => {
    navigator.geolocation?.getCurrentPosition(
      pos => setUserLoc({ lat: pos.coords.latitude, lng: pos.coords.longitude }),
      () => setUserLoc({ lat: 28.9845, lng: 77.7064 }) // Default Meerut
    );
  }, []);

  const getDistance = (h) => {
    if (!userLoc) return 999;
    const R = 6371;
    const dLat = (h.lat - userLoc.lat) * Math.PI / 180;
    const dLng = (h.lng - userLoc.lng) * Math.PI / 180;
    const a = Math.sin(dLat/2)**2 + Math.cos(userLoc.lat*Math.PI/180) * Math.cos(h.lat*Math.PI/180) * Math.sin(dLng/2)**2;
    return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  };

  const filtered = hospitals
    .filter(h => filter === 'All' || h.type === filter)
    .filter(h => cityFilter === 'All' || h.city === cityFilter)
    .map(h => ({ ...h, distance: getDistance(h) }))
    .sort((a, b) => a.distance - b.distance);

  const mapCenter = userLoc || { lat: 28.9845, lng: 77.7064 };
  const mapUrl = `https://www.google.com/maps/embed/v1/search?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&q=hospitals+near+${mapCenter.lat},${mapCenter.lng}&zoom=13`;

  return (
    <div className="animate-fade-in">
      <div className="page-header">
        <h1>📍 {t('Nearby Facilities', 'नजदीकी सुविधाएं')}</h1>
        <p>{t('Government hospitals, clinics, Jan Aushadhi stores near you', 'आपके नजदीक सरकारी अस्पताल, क्लिनिक, जन औषधि स्टोर')}</p>
      </div>

      {/* Map */}
      {showMap && (
        <div className="map-container" style={{ marginBottom: '16px' }}>
          <iframe src={mapUrl} title="Nearby hospitals map" allowFullScreen loading="lazy" />
        </div>
      )}

      {/* Filters */}
      <div style={{ display: 'flex', gap: '8px', marginBottom: '16px', flexWrap: 'wrap' }}>
        <select className="form-select" style={{ flex: 1, minWidth: '150px' }} value={filter} onChange={e => setFilter(e.target.value)}>
          {facilityTypes.map(f => <option key={f} value={f}>{f}</option>)}
        </select>
        <select className="form-select" style={{ width: '120px' }} value={cityFilter} onChange={e => setCityFilter(e.target.value)}>
          <option value="All">{t('All Cities', 'सभी शहर')}</option>
          <option value="Meerut">Meerut</option>
          <option value="Delhi">Delhi</option>
        </select>
        <button className="btn btn-secondary btn-sm" onClick={() => setShowMap(!showMap)}>
          {showMap ? '📋 List' : '🗺️ Map'}
        </button>
      </div>

      <div className="glass-card" style={{ padding: '12px 16px', marginBottom: '16px' }}>
        <span style={{ fontWeight: 700, color: 'var(--accent-emerald)' }}>{filtered.length}</span>
        <span style={{ color: 'var(--text-secondary)', marginLeft: '8px' }}>{t('facilities found', 'सुविधाएं मिलीं')}</span>
      </div>

      {filtered.map(h => (
        <div key={h.id} className="result-card" style={{ marginBottom: '12px' }}>
          <div className="result-header" style={{ marginBottom: '8px' }}>
            <div className="result-icon" style={{ background: h.isGovt ? 'rgba(16,185,129,0.2)' : 'rgba(108,99,255,0.2)', fontSize: '1.2rem' }}>
              {h.isGovt ? '🏥' : '🏨'}
            </div>
            <div style={{ flex: 1 }}>
              <div className="result-title">{t(h.name, h.nameHi)}</div>
              <div className="result-subtitle" style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                <span>{t(h.type, h.typeHi)}</span>
                <span>📍 {h.city}</span>
                {h.distance < 100 && <span style={{ color: 'var(--accent-amber)' }}>📏 {h.distance.toFixed(1)} km</span>}
                <span style={{ color: 'var(--accent-amber)' }}>⭐ {h.rating}</span>
              </div>
            </div>
            {h.isGovt && <span className="badge badge-success">FREE</span>}
          </div>
          <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '8px' }}>{h.address}</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px', marginBottom: '12px' }}>
            {h.services.map((s, i) => <span key={i} className="ingredient-tag" style={{ background: 'rgba(108,99,255,0.1)', borderColor: 'rgba(108,99,255,0.2)', color: 'var(--primary-light)' }}>{s}</span>)}
          </div>
          <div className="result-actions">
            {h.phone && <a href={`tel:${h.phone}`} className="btn btn-sm btn-success"><Phone size={14} /> {t('Call', 'कॉल')}</a>}
            <a href={`https://www.google.com/maps/dir/?api=1&destination=${h.lat},${h.lng}`} target="_blank" rel="noopener noreferrer" className="btn btn-sm btn-primary">
              <Navigation size={14} /> {t('Directions', 'दिशा-निर्देश')}
            </a>
          </div>
        </div>
      ))}
    </div>
  );
}
