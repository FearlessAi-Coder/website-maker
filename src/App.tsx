import React, { useState, useRef, useEffect } from 'react';
import './App.css';

interface Block {
  id: string;
  type: 'hero' | 'features' | 'pricing' | 'testimonial' | 'cta' | 'gallery' | 'team' | 'faq';
  content: Record<string, any>;
}

interface Theme {
  primaryColor: string;
  secondaryColor: string;
  backgroundColor: string;
  textColor: string;
  accentColor: string;
  fontFamily: string;
}

const defaultTheme: Theme = {
  primaryColor: '#6366f1',
  secondaryColor: '#8b5cf6',
  backgroundColor: '#ffffff',
  textColor: '#1f2937',
  accentColor: '#ec4899',
  fontFamily: 'Inter, sans-serif',
};

const blockDefaults = {
  hero: {
    title: 'Welcome to Your Website',
    subtitle: 'Build something amazing today',
    buttonText: 'Get Started',
    backgroundImage: '',
    height: 'large',
  },
  features: {
    title: 'Our Features',
    description: 'Everything you need',
    items: [
      { icon: '⚡', title: 'Fast', description: 'Lightning quick performance' },
      { icon: '🔒', title: 'Secure', description: 'Enterprise-grade security' },
      { icon: '📱', title: 'Responsive', description: 'Works on all devices' },
    ],
  },
  pricing: {
    title: 'Simple Pricing',
    description: 'Choose the perfect plan',
    plans: [
      { name: 'Starter', price: '$29', features: ['Feature 1', 'Feature 2', 'Feature 3'] },
      { name: 'Pro', price: '$79', features: ['All Starter features', 'Feature 4', 'Feature 5'] },
      { name: 'Enterprise', price: 'Custom', features: ['Everything', 'Priority support', 'Custom features'] },
    ],
  },
  testimonial: {
    quote: 'This product changed our business completely!',
    author: 'John Doe',
    position: 'CEO, Company Inc',
    image: '',
  },
  cta: {
    title: 'Ready to get started?',
    description: 'Join thousands of satisfied customers',
    buttonText: 'Start Free Trial',
  },
  gallery: {
    title: 'Our Work',
    images: [
      { url: 'https://images.unsplash.com/photo-1579353977991-54640212af0d?w=500&h=500&fit=crop', alt: 'Gallery 1' },
      { url: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=500&h=500&fit=crop', alt: 'Gallery 2' },
      { url: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=500&h=500&fit=crop', alt: 'Gallery 3' },
    ],
  },
  team: {
    title: 'Meet Our Team',
    members: [
      { name: 'Alice Johnson', role: 'Founder & CEO', image: 'https://i.pravatar.cc/150?img=1' },
      { name: 'Bob Smith', role: 'CTO', image: 'https://i.pravatar.cc/150?img=2' },
      { name: 'Carol White', role: 'Head of Design', image: 'https://i.pravatar.cc/150?img=3' },
    ],
  },
  faq: {
    title: 'Frequently Asked Questions',
    questions: [
      { q: 'How do I get started?', a: 'Simply sign up and start building!' },
      { q: 'Is there a free trial?', a: 'Yes, 14 days free, no credit card required.' },
      { q: 'Can I cancel anytime?', a: 'Absolutely, cancel anytime with no questions asked.' },
    ],
  },
};

function App() {
  const [blocks, setBlocks] = useState<Block[]>([
    {
      id: '1',
      type: 'hero',
      content: blockDefaults.hero,
    },
    {
      id: '2',
      type: 'features',
      content: blockDefaults.features,
    },
    {
      id: '3',
      type: 'pricing',
      content: blockDefaults.pricing,
    },
  ]);

  const [theme, setTheme] = useState<Theme>(defaultTheme);
  const [selectedBlockId, setSelectedBlockId] = useState<string | null>('1');
  const [showPreview, setShowPreview] = useState(false);
  const previewRef = useRef<HTMLDivElement>(null);

  const selectedBlock = blocks.find(b => b.id === selectedBlockId);

  const addBlock = (type: Block['type']) => {
    const newBlock: Block = {
      id: Date.now().toString(),
      type,
      content: blockDefaults[type],
    };
    setBlocks([...blocks, newBlock]);
    setSelectedBlockId(newBlock.id);
  };

  const deleteBlock = (id: string) => {
    setBlocks(blocks.filter(b => b.id !== id));
    if (selectedBlockId === id) {
      setSelectedBlockId(blocks[0]?.id || null);
    }
  };

  const updateBlockContent = (id: string, newContent: any) => {
    setBlocks(blocks.map(b => b.id === id ? { ...b, content: newContent } : b));
  };

  const moveBlock = (id: string, direction: 'up' | 'down') => {
    const index = blocks.findIndex(b => b.id === id);
    if ((direction === 'up' && index > 0) || (direction === 'down' && index < blocks.length - 1)) {
      const newBlocks = [...blocks];
      const swapIndex = direction === 'up' ? index - 1 : index + 1;
      [newBlocks[index], newBlocks[swapIndex]] = [newBlocks[swapIndex], newBlocks[index]];
      setBlocks(newBlocks);
    }
  };

  const exportHTML = () => {
    const html = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>My Website</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        body {
            font-family: ${theme.fontFamily};
            color: ${theme.textColor};
            background-color: ${theme.backgroundColor};
        }
        .container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 0 20px;
        }
        .hero {
            background: linear-gradient(135deg, ${theme.primaryColor} 0%, ${theme.secondaryColor} 100%);
            color: white;
            padding: 100px 20px;
            text-align: center;
        }
        .hero h1 {
            font-size: 3rem;
            margin-bottom: 20px;
        }
        .hero p {
            font-size: 1.2rem;
            margin-bottom: 30px;
        }
        .btn {
            display: inline-block;
            padding: 12px 30px;
            background-color: ${theme.accentColor};
            color: white;
            text-decoration: none;
            border-radius: 5px;
            font-weight: bold;
            cursor: pointer;
            border: none;
            transition: transform 0.2s;
        }
        .btn:hover {
            transform: scale(1.05);
        }
        .features {
            padding: 80px 20px;
            background-color: #f9fafb;
        }
        .features h2 {
            text-align: center;
            font-size: 2.5rem;
            margin-bottom: 50px;
        }
        .features-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 30px;
        }
        .feature-card {
            background: white;
            padding: 30px;
            border-radius: 10px;
            text-align: center;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }
        .feature-card .icon {
            font-size: 3rem;
            margin-bottom: 15px;
        }
        .feature-card h3 {
            margin-bottom: 10px;
            color: ${theme.primaryColor};
        }
        .pricing {
            padding: 80px 20px;
        }
        .pricing h2 {
            text-align: center;
            font-size: 2.5rem;
            margin-bottom: 50px;
        }
        .pricing-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
            gap: 30px;
        }
        .pricing-card {
            border: 2px solid #e5e7eb;
            border-radius: 10px;
            padding: 30px;
            text-align: center;
            transition: transform 0.2s;
        }
        .pricing-card:hover {
            transform: translateY(-10px);
            border-color: ${theme.primaryColor};
        }
        .pricing-card .price {
            font-size: 2.5rem;
            color: ${theme.primaryColor};
            margin: 20px 0;
            font-weight: bold;
        }
        .pricing-card ul {
            list-style: none;
            margin: 20px 0;
            text-align: left;
        }
        .pricing-card li {
            padding: 10px 0;
            border-bottom: 1px solid #e5e7eb;
        }
        .cta {
            background: linear-gradient(135deg, ${theme.accentColor} 0%, ${theme.primaryColor} 100%);
            color: white;
            padding: 60px 20px;
            text-align: center;
        }
        .cta h2 {
            font-size: 2rem;
            margin-bottom: 20px;
        }
        .cta p {
            font-size: 1.1rem;
            margin-bottom: 30px;
        }
        .testimonial {
            background-color: #f9fafb;
            padding: 60px 20px;
            text-align: center;
        }
        .testimonial-content {
            max-width: 600px;
            margin: 0 auto;
        }
        .testimonial blockquote {
            font-size: 1.3rem;
            font-style: italic;
            margin-bottom: 20px;
        }
        .gallery {
            padding: 80px 20px;
        }
        .gallery h2 {
            text-align: center;
            font-size: 2.5rem;
            margin-bottom: 50px;
        }
        .gallery-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 20px;
        }
        .gallery-item img {
            width: 100%;
            height: 300px;
            object-fit: cover;
            border-radius: 10px;
        }
        .team {
            background-color: #f9fafb;
            padding: 80px 20px;
        }
        .team h2 {
            text-align: center;
            font-size: 2.5rem;
            margin-bottom: 50px;
        }
        .team-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 30px;
        }
        .team-member {
            text-align: center;
        }
        .team-member img {
            width: 150px;
            height: 150px;
            border-radius: 50%;
            margin-bottom: 15px;
        }
        .faq {
            padding: 80px 20px;
        }
        .faq h2 {
            text-align: center;
            font-size: 2.5rem;
            margin-bottom: 50px;
        }
        .faq-container {
            max-width: 700px;
            margin: 0 auto;
        }
        .faq-item {
            margin-bottom: 20px;
            border: 1px solid #e5e7eb;
            border-radius: 5px;
            overflow: hidden;
        }
        .faq-question {
            background-color: #f9fafb;
            padding: 15px;
            cursor: pointer;
            font-weight: bold;
            color: ${theme.primaryColor};
        }
        .faq-answer {
            padding: 15px;
            display: none;
        }
        .faq-answer.active {
            display: block;
        }
        footer {
            background-color: #1f2937;
            color: white;
            text-align: center;
            padding: 30px;
            margin-top: 50px;
        }
    </style>
