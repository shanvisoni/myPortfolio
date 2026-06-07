import { useState } from 'react';
import { Sparkles, X } from 'lucide-react';
import personalData from '../../data/personalInfo.json';

export default function HireMeButton({ onOpenContact }) {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <div className="hire-me-wrap">
      {showTooltip && (
        <div className="hire-tooltip">
          <button className="hire-tooltip-close" onClick={() => setShowTooltip(false)}>
            <X size={14} />
          </button>
          <p><strong>Available for Work</strong></p>
          <p>Full-Stack · React · Software Engineer roles</p>
          <a href={`mailto:${personalData.personalInfo.email}`} className="hire-tooltip-btn">
            Get in touch
          </a>
        </div>
      )}
      <button
        className="hire-me-btn"
        onClick={() => {
          setShowTooltip(!showTooltip);
          onOpenContact();
        }}
      >
        <Sparkles size={18} />
        Hire Me
      </button>
      <div className="hire-status">
        <span className="status-dot" /> Available for Work
      </div>
    </div>
  );
}
