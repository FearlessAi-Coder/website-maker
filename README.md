* {
  box-sizing: border-box;
}

html, body, #root {
  margin: 0;
  min-height: 100%;
  min-height: 100vh;
  font-family: Inter, 'Segoe UI', sans-serif;
}

body {
  background:
    radial-gradient(circle at top left, rgba(110, 94, 246, 0.18), transparent 28%),
    radial-gradient(circle at bottom right, rgba(59, 130, 246, 0.12), transparent 20%),
    #eef3ff;
  color: #111827;
}

button,
input,
textarea {
  font: inherit;
}

button {
  cursor: pointer;
}

.studio-shell {
  min-height: 100vh;
  display: grid;
  grid-template-columns: 260px minmax(420px, 1.2fr) 300px 540px;
  gap: 0;
}

.sidebar-panel,
.workspace-panel,
.inspector-panel,
.preview-panel {
  min-height: 100vh;
}

.sidebar-panel {
  background: rgba(15, 23, 42, 0.96);
  color: white;
  padding: 28px 18px;
}

.brand-row {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 24px;
}

.brand-mark {
  width: 42px;
  height: 42px;
  display: grid;
  place-items: center;
  border-radius: 12px;
  background: linear-gradient(135deg, #7c6af6, #4f46e5);
  font-weight: 800;
  box-shadow: 0 18px 30px rgba(91, 92, 248, 0.35);
}

h1,
h2,
h3,
h4,
p {
  margin: 0;
}

.eyebrow {
  display: inline-block;
  font-size: 10px;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  opacity: 0.75;
}

.eyebrow.muted {
  opacity: 0.7;
}

.brand-row h1 {
  font-size: 28px;
  margin-top: 4px;
}

.panel-heading {
  margin: 22px 0 12px;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  opacity: 0.7;
}

.block-list {
  display: grid;
  gap: 10px;
}

.block-button,
.primary-button,
.secondary-button,
.solid-button,
.ghost-button,
.cta-button {
  border: none;
  border-radius: 12px;
  transition: transform 0.14s ease, box-shadow 0.14s ease;
}

.block-button {
  width: 100%;
  border: 1px solid rgba(148, 163, 184, 0.25);
  background: rgba(255, 255, 255, 0.04);
  color: white;
  text-align: left;
  padding: 12px 14px;
  font-weight: 600;
}

.block-button:hover,
.primary-button:hover,
.secondary-button:hover,
.solid-button:hover,
.ghost-button:hover,
.cta-button:hover {
  transform: translateY(-1px);
}

.theme-grid {
  display: grid;
  gap: 14px;
}

.theme-grid label,
.inspector-panel label {
  display: grid;
  gap: 8px;
  font-size: 12px;
  color: rgba(255, 255, 255, 0.8);
}

input[type='color'] {
  width: 100%;
  height: 44px;
  padding: 0;
  border: 1px solid rgba(148, 163, 184, 0.35);
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.04);
}

.inspector-panel input,
.inspector-panel textarea {
  width: 100%;
  border: 1px solid rgba(148, 163, 184, 0.3);
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.04);
  color: white;
  padding: 10px 12px;
}

.workspace-panel {
  background: #f7f9ff;
  border-right: 1px solid #e5e7eb;
  padding: 22px 18px 20px;
}

.workspace-topbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 20px;
}

.workspace-topbar h2 {
  font-size: 28px;
  margin-top: 8px;
}

.primary-button {
  background: linear-gradient(135deg, #6d5ef6, #4f46e5);
  color: white;
  padding: 12px 18px;
  font-weight: 700;
  box-shadow: 0 18px 30px rgba(109, 94, 246, 0.28);
}

.canvas-list {
  display: grid;
  gap: 18px;
}

.canvas-card {
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 18px;
  padding: 12px;
  cursor: pointer;
  transition: border-color 0.15s ease, box-shadow 0.15s ease;
  box-shadow: 0 18px 30px rgba(15, 23, 42, 0.04);
}

.canvas-card.selected {
  border-color: #6d5ef6;
  box-shadow: 0 0 0 3px rgba(109, 94, 246, 0.14);
}

.canvas-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 8px;
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: #64748b;
}

.inspector-panel {
  background: rgba(15, 23, 42, 0.98);
  color: white;
  padding: 26px 18px;
  border-right: 1px solid rgba(148, 163, 184, 0.2);
}

.inspector-panel label {
  display: grid;
  gap: 8px;
  margin-bottom: 16px;
}

.inspector-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.secondary-button {
  padding: 10px 12px;
  background: rgba(255, 255, 255, 0.06);
  color: white;
}

