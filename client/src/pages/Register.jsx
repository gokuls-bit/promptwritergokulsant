import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { authAPI } from '../services/api';
import { LogIn, Key, User, BookOpen, AlertCircle } from 'lucide-react';

export default function Register({ onLoginSuccess }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [gradeLevel, setGradeLevel] = useState('middle');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const data = await authAPI.register(username, password, gradeLevel);
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      onLoginSuccess(data.user);
      navigate('/');
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.error || 'Registration failed. Please check details.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="animate-fade-in" style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: 'calc(100vh - 140px)',
      padding: '20px'
    }}>
      <div className="glass-panel glow-box" style={{
        width: '100%',
        maxWidth: '460px',
        padding: '40px 32px'
      }}>
        {/* Title */}
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <h2 style={{ fontSize: '28px', marginBottom: '8px' }}>Create Account</h2>
          <p style={{ fontSize: '14px' }}>Save your prompts, view history, and customize your study level.</p>
        </div>

        {/* Error message */}
        {error && (
          <div style={{
            background: 'rgba(255, 75, 75, 0.1)',
            border: '1px solid rgba(255, 75, 75, 0.3)',
            borderRadius: '10px',
            padding: '12px 16px',
            color: '#ff4b4b',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            fontSize: '14px',
            marginBottom: '20px'
          }}>
            <AlertCircle size={18} />
            <span>{error}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">
              <User size={16} style={{ color: 'var(--accent-cyan)' }} />
              Choose a Username
            </label>
            <input 
              type="text" 
              className="form-input" 
              placeholder="e.g., CoolCoder12"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <span style={{ fontSize: '11px', color: 'var(--text-secondary)', marginTop: '4px' }}>
              Only letters, numbers, and underscores are allowed. No full names!
            </span>
          </div>

          <div className="form-group">
            <label className="form-label">
              <Key size={16} style={{ color: 'var(--accent-cyan)' }} />
              Create a Password
            </label>
            <input 
              type="password" 
              className="form-input" 
              placeholder="At least 6 characters"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="form-group" style={{ marginBottom: '28px' }}>
            <label className="form-label">
              <BookOpen size={16} style={{ color: 'var(--accent-cyan)' }} />
              Choose your School Level
            </label>
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '10px',
              marginTop: '4px'
            }}>
              {[
                { id: 'elementary', label: 'Elementary', desc: 'Ages 8-10' },
                { id: 'middle', label: 'Middle School', desc: 'Ages 11-13' },
                { id: 'high', label: 'High School', desc: 'Ages 14-15' },
                { id: 'adult', label: 'Older / Adult', desc: 'Ages 16+' }
              ].map((lvl) => (
                <div 
                  key={lvl.id}
                  onClick={() => setGradeLevel(lvl.id)}
                  style={{
                    padding: '12px',
                    borderRadius: '10px',
                    border: '1.5px solid',
                    borderColor: gradeLevel === lvl.id ? 'var(--accent-cyan)' : 'var(--border-subtle)',
                    background: gradeLevel === lvl.id ? 'rgba(0, 242, 254, 0.05)' : 'rgba(255, 255, 255, 0.02)',
                    cursor: 'pointer',
                    transition: 'var(--transition-smooth)',
                    textAlign: 'center'
                  }}
                >
                  <div style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-primary)' }}>{lvl.label}</div>
                  <div style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>{lvl.desc}</div>
                </div>
              ))}
            </div>
          </div>

          <button 
            type="submit" 
            className="btn btn-primary" 
            disabled={loading}
            style={{ width: '100%', padding: '14px', fontSize: '16px' }}
          >
            <LogIn size={18} />
            {loading ? 'Creating account...' : 'Create Account & Login'}
          </button>
        </form>

        <div style={{ textAlign: 'center', marginTop: '24px', fontSize: '14px', color: 'var(--text-secondary)' }}>
          Already have an account?{' '}
          <Link to="/login" style={{ color: 'var(--accent-cyan)', textDecoration: 'none', fontWeight: 600 }}>
            Log in here
          </Link>
        </div>
      </div>
    </div>
  );
}
