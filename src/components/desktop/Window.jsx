import { useRef, useState, useCallback, useEffect } from 'react';
import { Minus, Square, X } from 'lucide-react';

export default function Window({
  id,
  title,
  icon,
  children,
  isOpen,
  isMinimized,
  isMaximized,
  zIndex,
  position,
  size,
  onClose,
  onMinimize,
  onMaximize,
  onFocus,
  onMove,
}) {
  const [isDragging, setIsDragging] = useState(false);
  const dragOffset = useRef({ x: 0, y: 0 });

  const handleMouseDown = useCallback(
    (e) => {
      if (e.target.closest('.window-controls')) return;
      onFocus(id);
      setIsDragging(true);
      dragOffset.current = {
        x: e.clientX - position.x,
        y: e.clientY - position.y,
      };
    },
    [id, onFocus, position]
  );

  useEffect(() => {
    if (!isDragging) return;

    const handleMouseMove = (e) => {
      onMove(id, {
        x: e.clientX - dragOffset.current.x,
        y: e.clientY - dragOffset.current.y,
      });
    };

    const handleMouseUp = () => setIsDragging(false);

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, id, onMove]);

  if (!isOpen || isMinimized) return null;

  const style = isMaximized
    ? { top: 48, left: 72, right: 16, bottom: 72, width: 'auto', height: 'auto' }
    : {
        top: position.y,
        left: position.x,
        width: size.width,
        height: size.height,
      };

  return (
    <div
      className={`os-window ${isMaximized ? 'maximized' : ''} ${isDragging ? 'dragging' : ''}`}
      style={{ ...style, zIndex }}
      onMouseDown={() => onFocus(id)}
    >
      <div className="window-titlebar" onMouseDown={handleMouseDown}>
        <div className="window-title">
          {icon && <span className="window-title-icon">{icon}</span>}
          <span>{title}</span>
        </div>
        <div className="window-controls">
          <button className="win-btn minimize" onClick={() => onMinimize(id)} aria-label="Minimize">
            <Minus size={14} />
          </button>
          <button className="win-btn maximize" onClick={() => onMaximize(id)} aria-label="Maximize">
            <Square size={12} />
          </button>
          <button className="win-btn close" onClick={() => onClose(id)} aria-label="Close">
            <X size={14} />
          </button>
        </div>
      </div>
      <div className="window-content">{children}</div>
    </div>
  );
}
