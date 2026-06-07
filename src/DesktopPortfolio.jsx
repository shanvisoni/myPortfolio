import { useState, useCallback, useEffect } from 'react';
import ThreeBackground from './components/ThreeBackground';
import Window from './components/desktop/Window';
import Sidebar from './components/desktop/Sidebar';
import Taskbar from './components/desktop/Taskbar';
import StartMenu from './components/desktop/StartMenu';
import HireMeButton from './components/desktop/HireMeButton';
import WelcomeHero, { RESUME_URL } from './components/desktop/WelcomeHero';
import { APPS, getApp } from './components/desktop/appsConfig';
import { renderAppContent } from './components/desktop/AppContent';
import './desktop.css';

const VISITED_KEY = 'shanvi-portfolio-visited';

function getCenteredPosition(width, height) {
  const sidebarOffset = 340;
  const taskbarOffset = 80;
  const x = sidebarOffset + Math.max(0, (window.innerWidth - sidebarOffset - width) / 2);
  const y = Math.max(48, (window.innerHeight - taskbarOffset - height) / 2 - 20);
  return { x, y };
}

export default function DesktopPortfolio() {
  const [windows, setWindows] = useState({});
  const [activeApp, setActiveApp] = useState(null);
  const [zOrder, setZOrder] = useState([]);
  const [startOpen, setStartOpen] = useState(false);

  const openApps = Object.keys(windows).filter((id) => windows[id]?.isOpen);
  const hasOpenWindows = openApps.length > 0;

  useEffect(() => {
    const visited = localStorage.getItem(VISITED_KEY);
    if (!visited) {
      setStartOpen(true);
    }
  }, []);

  const markVisited = useCallback(() => {
    localStorage.setItem(VISITED_KEY, '1');
  }, []);

  const openResume = useCallback(() => {
    markVisited();
    window.open(RESUME_URL, '_blank');
  }, [markVisited]);

  const focusApp = useCallback((id) => {
    setActiveApp(id);
    setZOrder((prev) => [...prev.filter((x) => x !== id), id]);
  }, []);

  const openApp = useCallback((id) => {
    markVisited();
    const app = getApp(id);
    if (!app) return;

    if (app.external) {
      window.open(app.external, '_blank');
      return;
    }

    setWindows((prev) => {
      const existing = prev[id];
      if (existing) {
        return { ...prev, [id]: { ...existing, isOpen: true, isMinimized: false } };
      }
      const size = { ...app.defaultSize };
      const position = getCenteredPosition(size.width, size.height);
      return {
        ...prev,
        [id]: {
          isOpen: true,
          isMinimized: false,
          isMaximized: false,
          position,
          size,
        },
      };
    });
    focusApp(id);
    setStartOpen(false);
  }, [focusApp, markVisited]);

  const closeApp = useCallback((id) => {
    setWindows((prev) => ({
      ...prev,
      [id]: { ...prev[id], isOpen: false, isMinimized: false },
    }));
    setZOrder((prev) => {
      const next = prev.filter((x) => x !== id);
      if (activeApp === id) {
        setActiveApp(next.length > 0 ? next[next.length - 1] : null);
      }
      return next;
    });
  }, [activeApp]);

  const minimizeApp = useCallback((id) => {
    setWindows((prev) => ({
      ...prev,
      [id]: { ...prev[id], isMinimized: true },
    }));
  }, []);

  const maximizeApp = useCallback((id) => {
    setWindows((prev) => ({
      ...prev,
      [id]: { ...prev[id], isMaximized: !prev[id].isMaximized },
    }));
    focusApp(id);
  }, [focusApp]);

  const moveWindow = useCallback((id, position) => {
    setWindows((prev) => ({
      ...prev,
      [id]: { ...prev[id], position },
    }));
  }, []);

  const handleExplorerOpen = useCallback((appId, external) => {
    if (external) {
      openResume();
    } else {
      openApp(appId);
    }
  }, [openApp, openResume]);

  const getZIndex = (id) => {
    const idx = zOrder.indexOf(id);
    return idx >= 0 ? 200 + idx : 150;
  };

  return (
    <div className="desktop-os">
      <ThreeBackground />

      <div className="desktop-overlay" />
      <div className="desktop-center-vignette" />

      <WelcomeHero
        onOpenApp={openApp}
        onOpenResume={openResume}
        windowsOpen={hasOpenWindows}
      />

      <Sidebar
        onOpenApp={openApp}
        openApps={openApps}
        activeApp={activeApp}
        onOpenResume={openResume}
      />

      <main className="desktop-workspace">
        {APPS.map((app) => {
          const win = windows[app.id];
          if (!win) return null;
          const Icon = app.icon;
          return (
            <Window
              key={app.id}
              id={app.id}
              title={app.name}
              icon={<Icon size={14} />}
              isOpen={win.isOpen}
              isMinimized={win.isMinimized}
              isMaximized={win.isMaximized}
              zIndex={getZIndex(app.id)}
              position={win.position}
              size={win.size}
              onClose={closeApp}
              onMinimize={minimizeApp}
              onMaximize={maximizeApp}
              onFocus={focusApp}
              onMove={moveWindow}
            >
              {renderAppContent(app.id, { onOpenFile: handleExplorerOpen })}
            </Window>
          );
        })}
      </main>

      <HireMeButton onOpenContact={() => openApp('contact')} />

      <StartMenu
        isOpen={startOpen}
        onClose={() => {
          setStartOpen(false);
          markVisited();
        }}
        onOpenApp={openApp}
        onOpenResume={openResume}
      />

      <Taskbar
        onOpenApp={openApp}
        onToggleStart={() => setStartOpen((s) => !s)}
        startOpen={startOpen}
        openApps={openApps}
        activeApp={activeApp}
        onFocusApp={(id) => {
          const win = windows[id];
          if (win?.isMinimized) {
            setWindows((prev) => ({ ...prev, [id]: { ...prev[id], isMinimized: false } }));
          }
          focusApp(id);
        }}
      />
    </div>
  );
}
