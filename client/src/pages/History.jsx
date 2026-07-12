import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { promptAPI } from '../services/api';
import { Search, Filter, Calendar, Clipboard, Download, Trash2, ArrowUpRight, Award, ChevronDown, ChevronUp } from 'lucide-react';

export default function History({ onDuplicate }) {
  const [prompts, setPrompts] = useState([]);
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedId, setExpandedId] = useState(null);
  const [copyStatus, setCopyStatus] = useState({});
  const navigate = useNavigate();

  // Load history and category list
  useEffect(() => {
    fetchHistory();
    fetchTemplates();
  }, [search, selectedCategory]);

  const fetchHistory = async () => {
    try {
      setLoading(true);
      const data = await promptAPI.getHistory(search, selectedCategory);
      setPrompts(data);
    } catch (err) {
      console.error('Error fetching prompt history:', err);
    } finally {
      setLoading(false);
    }
  };

  const fetchTemplates = async () => {
    try {
      const data = await promptAPI.getTemplates();
      setCategories(data);
    } catch (err) {
      console.error('Error fetching templates:', err);
    }
  };

  const handleCopy = async (id, text) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopyStatus({ ...copyStatus, [id]: 'Copied!' });
      setTimeout(() => {
        setCopyStatus(prev => ({ ...prev, [id]: undefined }));
      }, 2000);
    } catch (err) {
      console.error('Failed to copy text:', err);
    }
  };

  const handleDownload = (prompt) => {
    const element = document.createElement("a");
    const file = new Blob([prompt.compiledPrompt], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = `${prompt.title.replace(/\s+/g, '_')}_prompt.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this prompt from your history?")) {
      return;
    }
    try {
      await promptAPI.delete(id);
      setPrompts(prompts.filter(p => p._id !== id));
      if (expandedId === id) setExpandedId(null);
    } catch (err) {
      console.error('Error deleting prompt:', err);
      alert('Failed to delete prompt.');
    }
  };

  const handleDuplicate = (prompt) => {
    // Call the callback to preload the wizard state, then redirect home
    onDuplicate({
      categoryId: prompt.category,
      inputs: prompt.inputs
    });
    navigate('/');
  };

  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <div className="animate-fade-in" style={{ maxWidth: '1200px', margin: '0 auto', padding: '24px' }}>
      {/* Header */}
      <div style={{ marginBottom: '32px' }}>
        <h1 style={{ fontSize: '32px', marginBottom: '8px' }}>Your Saved Prompts</h1>
        <p style={{ color: 'var(--text-secondary)' }}>Review, edit, copy, or reuse your previously compiled AI prompts.</p>
      </div>

      {/* Filter panel */}
      <div className="glass-panel" style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: '16px',
        padding: '16px 20px',
        marginBottom: '24px',
        alignItems: 'center'
      }}>
        {/* Search */}
        <div style={{ flex: 1, minWidth: '260px', position: 'relative' }}>
          <Search size={18} style={{
            position: 'absolute',
            left: '14px',
            top: '50%',
            transform: 'translateY(-50%)',
            color: 'var(--text-secondary)'
          }} />
          <input 
            type="text" 
            className="form-input" 
            placeholder="Search prompt titles or contents..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ width: '100%', paddingLeft: '44px' }}
          />
        </div>

        {/* Category Filter */}
        <div style={{ width: '220px', position: 'relative' }}>
          <Filter size={18} style={{
            position: 'absolute',
            left: '14px',
            top: '50%',
            transform: 'translateY(-50%)',
            color: 'var(--text-secondary)',
            pointerEvents: 'none'
          }} />
          <select 
            className="form-select"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            style={{ width: '100%', paddingLeft: '44px' }}
          >
            <option value="">All Categories</option>
            {categories.map(c => (
              <option key={c.id} value={c.id}>{c.title}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Prompt list */}
      {loading ? (
        <div style={{ textAlign: 'center', padding: '48px', color: 'var(--text-secondary)' }}>
          Loading saved prompts...
        </div>
      ) : prompts.length === 0 ? (
        <div className="glass-panel" style={{ textAlign: 'center', padding: '64px 20px', color: 'var(--text-secondary)' }}>
          <Calendar size={48} style={{ margin: '0 auto 16px', opacity: 0.5 }} />
          <h3>No prompts found</h3>
          <p style={{ marginTop: '8px' }}>You haven't saved any prompts matching those filters yet. Go to the generator and compile some!</p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {prompts.map((prompt) => {
            const isExpanded = expandedId === prompt._id;
            const categoryMeta = categories.find(c => c.id === prompt.category) || { title: prompt.category };

            return (
              <div 
                key={prompt._id} 
                className="glass-panel"
                style={{
                  padding: '20px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '12px',
                  transition: 'var(--transition-smooth)',
                  borderLeft: isExpanded ? '4px solid var(--accent-cyan)' : '1px solid var(--border-subtle)'
                }}
              >
                {/* Info row */}
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  flexWrap: 'wrap',
                  gap: '12px'
                }}>
                  <div style={{ cursor: 'pointer' }} onClick={() => toggleExpand(prompt._id)}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <span style={{
                        background: 'rgba(255, 255, 255, 0.05)',
                        border: '1px solid var(--border-subtle)',
                        fontSize: '12px',
                        padding: '2px 8px',
                        borderRadius: '6px',
                        color: 'var(--text-secondary)'
                      }}>
                        {categoryMeta.title}
                      </span>
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px',
                        fontSize: '12px',
                        color: 'var(--accent-cyan)',
                        fontWeight: 600
                      }}>
                        <Award size={14} />
                        Score: {prompt.qualityScore}
                      </div>
                    </div>
                    <h3 style={{ fontSize: '18px', marginTop: '6px', color: 'var(--text-primary)' }}>
                      {prompt.title}
                    </h3>
                  </div>

                  {/* Quick actions */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <button 
                      onClick={() => handleDuplicate(prompt)}
                      className="btn btn-secondary"
                      style={{ padding: '8px 12px', fontSize: '13px', borderRadius: '8px' }}
                      title="Reload inputs and duplicate prompt"
                    >
                      <ArrowUpRight size={14} />
                      Reuse
                    </button>
                    <button 
                      onClick={() => handleDownload(prompt)}
                      className="btn btn-secondary"
                      style={{ padding: '8px', fontSize: '13px', borderRadius: '8px' }}
                      title="Download as text file"
                    >
                      <Download size={14} />
                    </button>
                    <button 
                      onClick={() => handleDelete(prompt._id)}
                      className="btn btn-danger"
                      style={{ padding: '8px', borderRadius: '8px' }}
                      title="Delete prompt"
                    >
                      <Trash2 size={14} />
                    </button>
                    <button 
                      onClick={() => toggleExpand(prompt._id)}
                      className="btn btn-secondary"
                      style={{ padding: '8px', borderRadius: '8px' }}
                    >
                      {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                    </button>
                  </div>
                </div>

                {/* Expanded content */}
                {isExpanded && (
                  <div className="animate-fade-in" style={{
                    marginTop: '12px',
                    paddingTop: '16px',
                    borderTop: '1px solid var(--border-subtle)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '16px'
                  }}>
                    {/* Raw inputs block */}
                    <div>
                      <h4 style={{ fontSize: '14px', color: 'var(--text-primary)', marginBottom: '8px' }}>Your Inputs:</h4>
                      <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '6px',
                        background: 'rgba(255, 255, 255, 0.02)',
                        padding: '10px 14px',
                        borderRadius: '8px'
                      }}>
                        {Object.entries(prompt.inputs).map(([key, val]) => (
                          <div key={key} style={{ fontSize: '13px' }}>
                            <strong style={{ color: 'var(--text-secondary)' }}>{key}: </strong>
                            <span style={{ color: 'var(--text-primary)' }}>{String(val)}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Compiled output block */}
                    <div>
                      <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginBottom: '8px'
                      }}>
                        <h4 style={{ fontSize: '14px', color: 'var(--text-primary)' }}>Compiled Prompt:</h4>
                        <button 
                          onClick={() => handleCopy(prompt._id, prompt.compiledPrompt)}
                          className="btn btn-secondary"
                          style={{ padding: '4px 10px', fontSize: '12px', borderRadius: '6px' }}
                        >
                          <Clipboard size={12} />
                          {copyStatus[prompt._id] || 'Copy'}
                        </button>
                      </div>
                      <pre style={{
                        background: 'rgba(0, 0, 0, 0.25)',
                        border: '1px solid var(--border-subtle)',
                        borderRadius: '8px',
                        padding: '16px',
                        fontSize: '13px',
                        color: '#d4d8e6',
                        whiteSpace: 'pre-wrap',
                        overflowX: 'auto',
                        fontFamily: 'monospace, monospace',
                        maxHeight: '300px'
                      }}>
                        {prompt.compiledPrompt}
                      </pre>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
