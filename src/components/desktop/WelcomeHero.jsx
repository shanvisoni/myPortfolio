import {
  FileText, Rocket, Mail, Briefcase, MapPin, GraduationCap,
  Code2, ChevronRight,
} from 'lucide-react';
import myPhoto from '../../assets/myPhoto.jpg';
import personalData from '../../data/personalInfo.json';

const RESUME_URL = 'https://drive.google.com/file/d/1HdQ-oTmRny3_3oNUteRLL11BtqHXYWl0/view?usp=sharing';

const PROOF_CHIPS = [
  { label: `CGPA ${personalData.education.cgpa}`, color: '#a78bfa' },
  { label: '400+ LeetCode', color: '#38bdf8' },
  { label: '4 Internships', color: '#34d399' },
  { label: 'Open to Work', color: '#4ade80', dot: true },
];

export default function WelcomeHero({ onOpenApp, onOpenResume, windowsOpen }) {
  const { personalInfo, education, currentRoles } = personalData;
  const currentRole = currentRoles?.[0];

  return (
    <section
      className={`welcome-hero ${windowsOpen ? 'dimmed' : ''}`}
      aria-label="Candidate overview"
    >
      <div className="welcome-hero-card">
        <div className="welcome-hero-top">
          <div className="welcome-photo-wrap">
            <img src={myPhoto} alt={personalInfo.name} className="welcome-photo" />
            <span className="welcome-available">
              <span className="status-dot" /> Available
            </span>
          </div>

          <div className="welcome-identity">
            <p className="welcome-eyebrow">Full-Stack Developer · {education.expectedGraduation}</p>
            <h1 className="welcome-name">{personalInfo.name}</h1>
            <p className="welcome-headline">
              B.Tech Computer Science student building production web apps for real users —
              React, Node.js, and full-stack systems across 4 industry internships.
            </p>

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
          </div>
        </div>

        <div className="welcome-cta-row">
          <button className="welcome-cta primary" onClick={onOpenResume}>
            <FileText size={18} />
            View Resume
          </button>
          <button className="welcome-cta secondary" onClick={() => onOpenApp('projects')}>
            <Rocket size={18} />
            See Projects
          </button>
          <button className="welcome-cta secondary" onClick={() => onOpenApp('contact')}>
            <Mail size={18} />
            Contact Me
          </button>
        </div>

        <div className="welcome-quick-row">
          <span className="welcome-quick-label">Quick access:</span>
          <button onClick={() => onOpenApp('experience')}>Experience</button>
          <button onClick={() => onOpenApp('skills')}>Skills</button>
          <button onClick={() => onOpenApp('metrics')}>Impact</button>
          <a href={personalInfo.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a>
        </div>

        <p className="welcome-hint">
          <Code2 size={14} />
          Want to explore more? Click the desktop icons on the left or use the taskbar menu below.
          <ChevronRight size={14} className="welcome-hint-arrow" />
        </p>
      </div>
    </section>
  );
}

export { RESUME_URL };
