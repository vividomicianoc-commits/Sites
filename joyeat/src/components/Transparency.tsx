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

const transparencyPillars = [
  {
    number: '01',
    title: 'Origem dos Ingredientes',
    desc: 'Sabemos de onde vem cada ingrediente. Fornecedores selecionados, rastreabilidade real, sem mistério.',
    icon: '🌱',
    color: '#88dd03',
  },
  {
    number: '02',
    title: 'Controle de Qualidade',
    desc: 'Protocolos rigorosos de armazenamento, validade e preparo. Segurança alimentar não é opcional.',
    icon: '🔬',
    color: '#fd6900',
  },
  {
    number: '03',
    title: 'Equipe Treinada',
    desc: 'Time capacitado em manipulação segura, contaminação cruzada e atendimento de restrições alimentares.',
    icon: '👥',
    color: '#88dd03',
  },
  {
    number: '04',
    title: 'Sem Ingredientes Escondidos',
    desc: 'O que está no prato é o que está no cardápio. Sem ultraprocessados disfarçados. Sem gordura trans.',
    icon: '👁',
    color: '#fd6900',
  },
  {
    number: '05',
    title: 'Rastreabilidade Total',
    desc: 'Do fornecedor ao prato, cada etapa é documentada. Em breve, QR code para rastrear sua refeição.',
    icon: '🔗',
    color: '#88dd03',
  },
  {
    number: '06',
    title: 'Restrições Atendidas',
    desc: 'Vegano, sem glúten, sem lactose, low carb. Identificação clara. Preparo seguro. Sem surpresas.',
    icon: '✓',
    color: '#fd6900',
  },
];

export default function Transparency() {
  const { ref: headerRef, inView: headerInView } = useInView(0.2);
  const { ref: cardsRef, inView: cardsInView } = useInView(0.05);

  return (
    <section
      style={{
        padding: '160px 0',
        background: 'var(--joy-dark)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Top line */}
      <div style={{ position: 'absolute', top: 0, left: '40px', right: '40px', height: '1px', background: 'rgba(255,255,255,0.04)' }} />

      {/* Background glow */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '900px',
          height: '600px',
          background: 'radial-gradient(ellipse, rgba(136,221,3,0.04) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      <div className="container-joy">
        {/* Header */}
        <div
          ref={headerRef}
          style={{
            marginBottom: '100px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            flexWrap: 'wrap',
            gap: '48px',
            transition: 'all 1.2s ease',
            opacity: headerInView ? 1 : 0,
            transform: headerInView ? 'translateY(0)' : 'translateY(30px)',
          }}
        >
          <div style={{ flex: '1 1 400px' }}>
            <span className="tag" style={{ marginBottom: '28px', display: 'inline-flex' }}>Transparência</span>
            <h2
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(32px, 5vw, 72px)',
                fontWeight: 800,
                lineHeight: 1.0,
                letterSpacing: '-0.02em',
                color: '#fafafa',
              }}
            >
              Transparência
              <br />
              <span className="gradient-text-green">gera confiança.</span>
            </h2>
          </div>
          <div style={{ flex: '1 1 360px', maxWidth: '420px' }}>
            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '17px',
                lineHeight: 1.8,
                color: 'rgba(250,250,250,0.4)',
              }}
            >
              Na JOYEAT, você sabe o que come.
              Sem ingredientes misteriosos, sem marketing enganoso.
              Só comida de verdade, preparada com cuidado e respeito por quem vai comer.
            </p>
          </div>
        </div>

        {/* Pillars */}
        <div
          ref={cardsRef}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '2px',
          }}
          className="transparency-grid"
        >
          {transparencyPillars.map((pillar, i) => (
            <div
              key={i}
              style={{
                padding: '48px 36px',
                background: 'rgba(255,255,255,0.015)',
                borderRadius: i === 0 ? '24px 0 0 0' : i === 2 ? '0 24px 0 0' : i === 3 ? '0 0 0 24px' : i === 5 ? '0 0 24px 0' : '0',
                transition: `all 0.8s cubic-bezier(0.16, 1, 0.3, 1) ${0.05 + i * 0.07}s`,
                opacity: cardsInView ? 1 : 0,
                transform: cardsInView ? 'translateY(0)' : 'translateY(30px)',
                borderBottom: i < 3 ? '1px solid rgba(255,255,255,0.03)' : 'none',
                borderRight: i % 3 !== 2 ? '1px solid rgba(255,255,255,0.03)' : 'none',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: '28px',
                }}
              >
                <span
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '11px',
                    fontWeight: 700,
                    letterSpacing: '0.15em',
                    color: 'rgba(250,250,250,0.2)',
                  }}
                >
                  {pillar.number}
                </span>
                <span style={{ fontSize: '22px' }}>{pillar.icon}</span>
              </div>
              <h3
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '17px',
                  fontWeight: 700,
                  color: pillar.color,
                  marginBottom: '12px',
                  lineHeight: 1.3,
                }}
              >
                {pillar.title}
              </h3>
              <p
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '13px',
                  lineHeight: 1.75,
                  color: 'rgba(250,250,250,0.35)',
                }}
              >
                {pillar.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 1024px) {
          .transparency-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 640px) {
          .transparency-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
