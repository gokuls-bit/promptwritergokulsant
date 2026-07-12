import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Sparkles, History, LogIn, LogOut, PlusCircle, Menu, X, Home } from 'lucide-react';

export default function Navbar({ user, onLogout }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    onLogout();
    setMobileMenuOpen(false);
    navigate('/');
  };

  const isActive = (path) => location.pathname === path;

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const handleMobileNavClick = (path) => {
    setMobileMenuOpen(false);
    navigate(path);
  };

  return (
    <>
      <nav className="glass-panel" style={{
        margin: '16px auto',
        maxWidth: '1200px',
        width: 'calc(100% - 32px)',
        padding: '14px 24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderRadius: '20px',
        border: '1px solid var(--border-subtle)',
        position: 'relative',
        zIndex: 100
      }}>
        {/* Brand logo */}
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '8px', textDecoration: 'none' }}>
          <Sparkles size={26} className="text-gradient" style={{ filter: 'drop-shadow(0 0 8px rgba(0, 242, 254, 0.4))' }} />
          <span className="text-gradient" style={{ fontSize: '22px', fontWeight: 800, letterSpacing: '-0.03em' }}>
            PromptWriter
          </span>
          <span className="desktop-only" style={{
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

        {/* Desktop navigation */}
        <div className="desktop-flex" style={{ display: 'none', alignItems: 'center', gap: '20px' }}>
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
            <Home size={16} />
            Home
          </Link>
          <Link 
            to="/create" 
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              textDecoration: 'none',
              color: isActive('/create') ? 'var(--accent-cyan)' : 'var(--text-secondary)',
              fontWeight: 500,
              fontSize: '15px',
              transition: 'var(--transition-smooth)'
            }}
          >
            <PlusCircle size={16} />
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
                <History size={16} />
                History
              </Link>

              {/* Profile details & logout */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', borderLeft: '1px solid var(--border-subtle)', paddingLeft: '20px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
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
                    fontSize: '13px'
                  }}>
                    {user.username ? user.username.substring(0, 2).toUpperCase() : 'U'}
                  </div>
                  <div>
                    <div style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-primary)' }}>@{user.username}</div>
                    <div style={{ fontSize: '10px', color: 'var(--text-secondary)' }}>
                      {user.gradeLevel ? user.gradeLevel.charAt(0).toUpperCase() + user.gradeLevel.slice(1) : 'Student'}
                    </div>
                  </div>
                </div>
                
                <button 
                  onClick={handleLogout}
                  className="btn btn-secondary"
                  style={{ padding: '8px 12px', borderRadius: '10px', fontSize: '13px' }}
                >
                  <LogOut size={14} />
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
                <LogIn size={14} />
                Login
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Toggle Button */}
        <div className="mobile-flex" style={{ display: 'none', alignItems: 'center' }}>
          <button 
            onClick={toggleMobileMenu} 
            className="btn btn-secondary" 
            style={{ padding: '8px', borderRadius: '10px' }}
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer Menu Overlay */}
      {mobileMenuOpen && (
        <div className="animate-fade-in" style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(8, 9, 17, 0.95)',
          backdropFilter: 'blur(20px)',
          zIndex: 90,
          display: 'flex',
          flexDirection: 'column',
          padding: '100px 24px 40px',
          gap: '20px',
          boxSizing: 'border-box'
        }}>
          <button 
            onClick={() => handleMobileNavClick('/')}
            className="btn btn-secondary"
            style={{ 
              justifyContent: 'flex-start', 
              fontSize: '18px', 
              padding: '16px',
              borderColor: isActive('/') ? 'var(--accent-cyan)' : 'var(--border-subtle)'
            }}
          >
            <Home size={20} style={{ color: isActive('/') ? 'var(--accent-cyan)' : 'inherit' }} />
            Home
          </button>
          <button 
            onClick={() => handleMobileNavClick('/create')}
            className="btn btn-secondary"
            style={{ 
              justifyContent: 'flex-start', 
              fontSize: '18px', 
              padding: '16px',
              borderColor: isActive('/create') ? 'var(--accent-cyan)' : 'var(--border-subtle)'
            }}
          >
            <PlusCircle size={20} style={{ color: isActive('/create') ? 'var(--accent-cyan)' : 'inherit' }} />
            Create
          </button>

          {user ? (
            <>
              <button 
                onClick={() => handleMobileNavClick('/history')}
                className="btn btn-secondary"
                style={{ 
                  justifyContent: 'flex-start', 
                  fontSize: '18px', 
                  padding: '16px',
                  borderColor: isActive('/history') ? 'var(--accent-cyan)' : 'var(--border-subtle)'
                }}
              >
                <History size={20} style={{ color: isActive('/history') ? 'var(--accent-cyan)' : 'inherit' }} />
                History
              </button>

              <div style={{
                marginTop: 'auto',
                display: 'flex',
                flexDirection: 'column',
                gap: '16px',
                padding: '20px',
                background: 'rgba(255,255,255,0.02)',
                borderRadius: '16px',
                border: '1px solid var(--border-subtle)'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, var(--accent-primary) 0%, var(--accent-secondary) 100%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    fontWeight: 'bold',
                    fontSize: '16px'
                  }}>
                    {user.username ? user.username.substring(0, 2).toUpperCase() : 'U'}
                  </div>
                  <div>
                    <div style={{ fontSize: '15px', fontWeight: 600, color: 'var(--text-primary)' }}>@{user.username}</div>
                    <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
                      {user.gradeLevel ? user.gradeLevel.toUpperCase() : 'STUDENT'}
                    </div>
                  </div>
                </div>
                <button 
                  onClick={handleLogout}
                  className="btn btn-danger"
                  style={{ width: '100%', padding: '14px', borderRadius: '12px' }}
                >
                  <LogOut size={18} />
                  Logout
                </button>
              </div>
            </>
          ) : (
            <button 
              onClick={() => handleMobileNavClick('/login')}
              className="btn btn-primary"
              style={{ width: '100%', padding: '16px', borderRadius: '12px', marginTop: 'auto', fontSize: '18px' }}
            >
              <LogIn size={20} />
              Login
            </button>
          )}
        </div>
      )}
    </>
  );
}
