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
  compact,
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

  const fullscreen = compact || isMaximized;

  const handleMouseDown = useCallback(
    (e) => {
      if (fullscreen || compact) return;
      if (e.target.closest('.window-controls')) return;
      onFocus(id);
      setIsDragging(true);
      dragOffset.current = {
        x: e.clientX - position.x,
        y: e.clientY - position.y,
      };
    },
    [id, onFocus, position, fullscreen, compact]
  );

  useEffect(() => {
    if (!isDragging || fullscreen) return;

    const handleMouseMove = (e) => {
      onMove(id, {
        x: Math.max(0, e.clientX - dragOffset.current.x),
        y: Math.max(0, e.clientY - dragOffset.current.y),
      });
    };

    const handleMouseUp = () => setIsDragging(false);

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, id, onMove, fullscreen]);

  if (!isOpen || isMinimized) return null;

  const style = fullscreen
    ? undefined
    : {
        top: position.y,
        left: position.x,
        width: size.width,
        height: size.height,
      };

  return (
    <div
      className={`os-window ${fullscreen ? 'maximized' : ''} ${compact ? 'compact' : ''} ${isDragging ? 'dragging' : ''}`}
      style={{ ...style, zIndex }}
      onMouseDown={() => onFocus(id)}
    >
      <div className="window-titlebar" onMouseDown={handleMouseDown}>
        <div className="window-title">
          {icon && <span className="window-title-icon">{icon}</span>}
          <span>{title}</span>
        </div>
        <div className="window-controls">
          <button
            type="button"
            className="win-btn minimize"
            onClick={(e) => {
              e.stopPropagation();
              onMinimize(id);
            }}
            aria-label={compact ? 'Back to home' : 'Minimize'}
          >
            <Minus size={14} />
          </button>
          {!compact && (
            <button
              type="button"
              className="win-btn maximize"
              onClick={(e) => {
                e.stopPropagation();
                onMaximize(id);
              }}
              aria-label="Maximize"
            >
              <Square size={12} />
            </button>
          )}
          <button
            type="button"
            className="win-btn close"
            onClick={(e) => {
              e.stopPropagation();
              onClose(id);
            }}
            aria-label="Close"
          >
            <X size={14} />
          </button>
        </div>
      </div>
      <div className="window-content">{children}</div>
    </div>
  );
}
