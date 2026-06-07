import { useState } from 'react';
import { Sparkles, X } from 'lucide-react';
import personalData from '../../data/personalInfo.json';
import { useBreakpoint } from '../../hooks/useBreakpoint';

export default function HireMeButton({ onOpenContact, hidden }) {
  const [showTooltip, setShowTooltip] = useState(false);
  const { isMobile } = useBreakpoint();

  if (isMobile || hidden) return null;

  return (
    <div className="hire-me-wrap">
      {showTooltip && (
        <div className="hire-tooltip">
          <button className="hire-tooltip-close" onClick={() => setShowTooltip(false)}>
            <X size={14} />
          </button>
          <p><strong>Available for Work</strong></p>
          <p>Associate Software Engineer · Full-Stack · React</p>
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
