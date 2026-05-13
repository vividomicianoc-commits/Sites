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

const pillars = [
  {
    icon: '⚡',
    title: 'Rapidez',
    desc: 'Pedido feito. Refeição pronta. Sem fila mental, sem decisão cansativa.',
    color: 'var(--joy-orange)',
  },
  {
    icon: '🌿',
    title: 'Comida Real',
    desc: 'Ingredientes de verdade. Sem ultraprocessados escondidos. Sem enganação.',
    color: 'var(--joy-green)',
  },
  {
    icon: '👁',
    title: 'Transparência',
    desc: 'Você sabe o que come. Origem, preparo, ingredientes. Tudo aberto.',
    color: 'var(--joy-orange)',
  },
  {
    icon: '🔥',
    title: 'Sabor',
    desc: 'Se não for gostoso, não vira hábito. Nosso cardápio foi feito para ser delicioso.',
    color: 'var(--joy-green)',
  },
  {
    icon: '🧠',
    title: 'Zero Esforço Mental',
    desc: 'Cardápio curado. Decisão em segundos. Rotina sem peso.',
    color: 'var(--joy-orange)',
  },
  {
    icon: '♻️',
    title: 'Constância',
    desc: 'Não somos para uma dieta. Somos para a vida toda. Hábito real.',
    color: 'var(--joy-green)',
  },
];

const menuItems = [
  { name: 'Power Bowl', desc: 'Base de grãos, proteína grelhada, vegetais frescos, molho artesanal', tag: 'Popular', color: '#fd6900' },
  { name: 'Fresh Wrap', desc: 'Folha crocante, recheio curado, muito sabor em cada mordida', tag: 'Novo', color: '#88dd03' },
  { name: 'Joy Burger', desc: 'Pão brioche, blend especial, ingredientes honestos, sabor real', tag: 'Favorito', color: '#fd6900' },
  { name: 'Green Bowl', desc: 'Frescor máximo, leveza garantida, energia para a tarde toda', tag: 'Leve', color: '#88dd03' },
];

