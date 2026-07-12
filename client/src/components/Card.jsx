import React, { useState } from 'react';

export default function Card({
  children,
  glow = false,
  interactive = false,
  padding = '24px',
  style = {},
  ...props
}) {
  const [isHovered, setIsHovered] = useState(false);

  const baseStyles = {
    background: 'var(--bg-card)',
    backdropFilter: 'blur(20px)',
    WebkitBackdropFilter: 'blur(20px)',
    border: '1px solid var(--border-subtle)',
    borderRadius: '16px',
    boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.3)',
    padding: padding,
    transition: 'var(--transition-smooth)',
    boxSizing: 'border-box',
    ...style
  };

  if (glow) {
    baseStyles.border = '1px solid rgba(142, 45, 226, 0.35)';
    baseStyles.boxShadow = '0 0 20px rgba(142, 45, 226, 0.15)';
  }

  const hoverStyles = interactive && isHovered ? {
    transform: 'translateY(-4px)',
    borderColor: 'var(--border-glow)',
    background: 'var(--bg-card-hover)',
    boxShadow: glow 
      ? '0 12px 30px rgba(142, 45, 226, 0.3)' 
      : '0 12px 32px rgba(0, 0, 0, 0.45)'
  } : {};

  return (
    <div
      style={{ ...baseStyles, ...hoverStyles }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      {...props}
    >
      {children}
    </div>
  );
}
