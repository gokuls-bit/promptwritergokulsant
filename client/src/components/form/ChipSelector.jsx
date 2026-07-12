import React from 'react';

export default function ChipSelector({
  label,
  value,
  onChange,
  options = [],
  required = false,
  helpText,
  error,
  name,
  ...props
}) {
  return (
    <div className="form-group" style={{ marginBottom: '22px' }}>
      <label className="form-label" style={{ fontSize: '15px', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '10px' }}>
        {label}
        {required && <span style={{ color: 'var(--accent-cyan)', marginLeft: '4px' }}>*</span>}
      </label>

      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: '10px',
        marginTop: '4px'
      }}>
        {options.map((opt) => {
          const isSelected = value === opt;
          return (
            <button
              key={opt}
              type="button"
              onClick={() => onChange(opt)}
              style={{
                padding: '12px 20px',
                borderRadius: '24px',
                fontSize: '14px',
                fontWeight: 600,
                border: '1.5px solid',
                borderColor: isSelected ? 'var(--accent-cyan)' : 'var(--border-subtle)',
                background: isSelected ? 'rgba(0, 242, 254, 0.08)' : 'rgba(255, 255, 255, 0.02)',
                color: isSelected ? 'var(--accent-cyan)' : 'var(--text-secondary)',
                boxShadow: isSelected ? '0 0 12px rgba(0, 242, 254, 0.15)' : 'none',
                cursor: 'pointer',
                transition: 'var(--transition-smooth)'
              }}
              {...props}
            >
              {opt}
            </button>
          );
        })}
      </div>

      {error ? (
        <span style={{ color: '#ff4b4b', fontSize: '12px', marginTop: '8px', fontWeight: 500 }}>
          {error}
        </span>
      ) : helpText ? (
        <span style={{ color: 'var(--text-secondary)', fontSize: '12px', marginTop: '8px' }}>
          {helpText}
        </span>
      ) : null}
    </div>
  );
}
