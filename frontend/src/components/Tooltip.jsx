import React, { useState } from 'react';

function Tooltip({ children, content }) {
  const [visible, setVisible] = useState(false);

  return (
    <span
      className="tooltip-wrapper"
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
      onFocus={() => setVisible(true)}
      onBlur={() => setVisible(false)}
    >
      <span className="tooltip-icon" aria-label="More info">ℹ️</span>
      {visible && (
        <span className="tooltip-content" role="tooltip">
          {content}
        </span>
      )}
      {children}
    </span>
  );
}

export default Tooltip;
