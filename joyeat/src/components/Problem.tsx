'use client';

import { useEffect, useRef, useState } from 'react';

function useInView(threshold = 0.2) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold]);
  return { ref, inView };
}

const chaosItems = [
  'Delivery confuso',
  'Excesso de opções',
  'Culpa alimentar',
  'Fast food de sempre',
  'Sem tempo pra decidir',
  'Não confia nos ingredientes',
  'Saudável sem sabor',
];

const joyItems = [
  'Simples e rápido',
  'Cardápio curado',
  'Sem culpa',
  'Fast casual de verdade',
  'Decisão em segundos',
  'Transparência total',
  'Saudável com sabor',
];

export default function Problem() {
  const { ref, inView } = useInView(0.15);

  return (
    <section
      style={{
        padding: '140px 0',
        background: 'var(--joy-dark)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Top border line */}
      <div style={{ position: 'absolute', top: 0, left: '40px', right: '40px', height: '1px', background: 'rgba(255,255,255,0.04)' }} />

      <div className="container-joy" ref={ref}>
        {/* Section header */}
        <div
          style={{
            marginBottom: '80px',
            transition: 'all 1s ease',
            opacity: inView ? 1 : 0,
            transform: inView ? 'translateY(0)' : 'translateY(30px)',
          }}
        >
          <span className="tag" style={{ marginBottom: '24px', display: 'inline-flex' }}>O Problema</span>
          <h2
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(32px, 5vw, 72px)',
              fontWeight: 800,
              lineHeight: 1.05,
              color: '#fafafa',
              maxWidth: '700px',
            }}
          >
            O problema nunca foi{' '}
            <span className="gradient-text-orange">querer comer bem.</span>
          </h2>
        </div>

        {/* Two columns comparison */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '2px',
            borderRadius: '24px',
            overflow: 'hidden',
            transition: 'all 1.2s ease 0.2s',
            opacity: inView ? 1 : 0,
            transform: inView ? 'translateY(0)' : 'translateY(40px)',
          }}
          className="comparison-grid"
        >
          {/* Chaos side */}
          <div
            style={{
              background: 'rgba(255,255,255,0.02)',
              padding: '48px 40px',
              borderRadius: '24px 0 0 24px',
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                marginBottom: '40px',
              }}
            >
              <div
                style={{
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  background: 'rgba(255,60,60,0.6)',
                }}
              />
              <span
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '12px',
                  fontWeight: 700,
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase',
                  color: 'rgba(250,250,250,0.3)',
                }}
              >
                Antes da JOYEAT
              </span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {chaosItems.map((item, i) => (
                <div
                  key={i}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    transition: `all 0.6s ease ${0.3 + i * 0.06}s`,
                    opacity: inView ? 1 : 0,
                    transform: inView ? 'translateX(0)' : 'translateX(-20px)',
                  }}
                >
                  <div
                    style={{
                      width: '20px',
                      height: '20px',
                      borderRadius: '50%',
                      border: '1px solid rgba(255,60,60,0.3)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                    }}
                  >
                    <span style={{ color: 'rgba(255,60,60,0.6)', fontSize: '10px', lineHeight: 1 }}>✕</span>
                  </div>
                  <span
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: '15px',
                      color: 'rgba(250,250,250,0.3)',
                      textDecoration: 'line-through',
                    }}
                  >
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* JOYEAT side */}
          <div
            style={{
              background: 'rgba(253,105,0,0.04)',
              padding: '48px 40px',
              borderRadius: '0 24px 24px 0',
              border: '1px solid rgba(253,105,0,0.12)',
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                marginBottom: '40px',
              }}
            >
              <div
                style={{
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  background: 'var(--joy-orange)',
                  boxShadow: '0 0 12px rgba(253,105,0,0.5)',
                  animation: 'pulse-dot 2s ease-in-out infinite',
                }}
              />
              <span
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '12px',
                  fontWeight: 700,
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase',
                  color: 'var(--joy-orange)',
                }}
              >
                Com a JOYEAT
              </span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {joyItems.map((item, i) => (
                <div
                  key={i}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    transition: `all 0.6s ease ${0.3 + i * 0.06}s`,
                    opacity: inView ? 1 : 0,
                    transform: inView ? 'translateX(0)' : 'translateX(20px)',
                  }}
                >
                  <div
                    style={{
                      width: '20px',
                      height: '20px',
                      borderRadius: '50%',
                      background: 'rgba(253,105,0,0.15)',
                      border: '1px solid rgba(253,105,0,0.3)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                    }}
                  >
                    <span style={{ color: 'var(--joy-orange)', fontSize: '10px', lineHeight: 1 }}>✓</span>
                  </div>
                  <span
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: '15px',
                      color: '#fafafa',
                      fontWeight: 500,
                    }}
                  >
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom quote */}
        <div
          style={{
            marginTop: '80px',
            textAlign: 'center',
            transition: 'all 1s ease 0.6s',
            opacity: inView ? 1 : 0,
            transform: inView ? 'translateY(0)' : 'translateY(20px)',
          }}
        >
          <p
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(20px, 3vw, 36px)',
              fontWeight: 700,
              color: 'rgba(250,250,250,0.15)',
              letterSpacing: '-0.01em',
            }}
          >
            &ldquo;A JOYEAT nasceu para simplificar isso.&rdquo;
          </p>
        </div>
      </div>

      <style>{`
        @media (max-width: 640px) {
          .comparison-grid { grid-template-columns: 1fr !important; }
          .comparison-grid > div { border-radius: 16px !important; }
        }
      `}</style>
    </section>
  );
}
