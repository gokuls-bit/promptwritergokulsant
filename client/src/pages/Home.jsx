import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Container from '../components/Container';
import Button from '../components/Button';
import Card from '../components/Card';
import Badge from '../components/Badge';
import SectionHeading from '../components/SectionHeading';
import CategoryCard from '../components/CategoryCard';
import { 
  Sparkles, BookOpen, Presentation, Code, HelpCircle, 
  ArrowRight, ShieldCheck, Award, GraduationCap, 
  Lightbulb, Play, Smartphone, Laptop, CheckCircle
} from 'lucide-react';

export default function Home({ onSelectCategory }) {
  const navigate = useNavigate();
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeTab, setActiveTab] = useState('before'); // 'before' or 'after'

  const handleBuildPromptClick = () => {
    navigate('/create');
  };

  const handleCategoryClick = (categoryId) => {
    if (onSelectCategory) {
      onSelectCategory(categoryId);
    }
    navigate('/create');
  };

  const handleScrollToHow = (e) => {
    e.preventDefault();
    const element = document.getElementById('how-it-works');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const categories = [
    { id: 'homework-tutor', title: 'Homework Helper', desc: 'Get step-by-step guidance on tough school questions.', icon: <BookOpen size={20} /> },
    { id: 'explain-simply', title: 'Explain Simply', desc: 'Break down complex ideas using fun, understandable analogies.', icon: <Lightbulb size={20} /> },
    { id: 'presentation', title: 'Presentation Builder', desc: 'Design slide counts, titles, speaking scripts, and visual ideas.', icon: <Presentation size={20} /> },
    { id: 'quiz', title: 'Quiz Generator', desc: 'Build study quizzes with answer keys and logic check questions.', icon: <HelpCircle size={20} /> },
    { id: 'trading-card', title: 'Trading Card Builder', desc: 'Create stats and ability descriptions for card ideas.', icon: <ShieldCheck size={20} /> },
    { id: 'custom', title: 'Custom Builder', desc: 'Wrap your own instructions in safety and quality rules.', icon: <Code size={20} /> },
  ];

  return (
    <div className="animate-fade-in" style={{ overflow: 'hidden' }}>
      
      {/* 1. HERO SECTION */}
      <section style={{ 
        position: 'relative', 
        padding: '80px 0 60px',
        background: 'radial-gradient(circle at 50% 10%, rgba(142, 45, 226, 0.15) 0%, transparent 60%)'
      }}>
        <Container>
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            gap: '24px'
          }}>
            <Badge variant="cyan" icon={<Sparkles size={12} />}>
              100% Rule-Based & Safe for School
            </Badge>
            
            <h1 style={{
              fontSize: 'min(56px, 10vw)',
              fontWeight: 800,
              lineHeight: 1.1,
              maxWidth: '800px',
              letterSpacing: '-0.03em',
              margin: '0 auto'
            }}>
              Turn Small Ideas Into <span className="text-gradient">Powerful Prompts</span>
            </h1>
            
            <p style={{
              fontSize: 'min(19px, 5vw)',
              fontWeight: 300,
              color: 'var(--text-secondary)',
              maxWidth: '650px',
              lineHeight: 1.6,
              margin: '0 auto'
            }}>
              Type what you need in simple words. PromptWriter adds the structure, detail, formatting, and guidance needed to create a much stronger AI-ready prompt.
            </p>

            <div style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '16px',
              justifyContent: 'center',
              marginTop: '12px'
            }}>
              <Button 
                onClick={handleBuildPromptClick}
                size="lg" 
                icon={<Sparkles size={18} />}
              >
                Build My Prompt
              </Button>
              <Button 
                onClick={handleScrollToHow}
                variant="secondary" 
                size="lg"
              >
                See How It Works
              </Button>
            </div>
          </div>
        </Container>
      </section>

      {/* 2. INTERACTIVE BEFORE/AFTER PLAYGROUND */}
      <section style={{ padding: '60px 0', borderBottom: '1px solid var(--border-subtle)' }}>
        <Container>
          <SectionHeading 
            title="Watch the Compiler in Action"
            subtitle="AI tools work much better when prompts are clear, structured, and safe. See the difference PromptWriter makes."
          />
          
          <div style={{
            maxWidth: '900px',
            margin: '0 auto'
          }}>
            {/* Interactive Tab Switcher */}
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              marginBottom: '20px',
              gap: '10px'
            }}>
              <button 
                onClick={() => setActiveTab('before')}
                className={`btn ${activeTab === 'before' ? 'btn-primary' : 'btn-secondary'}`}
                style={{ padding: '8px 20px', borderRadius: '20px', fontSize: '14px' }}
              >
                Student's Simple Idea
              </button>
              <div style={{ display: 'flex', alignItems: 'center', color: 'var(--text-secondary)' }}>
                <ArrowRight size={18} />
              </div>
              <button 
                onClick={() => setActiveTab('after')}
                className={`btn ${activeTab === 'after' ? 'btn-primary' : 'btn-secondary'}`}
                style={{ 
                  padding: '8px 20px', 
                  borderRadius: '20px', 
                  fontSize: '14px',
                  boxShadow: activeTab === 'after' ? '0 0 15px var(--accent-cyan)' : 'none',
                  borderColor: activeTab === 'after' ? 'var(--accent-cyan)' : 'var(--border-subtle)'
                }}
              >
                PromptWriter Compiled Output
              </button>
            </div>

            <Card glow={activeTab === 'after'} padding="0px" style={{ overflow: 'hidden' }}>
              {activeTab === 'before' ? (
                <div className="animate-fade-in" style={{ padding: '32px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
                    <div style={{
                      width: '28px',
                      height: '28px',
                      borderRadius: '50%',
                      background: 'rgba(255,255,255,0.06)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '12px'
                    }}>👦</div>
                    <strong style={{ fontSize: '14px', color: 'var(--text-primary)' }}>14-year-old student types:</strong>
                  </div>
                  <div style={{
                    background: 'rgba(0, 0, 0, 0.2)',
                    padding: '20px',
                    borderRadius: '12px',
                    border: '1px dashed rgba(255,255,255,0.1)',
                    fontSize: '18px',
                    color: 'var(--accent-cyan)',
                    fontWeight: 500,
                    fontFamily: 'monospace'
                  }}>
                    "Class 10 maths project on home budget, 12 slides"
                  </div>
                  <p style={{ marginTop: '16px', fontSize: '13px', color: 'var(--text-secondary)' }}>
                    💡 Problem: This request is too simple. A generic AI will generate random slides without speaking notes, clear grade levels, math structures, or references.
                  </p>
                </div>
              ) : (
                <div className="animate-fade-in" style={{ padding: '32px' }}>
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '16px'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <Sparkles size={18} className="text-gradient" />
                      <strong style={{ fontSize: '14px', color: 'var(--text-primary)' }}>Compiled Prompt ready for AI:</strong>
                    </div>
                    <Badge variant="cyan">Quality: 100/100</Badge>
                  </div>
                  <pre style={{
                    background: 'rgba(0, 0, 0, 0.25)',
                    border: '1px solid var(--border-subtle)',
                    borderRadius: '8px',
                    padding: '16px',
                    fontSize: '13px',
                    color: '#d4d8e6',
                    whiteSpace: 'pre-wrap',
                    maxHeight: '300px',
                    overflowY: 'auto',
                    fontFamily: 'monospace',
                    textAlign: 'left'
                  }}>
{`==================================================
ROLE & CORE TASK:
==================================================
You are a public speaking and presentation expert. Help the student plan a slide presentation.

TOPIC:
Home Budget

SPECS:
- Slide Count: 12 Slides
- Project Type: Business & Finance

INSTRUCTIONS:
1. Generate exactly 12 slides in sequence.
2. Format each slide strictly as:
   ---
   ## Slide [Number]: [Specific Title]
   - **Core Point:** [One main sentence]
   - **Supporting Detail:** [Two bulleted details]
   - **Interesting Takeaway:** [One fascinating fact or quote]
   
   **Visual Idea:** [Describe a picture, diagram, map, or chart that would look great on this slide]
   **Speaking Notes:** [2 sentences of script for what the student should say out loud]
   ---

==================================================
PEDAGOGICAL & LEARNING CONTEXT:
==================================================
- Act as an encouraging educational mentor.
- Clearly state that this response is an educational assistance aid.

==================================================
STUDENT LEVEL & SUBJECT RULES:
==================================================
- Explain concepts using vocabulary suitable for a 14-to-15-year-old student (approx. 9th to 10th grade).
- SUBJECT-SPECIFIC RULES (MATHEMATICS): Show all calculations clearly, ensure budget arithmetic adds up.

==================================================
STRICT SAFETY GUARDRAILS:
==================================================
- No sexual content, nudity, gore, or illegal advice. Child safety limits are active.`}
                  </pre>
                  <p style={{ marginTop: '16px', fontSize: '13px', color: 'var(--text-secondary)' }}>
                    ✅ Solution: PromptWriter automatically injected role definitions, grade level vocabulary, slide structures, mathematical accuracy guidelines, and safety checks!
                  </p>
                </div>
              )}
            </Card>
          </div>
        </Container>
      </section>

      {/* 3. CATEGORY PREVIEW CARDS */}
      <section style={{ padding: '80px 0', background: 'rgba(255, 255, 255, 0.01)' }}>
        <Container>
          <SectionHeading 
            title="Explore 22 Smart Categories"
            subtitle="From step-by-step tutors to image builders and coding cards, click on a category to begin."
            badge="Categories"
          />
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: '20px',
            marginBottom: '40px'
          }}>
            {categories.map((c) => (
              <CategoryCard 
                key={c.id}
                title={c.title}
                description={c.desc}
                icon={c.icon}
                onClick={() => handleCategoryClick(c.id)}
              />
            ))}
          </div>

          <div style={{ textAlign: 'center' }}>
            <Button onClick={handleBuildPromptClick} icon={<ArrowRight size={16} />}>
              View All Categories
            </Button>
          </div>
        </Container>
      </section>

      {/* 4. FEATURES SECTION */}
      <section style={{ padding: '80px 0', borderTop: '1px solid var(--border-subtle)' }}>
        <Container>
          <SectionHeading 
            title="Engineered for High-Quality Learning"
            subtitle="We compile school-appropriate prompts so you can get the best educational responses out of AI."
            badge="Features"
          />

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '24px'
          }}>
            <Card interactive style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ color: 'var(--accent-cyan)' }}><GraduationCap size={32} /></div>
              <h3 style={{ fontSize: '18px' }}>Age Adaptation</h3>
              <p style={{ fontSize: '14px', lineHeight: 1.5 }}>
                Adapts vocabulary and structure specifically to the user's school level (ages 8 to 15) so responses are neither too simple nor too hard.
              </p>
            </Card>

            <Card interactive style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ color: 'var(--accent-primary)' }}><ShieldCheck size={32} /></div>
              <h3 style={{ fontSize: '18px' }}>Layered Safety</h3>
              <p style={{ fontSize: '14px', lineHeight: 1.5 }}>
                Sanitizes inputs and appends strict content filters prohibiting nudity, violence, hate speech, and lock-picking instructions.
              </p>
            </Card>

            <Card interactive style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ color: 'var(--accent-pink)' }}><Award size={32} /></div>
              <h3 style={{ fontSize: '18px' }}>Pedagogical Guardrails</h3>
              <p style={{ fontSize: '14px', lineHeight: 1.5 }}>
                Tells the AI to act as a supportive mentor that teaches concepts step-by-step instead of just giving away direct cheat sheets.
              </p>
            </Card>
          </div>
        </Container>
      </section>

      {/* 5. HOW IT WORKS SECTION */}
      <section id="how-it-works" style={{ 
        padding: '80px 0', 
        background: 'linear-gradient(180deg, transparent, rgba(142, 45, 226, 0.03))',
        borderTop: '1px solid var(--border-subtle)'
      }}>
        <Container>
          <SectionHeading 
            title="How It Works"
            subtitle="Generate detailed prompts in seconds. No complicated engineering required."
            badge="Process"
          />

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '32px',
            position: 'relative'
          }}>
            {[
              { num: '1', title: 'Choose Category', desc: 'Pick what you want to create (like a PowerPoint or homework explainer).' },
              { num: '2', title: 'Fill in Blanks', desc: 'Enter 3 to 6 simple school topics. The form stays small and easy.' },
              { num: '3', title: 'Compile Prompt', desc: 'Our engine sanitizes text, applies rules, and generates a structured prompt.' },
              { num: '4', title: 'Use in AI Tool', desc: 'Copy, download, or save your prompt to paste into external tools like Gemini or ChatGPT.' }
            ].map((step, idx) => (
              <div key={idx} style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
                <div style={{
                  width: '50px',
                  height: '50px',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, var(--accent-cyan) 0%, var(--accent-primary) 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  fontWeight: 'bold',
                  fontSize: '20px',
                  boxShadow: '0 4px 10px rgba(0, 242, 254, 0.3)'
                }}>
                  {step.num}
                </div>
                <h3 style={{ fontSize: '18px', marginTop: '8px' }}>{step.stepTitle || step.title}</h3>
                <p style={{ fontSize: '13px', lineHeight: 1.5, color: 'var(--text-secondary)' }}>{step.desc}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* 6. SAFETY AND LEARNING SECTION */}
      <section style={{ padding: '80px 0', borderTop: '1px solid var(--border-subtle)' }}>
        <Container>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '40px',
            alignItems: 'center'
          }}>
            <div>
              <Badge variant="cyan" style={{ marginBottom: '16px' }}>Academic Integrity</Badge>
              <h2 style={{ fontSize: '32px', fontWeight: 800, marginBottom: '20px', lineHeight: 1.2 }}>
                Learning First,<br />Copying Second
              </h2>
              <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '20px' }}>
                We believe AI should be a learning buddy, not a cheating tool. PromptWriter templates instruct the AI to scaffold explanations, define tough terms, check student understanding, and provide outlines rather than complete copy-paste essays.
              </p>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {[
                  'Guided learning step-by-step instructions',
                  'Original thesis & structure templates',
                  'Child safety keyword blocklists',
                  'No unnecessary personal data requested'
                ].map((item, idx) => (
                  <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px' }}>
                    <CheckCircle size={16} style={{ color: 'var(--accent-cyan)' }} />
                    <span style={{ color: 'var(--text-primary)' }}>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <Card glow style={{ padding: '32px' }}>
              <h3 style={{ fontSize: '20px', marginBottom: '16px', color: 'var(--accent-cyan)' }}>Our Core Security Layers</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {[
                  { title: 'Layer 1: Input Validation', desc: 'Checks and prevents malicious scripts from entering the form fields.' },
                  { title: 'Layer 2: Blocked Terms', desc: 'Instantly intercepts inappropriate words and blocks compilation.' },
                  { title: 'Layer 3: Role Injection', desc: 'Forces the AI to assume an encouraging teacher persona.' },
                  { title: 'Layer 4: Safety Safeguards', desc: 'Locks in G-rated, non-violent, age-appropriate content parameters.' }
                ].map((layer, idx) => (
                  <div key={idx} style={{ borderBottom: idx < 3 ? '1px solid var(--border-subtle)' : 'none', paddingBottom: idx < 3 ? '12px' : '0' }}>
                    <h4 style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-primary)' }}>{layer.title}</h4>
                    <p style={{ fontSize: '12px', color: 'var(--text-secondary)', marginTop: '4px' }}>{layer.desc}</p>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </Container>
      </section>

      {/* 7. CTA SECTION */}
      <section style={{ 
        padding: '80px 0', 
        background: 'radial-gradient(circle at 50% 100%, rgba(0, 242, 254, 0.1) 0%, transparent 60%)',
        borderTop: '1px solid var(--border-subtle)'
      }}>
        <Container>
          <Card glow style={{
            padding: '48px 32px',
            textAlign: 'center',
            background: 'linear-gradient(135deg, rgba(20, 22, 43, 0.8) 0%, rgba(13, 14, 26, 0.8) 100%)',
            borderRadius: '24px',
            maxWidth: '900px',
            margin: '0 auto'
          }}>
            <h2 style={{ fontSize: '32px', marginBottom: '12px', fontWeight: 800 }}>Ready to Build Safe, Structured Prompts?</h2>
            <p style={{ color: 'var(--text-secondary)', maxWidth: '500px', margin: '0 auto 28px', lineHeight: 1.5 }}>
              Create an account to save your generated prompts, search your history, or compile as a guest.
            </p>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', flexWrap: 'wrap' }}>
              <Button onClick={handleBuildPromptClick} size="lg" icon={<Sparkles size={18} />}>
                Build My Prompt
              </Button>
              <Button to="/register" variant="secondary" size="lg">
                Sign Up Now
              </Button>
            </div>
          </Card>
        </Container>
      </section>

    </div>
  );
}
