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

const brands = [
  {
    id: 'joyeat',
    name: 'JOYEAT',
    headline: 'Fast Casual Saudável',
    description: 'Comida de verdade para a rotina real. Rápido, saboroso, transparente. Sem radicalismo. Sem enganação.',
    features: ['Bowls & Wraps', 'Joy Burgers', 'Drive-thru moderno', 'Autoatendimento', 'Cardápio curado'],
    status: 'Em construção',
    statusLive: false,
    color: '#fd6900',
    bg: 'rgba(253,105,0,0.06)',
    border: 'rgba(253,105,0,0.15)',
    icon: '🍽',
    size: 'large',
  },
  {
    id: 'joybody',
    name: 'JOYBODY',
    headline: 'Comunidade de Bem-Estar',
    description: 'Nutricionistas, personal trainers, desafios, eventos e pertencimento. Saúde coletiva de verdade.',
    features: ['Comunidade ativa', 'Nutricionistas parceiros', 'Desafios mensais', 'Eventos lifestyle', 'Parcerias'],
    status: 'Em breve',
    statusLive: false,
    color: '#88dd03',
    bg: 'rgba(136,221,3,0.05)',
    border: 'rgba(136,221,3,0.15)',
    icon: '💚',
    size: 'medium',
  },
  {
    id: 'joypower',
    name: 'JOYPOWER',
    headline: 'Performance & Suplementos',
    description: 'Linha de suplementos honestos, funcionais e modernos. Sem exagero. Só o que funciona.',
    features: ['Suplementos naturais', 'Performance real', 'Clean label', 'Ciência aplicada', 'Lifestyle fit'],
    status: 'Em breve',
    statusLive: false,
    color: '#fd6900',
    bg: 'rgba(253,105,0,0.04)',
    border: 'rgba(253,105,0,0.1)',
    icon: '⚡',
    size: 'medium',
  },
];

