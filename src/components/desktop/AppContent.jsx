import { useState, useRef, useEffect } from 'react';
import {
  MapPin, Calendar, ExternalLink, Github, Linkedin, Mail, Phone,
  Rocket, Zap, Users, Grid3x3, Settings, Megaphone, Shield,
  Send, FileText, Folder, ChevronRight,
} from 'lucide-react';
import personalData from '../../data/personalInfo.json';
import skillsData from '../../data/skills.json';
import projectsData from '../../data/projects.json';
import achievementsData from '../../data/achievements.json';
import myPhoto from '../../assets/myPhoto.jpg';

const { personalInfo, education, currentRoles, previousRoles, summary } = personalData;

const METRICS = [
  { label: 'Production Projects', value: '10+', icon: Rocket, color: '#a78bfa' },
  { label: 'Client Projects', value: '5+', icon: Grid3x3, color: '#f472b6' },
  { label: 'LeetCode Problems', value: '400+', icon: Zap, color: '#38bdf8' },
  { label: 'Users Impacted', value: '2000+', icon: Users, color: '#34d399' },
  { label: 'CGPA', value: education.cgpa, icon: Shield, color: '#fb923c' },
  { label: 'Tech Stack Skills', value: '25+', icon: Settings, color: '#60a5fa' },
  { label: 'Certifications', value: '3+', icon: Megaphone, color: '#facc15' },
  { label: 'Code Quality Focus', value: '100%', icon: Shield, color: '#4ade80' },
];

const AI_RESPONSES = {
  who: `Shanvi Soni is an Associate Software Engineer and B.Tech CSE student at SAGE University, Bhopal (CGPA ${education.cgpa}). She builds production web platforms with React, Node.js, Spring Boot, and modern full-stack tooling.`,
  projects: `Client projects: Listify.ae (UAE marketplace), CanHiring.com (recruitment), GreenTechExperts.in, HomeTuitionz.com, InternTak.com. Personal: RoomieMatch, Trackademy, DevConnector, ShopSphere.`,
  stack: `Core stack: React.js, Next.js, TypeScript, Node.js, NestJS, Spring Boot, Express, PostgreSQL, MongoDB, Docker, Tailwind CSS, REST APIs, and AWS/Firebase for deployment.`,
  work: `Currently Associate Software Engineer at iWin Labs (gaming platforms). Previously: KNN Migration Advisors (SaaS), TheEndorse (recruitment + AI workflows), Reactify Labs (MERN, 2000+ users).`,
  contact: `Email: ${personalInfo.email} | Phone: ${personalInfo.phone} | LinkedIn & GitHub links in Contact app.`,
  hire: `Shanvi is an Associate Software Engineer open to full-stack, React, and software engineering opportunities.`,
};

const AI_SUGGESTIONS = [
  { key: 'who', label: 'Who is Shanvi?' },
  { key: 'projects', label: 'Show me her projects' },
  { key: 'stack', label: "What's her tech stack?" },
  { key: 'work', label: 'Where has she worked?' },
];

const TERMINAL_COMMANDS = {
  help: 'Available: about, skills, projects, experience, contact, clear, whoami',
  about: summary.join(' '),
  skills: skillsData.skillCategories.map((c) => `${c.title}: ${c.skills.map((s) => s.name).join(', ')}`).join('\n'),
  projects: projectsData.projects.map((p) => `→ ${p.title} [${p.status}] — ${p.techStack.join(', ')}`).join('\n'),
  experience: [...currentRoles, ...previousRoles].map((r) => `${r.position} @ ${r.company} (${r.startDate} - ${r.endDate})`).join('\n'),
  contact: `Email: ${personalInfo.email}\nPhone: ${personalInfo.phone}\nLinkedIn: ${personalInfo.linkedin}\nGitHub: ${personalInfo.github}`,
  whoami: personalInfo.name,
  clear: '__CLEAR__',
};

