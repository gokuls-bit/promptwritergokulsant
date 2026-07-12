import React from 'react';
import { Link } from 'react-router-dom';

export default function Button({
  children,
  to,
  onClick,
  variant = 'primary', // primary, secondary, danger, ghost
  size = 'md', // sm, md, lg
  disabled = false,
  loading = false,
  icon,
  style = {},
  ...props
}) {
  const getButtonStyles = () => {
    let baseStyles = {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '8px',
      fontFamily: 'inherit',
      fontWeight: '600',
      cursor: disabled || loading ? 'not-allowed' : 'pointer',
      transition: 'var(--transition-smooth)',
      border: 'none',
      borderRadius: '12px',
      textDecoration: 'none',
      opacity: disabled || loading ? 0.6 : 1,
      ...style
    };

    // Size styles
    if (size === 'sm') {
      baseStyles.padding = '8px 16px';
      baseStyles.fontSize = '13px';
      baseStyles.borderRadius = '8px';
    } else if (size === 'lg') {
      baseStyles.padding = '16px 32px';
      baseStyles.fontSize = '17px';
      baseStyles.borderRadius = '14px';
    } else {
      baseStyles.padding = '12px 24px';
      baseStyles.fontSize = '15px';
    }

    // Variant styles
    if (variant === 'primary') {
      baseStyles.background = 'linear-gradient(135deg, var(--accent-primary) 0%, var(--accent-secondary) 100%)';
      baseStyles.color = '#ffffff';
      if (!disabled && !loading) {
        baseStyles.boxShadow = '0 4px 15px rgba(142, 45, 226, 0.3)';
        baseStyles[':hover'] = {
          transform: 'translateY(-2px)',
          boxShadow: '0 6px 20px rgba(142, 45, 226, 0.5)'
        };
      }
    } else if (variant === 'secondary') {
      baseStyles.background = 'rgba(255, 255, 255, 0.05)';
      baseStyles.border = '1px solid var(--border-subtle)';
      baseStyles.color = 'var(--text-primary)';
      if (!disabled && !loading) {
        baseStyles[':hover'] = {
          background: 'rgba(255, 255, 255, 0.12)',
          borderColor: 'var(--border-glow)'
        };
      }
    } else if (variant === 'danger') {
      baseStyles.background = 'rgba(255, 75, 75, 0.15)';
      baseStyles.border = '1px solid rgba(255, 75, 75, 0.3)';
      baseStyles.color = '#ff4b4b';
      if (!disabled && !loading) {
        baseStyles[':hover'] = {
          background: 'rgba(255, 75, 75, 0.3)'
        };
      }
    } else if (variant === 'ghost') {
      baseStyles.background = 'transparent';
      baseStyles.color = 'var(--text-secondary)';
      if (!disabled && !loading) {
        baseStyles[':hover'] = {
          color: 'var(--text-primary)',
          background: 'rgba(255, 255, 255, 0.04)'
        };
      }
    }

    return baseStyles;
  };

  const buttonContent = (
    <>
      {loading && (
        <span 
          style={{
            width: '16px',
            height: '16px',
            border: '2px solid currentColor',
            borderBottomColor: 'transparent',
            borderRadius: '50%',
            display: 'inline-block',
            animation: 'spin 1s linear infinite',
            marginRight: '4px'
          }}
        />
      )}
      {!loading && icon && <span style={{ display: 'flex', alignItems: 'center' }}>{icon}</span>}
      {children}
    </>
  );

  // Apply mouse hover effects inline for pure CSS-in-JS style object
  const [isHovered, setIsHovered] = React.useState(false);
  const styles = getButtonStyles();
  
  const hoverStyles = isHovered && !disabled && !loading && styles[':hover']
    ? { ...styles, ...styles[':hover'] }
    : styles;

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);

  if (to) {
    return (
      <Link
        to={disabled || loading ? '#' : to}
        style={hoverStyles}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        {...props}
      >
        {buttonContent}
      </Link>
    );
  }

  return (
    <button
      onClick={disabled || loading ? undefined : onClick}
      style={hoverStyles}
      disabled={disabled || loading}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      {...props}
    >
      {buttonContent}
    </button>
  );
}
