import React, { useState } from 'react';

export default function CategoryCard({
  title,
  description,
  icon,
  onClick,
  selected = false,
  style = {},
  ...props
}) {
  const [isHovered, setIsHovered] = useState(false);

  const baseStyles = {
    background: selected ? 'rgba(0, 242, 254, 0.05)' : 'var(--bg-card)',
    backdropFilter: 'blur(20px)',
    WebkitBackdropFilter: 'blur(20px)',
    border: '1.5px solid',
    borderColor: selected ? 'var(--accent-cyan)' : 'var(--border-subtle)',
    borderRadius: '18px',
    padding: '24px',
    cursor: 'pointer',
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
    transition: 'var(--transition-smooth)',
    boxShadow: selected 
      ? '0 0 20px rgba(0, 242, 254, 0.15)' 
      : '0 8px 32px 0 rgba(0, 0, 0, 0.25)',
    boxSizing: 'border-box',
    ...style
  };

  const hoverStyles = isHovered && !selected ? {
    transform: 'translateY(-4px)',
    borderColor: 'var(--border-glow)',
    background: 'var(--bg-card-hover)',
    boxShadow: '0 12px 32px rgba(0, 0, 0, 0.45)'
  } : {};

  return (
    <div
      style={{ ...baseStyles, ...hoverStyles }}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      {...props}
    >
      <div style={{
        width: '44px',
        height: '44px',
        borderRadius: '10px',
        background: selected 
          ? 'linear-gradient(135deg, rgba(0, 242, 254, 0.2) 0%, rgba(142, 45, 226, 0.2) 100%)'
          : 'rgba(255, 255, 255, 0.03)',
        border: '1px solid',
        borderColor: selected ? 'var(--accent-cyan)' : 'var(--border-subtle)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: selected ? 'var(--accent-cyan)' : 'var(--text-secondary)'
      }}>
        {icon}
      </div>
      <div>
        <h3 style={{ 
          fontSize: '16px', 
          fontWeight: 700, 
          marginBottom: '6px', 
          color: selected ? 'var(--accent-cyan)' : 'var(--text-primary)' 
        }}>
          {title}
        </h3>
        <p style={{ 
          fontSize: '13px', 
          color: 'var(--text-secondary)', 
          lineHeight: 1.4,
          margin: 0
        }}>
          {description}
        </p>
      </div>
    </div>
  );
}
