import { FileText } from 'lucide-react';
import { APPS } from './appsConfig';

const FOLDER_APPS = new Set(['explorer']);
const FILE_APPS = new Set(['resume']);

export default function Sidebar({ onOpenApp, openApps, activeApp, onOpenResume }) {
  const desktopApps = APPS.filter((a) => !a.external);

  const renderIcon = (app) => {
    const Icon = app.icon;
    const isFolder = FOLDER_APPS.has(app.id);
    const isFile = FILE_APPS.has(app.id);

    if (isFolder) {
      return (
        <div className="desktop-icon-folder">
          <div className="folder-tab" />
          <div className="folder-body">
            <Icon size={26} strokeWidth={1.75} />
          </div>
        </div>
      );
    }

    if (isFile) {
      return (
        <div className="desktop-icon-file">
          <div className="file-corner" />
          <Icon size={30} strokeWidth={1.75} />
          <span className="file-ext">PDF</span>
        </div>
      );
    }

    return (
      <div className="desktop-icon-tile" style={{ background: app.gradient }}>
        <div className="desktop-icon-shine" />
        <Icon size={30} strokeWidth={1.75} />
      </div>
    );
  };

  return (
    <aside className="desktop-icons" aria-label="Desktop shortcuts">
      <div className="desktop-icons-grid">
        {desktopApps.map((app) => {
          const isActive = openApps.includes(app.id) && activeApp === app.id;
          const isOpen = openApps.includes(app.id);
          const variant = FOLDER_APPS.has(app.id) ? 'folder' : FILE_APPS.has(app.id) ? 'file' : 'app';

          return (
            <button
              key={app.id}
              className={`desktop-icon ${variant} ${isActive ? 'active' : ''} ${isOpen ? 'open' : ''}`}
              onClick={() => onOpenApp(app.id)}
              title={app.name}
              style={{ '--app-color': app.color }}
            >
              <div className="desktop-icon-graphic">
                {renderIcon(app)}
                {app.badge && <span className="desktop-icon-badge">{app.badge}</span>}
              </div>
              <span className="desktop-icon-label">{app.name}</span>
            </button>
          );
        })}

        <button
          className="desktop-icon file"
          onClick={onOpenResume}
          title="Resume.pdf"
          style={{ '--app-color': '#ef4444' }}
        >
          <div className="desktop-icon-graphic">
            <div className="desktop-icon-file resume-file">
              <div className="file-corner" />
              <FileText size={30} strokeWidth={1.75} />
              <span className="file-ext">PDF</span>
            </div>
          </div>
          <span className="desktop-icon-label">Resume.pdf</span>
        </button>
      </div>
    </aside>
  );
}
