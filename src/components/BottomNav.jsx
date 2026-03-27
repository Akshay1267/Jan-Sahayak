import React from 'react';
import { useApp } from '../context/AppContext';
import { Home, FileText, Search, Stethoscope, MapPin, Users, Camera, Mic, Leaf, FolderArchive } from 'lucide-react';

const navItems = [
  { id: 'home', icon: Home, label: 'Home' },
  { id: 'report', icon: FileText, label: 'Report' },
  { id: 'schemes', icon: Search, label: 'Schemes' },
  { id: 'diagnosis', icon: Stethoscope, label: 'Diagnose' },
  { id: 'hospitals', icon: MapPin, label: 'Nearby' },
  { id: 'doctors', icon: Users, label: 'Doctors' },
  { id: 'camera', icon: Camera, label: 'Camera' },
  { id: 'voice', icon: Mic, label: 'Voice' },
  { id: 'remedies', icon: Leaf, label: 'Remedies' },
  { id: 'vault', icon: FolderArchive, label: 'Vault' },
];

export default function BottomNav() {
  const { currentPage, setCurrentPage } = useApp();

  return (
    <nav className="bottom-nav">
      {navItems.map(item => (
        <button key={item.id} className={`nav-item ${currentPage === item.id ? 'active' : ''}`}
          onClick={() => setCurrentPage(item.id)}>
          <span className="nav-icon"><item.icon size={18} /></span>
          <span className="nav-label">{item.label}</span>
        </button>
      ))}
    </nav>
  );
}
