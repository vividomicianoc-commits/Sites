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
          <div className="hide-mobile" style={{ position: 'relative' }}>
            {/* Main circle */}
            <div className="float" style={{
              width: '420px', height: '420px', borderRadius: '50%',
              background: 'linear-gradient(135deg, var(--joy-orange) 0%, #ff9a3c 100%)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              position: 'relative', margin: '0 auto',
              boxShadow: '0 40px 100px rgba(253,105,0,0.25)',
            }}>
              {/* Logo inside circle */}
              <div style={{ textAlign: 'center' }}>
                <div style={{
                  fontFamily: 'var(--font-display)', fontWeight: 900, fontSize: '72px',
                  lineHeight: 1, color: '#fff', letterSpacing: '-0.02em',
                }}>
                  Jo<span style={{ display: 'inline-block', transform: 'scaleX(-1)', color: 'rgba(255,255,255,0.8)' }}>ʎ</span>
                </div>
                <div style={{
                  fontFamily: 'var(--font-display)', fontWeight: 400, fontSize: '32px',
                  color: 'rgba(255,255,255,0.85)', letterSpacing: '0.04em',
                }}>
                  eat
                </div>
                <div style={{
                  fontFamily: 'var(--font-body)', fontSize: '11px', fontWeight: 300,
                  color: 'rgba(255,255,255,0.65)', letterSpacing: '0.15em', textTransform: 'uppercase',
                  marginTop: '12px',
                }}>
                  Em tempo de comer bem
                </div>
              </div>
            </div>

            {/* Floating chips */}
            {[
              { text: '⚡ Rápido', top: '8%', left: '-8%', bg: 'var(--joy-green)', color: 'var(--joy-grafite)', delay: '0s' },
              { text: '🌿 Comida real', top: '20%', right: '-12%', bg: '#fff', color: 'var(--joy-grafite)', delay: '0.5s' },
              { text: '😊 Sem culpa', bottom: '25%', left: '-10%', bg: 'var(--joy-yellow)', color: 'var(--joy-grafite)', delay: '1s' },
              { text: '✓ Transparente', bottom: '10%', right: '-8%', bg: 'var(--joy-grafite)', color: '#fff', delay: '1.5s' },
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
