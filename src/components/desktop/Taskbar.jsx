import { useState, useEffect } from 'react';
import { LayoutGrid, Wifi, Volume2 } from 'lucide-react';
import { APPS } from './appsConfig';
import personalData from '../../data/personalInfo.json';

export default function Taskbar({ onOpenApp, onToggleStart, startOpen, openApps, activeApp, onFocusApp }) {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (d) =>
    d.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });

  const formatDate = (d) =>
    d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });

  const currentRole = personalData.currentRoles?.[0];

  return (
    <footer className="os-taskbar">
      <div className="taskbar-left">
        <button
          className={`taskbar-start ${startOpen ? 'active' : ''}`}
          onClick={onToggleStart}
          aria-label="Start menu"
        >
          <LayoutGrid size={20} />
        </button>
        <div className="taskbar-pinned">
          {APPS.slice(0, 8).map((app) => {
            const Icon = app.icon;
            const isActive = openApps.includes(app.id);
            const isFocused = activeApp === app.id;
            return (
              <button
                key={app.id}
                className={`taskbar-app ${isActive ? 'open' : ''} ${isFocused ? 'focused' : ''}`}
                onClick={() => (isActive ? onFocusApp(app.id) : onOpenApp(app.id))}
                title={app.name}
              >
                <div className="taskbar-app-icon" style={{ background: app.gradient }}>
                  <Icon size={16} />
                </div>
                {isActive && <span className="taskbar-indicator" />}
              </button>
            );
          })}
        </div>
      </div>

      <div className="taskbar-right">
        <div className="taskbar-widget">
          <Wifi size={14} />
          <Volume2 size={14} />
        </div>
        {currentRole && (
          <div className="taskbar-status">
            <span className="status-dot" />
            Building at {currentRole.company}
          </div>
        )}
        <div className="taskbar-clock">
          <span>{formatTime(time)}</span>
          <span className="taskbar-date">{formatDate(time)}</span>
        </div>
      </div>
    </footer>
  );
}
