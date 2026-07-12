import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Sparkles, History, LogIn, LogOut, User, PlusCircle } from 'lucide-react';

export default function Navbar({ user, onLogout }) {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    onLogout();
    navigate('/');
  };

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="glass-panel" style={{
      margin: '16px auto',
      maxWidth: '1200px',
      padding: '16px 24px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      borderRadius: '20px',
      border: '1px solid var(--border-subtle)'
    }}>
      {/* Brand logo */}
      <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '8px', textDecoration: 'none' }}>
        <Sparkles size={28} className="text-gradient" style={{ filter: 'drop-shadow(0 0 8px rgba(0, 242, 254, 0.4))' }} />
        <span className="text-gradient" style={{ fontSize: '24px', fontWeight: 800, letterSpacing: '-0.03em' }}>
          PromptWriter
        </span>
        <span style={{
          background: 'rgba(0, 242, 254, 0.1)',
          border: '1px solid var(--accent-cyan)',
          color: 'var(--accent-cyan)',
          fontSize: '11px',
          fontWeight: 600,
          padding: '2px 8px',
          borderRadius: '20px',
          marginLeft: '4px'
        }}>
          v1.0 (Safe AI)
        </span>
      </Link>

      {/* Nav links */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
        <Link 
          to="/" 
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            textDecoration: 'none',
            color: isActive('/') ? 'var(--accent-cyan)' : 'var(--text-secondary)',
            fontWeight: 500,
            fontSize: '15px',
            transition: 'var(--transition-smooth)'
          }}
        >
          <PlusCircle size={18} />
          Create
        </Link>

        {user ? (
          <>
            <Link 
              to="/history" 
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                textDecoration: 'none',
                color: isActive('/history') ? 'var(--accent-cyan)' : 'var(--text-secondary)',
                fontWeight: 500,
                fontSize: '15px',
                transition: 'var(--transition-smooth)'
              }}
            >
              <History size={18} />
              History
            </Link>

            {/* Profile info & logout */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', borderLeft: '1px solid var(--border-subtle)', paddingLeft: '20px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <div style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, var(--accent-primary) 0%, var(--accent-secondary) 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  fontWeight: 'bold',
                  fontSize: '14px'
                }}>
                  {user.username ? user.username.substring(0, 2).toUpperCase() : 'U'}
                </div>
                <div style={{ display: 'none', md: 'block' }}>
                  <div style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-primary)' }}>@{user.username}</div>
                  <div style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>
                    {user.gradeLevel ? user.gradeLevel.charAt(0).toUpperCase() + user.gradeLevel.slice(1) : 'Student'}
                  </div>
                </div>
              </div>
              
              <button 
                onClick={handleLogout}
                className="btn btn-secondary"
                style={{ padding: '8px 12px', borderRadius: '10px', fontSize: '13px' }}
              >
                <LogOut size={15} />
                Logout
              </button>
            </div>
          </>
        ) : (
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', borderLeft: '1px solid var(--border-subtle)', paddingLeft: '20px' }}>
            <Link 
              to="/login"
              className="btn btn-secondary"
              style={{ padding: '8px 16px', borderRadius: '10px', fontSize: '14px', textDecoration: 'none' }}
            >
              <LogIn size={15} />
              Login
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}
