import { useMemo, useState } from 'react';

type SectionType = 'hero' | 'features' | 'metrics' | 'showcase' | 'pricing' | 'testimonial' | 'cta';

type SectionItem = {
  id: string;
  type: SectionType;
  eyebrow: string;
  title: string;
  subtitle: string;
  ctaText: string;
  accent: string;
  body: string[];
};

type Theme = {
  primary: string;
  background: string;
  panel: string;
  ink: string;
  muted: string;
};

const blockLibrary: Record<
  SectionType,
  {
    label: string;
    eyebrow: string;
    defaultTitle: string;
    subtitle: string;
    ctaText: string;
    accent: string;
    body: string[];
  }
> = {
  hero: {
    label: 'Hero',
    eyebrow: 'Launch faster',
    defaultTitle: 'Build a site that feels premium from day one.',
    subtitle:
      'Turn ideas into polished, conversion-ready pages with lightning-fast layouts and a premium visual system.',
    ctaText: 'Start free',
    accent: '#6d5ef6',
    body: ['Responsive', 'Fast launch', 'Ready to convert'],
  },
  features: {
    label: 'Features',
    eyebrow: 'Why teams love it',
    defaultTitle: 'Everything your site needs to win attention.',
    subtitle:
      'Create crisp, elegant experiences with flexible sections, reusable blocks, and polished CMS-ready layouts.',
    ctaText: 'Explore more',
    accent: '#00c2a8',
    body: ['Drag-and-drop', 'Smart styling', 'Built to scale'],
  },
  metrics: {
    label: 'Metrics',
    eyebrow: 'Results that speak',
    defaultTitle: 'Track traction with a site that compels action.',
    subtitle:
      'Combine crisp storytelling with proof points that turn curious visitors into motivated buyers.',
    ctaText: 'See proof',
    accent: '#ff7a59',
    body: ['4.9/5 ratings', '2x faster launch', '18k+ users'],
  },
  showcase: {
    label: 'Showcase',
    eyebrow: 'Work that stands out',
    defaultTitle: 'Presentation that feels as premium as your product.',
    subtitle:
      'Highlight key wins, product flows, and visual narratives without forcing complex code or design work.',
    ctaText: 'View demo',
    accent: '#ffb703',
    body: ['Landing pages', 'Growth campaigns', 'Brand stories'],
  },
  pricing: {
    label: 'Pricing',
    eyebrow: 'Simple plans',
    defaultTitle: 'Straightforward pricing for ambitious teams.',
    subtitle:
      'Move from concept to launch with pricing that stays clear, flexible, and confidently growth-ready.',
    ctaText: 'Choose plan',
    accent: '#8b5cf6',
    body: ['Starter', 'Growth', 'Scale'],
  },
  testimonial: {
    label: 'Testimonial',
    eyebrow: 'Loved by founders',
    defaultTitle: 'Creators and teams trust the workflow.',
    subtitle:
      'From solo creators to product teams, people use the builder to launch polished pages without friction.',
    ctaText: 'Read stories',
    accent: '#ef476f',
    body: ['“We launched in a day.”', '“It feels like a premium studio.”'],
  },
  cta: {
    label: 'CTA',
    eyebrow: 'Ready to launch?',
    defaultTitle: 'Turn your next idea into a high-converting site.',
    subtitle:
      'The fastest route from blank page to beautifully branded website is ready when you are.',
    ctaText: 'Book a demo',
    accent: '#3b82f6',
    body: ['No-code power', 'Full control', 'Ship faster'],
  },
};

const initialSections: SectionItem[] = [
  {
    id: 'hero-1',
    type: 'hero',
    eyebrow: 'Launch faster',
    title: 'Build a site that feels premium from day one.',
    subtitle:
      'Turn ideas into polished, conversion-ready pages with lightning-fast layouts and a premium visual system.',
    ctaText: 'Start free',
    accent: '#6d5ef6',
    body: ['Responsive', 'Fast launch', 'Ready to convert'],
  },
  {
    id: 'features-1',
    type: 'features',
    eyebrow: 'Why teams love it',
    title: 'Everything your site needs to win attention.',
    subtitle:
      'Create crisp, elegant experiences with flexible sections, reusable blocks, and polished CMS-ready layouts.',
    ctaText: 'Explore more',
    accent: '#00c2a8',
    body: ['Drag-and-drop', 'Smart styling', 'Built to scale'],
  },
  {
    id: 'pricing-1',
    type: 'pricing',
    eyebrow: 'Simple plans',
    title: 'Straightforward pricing for ambitious teams.',
    subtitle:
      'Move from concept to launch with pricing that stays clear, flexible, and confidently growth-ready.',
    ctaText: 'Choose plan',
    accent: '#8b5cf6',
    body: ['Starter', 'Growth', 'Scale'],
  },
];

