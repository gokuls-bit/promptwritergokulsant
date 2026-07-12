import React from 'react';

export default function Badge({
  children,
  variant = 'secondary', // primary, secondary, cyan, pink, success, warning
  style = {},
  ...props
}) {
  const getBadgeStyles = () => {
    const base = {
      display: 'inline-flex',
      alignItems: 'center',
      gap: '4px',
      fontSize: '11px',
      fontWeight: '600',
      textTransform: 'uppercase',
      letterSpacing: '0.04em',
      padding: '4px 10px',
      borderRadius: '20px',
      boxSizing: 'border-box',
      border: '1px solid transparent',
      ...style
    };

    if (variant === 'primary') {
      base.background = 'rgba(142, 45, 226, 0.15)';
      base.color = '#fbc2eb';
      base.borderColor = 'rgba(142, 45, 226, 0.3)';
    } else if (variant === 'cyan') {
      base.background = 'rgba(0, 242, 254, 0.1)';
      base.color = 'var(--accent-cyan)';
      base.borderColor = 'rgba(0, 242, 254, 0.25)';
    } else if (variant === 'pink') {
      base.background = 'rgba(255, 0, 127, 0.1)';
      base.color = 'var(--accent-pink)';
      base.borderColor = 'rgba(255, 0, 127, 0.25)';
    } else if (variant === 'success') {
      base.background = 'rgba(0, 230, 118, 0.1)';
      base.color = '#00e676';
      base.borderColor = 'rgba(0, 230, 118, 0.25)';
    } else if (variant === 'warning') {
      base.background = 'rgba(255, 171, 0, 0.1)';
      base.color = '#ffab00';
      base.borderColor = 'rgba(255, 171, 0, 0.25)';
    } else {
      // secondary / neutral
      base.background = 'rgba(255, 255, 255, 0.05)';
      base.color = 'var(--text-secondary)';
      base.borderColor = 'var(--border-subtle)';
    }

    return base;
  };

  return (
    <span style={getBadgeStyles()} {...props}>
      {children}
    </span>
  );
}
