import React, { useState, useEffect } from 'react';
import { promptAPI } from '../services/api';
import DynamicForm from '../components/form/DynamicForm';
import { 
  BookOpen, Lightbulb, Compass, FileText, FileCode, HelpCircle, 
  CreditCard, Zap, Layers, Presentation, Briefcase, Globe, 
  FlaskConical, PenTool, UserCheck, Sparkles, Image, Award, 
  Shield, Layout, Mic, Settings, ArrowLeft, Clipboard, Download, 
  Bookmark, AlertTriangle, Play, RefreshCw, Star
} from 'lucide-react';

// Helper function to map template category to a Lucide icon
const getIcon = (id) => {
  switch (id) {
    case 'homework-tutor': return <BookOpen size={24} />;
    case 'explain-simply': return <Lightbulb size={24} />;
    case 'step-by-step': return <Compass size={24} />;
    case 'summarizer': return <FileText size={24} />;
    case 'cheat-sheet': return <FileCode size={24} />;
    case 'quiz': return <HelpCircle size={24} />;
    case 'flashcards': return <CreditCard size={24} />;
    case 'brainstorming': return <Zap size={24} />;
    case 'essay-outline': return <Layers size={24} />;
    case 'presentation': return <Presentation size={24} />;
    case 'school-project': return <Briefcase size={24} />;
    case 'research': return <Globe size={24} />;
    case 'science-fair': return <FlaskConical size={24} />;
    case 'creative-writing': return <PenTool size={24} />;
    case 'story-character': return <UserCheck size={24} />;
    case 'anime-image': return <Sparkles size={24} />;
    case 'general-image': return <Image size={24} />;
    case 'meme': return <Award size={24} />;
    case 'trading-card': return <Shield size={24} />;
    case 'poster': return <Layout size={24} />;
    case 'speech': return <Mic size={24} />;
    case 'custom': return <Settings size={24} />;
    default: return <Sparkles size={24} />;
  }
};

