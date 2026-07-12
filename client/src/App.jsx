import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Wizard from './pages/Wizard';
import Login from './pages/Login';
import Register from './pages/Register';
import History from './pages/History';

export default function App() {
  const [user, setUser] = useState(null);
  const [duplicatedPrompt, setDuplicatedPrompt] = useState(null);

  // Load user from localStorage on mount
  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (e) {
        console.error('Failed to parse user from storage');
      }
    }
  }, []);

  const handleLoginSuccess = (userData) => {
    setUser(userData);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
  };

  const handleDuplicatePrompt = (promptData) => {
    setDuplicatedPrompt(promptData);
  };

  const clearDuplicatedPrompt = () => {
    setDuplicatedPrompt(null);
  };

  return (
    <Router>
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <Navbar user={user} onLogout={handleLogout} />
        
        <main style={{ flex: 1 }}>
          <Routes>
            <Route 
              path="/" 
              element={
                <Wizard 
                  user={user} 
                  duplicatedPrompt={duplicatedPrompt} 
                  clearDuplicatedPrompt={clearDuplicatedPrompt} 
                />
              } 
            />
            <Route 
              path="/login" 
              element={
                user ? <Navigate to="/" /> : <Login onLoginSuccess={handleLoginSuccess} />
              } 
            />
            <Route 
              path="/register" 
              element={
                user ? <Navigate to="/" /> : <Register onLoginSuccess={handleLoginSuccess} />
              } 
            />
            <Route 
              path="/history" 
              element={
                user ? (
                  <History onDuplicate={handleDuplicatePrompt} />
                ) : (
                  <Navigate to="/login" />
                )
              } 
            />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </main>
        
        <footer style={{
          padding: '24px',
          textAlign: 'center',
          color: 'var(--text-secondary)',
          fontSize: '13px',
          borderTop: '1px solid var(--border-subtle)',
          marginTop: '40px'
        }}>
          <div>© {new Date().getFullYear()} PromptWriter. Built for students, designed for learning.</div>
          <div style={{ marginTop: '4px', fontSize: '11px', color: 'rgba(255,255,255,0.3)' }}>
            This application is deterministic and does not transmit data to external AI models. All generated prompts are intended for manual use.
          </div>
        </footer>
      </div>
    </Router>
  );
}
