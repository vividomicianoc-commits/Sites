'use client';
import { useEffect, useState } from 'react';

export default function Hero() {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => { const t = setTimeout(() => setLoaded(true), 100); return () => clearTimeout(t); }, []);

  const go = (href: string) => document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <section id="hero" style={{
      minHeight: '100vh', background: 'var(--joy-cream)',
      display: 'flex', flexDirection: 'column', justifyContent: 'center',
      position: 'relative', overflow: 'hidden', paddingTop: '100px', paddingBottom: '60px',
    }}>
      {/* Orange blob top-right */}
      <div style={{
        position: 'absolute', top: '-80px', right: '-120px',
        width: '500px', height: '500px', borderRadius: '50%',
        background: 'var(--joy-orange)', opacity: 0.08,
        filter: 'blur(80px)', pointerEvents: 'none',
      }} />
      {/* Green blob bottom-left */}
      <div style={{
        position: 'absolute', bottom: '-60px', left: '-100px',
        width: '400px', height: '400px', borderRadius: '50%',
        background: 'var(--joy-green)', opacity: 0.12,
        filter: 'blur(60px)', pointerEvents: 'none',
      }} />

      <div className="container-joy" style={{ position: 'relative', zIndex: 2 }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '80px', alignItems: 'center' }} className="hero-grid">

          {/* Left content */}
          <div>
            <div style={{
              marginBottom: '28px',
              transition: 'all 1s ease 0.1s', opacity: loaded ? 1 : 0, transform: loaded ? 'translateY(0)' : 'translateY(20px)',
            }}>
              <span className="tag tag-orange">
                <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--joy-orange)', display: 'inline-block' }} className="pulse" />
                Inaugurando em Goiânia
              </span>
            </div>

            <h1 style={{
              fontFamily: 'var(--font-display)', fontWeight: 900,
              fontSize: 'clamp(44px, 6vw, 88px)', lineHeight: 1.0,
              letterSpacing: '-0.025em', color: 'var(--joy-grafite)',
              marginBottom: '28px',
              transition: 'all 1.1s ease 0.25s', opacity: loaded ? 1 : 0, transform: loaded ? 'translateY(0)' : 'translateY(30px)',
            }}>
              Em tempo<br />
              <span style={{ color: 'var(--joy-orange)' }}>de comer</span><br />
              bem.
            </h1>

            <p style={{
              fontFamily: 'var(--font-body)', fontSize: '17px', fontWeight: 300,
              lineHeight: 1.75, color: 'var(--joy-gray)', maxWidth: '420px', marginBottom: '40px',
              transition: 'all 1.1s ease 0.4s', opacity: loaded ? 1 : 0, transform: loaded ? 'translateY(0)' : 'translateY(20px)',
            }}>
              Fast food de comida de verdade. Rápido, gostoso e sem esforço mental.
              Feito para quem tem rotina real.
            </p>

            <div style={{
              display: 'flex', gap: '14px', flexWrap: 'wrap',
              transition: 'all 1.1s ease 0.55s', opacity: loaded ? 1 : 0, transform: loaded ? 'translateY(0)' : 'translateY(20px)',
            }}>
              <button className="btn-orange" onClick={() => go('#joyeat')}>
                Conheça a Joyeat
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </button>
              <button className="btn-outline-dark" onClick={() => go('#construcao')}>
                Acompanhe a obra
              </button>
            </div>
          </div>

          {/* Right — visual */}
          <div className="hide-mobile" style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {/* Outer decorative rings */}
            <div style={{
              position: 'absolute', width: '468px', height: '468px', borderRadius: '50%',
              border: '1px dashed rgba(253,105,0,0.18)',
              top: '50%', left: '50%', transform: 'translate(-50%,-50%)',
            }} />

            {/* Main visual circle */}
            <div className="float" style={{
              width: '420px', height: '420px', borderRadius: '50%',
              overflow: 'hidden', position: 'relative',
              background: 'linear-gradient(145deg, #fff5ee 0%, #ffebd6 60%, #ffe0c0 100%)',
              boxShadow: '0 40px 100px rgba(253,105,0,0.22), 0 0 0 5px rgba(253,105,0,0.08)',
            }}>
              {/* SVG food bowl illustration */}
              <svg viewBox="0 0 420 420" width="420" height="420" xmlns="http://www.w3.org/2000/svg" style={{ position: 'absolute', inset: 0 }}>
                {/* Bowl shadow */}
                <ellipse cx="210" cy="390" rx="130" ry="18" fill="rgba(253,105,0,0.12)" />
                {/* Bowl body */}
                <path d="M80 220 Q80 360 210 360 Q340 360 340 220 Z" fill="#fff" opacity="0.95" />
                {/* Bowl rim */}
                <ellipse cx="210" cy="220" rx="130" ry="28" fill="#fff" />
                <ellipse cx="210" cy="220" rx="130" ry="28" fill="none" stroke="#f0e0c8" strokeWidth="2" />
                {/* Rice / grain base */}
                <ellipse cx="210" cy="224" rx="108" ry="18" fill="#f5e6c8" />
                {/* Greens cluster left */}
                <circle cx="148" cy="206" r="28" fill="#88dd03" opacity="0.9" />
                <circle cx="136" cy="198" r="18" fill="#6ab802" />
                <circle cx="158" cy="195" r="14" fill="#a3e635" opacity="0.8" />
                {/* Protein (chicken/tofu) center */}
                <rect x="185" y="188" width="50" height="34" rx="10" fill="#fd6900" opacity="0.85" />
                <rect x="189" y="192" width="42" height="26" rx="7" fill="#ff8c3a" opacity="0.7" />
                {/* Cherry tomatoes */}
                <circle cx="265" cy="200" r="14" fill="#ff4444" opacity="0.85" />
                <circle cx="280" cy="210" r="11" fill="#e63333" opacity="0.8" />
                <circle cx="255" cy="212" r="9" fill="#ff6666" opacity="0.7" />
                {/* Avocado slice */}
                <ellipse cx="174" cy="228" rx="16" ry="22" fill="#5a9e3a" opacity="0.85" />
                <ellipse cx="174" cy="228" rx="10" ry="14" fill="#7dc93e" />
                <ellipse cx="174" cy="228" rx="5" ry="8" fill="#4a7a2a" />
                {/* Seeds / sesame dots */}
                {[230,240,250,220,260].map((x,i)=>(
                  <circle key={i} cx={x} cy={228+i*3-6} r="2.5" fill="#e8c87a" opacity="0.9" />
                ))}
                {/* Sauce drizzle */}
                <path d="M190 186 Q200 175 215 182 Q225 170 238 180" stroke="#fd6900" strokeWidth="3" fill="none" strokeLinecap="round" opacity="0.6" />
                {/* Lemon wedge */}
                <path d="M288 195 Q298 185 308 195 Q298 210 288 195 Z" fill="#f5d060" opacity="0.9" />
                <line x1="298" y1="185" x2="298" y2="210" stroke="#e8bc30" strokeWidth="1" opacity="0.5" />
              </svg>
              {/* Warm gradient overlay at bottom */}
              <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at 70% 80%, rgba(253,105,0,0.08) 0%, transparent 60%)' }} />
            </div>

            {/* Floating chips */}
            {[
              { text: '⚡ Rápido', top: '8%', left: '-4%', bg: 'var(--joy-green)', color: 'var(--joy-grafite)', delay: '0s' },
              { text: '🌿 Comida real', top: '22%', right: '-10%', bg: '#fff', color: 'var(--joy-grafite)', delay: '0.5s' },
              { text: '😊 Sem culpa', bottom: '22%', left: '-8%', bg: 'var(--joy-orange)', color: '#fff', delay: '1s' },
              { text: '✓ Transparente', bottom: '8%', right: '-6%', bg: 'var(--joy-grafite)', color: '#fff', delay: '1.5s' },
            ].map((chip, i) => (
              <div key={i} style={{
                position: 'absolute', top: chip.top, bottom: chip.bottom,
                left: (chip as { left?: string }).left, right: (chip as { right?: string }).right,
                background: chip.bg, color: chip.color,
                padding: '10px 18px', borderRadius: '100px',
                fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '13px',
                boxShadow: '0 8px 24px rgba(22,22,22,0.12)',
                animation: `float ${5 + i}s ease-in-out infinite`,
                animationDelay: chip.delay,
                whiteSpace: 'nowrap',
              }}>
                {chip.text}
              </div>
            ))}
          </div>
        </div>

        {/* Bottom stats */}
        <div style={{
          display: 'flex', gap: '48px', marginTop: '80px', paddingTop: '48px',
          borderTop: '1px solid rgba(22,22,22,0.08)',
          transition: 'all 1.1s ease 0.7s', opacity: loaded ? 1 : 0, transform: loaded ? 'translateY(0)' : 'translateY(20px)',
          flexWrap: 'wrap',
        }}>
          {[
            { val: '100%', label: 'Comida de verdade' },
            { val: '<5min', label: 'Tempo de preparo' },
            { val: '6+', label: 'Perfis alimentares' },
            { val: '0', label: 'Ingredientes escondidos' },
          ].map((s, i) => (
            <div key={i}>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: '28px', fontWeight: 900, color: 'var(--joy-orange)' }}>{s.val}</div>
              <div style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: 'var(--joy-gray-lt)', marginTop: '2px' }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll cue */}
      <div style={{
        position: 'absolute', bottom: '32px', left: '50%', transform: 'translateX(-50%)',
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px',
        transition: 'opacity 1s ease 1.2s', opacity: loaded ? 1 : 0,
      }}>
        <span style={{ fontFamily: 'var(--font-body)', fontSize: '10px', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--joy-gray-lt)' }}>Scroll</span>
        <div style={{ width: '1px', height: '36px', background: 'linear-gradient(to bottom, var(--joy-orange), transparent)' }} />
      </div>

      <style>{`
        @media(max-width:900px){.hero-grid{grid-template-columns:1fr!important;}}`}
      </style>
    </section>
  );
}