export default function Wizard({ user, duplicatedPrompt, clearDuplicatedPrompt, activeCategory, clearActiveCategory }) {
  const [templates, setTemplates] = useState([]);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [inputs, setInputs] = useState({});
  const [gradeLevel, setGradeLevel] = useState(user?.gradeLevel || 'middle');
  const [loading, setLoading] = useState(true);
  const [compiling, setCompiling] = useState(false);
  const [error, setError] = useState('');
  const [validationErrors, setValidationErrors] = useState({});
  
  // Compiled output states
  const [compiledPrompt, setCompiledPrompt] = useState('');
  const [qualityScore, setQualityScore] = useState(0);
  const [scoreBreakdown, setScoreBreakdown] = useState([]);
  const [isCompiled, setIsCompiled] = useState(false);
  
  // Save states
  const [saveTitle, setSaveTitle] = useState('');
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [saving, setSaving] = useState(false);
  const [copyText, setCopyText] = useState('Copy Prompt');

  // Load available templates from backend
  useEffect(() => {
    const fetchTemplates = async () => {
      try {
        const data = await promptAPI.getTemplates();
        setTemplates(data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching templates:', err);
        setError('Failed to connect to prompt engine. Please refresh.');
        setLoading(false);
      }
    };
    fetchTemplates();
  }, []);

  // Handle preloading of a duplicated prompt from History
  useEffect(() => {
    if (duplicatedPrompt && templates.length > 0) {
      const template = templates.find(t => t.id === duplicatedPrompt.categoryId);
      if (template) {
        setSelectedTemplate(template);
        setInputs(duplicatedPrompt.inputs);
        setIsCompiled(false);
        setCompiledPrompt('');
        setSaveTitle('');
        setSaveSuccess(false);
        setError('');
        setValidationErrors({});
        clearDuplicatePrompt();
      }
    }
  }, [duplicatedPrompt, templates]);

  const clearDuplicatePrompt = () => {
    if (clearDuplicatedPrompt) clearDuplicatedPrompt();
  };

  // Handle preloading of an active category from Homepage
  useEffect(() => {
    if (activeCategory && templates.length > 0) {
      const template = templates.find(t => t.id === activeCategory);
      if (template) {
        // We set selectedTemplate and initialize fields manually to match handleSelectTemplate
        setSelectedTemplate(template);
        const initialInputs = {};
        template.fields.forEach(field => {
          initialInputs[field.name] = field.type === 'select' ? field.options[0] : field.type === 'chip' ? field.options[0] : '';
        });
        setInputs(initialInputs);
        setIsCompiled(false);
        setCompiledPrompt('');
        setSaveTitle('');
        setSaveSuccess(false);
        setError('');
        setValidationErrors({});
        clearActiveCategory();
      }
    }
  }, [activeCategory, templates]);

  // Clean inputs when switching templates
  const handleSelectTemplate = (template) => {
    setSelectedTemplate(template);
    const initialInputs = {};
    template.fields.forEach(field => {
      initialInputs[field.name] = field.type === 'select' ? field.options[0] : field.type === 'chip' ? field.options[0] : '';
    });
    setInputs(initialInputs);
    setIsCompiled(false);
    setCompiledPrompt('');
    setSaveTitle('');
    setSaveSuccess(false);
    setError('');
    setValidationErrors({});
  };

  const handleInputChange = (name, value) => {
    setInputs(prev => ({ ...prev, [name]: value }));
    if (validationErrors[name]) {
      setValidationErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const handleCompile = async (e) => {
    if (e) e.preventDefault();
    setError('');
    
    // Perform client-side schema-based validation
    const errors = {};
    selectedTemplate.fields.forEach(field => {
      const val = inputs[field.name];
      
      // Required check
      if (field.required && (val === undefined || val === null || val === '')) {
        errors[field.name] = `${field.label} is required.`;
        return;
      }
      
      if (val === undefined || val === null || val === '') return;
      
      // Min length check
      if (field.minLength !== undefined && String(val).length < field.minLength) {
        errors[field.name] = `${field.label} must be at least ${field.minLength} characters.`;
      }
      
      // Max length check
      if (field.maxLength !== undefined && String(val).length > field.maxLength) {
        errors[field.name] = `${field.label} cannot exceed ${field.maxLength} characters.`;
      }

      // Min value check (for numeric inputs)
      if (field.min !== undefined && Number(val) < field.min) {
        errors[field.name] = `${field.label} must be at least ${field.min}.`;
      }

      // Max value check (for numeric inputs)
      if (field.max !== undefined && Number(val) > field.max) {
        errors[field.name] = `${field.label} cannot exceed ${field.max}.`;
      }
    });

    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      setError('Please fix the highlighted errors before compiling.');
      return;
    }

    setCompiling(true);

    try {
      // If studentGradeLevel is in inputs, we use that for compilation
      const finalGrade = inputs.studentGradeLevel || inputs.gradeLevel || gradeLevel;
      const result = await promptAPI.compile(selectedTemplate.id, inputs, finalGrade);
      setCompiledPrompt(result.compiledPrompt);
      setQualityScore(result.qualityScore);
      setScoreBreakdown(result.breakdown);
      setIsCompiled(true);
      
      // Auto-set a draft save title
      const topicValue = inputs.homeworkTopic || inputs.topic || inputs.projectTopic || inputs.sourceText || inputs.characterDescription || inputs.cardName || 'My Project';
      setSaveTitle(`${selectedTemplate.title} - ${String(topicValue).substring(0, 30)}`);
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.error || 'Failed to compile prompt. Check safety rules.');
    } finally {
      setCompiling(false);
    }
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(compiledPrompt);
      setCopyText('Copied!');
      setTimeout(() => setCopyText('Copy Prompt'), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const handleDownload = () => {
    const element = document.createElement("a");
    const file = new Blob([compiledPrompt], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = `${saveTitle.replace(/\s+/g, '_') || 'prompt'}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const handleSave = async () => {
    if (!user) {
      alert("Please log in or sign up to save your prompts in your history!");
      return;
    }
    if (!saveTitle.trim()) {
      alert("Please enter a title for your saved prompt.");
      return;
    }

    setSaving(true);
    try {
      await promptAPI.save({
        title: saveTitle,
        category: selectedTemplate.id,
        inputs,
        compiledPrompt,
        qualityScore
      });
      setSaveSuccess(true);
    } catch (err) {
      console.error('Failed to save:', err);
      alert('Could not save prompt.');
    } finally {
      setSaving(false);
    }
  };

  const handleReset = () => {
    setSelectedTemplate(null);
    setInputs({});
    setIsCompiled(false);
    setCompiledPrompt('');
    setSaveTitle('');
    setSaveSuccess(false);
    setError('');
  };

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '100px 20px', color: 'var(--text-secondary)' }}>
        <RefreshCw className="animate-spin" size={40} style={{ margin: '0 auto 16px' }} />
        <h2>Initializing Prompt Registry...</h2>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '24px' }}>
      
      {/* Banner */}
      {!selectedTemplate && (
        <div className="glass-panel" style={{
          padding: '48px 32px',
          textAlign: 'center',
          marginBottom: '40px',
          background: 'linear-gradient(135deg, rgba(20, 22, 43, 0.7) 0%, rgba(35, 23, 68, 0.4) 100%)',
          borderRadius: '24px',
          position: 'relative',
          overflow: 'hidden'
        }}>
          {/* Neon background light effect */}
          <div style={{
            position: 'absolute',
            top: '-50%',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '300px',
            height: '150px',
            background: 'var(--accent-primary)',
            filter: 'blur(120px)',
            opacity: 0.3,
            pointerEvents: 'none'
          }}></div>
          
          <h1 style={{ fontSize: '40px', marginBottom: '12px', fontWeight: 800 }}>
            Make Great Prompts <span className="text-gradient">Simply</span>
          </h1>
          <p style={{ maxWidth: '600px', margin: '0 auto', color: 'var(--text-secondary)', fontSize: '16px', lineHeight: 1.6 }}>
            Type a simple word or classroom topic. PromptWriter compiles it into a detailed, age-adapted, 
            learning-centered prompt. Copy and paste it directly into ChatGPT, Gemini, or Claude.
          </p>
        </div>
      )}

      {/* ERROR DISPLAY */}
      {error && (
        <div className="glass-panel" style={{
          background: 'rgba(255, 75, 75, 0.1)',
          border: '1px solid rgba(255, 75, 75, 0.4)',
          borderRadius: '12px',
          padding: '16px 20px',
          color: '#ff4b4b',
          display: 'flex',
          alignItems: 'flex-start',
          gap: '12px',
          marginBottom: '28px'
        }}>
          <AlertTriangle size={24} style={{ flexShrink: 0, marginTop: '2px' }} />
          <div>
            <h4 style={{ fontWeight: 600, marginBottom: '4px' }}>Safety & Sanitization Warning</h4>
            <p style={{ color: '#ff7373', fontSize: '14px' }}>{error}</p>
          </div>
        </div>
      )}

      {/* STEP 1: CATEGORY SELECTION */}
      {!selectedTemplate && (
        <div>
          <h2 style={{ fontSize: '22px', marginBottom: '24px', textAlign: 'center' }}>
            What do you want to create today?
          </h2>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
            gap: '20px'
          }}>
            {templates.map((tpl) => (
              <div 
                key={tpl.id}
                onClick={() => handleSelectTemplate(tpl)}
                className="glass-panel"
                style={{
                  padding: '24px',
                  cursor: 'pointer',
                  borderRadius: '18px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '16px',
                  transition: 'var(--transition-smooth)',
                  height: '100%'
                }}
              >
                <div style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '12px',
                  background: 'linear-gradient(135deg, rgba(0, 242, 254, 0.15) 0%, rgba(142, 45, 226, 0.15) 100%)',
                  border: '1px solid var(--border-glow)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--accent-cyan)'
                }}>
                  {getIcon(tpl.id)}
                </div>
                <div>
                  <h3 style={{ fontSize: '18px', marginBottom: '6px', color: 'var(--text-primary)' }}>{tpl.title}</h3>
                  <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.4 }}>{tpl.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* STEP 2 & 3: FORM AND COMPILED RESULT */}
      {selectedTemplate && (
        <div style={{
          display: 'grid',
          gridTemplateColumns: isCompiled ? '1fr 1fr' : '1fr',
          gap: '28px',
          alignItems: 'start'
        }}>
          
          {/* Dynamic input form block */}
          <div className="glass-panel animate-fade-in" style={{ padding: '32px' }}>
            <button 
              onClick={handleReset}
              className="btn btn-secondary"
              style={{
                padding: '8px 14px',
                fontSize: '13px',
                borderRadius: '8px',
                marginBottom: '24px'
              }}
            >
              <ArrowLeft size={16} />
              Change Category
            </button>

            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
              <div style={{
                width: '40px',
                height: '40px',
                borderRadius: '10px',
                background: 'rgba(0, 242, 254, 0.1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--accent-cyan)'
              }}>
                {getIcon(selectedTemplate.id)}
              </div>
              <div>
                <h2 style={{ fontSize: '24px' }}>{selectedTemplate.title}</h2>
                <p style={{ fontSize: '13px' }}>{selectedTemplate.description}</p>
              </div>
            </div>

            <form onSubmit={handleCompile}>
              {/* Dynamic form inputs */}
              {selectedTemplate.fields.map((field) => (
                <div className="form-group" key={field.name}>
                  <label className="form-label">
                    {field.label}
                    {field.required && <span style={{ color: 'var(--accent-cyan)' }}>*</span>}
                  </label>
                  
                  {field.type === 'select' ? (
                    <select
                      className="form-select"
                      value={inputs[field.name] || ''}
                      onChange={(e) => handleInputChange(field.name, e.target.value)}
                    >
                      {field.options.map(opt => (
                        <option key={opt} value={opt}>{opt}</option>
                      ))}
                    </select>
                  ) : field.type === 'textarea' ? (
                    <textarea
                      className="form-textarea"
                      placeholder={field.placeholder}
                      value={inputs[field.name] || ''}
                      onChange={(e) => handleInputChange(field.name, e.target.value)}
                      required={field.required}
                    />
                  ) : (
                    <input
                      type="text"
                      className="form-input"
                      placeholder={field.placeholder}
                      value={inputs[field.name] || ''}
                      onChange={(e) => handleInputChange(field.name, e.target.value)}
                      required={field.required}
                    />
                  )}
                </div>
              ))}

              {/* Adjust grade level (shown if user not logged in, otherwise reads user profile) */}
              <div className="form-group" style={{ marginBottom: '28px' }}>
                <label className="form-label">Target School Grade Level</label>
                {user ? (
                  <div style={{
                    padding: '12px 16px',
                    background: 'rgba(255, 255, 255, 0.03)',
                    borderRadius: '12px',
                    border: '1px solid var(--border-subtle)',
                    fontSize: '14px',
                    color: 'var(--text-secondary)'
                  }}>
                    Linked to your profile: <strong>{user.gradeLevel.toUpperCase()}</strong>
                  </div>
                ) : (
                  <select 
                    className="form-select"
                    value={gradeLevel}
                    onChange={(e) => setGradeLevel(e.target.value)}
                  >
                    <option value="elementary">Elementary School (Ages 8-10)</option>
                    <option value="middle">Middle School (Ages 11-13)</option>
                    <option value="high">High School (Ages 14-15)</option>
                    <option value="adult">Advanced / College (Ages 16+)</option>
                  </select>
                )}
              </div>

              <button 
                type="submit" 
                className="btn btn-primary"
                disabled={compiling}
                style={{ width: '100%', padding: '14px', fontSize: '16px' }}
              >
                <Play size={18} />
                {compiling ? 'Compiling rules...' : 'Compile Prompt'}
              </button>
            </form>
          </div>

          {/* STEP 3: RESULT DISPLAY */}
          {isCompiled && (
            <div className="glass-panel animate-fade-in" style={{
              padding: '32px',
              border: '1.5px solid var(--accent-cyan)',
              boxShadow: '0 0 30px rgba(0, 242, 254, 0.15)',
              display: 'flex',
              flexDirection: 'column',
              gap: '24px'
            }}>
              {/* Header metrics */}
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}>
                <div>
                  <h3 style={{ fontSize: '20px' }}>Your Compiled Prompt</h3>
                  <p style={{ fontSize: '12px' }}>Edit/Copy this to use in any AI tool.</p>
                </div>
                
                {/* Score badge */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  background: 'rgba(0, 242, 254, 0.1)',
                  border: '1.5px solid var(--accent-cyan)',
                  padding: '8px 14px',
                  borderRadius: '12px'
                }}>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: '10px', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Quality Score</div>
                    <div style={{ fontSize: '18px', fontWeight: 800, color: 'var(--accent-cyan)' }}>{qualityScore}/100</div>
                  </div>
                </div>
              </div>

              {/* Progress bar */}
              <div style={{
                width: '100%',
                height: '8px',
                background: 'rgba(255, 255, 255, 0.05)',
                borderRadius: '4px',
                overflow: 'hidden'
              }}>
                <div style={{
                  width: `${qualityScore}%`,
                  height: '100%',
                  background: 'linear-gradient(90deg, var(--accent-primary) 0%, var(--accent-cyan) 100%)',
                  transition: 'width 1s cubic-bezier(0.4, 0, 0.2, 1)'
                }}></div>
              </div>

              {/* Breakdown list */}
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '8px',
                background: 'rgba(255, 255, 255, 0.02)',
                padding: '14px',
                borderRadius: '12px',
                border: '1px solid var(--border-subtle)'
              }}>
                <div style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '4px' }}>Compile Quality Checklist:</div>
                {scoreBreakdown.map((item, idx) => (
                  <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px' }}>
                    <span style={{
                      color: item.status === 'Active' || item.status === 'Excellent' || item.status === 'Good' ? '#00f2fe' : '#ff4b4b',
                      fontWeight: 'bold'
                    }}>
                      [✓]
                    </span>
                    <span style={{ color: 'var(--text-secondary)' }}>
                      <strong>{item.criteria}:</strong> {item.description}
                    </span>
                  </div>
                ))}
              </div>

              {/* Prompt textarea (Editable!) */}
              <div className="form-group">
                <textarea
                  className="form-textarea"
                  value={compiledPrompt}
                  onChange={(e) => setCompiledPrompt(e.target.value)}
                  style={{
                    fontFamily: 'monospace',
                    fontSize: '13px',
                    minHeight: '260px',
                    background: 'rgba(0, 0, 0, 0.3)',
                    color: '#d1d5e6',
                    border: '1px solid var(--border-subtle)',
                    padding: '16px',
                    lineHeight: 1.5
                  }}
                />
              </div>

              {/* Actions row */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '12px'
              }}>
                <button 
                  onClick={handleCopy}
                  className="btn btn-primary"
                  style={{ padding: '12px' }}
                >
                  <Clipboard size={16} />
                  {copyText}
                </button>
                <button 
                  onClick={handleDownload}
                  className="btn btn-secondary"
                  style={{ padding: '12px' }}
                >
                  <Download size={16} />
                  Download TXT
                </button>
              </div>

              {/* Save Prompt segment */}
              <div style={{
                borderTop: '1px solid var(--border-subtle)',
                paddingTop: '20px',
                marginTop: '8px'
              }}>
                {user ? (
                  saveSuccess ? (
                    <div style={{
                      background: 'rgba(0, 242, 254, 0.05)',
                      border: '1px solid var(--accent-cyan)',
                      color: 'var(--accent-cyan)',
                      padding: '12px',
                      borderRadius: '10px',
                      fontSize: '14px',
                      textAlign: 'center',
                      fontWeight: 500
                    }}>
                      Prompt successfully saved to your history!
                    </div>
                  ) : (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                      <label className="form-label" style={{ fontSize: '13px' }}>Give this prompt a title to save it:</label>
                      <div style={{ display: 'flex', gap: '10px' }}>
                        <input 
                          type="text" 
                          className="form-input" 
                          placeholder="e.g., Photosynthesis homework help"
                          value={saveTitle}
                          onChange={(e) => setSaveTitle(e.target.value)}
                          style={{ flex: 1, padding: '10px' }}
                        />
                        <button 
                          onClick={handleSave}
                          className="btn btn-secondary"
                          disabled={saving}
                          style={{ padding: '10px 16px' }}
                        >
                          <Bookmark size={15} />
                          {saving ? 'Saving...' : 'Save'}
                        </button>
                      </div>
                    </div>
                  )
                ) : (
                  <div style={{
                    background: 'rgba(255, 255, 255, 0.03)',
                    border: '1px solid var(--border-subtle)',
                    padding: '16px',
                    borderRadius: '12px',
                    textAlign: 'center',
                    fontSize: '13px'
                  }}>
                    <span style={{ color: 'var(--text-secondary)' }}>Want to save this prompt and track history? </span>
                    <a href="/login" style={{ color: 'var(--accent-cyan)', textDecoration: 'none', fontWeight: 600 }}>Create a guest profile or login</a>.
                  </div>
                )}
              </div>

            </div>
          )}

        </div>
      )}

    </div>
  );
}
