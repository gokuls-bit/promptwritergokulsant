import React from 'react';
import { Plus, Minus } from 'lucide-react';

export default function NumberInput({
  label,
  value,
  onChange,
  required = false,
  helpText,
  error,
  min = 1,
  max = 100,
  name,
  ...props
}) {
  const handleDecrement = () => {
    const val = parseInt(value, 10) || min;
    if (val > min) {
      onChange(val - 1);
    }
  };

  const handleIncrement = () => {
    const val = parseInt(value, 10) || min;
    if (val < max) {
      onChange(val + 1);
    }
  };

  const handleChange = (e) => {
    let val = parseInt(e.target.value, 10);
    if (isNaN(val)) {
      onChange('');
      return;
    }
    // Limit to min/max bounds
    if (val < min) val = min;
    if (val > max) val = max;
    onChange(val);
  };

  return (
    <div className="form-group" style={{ marginBottom: '22px' }}>
      <label className="form-label" style={{ fontSize: '15px', fontWeight: 600, color: 'var(--text-primary)' }}>
        {label}
        {required && <span style={{ color: 'var(--accent-cyan)', marginLeft: '4px' }}>*</span>}
      </label>

      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        {/* Decrement Button */}
        <button
          type="button"
          onClick={handleDecrement}
          className="btn btn-secondary"
          style={{
            padding: '12px',
            borderRadius: '12px',
            background: 'rgba(255, 255, 255, 0.04)',
            border: '1.5px solid var(--border-subtle)',
            cursor: 'pointer'
          }}
          disabled={value <= min}
        >
          <Minus size={18} />
        </button>

        {/* Number Input Field */}
        <input
          type="number"
          name={name}
          min={min}
          max={max}
          value={value}
          onChange={handleChange}
          style={{
            flex: 1,
            fontSize: '18px',
            fontWeight: '600',
            textAlign: 'center',
            padding: '12px',
            borderRadius: '12px',
            background: 'rgba(255, 255, 255, 0.03)',
            border: '1.5px solid',
            borderColor: error ? '#ff4b4b' : 'var(--border-subtle)',
            color: 'var(--text-primary)',
            outline: 'none',
            boxSizing: 'border-box'
          }}
          {...props}
        />

        {/* Increment Button */}
        <button
          type="button"
          onClick={handleIncrement}
          className="btn btn-secondary"
          style={{
            padding: '12px',
            borderRadius: '12px',
            background: 'rgba(255, 255, 255, 0.04)',
            border: '1.5px solid var(--border-subtle)',
            cursor: 'pointer'
          }}
          disabled={value >= max}
        >
          <Plus size={18} />
        </button>
      </div>

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