export default function Ecosystem() {
  const { ref: headerRef, inView: headerInView } = useInView(0.2);
  const { ref: brandsRef, inView: brandsInView } = useInView(0.05);

  return (
    <section
      id="ecossistema"
      style={{
        padding: '160px 0',
        background: 'var(--joy-black)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background elements */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          right: '-200px',
          width: '600px',
          height: '600px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(136,221,3,0.04) 0%, transparent 70%)',
          transform: 'translateY(-50%)',
          pointerEvents: 'none',
        }}
      />

      <div className="container-joy">
        {/* Header */}
        <div
          ref={headerRef}
          style={{
            marginBottom: '100px',
            transition: 'all 1.2s ease',
            opacity: headerInView ? 1 : 0,
            transform: headerInView ? 'translateY(0)' : 'translateY(30px)',
          }}
        >
          <span className="tag" style={{ marginBottom: '24px', display: 'inline-flex' }}>JOYGROUP</span>
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: '60px', flexWrap: 'wrap' }}>
            <h2
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(36px, 5.5vw, 80px)',
                fontWeight: 800,
                lineHeight: 0.95,
                letterSpacing: '-0.02em',
                color: '#fafafa',
                flex: '1 1 400px',
              }}
            >
              Isso é só o
              <br />
              <span className="gradient-text-green">começo.</span>
            </h2>
            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '17px',
                lineHeight: 1.8,
                color: 'rgba(250,250,250,0.4)',
                flex: '1 1 360px',
                maxWidth: '440px',
              }}
            >
              A JOYGROUP é um ecossistema de bem-estar moderno.
              Três marcas conectadas por um propósito: tornar a vida saudável acessível, prática e prazerosa para todo mundo.
            </p>
          </div>
        </div>

        {/* Main JOYEAT card */}
        <div ref={brandsRef}>
          {brands.filter(b => b.size === 'large').map((brand, i) => (
            <div
              key={brand.id}
              style={{
                background: brand.bg,
                border: `1px solid ${brand.border}`,
                borderRadius: '32px',
                padding: '64px 60px',
                marginBottom: '16px',
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '80px',
                alignItems: 'center',
                transition: `all 1s cubic-bezier(0.16, 1, 0.3, 1) ${i * 0.1}s`,
                opacity: brandsInView ? 1 : 0,
                transform: brandsInView ? 'translateY(0)' : 'translateY(40px)',
              }}
              className="ecosystem-main"
            >
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '32px' }}>
                  <span style={{ fontSize: '32px' }}>{brand.icon}</span>
                  <div>
                    <p
                      style={{
                        fontFamily: 'var(--font-display)',
                        fontSize: '11px',
                        fontWeight: 700,
                        letterSpacing: '0.2em',
                        textTransform: 'uppercase',
                        color: brand.color,
                        marginBottom: '4px',
                      }}
                    >
                      {brand.name}
                    </p>
                    <span
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '6px',
                        fontSize: '10px',
                        color: brand.statusLive ? '#88dd03' : 'rgba(250,250,250,0.3)',
                        fontFamily: 'var(--font-body)',
                      }}
                    >
                      <span
                        style={{
                          width: '5px',
                          height: '5px',
                          borderRadius: '50%',
                          background: brand.statusLive ? '#88dd03' : 'rgba(250,250,250,0.2)',
                          animation: 'pulse-dot 2s ease-in-out infinite',
                        }}
                      />
                      {brand.status}
                    </span>
                  </div>
                </div>
                <h3
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: 'clamp(28px, 3.5vw, 52px)',
                    fontWeight: 800,
                    lineHeight: 1.05,
                    color: '#fafafa',
                    letterSpacing: '-0.02em',
                    marginBottom: '24px',
                  }}
                >
                  {brand.headline}
                </h3>
                <p
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '16px',
                    lineHeight: 1.8,
                    color: 'rgba(250,250,250,0.5)',
                  }}
                >
                  {brand.description}
                </p>
              </div>
              <div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {brand.features.map((feat, j) => (
                    <div
                      key={j}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '14px',
                        padding: '16px 20px',
                        background: 'rgba(255,255,255,0.02)',
                        borderRadius: '12px',
                        border: '1px solid rgba(255,255,255,0.04)',
                      }}
                    >
                      <div
                        style={{
                          width: '6px',
                          height: '6px',
                          borderRadius: '50%',
                          background: brand.color,
                          flexShrink: 0,
                        }}
                      />
                      <span
                        style={{
                          fontFamily: 'var(--font-body)',
                          fontSize: '14px',
                          color: 'rgba(250,250,250,0.7)',
                        }}
                      >
                        {feat}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}

          {/* JOYBODY + JOYPOWER grid */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '16px',
            }}
            className="ecosystem-sub"
          >
            {brands.filter(b => b.size === 'medium').map((brand, i) => (
              <div
                key={brand.id}
                style={{
                  background: brand.bg,
                  border: `1px solid ${brand.border}`,
                  borderRadius: '24px',
                  padding: '48px 44px',
                  transition: `all 1s cubic-bezier(0.16, 1, 0.3, 1) ${0.2 + i * 0.1}s`,
                  opacity: brandsInView ? 1 : 0,
                  transform: brandsInView ? 'translateY(0)' : 'translateY(40px)',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '28px' }}>
                  <span style={{ fontSize: '26px' }}>{brand.icon}</span>
                  <div>
                    <p
                      style={{
                        fontFamily: 'var(--font-display)',
                        fontSize: '11px',
                        fontWeight: 700,
                        letterSpacing: '0.2em',
                        textTransform: 'uppercase',
                        color: brand.color,
                        marginBottom: '2px',
                      }}
                    >
                      {brand.name}
                    </p>
                    <span
                      style={{
                        fontSize: '9px',
                        color: 'rgba(250,250,250,0.25)',
                        fontFamily: 'var(--font-body)',
                        letterSpacing: '0.1em',
                        textTransform: 'uppercase',
                      }}
                    >
                      {brand.status}
                    </span>
                  </div>
                </div>
                <h3
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: 'clamp(20px, 2.5vw, 32px)',
                    fontWeight: 800,
                    color: '#fafafa',
                    letterSpacing: '-0.02em',
                    marginBottom: '16px',
                    lineHeight: 1.1,
                  }}
                >
                  {brand.headline}
                </h3>
                <p
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '14px',
                    lineHeight: 1.75,
                    color: 'rgba(250,250,250,0.4)',
                    marginBottom: '28px',
                  }}
                >
                  {brand.description}
                </p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  {brand.features.map((feat, j) => (
                    <span
                      key={j}
                      style={{
                        padding: '6px 12px',
                        background: `${brand.color}12`,
                        border: `1px solid ${brand.color}25`,
                        borderRadius: '100px',
                        fontFamily: 'var(--font-body)',
                        fontSize: '11px',
                        color: brand.color,
                        fontWeight: 500,
                      }}
                    >
                      {feat}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .ecosystem-main { grid-template-columns: 1fr !important; gap: 40px !important; padding: 40px 32px !important; }
          .ecosystem-sub { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
