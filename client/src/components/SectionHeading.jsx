import React from 'react';
import Badge from './Badge';

export default function SectionHeading({
  title,
  subtitle,
  align = 'center', // left, center, right
  badge,
  style = {},
  ...props
}) {
  const alignStyles = {
    textAlign: align,
    display: 'flex',
    flexDirection: 'column',
    alignItems: align === 'center' ? 'center' : align === 'right' ? 'flex-end' : 'flex-start',
    marginBottom: '40px',
    width: '100%',
    ...style
  };

  return (
    <div style={alignStyles} {...props}>
      {badge && (
        <Badge variant="cyan" style={{ marginBottom: '12px' }}>
          {badge}
        </Badge>
      )}
      <h2 
        className="text-gradient" 
        style={{
          fontSize: '32px',
          fontWeight: 800,
          marginBottom: '12px',
          lineHeight: 1.2
        }}
      >
        {title}
      </h2>
      {subtitle && (
        <p 
          style={{
            maxWidth: '600px',
            fontSize: '16px',
            color: 'var(--text-secondary)',
            lineHeight: 1.5,
            margin: 0
          }}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
