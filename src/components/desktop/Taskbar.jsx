import { useState, useEffect } from 'react';
import { LayoutGrid, Wifi, Volume2 } from 'lucide-react';
import { APPS } from './appsConfig';
import personalData from '../../data/personalInfo.json';
import { useBreakpoint } from '../../hooks/useBreakpoint';

export default function Taskbar({ onOpenApp, onToggleStart, startOpen, openApps, activeApp, onFocusApp }) {
  const [time, setTime] = useState(new Date());
  const { isMobile, isTablet } = useBreakpoint();

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (d) =>
    d.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });

  const formatDate = (d) =>
    d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });

  const currentRole = personalData.currentRoles?.[0];
  const pinnedApps = APPS.filter((a) => !a.external);
  const showPinned = !isMobile;

  return (
    <footer className={`os-taskbar ${isMobile ? 'mobile-dock' : ''}`}>
      <div className="taskbar-left">
        <button
          className={`taskbar-start ${startOpen ? 'active' : ''} ${isMobile ? 'mobile-start' : ''}`}
          onClick={onToggleStart}
          aria-label="Open apps menu"
        >
          <LayoutGrid size={isMobile ? 24 : 22} />
          {isMobile && <span className="taskbar-start-label">Apps</span>}
        </button>

        {showPinned && (
          <div className="taskbar-pinned">
            {pinnedApps.map((app) => {
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
                    <Icon size={isTablet ? 18 : 20} />
                  </div>
                  {isActive && <span className="taskbar-indicator" />}
                </button>
              );
            })}
          </div>
        )}
      </div>

      <div className="taskbar-right">
        {!isMobile && (
          <div className="taskbar-widget">
            <Wifi size={14} />
            <Volume2 size={14} />
          </div>
        )}
        {!isMobile && currentRole && (
          <div className="taskbar-status">
            <span className="status-dot" />
            Building at {currentRole.company}
          </div>
        )}
        <div className="taskbar-clock">
          <span>{formatTime(time)}</span>
          {!isMobile && <span className="taskbar-date">{formatDate(time)}</span>}
        </div>
      </div>
    </footer>
  );
}
