import React from 'react';

export default function Container({ children, fluid = false, style = {}, ...props }) {
  return (
    <div
      style={{
        width: '100%',
        maxWidth: fluid ? 'none' : '1200px',
        margin: '0 auto',
        padding: '0 20px',
        boxSizing: 'border-box',
        ...style
      }}
      {...props}
    >
      {children}
    </div>
  );
}
