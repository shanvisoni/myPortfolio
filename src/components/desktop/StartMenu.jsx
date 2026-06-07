import { useState } from 'react';
import { Search, Power, Star } from 'lucide-react';
import { APPS, getApp } from './appsConfig';
import myPhoto from '../../assets/myPhoto.jpg';
import personalData from '../../data/personalInfo.json';

const RECRUITER_APP_IDS = ['about', 'experience', 'projects', 'contact', 'resume'];

export default function StartMenu({ isOpen, onClose, onOpenApp, onOpenResume }) {
  const [search, setSearch] = useState('');

  if (!isOpen) return null;

  const filtered = APPS.filter(
    (a) => !a.external && a.name.toLowerCase().includes(search.toLowerCase())
  );

  const showRecruiterSection = !search.trim();

  const handleOpen = (appId) => {
    if (appId === 'resume') {
      onOpenResume();
    } else {
      onOpenApp(appId);
    }
    onClose();
  };

  return (
    <>
      <div className="start-overlay" onClick={onClose} />
      <div className="start-menu">
        <div className="start-search">
          <Search size={18} />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search apps..."
            autoFocus
          />
        </div>

        {showRecruiterSection && (
          <div className="start-section start-recruiter">
            <span className="start-label">
              <Star size={12} /> Start here — for recruiters
            </span>
            <div className="start-grid start-grid-5">
              {RECRUITER_APP_IDS.map((id) => {
                const app = getApp(id);
                if (!app) return null;
                const Icon = app.icon;
                return (
                  <button key={id} className="start-app highlighted" onClick={() => handleOpen(id)}>
                    <div className="start-app-icon" style={{ background: app.gradient }}>
                      <Icon size={24} />
                    </div>
                    <span>{id === 'resume' ? 'Resume' : app.name}</span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        <div className="start-section">
          <span className="start-label">All apps</span>
          <div className="start-grid">
            {filtered.map((app) => {
              const Icon = app.icon;
              return (
                <button key={app.id} className="start-app" onClick={() => handleOpen(app.id)}>
                  <div className="start-app-icon" style={{ background: app.gradient }}>
                    <Icon size={24} />
                  </div>
                  <span>{app.name}</span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="start-footer">
          <div className="start-user">
            <img src={myPhoto} alt={personalData.personalInfo.name} />
            <div>
              <span>{personalData.personalInfo.name}</span>
              <span className="start-user-role">{personalData.personalInfo.title}</span>
            </div>
          </div>
          <button className="start-power" aria-label="Power">
            <Power size={18} />
          </button>
        </div>
      </div>
    </>
  );
}