export default function JoyeatSection() {
  const { ref: headerRef, inView: headerInView } = useInView(0.2);
  const { ref: pillarsRef, inView: pillarsInView } = useInView(0.1);
  const { ref: menuRef, inView: menuInView } = useInView(0.1);

  return (
    <section
      id="joyeat"
      style={{
        background: 'var(--joy-black)',
        paddingTop: '160px',
        paddingBottom: '160px',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background accent */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '1px',
          background: 'linear-gradient(90deg, transparent, rgba(253,105,0,0.3), transparent)',
        }}
      />

      <div className="container-joy">
        {/* Header */}
        <div
          ref={headerRef}
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '80px',
            alignItems: 'end',
            marginBottom: '100px',
            transition: 'all 1.2s ease',
            opacity: headerInView ? 1 : 0,
            transform: headerInView ? 'translateY(0)' : 'translateY(40px)',
          }}
          className="joyeat-header"
        >
          <div>
            <span className="tag" style={{ marginBottom: '28px', display: 'inline-flex' }}>JOYEAT</span>
            <h2
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(36px, 5.5vw, 80px)',
                fontWeight: 800,
                lineHeight: 0.95,
                letterSpacing: '-0.02em',
                color: '#fafafa',
              }}
            >
              Fast casual
              <br />
              <span className="gradient-text-orange">saudável</span>
              <br />
              inteligente.
            </h2>
          </div>
          <div>
            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '17px',
                lineHeight: 1.8,
                color: 'rgba(250,250,250,0.5)',
                marginBottom: '32px',
              }}
            >
              A JOYEAT combina comida de verdade com a rapidez que a sua rotina exige.
              Sem radicalismo. Sem gourmetização. Sem complicação.
              Só comida boa, rápida e confiável.
            </p>
            <p
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '13px',
                fontWeight: 600,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: 'var(--joy-orange)',
              }}
            >
              Inaugurando em Goiânia →
            </p>
          </div>
        </div>

        {/* Pillars grid */}
        <div
          ref={pillarsRef}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '2px',
            marginBottom: '2px',
          }}
          className="pillars-grid"
        >
          {pillars.map((pillar, i) => (
            <div
              key={i}
              className="card-joy"
              style={{
                padding: '40px 36px',
                borderRadius: i === 0 ? '24px 0 0 0' : i === 2 ? '0 24px 0 0' : i === 3 ? '0 0 0 24px' : i === 5 ? '0 0 24px 0' : '0',
                transition: `all 0.8s cubic-bezier(0.16, 1, 0.3, 1) ${0.1 + i * 0.07}s`,
                opacity: pillarsInView ? 1 : 0,
                transform: pillarsInView ? 'translateY(0)' : 'translateY(30px)',
              }}
            >
              <div
                style={{
                  fontSize: '28px',
                  marginBottom: '20px',
                  filter: 'grayscale(0.3)',
                }}
              >
                {pillar.icon}
              </div>
              <h3
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '18px',
                  fontWeight: 700,
                  color: pillar.color,
                  marginBottom: '12px',
                  letterSpacing: '-0.01em',
                }}
              >
                {pillar.title}
              </h3>
              <p
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '13px',
                  lineHeight: 1.7,
                  color: 'rgba(250,250,250,0.4)',
                }}
              >
                {pillar.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Menu preview */}
        <div ref={menuRef} style={{ marginTop: '100px' }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '48px',
              transition: 'all 1s ease',
              opacity: menuInView ? 1 : 0,
              transform: menuInView ? 'translateY(0)' : 'translateY(20px)',
            }}
          >
            <div>
              <span className="tag" style={{ marginBottom: '16px', display: 'inline-flex' }}>Cardápio</span>
              <h3
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(24px, 3.5vw, 44px)',
                  fontWeight: 800,
                  color: '#fafafa',
                  letterSpacing: '-0.02em',
                }}
              >
                Saudável com cara de real.
              </h3>
            </div>
            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '13px',
                color: 'rgba(250,250,250,0.3)',
                maxWidth: '200px',
                textAlign: 'right',
                lineHeight: 1.6,
              }}
            >
              Em breve o cardápio completo
            </p>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(4, 1fr)',
              gap: '16px',
            }}
            className="menu-grid"
          >
            {menuItems.map((item, i) => (
              <div
                key={i}
                style={{
                  background: 'rgba(255,255,255,0.02)',
                  border: '1px solid rgba(255,255,255,0.06)',
                  borderRadius: '20px',
                  overflow: 'hidden',
                  transition: `all 0.8s cubic-bezier(0.16, 1, 0.3, 1) ${0.1 + i * 0.08}s`,
                  opacity: menuInView ? 1 : 0,
                  transform: menuInView ? 'translateY(0)' : 'translateY(40px)',
                  cursor: 'pointer',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = `${item.color}33`;
                  e.currentTarget.style.transform = 'translateY(-6px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                {/* Food visual */}
                <div
                  style={{
                    height: '180px',
                    background: `radial-gradient(circle at 40% 40%, ${item.color}25 0%, ${item.color}08 60%, transparent 100%)`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    position: 'relative',
                  }}
                >
                  {/* Circular plate visual */}
                  <div
                    style={{
                      width: '100px',
                      height: '100px',
                      borderRadius: '50%',
                      background: `radial-gradient(circle at 35% 35%, ${item.color}40, ${item.color}15)`,
                      border: `1px solid ${item.color}30`,
                      animation: 'float 6s ease-in-out infinite',
                    }}
                  />
                  {/* Tag */}
                  <div
                    style={{
                      position: 'absolute',
                      top: '12px',
                      right: '12px',
                      background: item.color,
                      color: '#000',
                      fontFamily: 'var(--font-display)',
                      fontSize: '9px',
                      fontWeight: 700,
                      letterSpacing: '0.1em',
                      textTransform: 'uppercase',
                      padding: '4px 10px',
                      borderRadius: '100px',
                    }}
                  >
                    {item.tag}
                  </div>
                </div>
                {/* Content */}
                <div style={{ padding: '20px 24px' }}>
                  <h4
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: '16px',
                      fontWeight: 700,
                      color: '#fafafa',
                      marginBottom: '8px',
                    }}
                  >
                    {item.name}
                  </h4>
                  <p
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: '12px',
                      lineHeight: 1.6,
                      color: 'rgba(250,250,250,0.35)',
                    }}
                  >
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 1024px) {
          .pillars-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .menu-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 768px) {
          .joyeat-header { grid-template-columns: 1fr !important; gap: 32px !important; }
          .pillars-grid { grid-template-columns: 1fr !important; }
          .menu-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