const defaultTheme: Theme = {
  primary: '#6d5ef6',
  background: '#f5f6ff',
  panel: '#ffffff',
  ink: '#111827',
  muted: '#57606d',
};

function App() {
  const [sections, setSections] = useState<SectionItem[]>(initialSections);
  const [selectedId, setSelectedId] = useState<string>(initialSections[0].id);
  const [draggedId, setDraggedId] = useState<string | null>(null);
  const [theme, setTheme] = useState<Theme>(defaultTheme);

  const selectedSection = useMemo(
    () => sections.find((section) => section.id === selectedId) ?? sections[0],
    [sections, selectedId],
  );

  const addSection = (type: SectionType) => {
    const preset = blockLibrary[type];
    const newSection: SectionItem = {
      id: crypto.randomUUID(),
      type,
      eyebrow: preset.eyebrow,
      title: preset.defaultTitle,
      subtitle: preset.subtitle,
      ctaText: preset.ctaText,
      accent: preset.accent,
      body: preset.body,
    };

    setSections((current) => [...current, newSection]);
    setSelectedId(newSection.id);
  };

  const updateSelected = (changes: Partial<SectionItem>) => {
    if (!selectedSection) return;

    setSections((current) =>
      current.map((section) =>
        section.id === selectedSection.id ? { ...section, ...changes } : section,
      ),
    );
  };

  const removeSelected = () => {
    if (!selectedSection || sections.length === 1) return;

    const nextSections = sections.filter((section) => section.id !== selectedSection.id);
    setSections(nextSections);
    setSelectedId(nextSections[0].id);
  };

  const moveSection = (fromId: string, toId: string) => {
    if (fromId === toId) return;

    const next = [...sections];
    const fromIndex = next.findIndex((item) => item.id === fromId);
    const toIndex = next.findIndex((item) => item.id === toId);

    if (fromIndex < 0 || toIndex < 0) return;

    const [moved] = next.splice(fromIndex, 1);
    next.splice(toIndex, 0, moved);
    setSections(next);
  };

  const exportHtml = () => {
    const html = sections.map((section) => renderSectionMarkup(section, theme)).join('\n');

    const documentHtml = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Website Maker Export</title>
    <style>
      * { box-sizing: border-box; }
      body {
        margin: 0;
        font-family: Inter, Arial, sans-serif;
        background: ${theme.background};
        color: ${theme.ink};
      }
      .section { padding: 86px 22px; }
      .wrap { max-width: 1160px; margin: 0 auto; }
      .badge {
        display: inline-flex;
        align-items: center;
        padding: 8px 14px;
        border-radius: 999px;
        font-weight: 700;
        letter-spacing: 0.08em;
        text-transform: uppercase;
        font-size: 11px;
      }
      .hero-grid, .feature-grid, .pricing-grid {
        display: grid;
        gap: 24px;
      }
      .hero-grid {
        grid-template-columns: 1.2fr 0.8fr;
        align-items: center;
      }
      .feature-grid {
        grid-template-columns: repeat(3, minmax(0, 1fr));
      }
      .pricing-grid {
        grid-template-columns: repeat(3, minmax(0, 1fr));
      }
      .card, .pricing-card {
        background: #fff;
        border: 1px solid #e8ebf3;
        border-radius: 22px;
        padding: 24px;
        box-shadow: 0 16px 34px rgba(15, 23, 42, 0.07);
      }
      .price { font-size: 2.2rem; font-weight: 800; }
      .btn {
        display: inline-block;
        padding: 14px 22px;
        border-radius: 12px;
        text-decoration: none;
        font-weight: 700;
      }
      .cta-box {
        border-radius: 28px;
        padding: 44px 28px;
        color: #fff;
      }
      h1, h2, h3, h4, p { margin: 0; }
      h1 { font-size: clamp(2.8rem, 5vw, 4.8rem); line-height: 1.05; }
      h2 { font-size: clamp(2.2rem, 4vw, 3.2rem); }
      p { color: #525d70; line-height: 1.7; }
      .muted { color: #59657a; }
      ul { margin: 18px 0 0; padding-left: 18px; color: #525d70; line-height: 2; }
      .row { display: flex; gap: 12px; flex-wrap: wrap; }
      .chip {
        display: inline-flex;
        padding: 8px 12px;
        border-radius: 999px;
        border: 1px solid #dfe7f2;
        font-size: 12px;
        font-weight: 600;
      }
    </style>
  </head>
  <body>
    ${html}
  </body>
</html>`;

    const blob = new Blob([documentHtml], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'website-maker-export.html';
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="studio-shell" style={{ background: theme.background, color: theme.ink }}>
      <aside className="sidebar-panel">
        <div className="brand-row">
          <div className="brand-mark">WM</div>
          <div>
            <div className="eyebrow">Builder</div>
            <h1>Website Maker</h1>
          </div>
        </div>

        <div className="panel-heading">Sections</div>
        <div className="block-list">
          {(Object.keys(blockLibrary) as SectionType[]).map((type) => (
            <button key={type} className="block-button" onClick={() => addSection(type)}>
              + {blockLibrary[type].label}
            </button>
          ))}
        </div>

        <div className="panel-heading">Theme</div>
        <div className="theme-grid">
          <label>
            Primary
            <input
              type="color"
              value={theme.primary}
              onChange={(event) => setTheme((current) => ({ ...current, primary: event.target.value }))}
            />
          </label>
          <label>
            Background
            <input
              type="color"
              value={theme.background}
              onChange={(event) => setTheme((current) => ({ ...current, background: event.target.value }))}
            />
          </label>
        </div>
      </aside>

      <main className="workspace-panel">
        <div className="workspace-topbar">
          <div>
            <div className="eyebrow muted">Workspace</div>
            <h2>Landing page editor</h2>
          </div>
          <button className="primary-button" onClick={exportHtml}>
            Export HTML
          </button>
        </div>

        <div className="canvas-list">
          {sections.map((section) => (
            <div
              key={section.id}
              className={`canvas-card ${selectedId === section.id ? 'selected' : ''}`}
              draggable
              onDragStart={() => setDraggedId(section.id)}
              onDragOver={(event) => event.preventDefault()}
              onDrop={() => {
                if (draggedId) {
                  moveSection(draggedId, section.id);
                  setDraggedId(null);
                }
              }}
              onClick={() => setSelectedId(section.id)}
            >
              <div className="canvas-header">
                <span>{blockLibrary[section.type].label}</span>
                <span>Drag</span>
              </div>
              <PreviewSection section={section} theme={theme} compact />
            </div>
          ))}
        </div>
      </main>

      <aside className="inspector-panel">
        {selectedSection && (
          <>
            <div className="panel-heading inspector-title">Inspector</div>
            <label>
              Title
              <input
                value={selectedSection.title}
                onChange={(event) => updateSelected({ title: event.target.value })}
              />
            </label>
            <label>
              Subtitle
              <textarea
                rows={3}
                value={selectedSection.subtitle}
                onChange={(event) => updateSelected({ subtitle: event.target.value })}
              />
            </label>
            <label>
              CTA label
              <input
                value={selectedSection.ctaText}
                onChange={(event) => updateSelected({ ctaText: event.target.value })}
              />
            </label>
            <div className="inspector-actions">
              <button className="secondary-button" onClick={removeSelected}>
                Remove
              </button>
              <button
                className="secondary-button"
                onClick={() => updateSelected({ accent: blockLibrary[selectedSection.type].accent })}
              >
                Reset accent
              </button>
            </div>
          </>
        )}
      </aside>

      <div className="preview-panel">
        <div className="device-shell">
          <div className="device-header">
            <span className="traffic red" />
            <span className="traffic yellow" />
            <span className="traffic green" />
          </div>
          <div className="preview-content">
            {sections.map((section) => (
              <PreviewSection key={section.id} section={section} theme={theme} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function PreviewSection({ section, theme, compact = false }: { section: SectionItem; theme: Theme; compact?: boolean }) {
  const isHero = section.type === 'hero';
  const isFeatures = section.type === 'features';
  const isMetrics = section.type === 'metrics';
  const isShowcase = section.type === 'showcase';
  const isPricing = section.type === 'pricing';
  const isTestimonial = section.type === 'testimonial';
  const isCta = section.type === 'cta';

  return (
    <section className={compact ? 'mini-section' : 'live-section'} style={{ background: compact ? '#fff' : theme.panel }}>
      {isHero && (
        <div className="hero-grid">
          <div>
            <span className="badge" style={{ background: `${section.accent}1f`, color: section.accent }}>
              {section.eyebrow}
            </span>
            <h3>{section.title}</h3>
            <p>{section.subtitle}</p>
            <div className="button-row">
              <button className="solid-button" style={{ background: section.accent }}>
                {section.ctaText}
              </button>
              <button className="ghost-button">See preview</button>
            </div>
            <div className="chip-row">
              {section.body.map((item) => (
                <span key={item} className="chip" style={{ borderColor: `${section.accent}55`, color: section.accent }}>
                  {item}
                </span>
              ))}
            </div>
          </div>

          <div className="hero-visual" style={{ background: `linear-gradient(135deg, ${section.accent}, #0f172a)` }}>
            <div className="mock-window">
              <div className="mock-top" />
              <div className="mock-lines">
                <span />
                <span />
                <span />
              </div>
            </div>
          </div>
        </div>
      )}

      {isFeatures && (
        <div>
          <div className="section-header">
            <span className="badge" style={{ background: `${section.accent}1f`, color: section.accent }}>
              {section.eyebrow}
            </span>
            <h3>{section.title}</h3>
            <p>{section.subtitle}</p>
          </div>
          <div className="feature-grid">
            {section.body.map((item) => (
              <div key={item} className="feature-card">
                <div className="icon-box" style={{ background: `${section.accent}1f`, color: section.accent }}>
                  ✦
                </div>
                <h4>{item}</h4>
                <p>Purpose-built moments that feel refined, flexible, and conversion-ready.</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {isMetrics && (
        <div>
          <div className="section-header">
            <span className="badge" style={{ background: `${section.accent}1f`, color: section.accent }}>
              {section.eyebrow}
            </span>
            <h3>{section.title}</h3>
            <p>{section.subtitle}</p>
          </div>
          <div className="stats-grid">
            {section.body.map((item, index) => (
              <div key={item} className="stat-card" style={{ borderTop: `4px solid ${section.accent}` }}>
                <strong>{['4.9', '2x', '18k+'][index]}</strong>
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {isShowcase && (
        <div>
          <div className="section-header">
            <span className="badge" style={{ background: `${section.accent}1f`, color: section.accent }}>
              {section.eyebrow}
            </span>
            <h3>{section.title}</h3>
            <p>{section.subtitle}</p>
          </div>
          <div className="showcase-grid">
            {section.body.map((item, index) => (
              <div key={item} className="showcase-card" style={{ background: index % 2 === 0 ? '#f8fafc' : '#eef2ff' }}>
                <div className="showcase-preview" style={{ background: `linear-gradient(135deg, ${section.accent}, #111827)` }} />
                <div>
                  <strong>{item}</strong>
                  <p>Premium positioning with storytelling, proof, and setup clarity.</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {isPricing && (
        <div>
          <div className="section-header">
            <span className="badge" style={{ background: `${section.accent}1f`, color: section.accent }}>
              {section.eyebrow}
            </span>
            <h3>{section.title}</h3>
            <p>{section.subtitle}</p>
          </div>
          <div className="pricing-grid">
            {section.body.map((item, index) => (
              <div key={item} className={`price-card ${index === 1 ? 'featured' : ''}`} style={{ borderColor: index === 1 ? section.accent : '#e5e7eb' }}>
                <h4>{item}</h4>
                <div className="price-line">
                  <span className="price">${index === 0 ? 19 : index === 1 ? 39 : 89}</span>
                  <span className="month">/mo</span>
                </div>
                <ul>
                  <li>Custom sections</li>
                  <li>Brand-ready presets</li>
                  <li>Fast exports</li>
                </ul>
                <button className="solid-button" style={{ background: section.accent }}>
                  {section.ctaText}
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {isTestimonial && (
        <div>
          <div className="quote-box" style={{ borderLeft: `5px solid ${section.accent}` }}>
            <p>“{section.body[0]}”</p>
            <div className="person-meta">
              <strong>Alicia James</strong>
              <span>Founder • Northstar Studio</span>
            </div>
          </div>
          <div className="section-header">
            <span className="badge" style={{ background: `${section.accent}1f`, color: section.accent }}>
              {section.eyebrow}
            </span>
            <h3>{section.title}</h3>
            <p>{section.subtitle}</p>
          </div>
        </div>
      )}

      {isCta && (
        <div className="cta-box" style={{ background: `linear-gradient(135deg, ${section.accent}, #0f172a)` }}>
          <h3>{section.title}</h3>
          <p>{section.subtitle}</p>
          <button className="cta-button">{section.ctaText}</button>
        </div>
      )}
    </section>
  );
}

function renderSectionMarkup(section: SectionItem, theme: Theme) {
  const accent = section.accent;

  switch (section.type) {
    case 'hero':
      return `
        <section class="section" style="background:${theme.panel};">
          <div class="wrap hero-grid">
            <div>
              <div class="badge" style="background:${accent}1f;color:${accent};">${section.eyebrow}</div>
              <h1 style="margin:18px 0 14px;">${section.title}</h1>
              <p style="max-width:560px;">${section.subtitle}</p>
              <div class="row" style="margin-top:22px;">
                <a href="#" class="btn" style="background:${accent};color:#fff;">${section.ctaText}</a>
                <a href="#" class="btn" style="background:transparent;color:${theme.ink};border:1px solid #dfe7f2;">See preview</a>
              </div>
              <div class="row" style="margin-top:22px;">
                ${section.body
                  .map(
                    (item) => `<span class="chip" style="border-color:${accent}55;color:${accent};">${item}</span>`,
                  )
                  .join('')}
              </div>
            </div>
            <div class="card" style="padding:0; overflow:hidden; min-height:340px; background:linear-gradient(135deg, ${accent}, #0f172a); border:none;">
              <div style="padding:22px; height:100%;">
                <div style="background:rgba(255,255,255,0.08); border:1px solid rgba(255,255,255,0.2); border-radius:18px; padding:20px; height:100%; min-height:300px; display:flex; align-items:flex-end;">
                  <div style="width:100%;">
                    <div style="height:12px;width:130px;border-radius:999px;background:rgba(255,255,255,.8);margin-bottom:12px;"></div>
                    <div style="height:12px;width:92%;border-radius:999px;background:rgba(255,255,255,.3);margin-bottom:10px;"></div>
                    <div style="height:12px;width:82%;border-radius:999px;background:rgba(255,255,255,.3);"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      `;
    case 'features':
      return `
        <section class="section" style="background:${theme.background};">
          <div class="wrap">
            <div style="text-align:center;max-width:720px;margin:0 auto 28px;">
              <div class="badge" style="background:${accent}1f;color:${accent};">${section.eyebrow}</div>
              <h2 style="margin:16px 0 10px;">${section.title}</h2>
              <p>${section.subtitle}</p>
            </div>
            <div class="feature-grid">
              ${section.body
                .map(
                  (item) => `
                    <div class="card">
                      <div class="icon-box" style="width:46px;height:46px;border-radius:14px;background:${accent}1f;color:${accent};display:grid;place-items:center;font-weight:800; margin-bottom:18px;">✦</div>
                      <h3>${item}</h3>
                      <p style="margin-top:8px;">Purpose-built moments that feel refined, flexible, and conversion-ready.</p>
                    </div>
                  `,
                )
                .join('')}
            </div>
          </div>
        </section>
      `;
    case 'metrics':
      return `
        <section class="section" style="background:${theme.panel};">
          <div class="wrap">
            <div style="text-align:center;max-width:760px;margin:0 auto 30px;">
              <div class="badge" style="background:${accent}1f;color:${accent};">${section.eyebrow}</div>
              <h2 style="margin:16px 0 10px;">${section.title}</h2>
              <p>${section.subtitle}</p>
            </div>
            <div class="feature-grid">
              ${section.body
                .map(
                  (item, index) => `
                    <div class="card" style="padding:26px; border-top:4px solid ${accent};">
                      <strong style="display:block;font-size:2.2rem; margin-bottom:10px;">${['4.9', '2x', '18k+'][index]}</strong>
                      <span style="font-weight:600;">${item}</span>
                    </div>
                  `,
                )
                .join('')}
            </div>
          </div>
        </section>
      `;
    case 'showcase':
      return `
        <section class="section" style="background:${theme.background};">
          <div class="wrap">
            <div style="text-align:center;max-width:760px;margin:0 auto 30px;">
              <div class="badge" style="background:${accent}1f;color:${accent};">${section.eyebrow}</div>
              <h2 style="margin:16px 0 10px;">${section.title}</h2>
              <p>${section.subtitle}</p>
            </div>
            <div class="feature-grid">
              ${section.body
                .map(
                  (item, index) => `
                    <div class="card" style="padding:0; overflow:hidden; background:${index % 2 === 0 ? '#f8fafc' : '#eef2ff'};">
                      <div style="height:180px;background:linear-gradient(135deg, ${accent}, #111827);"></div>
                      <div style="padding:20px;">
                        <strong>${item}</strong>
                        <p style="margin-top:8px;">Premium positioning with storytelling, proof, and setup clarity.</p>
                      </div>
                    </div>
                  `,
                )
                .join('')}
            </div>
          </div>
        </section>
      `;
    case 'pricing':
      return `
        <section class="section" style="background:${theme.panel};">
          <div class="wrap">
            <div style="text-align:center;max-width:760px;margin:0 auto 30px;">
              <div class="badge" style="background:${accent}1f;color:${accent};">${section.eyebrow}</div>
              <h2 style="margin:16px 0 10px;">${section.title}</h2>
              <p>${section.subtitle}</p>
            </div>
            <div class="pricing-grid">
              ${section.body
                .map(
                  (item, index) => `
                    <div class="pricing-card" style="border:1px solid ${index === 1 ? accent : '#e8ebf3'}; ${index === 1 ? 'transform: translateY(-6px);' : ''}">
                      <h3>${item}</h3>
                      <div style="display:flex;align-items:flex-end;gap:8px; margin:20px 0;">
                        <span class="price">${index === 0 ? '$19' : index === 1 ? '$39' : '$89'}</span>
                        <span class="muted">/mo</span>
                      </div>
                      <ul>
                        <li>Custom sections</li>
                        <li>Brand-ready presets</li>
                        <li>Fast exports</li>
                      </ul>
                      <a href="#" class="btn" style="margin-top:16px;display:inline-block;background:${accent};color:#fff;">${section.ctaText}</a>
                    </div>
                  `,
                )
                .join('')}
            </div>
          </div>
        </section>
      `;
    case 'testimonial':
      return `
        <section class="section" style="background:${theme.background};">
          <div class="wrap">
            <div class="card" style="border-left:5px solid ${accent}; padding:34px;">
              <p style="font-size:1.7rem; line-height:1.5; color:${theme.ink};">“${section.body[0]}”</p>
              <div style="margin-top:18px; color:${theme.muted};">
                <strong style="display:block; color:${theme.ink};">Alicia James</strong>
                Founder • Northstar Studio
              </div>
            </div>
          </div>
        </section>
      `;
    case 'cta':
      return `
        <section class="section" style="background:${theme.background};">
          <div class="wrap">
            <div class="cta-box" style="background:linear-gradient(135deg, ${accent}, #0f172a);">
              <h2 style="margin:0 0 10px;">${section.title}</h2>
              <p style="max-width:640px; margin:0 auto 18px; opacity:0.9; color:#fff;">${section.subtitle}</p>
              <a href="#" class="btn" style="background:#fff;color:${theme.ink};">${section.ctaText}</a>
            </div>
          </div>
        </section>
      `;
    default:
      return '';
  }
}

export default App;
