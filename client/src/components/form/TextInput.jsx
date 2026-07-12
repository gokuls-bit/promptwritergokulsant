import React from 'react';

export default function TextInput({
  label,
  placeholder,
  value = '',
  onChange,
  required = false,
  helpText,
  error,
  minLength,
  maxLength,
  name,
  ...props
}) {
  return (
    <div className="form-group" style={{ marginBottom: '22px' }}>
      <label className="form-label" style={{ fontSize: '15px', fontWeight: 600, color: 'var(--text-primary)' }}>
        {label}
        {required && <span style={{ color: 'var(--accent-cyan)', marginLeft: '4px' }}>*</span>}
      </label>
      
      <input
        type="text"
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="form-input"
        style={{
          width: '100%',
          fontSize: '16px',
          padding: '14px 18px',
          borderRadius: '12px',
          background: 'rgba(255, 255, 255, 0.03)',
          border: '1.5px solid',
          borderColor: error ? '#ff4b4b' : 'var(--border-subtle)',
          boxShadow: error ? '0 0 10px rgba(255, 75, 75, 0.15)' : 'none',
          color: 'var(--text-primary)',
          transition: 'var(--transition-smooth)',
          boxSizing: 'border-box'
        }}
        {...props}
      />

      {/* Helper details & validation logs */}
      {error ? (
        <span style={{ color: '#ff4b4b', fontSize: '12px', marginTop: '6px', fontWeight: 500 }}>
          {error}
        </span>
      ) : helpText ? (
        <span style={{ color: 'var(--text-secondary)', fontSize: '12px', marginTop: '6px' }}>
          {helpText}
        </span>
      ) : null}
    </div>
  );
}