</head>
<body>
${blocks.map(block => {
  switch (block.type) {
    case 'hero':
      return `
        <div class="hero">
            <div class="container">
                <h1>${block.content.title}</h1>
                <p>${block.content.subtitle}</p>
                <button class="btn">${block.content.buttonText}</button>
            </div>
        </div>
      `;
    case 'features':
      return `
        <div class="features">
            <div class="container">
                <h2>${block.content.title}</h2>
                <div class="features-grid">
                    ${block.content.items.map((item: any) => `
                        <div class="feature-card">
                            <div class="icon">${item.icon}</div>
                            <h3>${item.title}</h3>
                            <p>${item.description}</p>
                        </div>
                    `).join('')}
                </div>
            </div>
        </div>
      `;
    case 'pricing':
      return `
        <div class="pricing">
            <div class="container">
                <h2>${block.content.title}</h2>
                <div class="pricing-grid">
                    ${block.content.plans.map((plan: any) => `
                        <div class="pricing-card">
                            <h3>${plan.name}</h3>
                            <div class="price">${plan.price}</div>
                            <ul>
                                ${plan.features.map((f: string) => `<li>✓ ${f}</li>`).join('')}
                            </ul>
                            <button class="btn">Choose Plan</button>
                        </div>
                    `).join('')}
                </div>
            </div>
        </div>
      `;
    case 'cta':
      return `
        <div class="cta">
            <div class="container">
                <h2>${block.content.title}</h2>
                <p>${block.content.description}</p>
                <button class="btn">${block.content.buttonText}</button>
            </div>
        </div>
      `;
    case 'testimonial':
      return `
        <div class="testimonial">
            <div class="testimonial-content">
                <blockquote>${block.content.quote}</blockquote>
                <p><strong>${block.content.author}</strong></p>
                <p>${block.content.position}</p>
            </div>
        </div>
      `;
    case 'gallery':
      return `
        <div class="gallery">
            <div class="container">
                <h2>${block.content.title}</h2>
                <div class="gallery-grid">
                    ${block.content.images.map((img: any) => `
                        <div class="gallery-item">
                            <img src="${img.url}" alt="${img.alt}">
                        </div>
                    `).join('')}
                </div>
            </div>
        </div>
      `;
    case 'team':
      return `
        <div class="team">
            <div class="container">
                <h2>${block.content.title}</h2>
                <div class="team-grid">
                    ${block.content.members.map((member: any) => `
                        <div class="team-member">
                            <img src="${member.image}" alt="${member.name}">
                            <h3>${member.name}</h3>
                            <p>${member.role}</p>
                        </div>
                    `).join('')}
                </div>
            </div>
        </div>
      `;
    case 'faq':
      return `
        <div class="faq">
            <div class="container">
                <h2>${block.content.title}</h2>
                <div class="faq-container">
                    ${block.content.questions.map((item: any, i: number) => `
                        <div class="faq-item">
                            <div class="faq-question" onclick="this.nextElementSibling.classList.toggle('active')">Q: ${item.q}</div>
                            <div class="faq-answer">A: ${item.a}</div>
                        </div>
                    `).join('')}
                </div>
            </div>
        </div>
      `;
    default:
      return '';
  }
}).join('')}
<footer>
    <p>&copy; 2024 My Website. All rights reserved.</p>
