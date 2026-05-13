'use client';

import { useEffect, useRef, useState } from 'react';

function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold]);
  return { ref, inView };
}

const ctaOptions = [
  {
    icon: '💬',
    title: 'Comunidade VIP',
    desc: 'Seja o primeiro a saber. Acesse novidades, bastidores e ofertas exclusivas de lançamento.',
    cta: 'Entrar no WhatsApp VIP',
    color: '#88dd03',
    bg: 'rgba(136,221,3,0.06)',
    border: 'rgba(136,221,3,0.15)',
  },
  {
    icon: '📸',
    title: 'Acompanhe no Instagram',
    desc: 'Bastidores reais, construção da loja, testes de receita e o dia a dia da JOYGROUP.',
    cta: 'Seguir @joyeat',
    color: '#fd6900',
    bg: 'rgba(253,105,0,0.06)',
    border: 'rgba(253,105,0,0.15)',
  },
  {
    icon: '🎯',
    title: 'Beta Testers',
    desc: 'Quer testar o cardápio antes de todo mundo? Cadastre-se para ser um dos primeiros clientes.',
    cta: 'Quero ser beta tester',
    color: '#88dd03',
    bg: 'rgba(136,221,3,0.06)',
    border: 'rgba(136,221,3,0.15)',
  },
];

export default function Community() {
  const { ref, inView } = useInView(0.15);
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) setSubmitted(true);
  };

  return (
    <section
      id="comunidade"
      style={{
        padding: '160px 0',
        background: 'var(--joy-black)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Big background text */}
      <div
        style={{
          position: 'absolute',
          bottom: '0',
          left: '50%',
          transform: 'translateX(-50%)',
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(80px, 12vw, 200px)',
          fontWeight: 800,
          color: 'rgba(255,255,255,0.02)',
          whiteSpace: 'nowrap',
          letterSpacing: '-0.04em',
          pointerEvents: 'none',
          userSelect: 'none',
          lineHeight: 1,
        }}
      >
        JOYGROUP
      </div>

      <div className="container-joy" ref={ref}>
        {/* Main CTA */}
        <div
          style={{
            textAlign: 'center',
            marginBottom: '80px',
            transition: 'all 1.2s ease',
            opacity: inView ? 1 : 0,
            transform: inView ? 'translateY(0)' : 'translateY(40px)',
          }}
        >
          <span className="tag" style={{ marginBottom: '32px', display: 'inline-flex' }}>Comunidade</span>
          <h2
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(36px, 6vw, 88px)',
              fontWeight: 800,
              lineHeight: 0.95,
              letterSpacing: '-0.02em',
              color: '#fafafa',
              marginBottom: '28px',
            }}
          >
            A JOYEAT é feita
            <br />
            <span className="gradient-text-orange">para a vida real.</span>
          </h2>
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'clamp(15px, 2vw, 19px)',
              lineHeight: 1.75,
              color: 'rgba(250,250,250,0.45)',
              maxWidth: '580px',
              margin: '0 auto 48px',
            }}
          >
            Isso não é só um restaurante.
            É um novo jeito de viver bem.
            Faça parte desde o começo.
          </p>

          {/* Email signup */}
          {!submitted ? (
            <form
              onSubmit={handleSubmit}
              style={{
                display: 'flex',
                gap: '12px',
                maxWidth: '500px',
                margin: '0 auto',
                flexWrap: 'wrap',
                justifyContent: 'center',
              }}
            >
              <input
                type="email"
                placeholder="seu@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                style={{
                  flex: '1 1 240px',
                  padding: '16px 24px',
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '100px',
                  color: '#fafafa',
                  fontFamily: 'var(--font-body)',
                  fontSize: '15px',
                  outline: 'none',
                  transition: 'border-color 0.3s ease',
                }}
                onFocus={(e) => (e.target.style.borderColor = 'rgba(253,105,0,0.5)')}
                onBlur={(e) => (e.target.style.borderColor = 'rgba(255,255,255,0.1)')}
              />
              <button type="submit" className="btn-primary">
                Quero acompanhar
              </button>
            </form>
          ) : (
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '12px',
                padding: '16px 32px',
                background: 'rgba(136,221,3,0.1)',
                border: '1px solid rgba(136,221,3,0.3)',
                borderRadius: '100px',
              }}
            >
              <span style={{ color: '#88dd03', fontSize: '18px' }}>✓</span>
              <span
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '15px',
                  fontWeight: 600,
                  color: '#88dd03',
                }}
              >
                Você está dentro! Avisaremos em breve.
              </span>
            </div>
          )}
        </div>

        {/* CTA options */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '16px',
          }}
          className="community-grid"
        >
          {ctaOptions.map((option, i) => (
            <div
              key={i}
              style={{
                background: option.bg,
                border: `1px solid ${option.border}`,
                borderRadius: '24px',
                padding: '40px 36px',
                transition: `all 0.8s cubic-bezier(0.16, 1, 0.3, 1) ${0.15 + i * 0.1}s`,
                opacity: inView ? 1 : 0,
                transform: inView ? 'translateY(0)' : 'translateY(40px)',
                cursor: 'pointer',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-6px)';
                e.currentTarget.style.borderColor = option.color + '40';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.borderColor = option.border;
              }}
            >
              <div style={{ fontSize: '28px', marginBottom: '20px' }}>{option.icon}</div>
              <h3
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '18px',
                  fontWeight: 700,
                  color: '#fafafa',
                  marginBottom: '12px',
                }}
              >
                {option.title}
              </h3>
              <p
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '13px',
                  lineHeight: 1.75,
                  color: 'rgba(250,250,250,0.4)',
                  marginBottom: '24px',
                }}
              >
                {option.desc}
              </p>
              <button
                style={{
                  background: 'none',
                  border: 'none',
                  fontFamily: 'var(--font-display)',
                  fontSize: '12px',
                  fontWeight: 700,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  color: option.color,
                  cursor: 'pointer',
                  padding: 0,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                }}
              >
                {option.cta}
                <span>→</span>
              </button>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .community-grid { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 640px) {
          .community-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
