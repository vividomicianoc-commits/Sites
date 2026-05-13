'use client';

import { useEffect, useRef, useState } from 'react';

export default function Hero() {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 300);
    return () => clearTimeout(timer);
  }, []);

  const scrollTo = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="hero"
      style={{
        position: 'relative',
        height: '100vh',
        minHeight: '700px',
        display: 'flex',
        alignItems: 'center',
        overflow: 'hidden',
        background: '#0a0a0a',
      }}
    >
      {/* Cinematic background layers */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
        {/* Main gradient — warm cinematic feel */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'radial-gradient(ellipse 80% 70% at 65% 50%, rgba(253,105,0,0.12) 0%, transparent 70%)',
          }}
        />
        {/* Organic blob shapes */}
        <div
          style={{
            position: 'absolute',
            top: '10%',
            right: '-5%',
            width: '600px',
            height: '600px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(136,221,3,0.06) 0%, transparent 70%)',
            animation: 'float 8s ease-in-out infinite',
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: '0%',
            left: '-10%',
            width: '500px',
            height: '500px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(253,105,0,0.08) 0%, transparent 70%)',
            animation: 'float 10s ease-in-out infinite reverse',
          }}
        />
        {/* Grid overlay */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: 'linear-gradient(rgba(250,250,250,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(250,250,250,0.02) 1px, transparent 1px)',
            backgroundSize: '80px 80px',
          }}
        />
        {/* Bottom gradient */}
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: '40%',
            background: 'linear-gradient(to top, #0a0a0a, transparent)',
          }}
        />
      </div>

      {/* Floating tag — top */}
      <div
        style={{
          position: 'absolute',
          top: '140px',
          left: '50%',
          transform: loaded ? 'translateX(-50%) translateY(0)' : 'translateX(-50%) translateY(-20px)',
          zIndex: 2,
          transition: 'all 1s cubic-bezier(0.16, 1, 0.3, 1) 0.2s',
          opacity: loaded ? 1 : 0,
        }}
      >
        <span className="tag">
          <span className="pulse-dot" style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--joy-orange)', display: 'inline-block' }} />
          Inaugurando em Goiânia
        </span>
      </div>

      {/* Main content */}
      <div className="container-joy" style={{ position: 'relative', zIndex: 2, width: '100%' }}>
        <div style={{ maxWidth: '900px' }}>
          {/* Pre-headline */}
          <p
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: '12px',
              fontWeight: 600,
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: 'var(--joy-orange)',
              marginBottom: '28px',
              transition: 'all 1s cubic-bezier(0.16, 1, 0.3, 1) 0.4s',
              opacity: loaded ? 1 : 0,
              transform: loaded ? 'translateY(0)' : 'translateY(20px)',
            }}
          >
            JOYGROUP — Ecossistema de Bem-Estar
          </p>

          {/* Main headline */}
          <h1
            ref={titleRef}
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(48px, 8vw, 110px)',
              fontWeight: 800,
              lineHeight: 0.92,
              letterSpacing: '-0.02em',
              color: '#fafafa',
              marginBottom: '32px',
              transition: 'all 1.2s cubic-bezier(0.16, 1, 0.3, 1) 0.5s',
              opacity: loaded ? 1 : 0,
              transform: loaded ? 'translateY(0)' : 'translateY(40px)',
            }}
          >
            A vida real exige
            <br />
            <span className="gradient-text-orange">mais do que</span>
            <br />
            alimentação.
          </h1>

          {/* Subheadline */}
          <p
            ref={subRef}
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'clamp(16px, 2vw, 20px)',
              fontWeight: 300,
              lineHeight: 1.7,
              color: 'rgba(250,250,250,0.6)',
              maxWidth: '520px',
              marginBottom: '48px',
              transition: 'all 1.2s cubic-bezier(0.16, 1, 0.3, 1) 0.7s',
              opacity: loaded ? 1 : 0,
              transform: loaded ? 'translateY(0)' : 'translateY(30px)',
            }}
          >
            Comida de verdade. Performance. Comunidade.
            <br />
            Bem-estar. Tudo conectado.
          </p>

          {/* CTAs */}
          <div
            ref={ctaRef}
            style={{
              display: 'flex',
              gap: '16px',
              flexWrap: 'wrap',
              transition: 'all 1.2s cubic-bezier(0.16, 1, 0.3, 1) 0.9s',
              opacity: loaded ? 1 : 0,
              transform: loaded ? 'translateY(0)' : 'translateY(30px)',
            }}
          >
            <button className="btn-primary" onClick={() => scrollTo('#joyeat')}>
              Conheça a JOYEAT
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </button>
            <button className="btn-outline" onClick={() => scrollTo('#construcao')}>
              Acompanhe a construção
            </button>
          </div>
        </div>
      </div>

      {/* Right side — visual element */}
      <div
        style={{
          position: 'absolute',
          right: 0,
          top: '50%',
          transform: 'translateY(-50%)',
          width: '45%',
          height: '80%',
          zIndex: 1,
          transition: 'all 1.5s cubic-bezier(0.16, 1, 0.3, 1) 0.6s',
          opacity: loaded ? 1 : 0,
        }}
        className="hidden-mobile"
      >
        {/* Cinematic food/lifestyle visual */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            borderRadius: '32px 0 0 32px',
            overflow: 'hidden',
            background: 'linear-gradient(135deg, rgba(253,105,0,0.08) 0%, rgba(136,221,3,0.05) 100%)',
            border: '1px solid rgba(255,255,255,0.04)',
            borderRight: 'none',
          }}
        >
          {/* Abstract food shapes */}
          <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {/* Plate circle */}
            <div
              style={{
                width: '340px',
                height: '340px',
                borderRadius: '50%',
                border: '1px solid rgba(253,105,0,0.15)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                animation: 'float 8s ease-in-out infinite',
              }}
            >
              <div
                style={{
                  width: '280px',
                  height: '280px',
                  borderRadius: '50%',
                  background: 'radial-gradient(circle at 40% 40%, rgba(253,105,0,0.2), rgba(136,221,3,0.1), transparent)',
                  border: '1px solid rgba(253,105,0,0.1)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <div
                  style={{
                    width: '180px',
                    height: '180px',
                    borderRadius: '50%',
                    background: 'radial-gradient(circle at 35% 35%, rgba(253,105,0,0.35), rgba(136,221,3,0.15))',
                  }}
                />
              </div>
            </div>
          </div>

          {/* Floating elements */}
          {[
            { top: '15%', left: '10%', delay: '0s', size: 60, color: 'rgba(136,221,3,0.3)' },
            { top: '75%', left: '20%', delay: '2s', size: 40, color: 'rgba(253,105,0,0.3)' },
            { top: '20%', right: '15%', delay: '1s', size: 50, color: 'rgba(253,105,0,0.2)' },
            { top: '65%', right: '10%', delay: '3s', size: 35, color: 'rgba(136,221,3,0.2)' },
          ].map((el, i) => (
            <div
              key={i}
              style={{
                position: 'absolute',
                top: el.top,
                left: 'left' in el ? el.left : undefined,
                right: 'right' in el ? (el as { right: string }).right : undefined,
                width: el.size,
                height: el.size,
                borderRadius: '50%',
                background: el.color,
                filter: 'blur(1px)',
                animation: `float ${6 + i}s ease-in-out infinite`,
                animationDelay: el.delay,
              }}
            />
          ))}

          {/* Stats overlay */}
          <div
            style={{
              position: 'absolute',
              bottom: '40px',
              left: '30px',
              right: '30px',
              display: 'flex',
              gap: '12px',
            }}
          >
            {[
              { num: '3', label: 'Marcas do ecossistema' },
              { num: '4', label: 'Fundadoras' },
              { num: '∞', label: 'Razões para comer bem' },
            ].map((stat, i) => (
              <div
                key={i}
                style={{
                  flex: 1,
                  padding: '16px',
                  background: 'rgba(10,10,10,0.7)',
                  backdropFilter: 'blur(10px)',
                  borderRadius: '16px',
                  border: '1px solid rgba(255,255,255,0.06)',
                  textAlign: 'center',
                }}
              >
                <div
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '24px',
                    fontWeight: 800,
                    color: 'var(--joy-orange)',
                  }}
                >
                  {stat.num}
                </div>
                <div
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '10px',
                    color: 'rgba(250,250,250,0.4)',
                    lineHeight: 1.4,
                    marginTop: '4px',
                  }}
                >
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        style={{
          position: 'absolute',
          bottom: '40px',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 2,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '8px',
          transition: 'all 1.2s ease 1.2s',
          opacity: loaded ? 1 : 0,
        }}
      >
        <span
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: '10px',
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            color: 'rgba(250,250,250,0.3)',
          }}
        >
          Role para baixo
        </span>
        <div
          style={{
            width: '1px',
            height: '40px',
            background: 'linear-gradient(to bottom, rgba(253,105,0,0.8), transparent)',
            animation: 'pulse-dot 2s ease-in-out infinite',
          }}
        />
      </div>

      <style>{`
        @media (max-width: 768px) {
          .hidden-mobile { display: none !important; }
        }
      `}</style>
    </section>
  );
}
