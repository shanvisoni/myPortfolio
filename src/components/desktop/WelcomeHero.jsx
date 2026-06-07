import {
  FileText, Rocket, Mail, Briefcase, MapPin, GraduationCap,
  Code2, ChevronRight, LayoutGrid,
} from 'lucide-react';
import myPhoto from '../../assets/myPhoto.jpg';
import personalData from '../../data/personalInfo.json';
import { getApp } from './appsConfig';
import { useBreakpoint } from '../../hooks/useBreakpoint';

const RESUME_URL = 'https://drive.google.com/file/d/1HdQ-oTmRny3_3oNUteRLL11BtqHXYWl0/view?usp=sharing';

const PROOF_CHIPS = [
  { label: `CGPA ${personalData.education.cgpa}`, color: '#a78bfa' },
  { label: '5+ Client Projects', color: '#fbbf24' },
  { label: '400+ LeetCode', color: '#38bdf8' },
  { label: 'Open to Work', color: '#4ade80', dot: true },
];

const MOBILE_SHORTCUTS = [
  { id: 'about', label: 'About' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'contact', label: 'Contact' },
  { id: 'resume', label: 'Resume', type: 'resume' },
  { id: 'menu', label: 'All Apps', type: 'menu' },
];

export default function WelcomeHero({ onOpenApp, onOpenResume, onOpenStartMenu, hidden, dimmed }) {
  const { personalInfo, education, currentRoles } = personalData;
  const currentRole = currentRoles?.[0];
  const { isMobile } = useBreakpoint();

  const handleShortcut = (item) => {
    if (item.type === 'resume') onOpenResume();
    else if (item.type === 'menu') onOpenStartMenu();
    else onOpenApp(item.id);
  };

  return (
    <section
      className={`welcome-hero ${hidden ? 'hidden' : ''} ${dimmed ? 'dimmed' : ''}`}
      aria-label="Candidate overview"
      aria-hidden={hidden}
    >
      <div className={`welcome-hero-card ${isMobile ? 'mobile-home' : ''}`}>
        <div className="welcome-hero-top">
          <div className="welcome-photo-wrap">
            <img src={myPhoto} alt={personalInfo.name} className="welcome-photo" />
            <span className="welcome-available">
              <span className="status-dot" /> Available
            </span>
          </div>

          <div className="welcome-identity">
            <p className="welcome-eyebrow">{personalInfo.title}</p>
            <h1 className="welcome-name">{personalInfo.name}</h1>

            {isMobile ? (
              <>
                <p className="welcome-headline mobile-tagline">
                  Full-stack engineer · {currentRole?.company || 'Open to work'}
                </p>
                <div className="welcome-chips mobile-chips">
                  {PROOF_CHIPS.filter((c) => c.label !== '400+ LeetCode').map((chip) => (
                    <span key={chip.label} className="welcome-chip" style={{ '--chip-color': chip.color }}>
                      {chip.dot && <span className="status-dot" />}
                      {chip.label}
                    </span>
                  ))}
                </div>
              </>
            ) : (
              <>
                <p className="welcome-headline">{personalInfo.tagline}</p>
                <div className="welcome-chips">
                  {PROOF_CHIPS.map((chip) => (
                    <span key={chip.label} className="welcome-chip" style={{ '--chip-color': chip.color }}>
                      {chip.dot && <span className="status-dot" />}
                      {chip.label}
                    </span>
                  ))}
                </div>
                {currentRole && (
                  <p className="welcome-current">
                    <Briefcase size={14} />
                    Currently: <strong>{currentRole.position}</strong> at {currentRole.company}
                  </p>
                )}
                <p className="welcome-location">
                  <MapPin size={14} /> {personalInfo.location}
                  <span className="welcome-sep">·</span>
                  <GraduationCap size={14} /> {education.university}
                </p>
              </>
            )}
          </div>
        </div>

        <div className={`welcome-cta-row ${isMobile ? 'mobile-ctas' : ''}`}>
          <button className="welcome-cta primary" onClick={onOpenResume}>
            <FileText size={18} />
            Resume
          </button>
          <button className="welcome-cta secondary" onClick={() => onOpenApp('projects')}>
            <Rocket size={18} />
            Projects
          </button>
          <button className="welcome-cta secondary" onClick={() => onOpenApp('contact')}>
            <Mail size={18} />
            Contact
          </button>
        </div>

        {isMobile ? (
          <div className="mobile-app-section">
            <p className="mobile-app-label">Open a section</p>
            <div className="mobile-app-grid">
              {MOBILE_SHORTCUTS.map((item) => {
                const app = item.id !== 'menu' && item.type !== 'resume' ? getApp(item.id) : null;
                const Icon = item.type === 'menu' ? LayoutGrid : app?.icon || FileText;
                const gradient = item.type === 'menu'
                  ? 'linear-gradient(135deg, #6366f1, #a78bfa)'
                  : item.type === 'resume'
                    ? 'linear-gradient(135deg, #dc2626, #f87171)'
                    : app?.gradient;
                return (
                  <button
                    key={item.id}
                    type="button"
                    className="mobile-app-tile"
                    onClick={() => handleShortcut(item)}
                  >
                    <div className="mobile-app-icon" style={{ background: gradient }}>
                      <Icon size={22} />
                    </div>
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        ) : (
          <>
            <div className="welcome-quick-row">
              <span className="welcome-quick-label">Quick access:</span>
              <button onClick={() => onOpenApp('experience')}>Experience</button>
              <button onClick={() => onOpenApp('skills')}>Skills</button>
              <button onClick={() => onOpenApp('metrics')}>Impact</button>
              <a href={personalInfo.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a>
            </div>
            <p className="welcome-hint welcome-hint-desktop">
              <Code2 size={14} />
              Explore apps from the desktop icons on the left or the taskbar below.
              <ChevronRight size={14} className="welcome-hint-arrow" />
            </p>
          </>
        )}
      </div>
    </section>
  );
}

export { RESUME_URL };