.preview-panel {
  background: linear-gradient(180deg, #edf2ff, #f8fafc);
  padding: 24px 18px;
}

.device-shell {
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 22px;
  overflow: hidden;
  box-shadow: 0 22px 40px rgba(15, 23, 42, 0.08);
}

.device-header {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 14px 16px;
  background: #f8fafc;
  border-bottom: 1px solid #e5e7eb;
}

.traffic {
  display: block;
  width: 11px;
  height: 11px;
  border-radius: 50%;
}

.traffic.red { background: #fb7185; }
.traffic.yellow { background: #fbbf24; }
.traffic.green { background: #4ade80; }

.preview-content {
  padding: 16px;
}

.live-section,
.mini-section {
  border: 1px solid #e5e7eb;
  border-radius: 18px;
  background: white;
  padding: 22px;
}

.preview-content .live-section {
  margin-bottom: 18px;
}

.hero-grid,
.feature-grid,
.stats-grid,
.showcase-grid,
.pricing-grid {
  display: grid;
  gap: 18px;
}

.hero-grid {
  grid-template-columns: 1.2fr 0.8fr;
  align-items: center;
}

.hero-visual {
  min-height: 290px;
  border-radius: 22px;
  padding: 18px;
  display: flex;
  align-items: end;
}

.mock-window {
  width: 100%;
  min-height: 220px;
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.22);
  border-radius: 18px;
  padding: 18px;
}

.mock-top {
  width: 120px;
  height: 12px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.8);
  margin-bottom: 18px;
}

.mock-lines {
  display: grid;
  gap: 12px;
}

.mock-lines span {
  display: block;
  width: 100%;
  height: 12px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.25);
}

.section-header {
  text-align: center;
  max-width: 720px;
  margin: 0 auto 20px;
}

.section-header h3 {
  font-size: clamp(1.9rem, 2.8vw, 3rem);
  margin: 12px 0 8px;
}

.badge {
  display: inline-flex;
  align-items: center;
  border-radius: 999px;
  padding: 7px 12px;
  font-size: 11px;
  font-weight: 800;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.live-section h3,
.live-section h4 {
  margin: 12px 0 8px;
}

.live-section p {
  color: #475569;
  line-height: 1.7;
}

.button-row,
.chip-row {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 18px;
}

.solid-button,
.ghost-button,
.cta-button {
  padding: 12px 18px;
  font-weight: 700;
}

.solid-button {
  background: #4f46e5;
  color: white;
  box-shadow: 0 14px 30px rgba(79, 70, 229, 0.18);
}

.ghost-button {
  background: transparent;
  border: 1px solid #dfe7f2;
  color: #0f172a;
}

.chip {
  display: inline-flex;
  align-items: center;
  padding: 7px 10px;
  border-radius: 999px;
  border: 1px solid;
  font-size: 12px;
  font-weight: 700;
}

.feature-grid {
  grid-template-columns: repeat(3, minmax(0, 1fr));
}

.feature-card,
.stat-card,
.showcase-card,
.price-card {
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 18px;
  padding: 22px;
}

.feature-card h4 {
  margin: 18px 0 10px;
}

.icon-box {
  width: 42px;
  height: 42px;
  display: grid;
  place-items: center;
  border-radius: 12px;
  font-weight: 900;
}

.stats-grid {
  grid-template-columns: repeat(3, minmax(0, 1fr));
}

.stat-card strong {
  display: block;
  font-size: 2.2rem;
  line-height: 1.1;
  margin-bottom: 8px;
}

.stat-card span {
  font-weight: 600;
  color: #475569;
}

.showcase-grid {
  grid-template-columns: repeat(3, minmax(0, 1fr));
}

.showcase-card {
  padding: 0;
  overflow: hidden;
}

.showcase-preview {
  height: 180px;
}

.showcase-card > div:last-child {
  padding: 18px 18px 20px;
}

.showcase-card strong {
  display: block;
  margin-bottom: 8px;
}

.pricing-grid {
  grid-template-columns: repeat(3, minmax(0, 1fr));
}

.price-card {
  background: white;
}

.price-card.featured {
  box-shadow: 0 20px 35px rgba(109, 94, 246, 0.08);
  transform: scale(1.02);
}

.price-card h4 {
  margin-top: 8px;
}

.price-line {
  display: flex;
  align-items: flex-end;
  gap: 8px;
  margin: 16px 0 18px;
}

.price {
  font-size: 2.3rem;
  font-weight: 800;
}

.month {
  color: #64748b;
}

.price-card ul {
  margin: 0 0 18px;
  padding-left: 18px;
  color: #475569;
  line-height: 2;
}

.quote-box {
  background: white;
  border-radius: 18px;
  padding: 28px;
  margin-bottom: 18px;
  box-shadow: 0 16px 30px rgba(15, 23, 42, 0.05);
}

.quote-box p {
  font-size: clamp(1.2rem, 2vw, 2rem);
  color: #0f172a;
  line-height: 1.5;
}

.person-meta {
  display: flex;
  flex-direction: column;
  gap: 4px;
  margin-top: 18px;
}

.person-meta span {
  color: #64748b;
}

.cta-box {
  display: grid;
  justify-items: center;
  gap: 16px;
  padding: 42px 28px;
  border-radius: 22px;
  text-align: center;
  color: white;
}

.cta-box p {
  color: rgba(255, 255, 255, 0.82);
}

.cta-button {
  background: white;
  color: #111827;
}

@media (max-width: 1420px) {
  .studio-shell {
    grid-template-columns: 220px minmax(300px, 1fr) 270px 460px;
  }
}

@media (max-width: 1120px) {
  .studio-shell {
    display: block;
  }

  .sidebar-panel,
  .workspace-panel,
  .inspector-panel,
  .preview-panel {
    min-height: auto;
  }

  .sidebar-panel,
  .inspector-panel {
    padding: 20px;
  }

  .preview-content {
    padding: 12px;
  }
}

@media (max-width: 760px) {
  .hero-grid,
  .feature-grid,
  .stats-grid,
  .showcase-grid,
  .pricing-grid {
    grid-template-columns: 1fr;
  }

  .workspace-topbar {
    flex-direction: column;
    align-items: flex-start;
  }
}