</footer>
<script>
    document.querySelectorAll('.faq-question').forEach(q => {
        q.addEventListener('click', function() {
            this.nextElementSibling.classList.toggle('active');
        });
    });
</script>
</body>
</html>
    `;

    const blob = new Blob([html], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'website.html';
    link.click();
  };

  return (
    <div className="app-container">
      <div className="main-layout">
        {/* Sidebar */}
        <div className="sidebar">
          <div className="sidebar-header">
            <h1>🚀 WebBuilder</h1>
            <p>Create Amazing Websites</p>
          </div>

          <div className="sidebar-section">
            <h3>Add Block</h3>
            <div className="block-buttons">
              <button onClick={() => addBlock('hero')} className="block-btn">📍 Hero</button>
              <button onClick={() => addBlock('features')} className="block-btn">⭐ Features</button>
              <button onClick={() => addBlock('pricing')} className="block-btn">💰 Pricing</button>
              <button onClick={() => addBlock('testimonial')} className="block-btn">💬 Testimonial</button>
              <button onClick={() => addBlock('gallery')} className="block-btn">🖼️ Gallery</button>
              <button onClick={() => addBlock('team')} className="block-btn">👥 Team</button>
              <button onClick={() => addBlock('faq')} className="block-btn">❓ FAQ</button>
              <button onClick={() => addBlock('cta')} className="block-btn">🎯 CTA</button>
            </div>
          </div>

          <div className="sidebar-section">
            <h3>Theme</h3>
            <div className="theme-controls">
              <label>
                Primary Color:
                <input
                  type="color"
                  value={theme.primaryColor}
                  onChange={(e) => setTheme({ ...theme, primaryColor: e.target.value })}
                />
              </label>
              <label>
                Accent Color:
                <input
                  type="color"
                  value={theme.accentColor}
                  onChange={(e) => setTheme({ ...theme, accentColor: e.target.value })}
                />
              </label>
              <label>
                Background:
                <input
                  type="color"
                  value={theme.backgroundColor}
                  onChange={(e) => setTheme({ ...theme, backgroundColor: e.target.value })}
                />
              </label>
              <label>
                Text Color:
                <input
                  type="color"
                  value={theme.textColor}
                  onChange={(e) => setTheme({ ...theme, textColor: e.target.value })}
                />
              </label>
            </div>
          </div>
        </div>

        {/* Editor */}
        <div className="editor">
          <div className="editor-header">
            <h2>Page Editor</h2>
            <div className="editor-actions">
              <button onClick={() => setShowPreview(!showPreview)} className="btn-primary">
                {showPreview ? '👁️ Hide Preview' : '👁️ Preview'}
              </button>
              <button onClick={exportHTML} className="btn-success">📥 Export HTML</button>
            </div>
          </div>

          <div className="blocks-list">
            {blocks.map((block, index) => (
              <div
                key={block.id}
                className={`block-item ${selectedBlockId === block.id ? 'selected' : ''}`}
                onClick={() => setSelectedBlockId(block.id)}
              >
                <div className="block-item-header">
                  <span className="block-type">{block.type.toUpperCase()}</span>
                  <div className="block-actions">
                    {index > 0 && (
                      <button onClick={() => moveBlock(block.id, 'up')} title="Move up">⬆️</button>
                    )}
                    {index < blocks.length - 1 && (
                      <button onClick={() => moveBlock(block.id, 'down')} title="Move down">⬇️</button>
                    )}
                    <button onClick={() => deleteBlock(block.id)} title="Delete">🗑️</button>
                  </div>
                </div>
                <div className="block-preview">
                  {block.type === 'hero' && (
                    <div style={{ color: theme.textColor }}>
                      <h4>{block.content.title}</h4>
                      <p>{block.content.subtitle}</p>
                    </div>
                  )}
                  {block.type === 'features' && (
                    <div style={{ color: theme.textColor }}>
                      <h4>{block.content.title}</h4>
                      <p>{block.content.items.length} features</p>
                    </div>
                  )}
                  {block.type === 'pricing' && (
                    <div style={{ color: theme.textColor }}>
                      <h4>{block.content.title}</h4>
                      <p>{block.content.plans.length} plans</p>
                    </div>
                  )}
                  {block.type !== 'hero' && block.type !== 'features' && block.type !== 'pricing' && (
                    <div style={{ color: theme.textColor }}>
                      <p>{block.type}</p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Inspector */}
        <div className="inspector">
          <div className="inspector-header">
            <h3>Inspector</h3>
          </div>
          {selectedBlock && (
            <div className="inspector-content">
              {selectedBlock.type === 'hero' && (
                <>
                  <label>
                    Title:
                    <input
                      value={selectedBlock.content.title}
                      onChange={(e) => updateBlockContent(selectedBlock.id, { ...selectedBlock.content, title: e.target.value })}
                    />
                  </label>
                  <label>
                    Subtitle:
                    <input
                      value={selectedBlock.content.subtitle}
                      onChange={(e) => updateBlockContent(selectedBlock.id, { ...selectedBlock.content, subtitle: e.target.value })}
                    />
                  </label>
                  <label>
                    Button Text:
                    <input
                      value={selectedBlock.content.buttonText}
                      onChange={(e) => updateBlockContent(selectedBlock.id, { ...selectedBlock.content, buttonText: e.target.value })}
                    />
                  </label>
                </>
              )}
              {selectedBlock.type === 'features' && (
                <>
                  <label>
                    Title:
                    <input
                      value={selectedBlock.content.title}
                      onChange={(e) => updateBlockContent(selectedBlock.id, { ...selectedBlock.content, title: e.target.value })}
                    />
                  </label>
                  <p>Features: {selectedBlock.content.items.length} items</p>
                </>
              )}
              {selectedBlock.type === 'pricing' && (
                <>
                  <label>
                    Title:
                    <input
                      value={selectedBlock.content.title}
                      onChange={(e) => updateBlockContent(selectedBlock.id, { ...selectedBlock.content, title: e.target.value })}
                    />
                  </label>
                  <p>Plans: {selectedBlock.content.plans.length} items</p>
                </>
              )}
              {selectedBlock.type === 'cta' && (
                <>
                  <label>
                    Title:
                    <input
                      value={selectedBlock.content.title}
                      onChange={(e) => updateBlockContent(selectedBlock.id, { ...selectedBlock.content, title: e.target.value })}
                    />
                  </label>
                  <label>
                    Description:
                    <input
                      value={selectedBlock.content.description}
                      onChange={(e) => updateBlockContent(selectedBlock.id, { ...selectedBlock.content, description: e.target.value })}
                    />
                  </label>
                  <label>
                    Button Text:
                    <input
                      value={selectedBlock.content.buttonText}
                      onChange={(e) => updateBlockContent(selectedBlock.id, { ...selectedBlock.content, buttonText: e.target.value })}
                    />
                  </label>
                </>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Preview Modal */}
      {showPreview && (
        <div className="preview-modal">
          <div className="preview-container">
            <button className="close-preview" onClick={() => setShowPreview(false)}>✕</button>
            <div className="preview-content" ref={previewRef} style={{ backgroundColor: theme.backgroundColor, color: theme.textColor, fontFamily: theme.fontFamily }}>
              {blocks.map(block => (
                <BlockRenderer key={block.id} block={block} theme={theme} />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function BlockRenderer({ block, theme }: { block: Block; theme: Theme }) {
  switch (block.type) {
    case 'hero':
      return (
        <div style={{
          background: `linear-gradient(135deg, ${theme.primaryColor} 0%, ${theme.secondaryColor} 100%)`,
          color: 'white',
          padding: '100px 20px',
          textAlign: 'center',
        }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <h1 style={{ fontSize: '3rem', marginBottom: '20px' }}>{block.content.title}</h1>
            <p style={{ fontSize: '1.2rem', marginBottom: '30px' }}>{block.content.subtitle}</p>
            <button style={{
              padding: '12px 30px',
              backgroundColor: theme.accentColor,
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              fontSize: '1rem',
              fontWeight: 'bold',
              cursor: 'pointer',
            }}>{block.content.buttonText}</button>
          </div>
        </div>
      );
    case 'features':
      return (
        <div style={{ padding: '80px 20px', backgroundColor: '#f9fafb' }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <h2 style={{ textAlign: 'center', fontSize: '2.5rem', marginBottom: '50px', color: theme.textColor }}>{block.content.title}</h2>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '30px',
            }}>
              {block.content.items.map((item: any, i: number) => (
                <div key={i} style={{
                  background: 'white',
                  padding: '30px',
                  borderRadius: '10px',
                  textAlign: 'center',
                  boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
                }}>
                  <div style={{ fontSize: '3rem', marginBottom: '15px' }}>{item.icon}</div>
                  <h3 style={{ marginBottom: '10px', color: theme.primaryColor }}>{item.title}</h3>
                  <p style={{ color: theme.textColor }}>{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      );
    case 'pricing':
      return (
        <div style={{ padding: '80px 20px' }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <h2 style={{ textAlign: 'center', fontSize: '2.5rem', marginBottom: '50px', color: theme.textColor }}>{block.content.title}</h2>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '30px',
            }}>
              {block.content.plans.map((plan: any, i: number) => (
                <div key={i} style={{
                  border: `2px solid #e5e7eb`,
                  borderRadius: '10px',
                  padding: '30px',
                  textAlign: 'center',
                }}>
                  <h3 style={{ color: theme.textColor }}>{plan.name}</h3>
                  <div style={{ fontSize: '2.5rem', color: theme.primaryColor, margin: '20px 0', fontWeight: 'bold' }}>{plan.price}</div>
                  <ul style={{ listStyle: 'none', margin: '20px 0', textAlign: 'left' }}>
                    {plan.features.map((f: string, fi: number) => (
                      <li key={fi} style={{ padding: '10px 0', borderBottom: '1px solid #e5e7eb' }}>✓ {f}</li>
                    ))}
                  </ul>
                  <button style={{
                    padding: '12px 30px',
                    backgroundColor: theme.primaryColor,
                    color: 'white',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: 'pointer',
                  }}>Choose</button>
                </div>
              ))}
            </div>
          </div>
        </div>
      );
    case 'testimonial':
      return (
        <div style={{ backgroundColor: '#f9fafb', padding: '60px 20px', textAlign: 'center' }}>
          <div style={{ maxWidth: '600px', margin: '0 auto' }}>
            <blockquote style={{ fontSize: '1.3rem', fontStyle: 'italic', marginBottom: '20px', color: theme.textColor }}>
              "{block.content.quote}"
            </blockquote>
            <p style={{ color: theme.textColor }}><strong>{block.content.author}</strong></p>
            <p style={{ color: theme.textColor }}>{block.content.position}</p>
          </div>
        </div>
      );
    case 'gallery':
      return (
        <div style={{ padding: '80px 20px' }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <h2 style={{ textAlign: 'center', fontSize: '2.5rem', marginBottom: '50px', color: theme.textColor }}>{block.content.title}</h2>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '20px',
            }}>
              {block.content.images.map((img: any, i: number) => (
                <div key={i}>
                  <img src={img.url} alt={img.alt} style={{ width: '100%', height: '300px', objectFit: 'cover', borderRadius: '10px' }} />
                </div>
              ))}
            </div>
          </div>
        </div>
      );
    case 'team':
      return (
        <div style={{ backgroundColor: '#f9fafb', padding: '80px 20px' }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <h2 style={{ textAlign: 'center', fontSize: '2.5rem', marginBottom: '50px', color: theme.textColor }}>{block.content.title}</h2>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
              gap: '30px',
            }}>
              {block.content.members.map((member: any, i: number) => (
                <div key={i} style={{ textAlign: 'center' }}>
                  <img src={member.image} alt={member.name} style={{ width: '150px', height: '150px', borderRadius: '50%', marginBottom: '15px' }} />
                  <h3 style={{ color: theme.textColor }}>{member.name}</h3>
                  <p style={{ color: theme.textColor }}>{member.role}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      );
    case 'faq':
      const [openIndex, setOpenIndex] = React.useState<number | null>(null);
      return (
        <div style={{ padding: '80px 20px' }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <h2 style={{ textAlign: 'center', fontSize: '2.5rem', marginBottom: '50px', color: theme.textColor }}>{block.content.title}</h2>
            <div style={{ maxWidth: '700px', margin: '0 auto' }}>
              {block.content.questions.map((item: any, i: number) => (
                <div key={i} style={{ marginBottom: '20px', border: '1px solid #e5e7eb', borderRadius: '5px', overflow: 'hidden' }}>
                  <div
                    onClick={() => setOpenIndex(openIndex === i ? null : i)}
                    style={{
                      backgroundColor: '#f9fafb',
                      padding: '15px',
                      cursor: 'pointer',
                      fontWeight: 'bold',
                      color: theme.primaryColor,
                    }}
                  >
                    Q: {item.q}
                  </div>
                  {openIndex === i && (
                    <div style={{ padding: '15px', color: theme.textColor }}>
                      A: {item.a}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      );
    case 'cta':
      return (
        <div style={{
          background: `linear-gradient(135deg, ${theme.accentColor} 0%, ${theme.primaryColor} 100%)`,
          color: 'white',
          padding: '60px 20px',
          textAlign: 'center',
        }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <h2 style={{ fontSize: '2rem', marginBottom: '20px' }}>{block.content.title}</h2>
            <p style={{ fontSize: '1.1rem', marginBottom: '30px' }}>{block.content.description}</p>
            <button style={{
              padding: '12px 30px',
              backgroundColor: 'white',
              color: theme.primaryColor,
              border: 'none',
              borderRadius: '5px',
              fontSize: '1rem',
              fontWeight: 'bold',
              cursor: 'pointer',
            }}>{block.content.buttonText}</button>
          </div>
        </div>
      );
    default:
      return null;
  }
}

export default App;