export function AboutContent() {
  return (
    <div className="app-scroll">
      <div className="about-hero">
        <div className="about-avatar-wrap">
          <img src={myPhoto} alt={personalInfo.name} className="about-avatar" />
          <div className="about-status">
            <span className="status-dot" /> Open to Work
          </div>
        </div>
        <div className="about-info">
          <h2>{personalInfo.name}</h2>
          <p className="about-role">{personalInfo.title}</p>
          <p className="about-tagline">{personalInfo.tagline}</p>
          <div className="about-meta">
            <span><MapPin size={14} /> {personalInfo.location}</span>
            <span><Calendar size={14} /> Graduating {education.expectedGraduation}</span>
          </div>
        </div>
      </div>
      <div className="about-section">
        <h3>Summary</h3>
        {summary.map((p, i) => (
          <p key={i} className="about-text">{p}</p>
        ))}
      </div>
      <div className="about-section">
        <h3>Education</h3>
        <div className="edu-card">
          <strong>{education.degree}</strong>
          <span>{education.university}</span>
          <span className="edu-cgpa">CGPA: {education.cgpa}</span>
        </div>
      </div>
    </div>
  );
}

export function ExperienceContent() {
  const roles = [...currentRoles, ...previousRoles];
  return (
    <div className="app-scroll">
      <h2 className="section-heading">Work Experience</h2>
      {roles.map((role, i) => (
        <div key={i} className={`exp-card ${i === 0 ? 'current' : ''}`}>
          <div className="exp-header">
            <div>
              <h3>{role.position}</h3>
              <p className="exp-company">{role.company}</p>
              <p className="exp-type">{role.type}</p>
            </div>
            <div className="exp-date">
              <span>{role.startDate} — {role.endDate}</span>
              {i === 0 && <span className="exp-badge">Current</span>}
            </div>
          </div>
          <ul className="exp-list">
            {role.responsibilities.map((r, j) => (
              <li key={j}>{r}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

export function ProjectsContent() {
  return (
    <div className="app-scroll">
      <h2 className="section-heading">Featured Projects</h2>
      <div className="projects-grid">
        {projectsData.projects.map((project) => (
          <div key={project.id} className="project-card">
            <div className="project-header">
              <div>
                <h3>{project.title}</h3>
                {project.subtitle && <p className="project-subtitle">{project.subtitle}</p>}
              </div>
              <span className={`project-status ${project.status === 'Completed' ? 'done' : 'wip'}`}>
                {project.status}
              </span>
            </div>
            {project.projectType && (
              <span className={`project-type ${project.projectType === 'Freelance Client' ? 'client' : 'personal'}`}>
                {project.projectType}
              </span>
            )}
            <p className="project-desc">{project.description}</p>
            {project.startDate && (
              <p className="project-dates">{project.startDate} — {project.endDate}</p>
            )}
            <div className="project-tags">
              {project.techStack.slice(0, 5).map((t) => (
                <span key={t} className="tag">{t}</span>
              ))}
            </div>
            <a href={project.demoUrl} target="_blank" rel="noopener noreferrer" className="project-link">
              View Live <ExternalLink size={14} />
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}

export function SkillsContent() {
  return (
    <div className="app-scroll">
      <h2 className="section-heading">Technical Skills</h2>
      <div className="skills-grid">
        {skillsData.skillCategories.map((cat) => (
          <div key={cat.id} className="skill-card">
            <h3>{cat.title}</h3>
            <div className="skill-list">
              {cat.skills.map((skill) => (
                <div key={skill.name} className="skill-item">
                  <span>{skill.name}</span>
                  <div className="skill-bar">
                    <div className="skill-fill" style={{ width: `${skill.level * 25}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function CodeLabContent() {
  return (
    <div className="app-scroll codelab">
      <div className="code-editor">
        <div className="code-tabs">
          <span className="code-tab active">portfolio.jsx</span>
          <span className="code-tab">about.ts</span>
        </div>
        <pre className="code-block">{`// Shanvi Soni — Associate Software Engineer
const developer = {
  name: "${personalInfo.name}",
  role: "${personalInfo.title}",
  location: "${personalInfo.location}",
  education: "${education.degree}",
  cgpa: ${education.cgpa},
  company: "iWin Labs",
};

const stack = [
  "React", "Next.js", "TypeScript", "Node.js",
  "Spring Boot", "NestJS", "PostgreSQL", "Docker"
];

const build = () => {
  return createAmazingExperiences(developer, stack);
};

export default build();`}</pre>
      </div>
      <div className="codelab-output">
        <span className="output-label">Output</span>
        <p>✓ Portfolio loaded successfully</p>
        <p>✓ {projectsData.projects.length} projects deployed</p>
        <p>✓ 400+ DSA problems solved</p>
        <p>✓ Ready to build your next product</p>
      </div>
    </div>
  );
}

export function AIContent() {
  const [messages, setMessages] = useState([
    { role: 'ai', text: "Hi! I'm Shanvi AI 🤖 Ask me anything about Shanvi's work, projects, experience, or how to hire her!" },
  ]);
  const [input, setInput] = useState('');
  const bottomRef = useRef(null);

  const getResponse = (text) => {
    const lower = text.toLowerCase();
    if (lower.includes('who') || lower.includes('about')) return AI_RESPONSES.who;
    if (lower.includes('project')) return AI_RESPONSES.projects;
    if (lower.includes('stack') || lower.includes('tech') || lower.includes('skill')) return AI_RESPONSES.stack;
    if (lower.includes('work') || lower.includes('experience') || lower.includes('intern')) return AI_RESPONSES.work;
    if (lower.includes('contact') || lower.includes('email') || lower.includes('reach')) return AI_RESPONSES.contact;
    if (lower.includes('hire') || lower.includes('available') || lower.includes('job')) return AI_RESPONSES.hire;
    return "I can help with Shanvi's background, projects, tech stack, work experience, and contact info. Try one of the quick actions below!";
  };

  const send = (text) => {
    if (!text.trim()) return;
    setMessages((m) => [...m, { role: 'user', text }, { role: 'ai', text: getResponse(text) }]);
    setInput('');
  };

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="ai-chat">
      <div className="ai-messages">
        {messages.map((msg, i) => (
          <div key={i} className={`ai-msg ${msg.role}`}>{msg.text}</div>
        ))}
        <div ref={bottomRef} />
      </div>
      <div className="ai-suggestions">
        {AI_SUGGESTIONS.map((s) => (
          <button key={s.key} onClick={() => send(s.label)}>{s.label}</button>
        ))}
      </div>
      <div className="ai-input-row">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && send(input)}
          placeholder="Ask me anything about Shanvi..."
        />
        <button onClick={() => send(input)} aria-label="Send"><Send size={18} /></button>
      </div>
    </div>
  );
}

export function MetricsContent() {
  return (
    <div className="app-scroll">
      <div className="metrics-header">
        <h2>Engineering Impact</h2>
        <p>Measurable results from real projects & internships</p>
      </div>
      <div className="metrics-grid">
        {METRICS.map((m) => {
          const Icon = m.icon;
          return (
            <div key={m.label} className="metric-card">
              <Icon size={22} style={{ color: m.color }} />
              <span className="metric-value">{m.value}</span>
              <span className="metric-label">{m.label}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export function ExplorerContent({ onOpenFile }) {
  const files = [
    { name: 'about.txt', app: 'about', icon: FileText },
    { name: 'contact.txt', app: 'contact', icon: FileText },
    { name: 'projects/', app: 'projects', icon: Folder },
    { name: 'resume.pdf', app: 'resume', icon: FileText, external: true },
    { name: 'skills.json', app: 'skills', icon: FileText },
    { name: 'experience.log', app: 'experience', icon: FileText },
  ];

  return (
    <div className="explorer">
      <div className="explorer-path">
        <span>This PC</span>
        <ChevronRight size={14} />
        <span>Portfolio</span>
        <ChevronRight size={14} />
        <span>Shanvi</span>
      </div>
      <div className="explorer-files">
        {files.map((f) => {
          const Icon = f.icon;
          return (
            <button
              key={f.name}
              className="explorer-file"
              onClick={() => onOpenFile(f.app, f.external)}
            >
              <Icon size={28} />
              <span>{f.name}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

export function TerminalContent() {
  const [history, setHistory] = useState([
    { type: 'system', text: 'ShanviOS Terminal v1.0 — Type "help" for commands' },
  ]);
  const [input, setInput] = useState('');
  const bottomRef = useRef(null);

  const runCommand = (cmd) => {
    const trimmed = cmd.trim().toLowerCase();
    setHistory((h) => [...h, { type: 'input', text: `$ ${cmd}` }]);

    if (trimmed === 'clear') {
      setHistory([]);
      return;
    }

    const output = TERMINAL_COMMANDS[trimmed];
    if (output === '__CLEAR__') {
      setHistory([]);
    } else if (output) {
      setHistory((h) => [...h, { type: 'output', text: output }]);
    } else {
      setHistory((h) => [...h, { type: 'error', text: `Command not found: ${cmd}. Type "help" for available commands.` }]);
    }
  };

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  return (
    <div className="terminal">
      <div className="terminal-body">
        {history.map((line, i) => (
          <div key={i} className={`terminal-line ${line.type}`}>{line.text}</div>
        ))}
        <div ref={bottomRef} />
      </div>
      <div className="terminal-input-row">
        <span className="terminal-prompt">$</span>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              runCommand(input);
              setInput('');
            }
          }}
          autoFocus
          spellCheck={false}
        />
      </div>
    </div>
  );
}

export function ContactContent() {
  return (
    <div className="app-scroll contact-txt">
      <pre className="contact-file">{`============================================
  ${personalInfo.name.toUpperCase()} — CONTACT INFO
============================================

  Email     : ${personalInfo.email}
  Phone     : ${personalInfo.phone}
  LinkedIn  : ${personalInfo.linkedin.replace('https://www.', '')}
  GitHub    : ${personalInfo.github.replace('https://', '')}
  LeetCode  : ${personalInfo.leetcode.replace('https://', '')}
  Location  : ${personalInfo.location}

  Status    : ● Open to Work
  Available : Full-Stack · React · Software Engineer roles

============================================`}</pre>
      <div className="contact-actions">
        <a href={`mailto:${personalInfo.email}`} className="contact-btn"><Mail size={16} /> Email</a>
        <a href={personalInfo.linkedin} target="_blank" rel="noopener noreferrer" className="contact-btn"><Linkedin size={16} /> LinkedIn</a>
        <a href={personalInfo.github} target="_blank" rel="noopener noreferrer" className="contact-btn"><Github size={16} /> GitHub</a>
        <a href={`tel:${personalInfo.phone}`} className="contact-btn"><Phone size={16} /> Call</a>
      </div>
    </div>
  );
}

export function AchievementsContent() {
  return (
    <div className="app-scroll">
      <h2 className="section-heading">Achievements & Certifications</h2>
      {achievementsData.achievements.map((a) => (
        <div key={a.id} className="achievement-card">
          <div className="achievement-header">
            <h3>{a.title}</h3>
            <span className="achievement-year">{a.year}</span>
          </div>
          <p className="achievement-org">{a.organization}</p>
          <p className="achievement-desc">{a.description}</p>
          <div className="achievement-tags">
            <span>{a.type}</span>
            <span>{a.category}</span>
          </div>
          {a.link && (
            <a href={a.link} target="_blank" rel="noopener noreferrer" className="achievement-link">
              View Profile <ExternalLink size={14} />
            </a>
          )}
        </div>
      ))}
    </div>
  );
}

export function ResumeContent() {
  return (
    <div className="app-scroll resume-view">
      <div className="resume-placeholder">
        <FileText size={48} />
        <h3>Shanvi's Resume.pdf</h3>
        <p>View or download the full resume</p>
        <a
          href="https://drive.google.com/file/d/1HdQ-oTmRny3_3oNUteRLL11BtqHXYWl0/view?usp=sharing"
          target="_blank"
          rel="noopener noreferrer"
          className="resume-btn"
        >
          Open Resume <ExternalLink size={16} />
        </a>
      </div>
    </div>
  );
}

export function renderAppContent(appId, { onOpenFile } = {}) {
  const map = {
    about: <AboutContent />,
    experience: <ExperienceContent />,
    projects: <ProjectsContent />,
    skills: <SkillsContent />,
    codelab: <CodeLabContent />,
    ai: <AIContent />,
    metrics: <MetricsContent />,
    explorer: <ExplorerContent onOpenFile={onOpenFile} />,
    terminal: <TerminalContent />,
    contact: <ContactContent />,
    achievements: <AchievementsContent />,
    resume: <ResumeContent />,
  };
  return map[appId] || <div className="app-scroll"><p>App not found</p></div>;
}
