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

const milestones = [
  {
    date: 'Nov 2024',
    title: 'O nascimento da ideia',
    desc: 'Quatro fundadoras, uma mesa e muita vontade de resolver um problema real. O conceito da JOYEAT ganha forma.',
    status: 'done',
    color: '#fd6900',
  },
  {
    date: 'Dez 2024',
    title: 'Identidade visual criada',
    desc: 'Branding, paleta, tipografia. A JOYEAT ganha uma identidade visual que a diferencia de tudo que existe no mercado.',
    status: 'done',
    color: '#88dd03',
  },
  {
    date: 'Jan 2025',
    title: 'Ponto comercial assegurado',
    desc: 'Localização estratégica em Goiânia. O endereço ideal para o conceito de fast casual que queremos criar.',
    status: 'done',
    color: '#fd6900',
  },
  {
    date: 'Fev — Mar 2025',
    title: 'Obra e montagem',
    desc: 'A loja ganha vida. Layout, equipamentos, identidade aplicada no espaço físico. A construção mais emocionante que vivemos.',
    status: 'current',
    color: '#88dd03',
  },
  {
    date: 'Abr 2025',
    title: 'Testes e validação',
    desc: 'Receitas, operação, atendimento. Tudo testado antes de abrir as portas. Qualidade não é negociável.',
    status: 'next',
    color: '#fd6900',
  },
  {
    date: 'Em breve',
    title: 'Inauguração oficial',
    desc: 'Goiânia vai conhecer o fast casual saudável feito para a vida real. Comunidade, sabor, transparência.',
    status: 'future',
    color: '#88dd03',
  },
];

const behindScenes = [
  { label: 'Horas de pesquisa', value: '400+', color: '#fd6900' },
  { label: 'Receitas testadas', value: '80+', color: '#88dd03' },
  { label: 'Fornecedores avaliados', value: '30+', color: '#fd6900' },
  { label: 'Reuniões de alinhamento', value: '60+', color: '#88dd03' },
];

export default function BuildDiary() {
  const { ref: headerRef, inView: headerInView } = useInView(0.2);
  const { ref: statsRef, inView: statsInView } = useInView(0.2);
  const { ref: timelineRef, inView: timelineInView } = useInView(0.05);

  return (
    <section
      id="construcao"
      style={{
        padding: '160px 0',
        background: 'var(--joy-black)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: 'linear-gradient(rgba(253,105,0,0.015) 1px, transparent 1px), linear-gradient(90deg, rgba(253,105,0,0.015) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
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
          <span className="tag" style={{ marginBottom: '24px', display: 'inline-flex' }}>Diário da Construção</span>
          <h2
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(32px, 5vw, 72px)',
              fontWeight: 800,
              lineHeight: 1.0,
              letterSpacing: '-0.02em',
              color: '#fafafa',
              maxWidth: '700px',
              marginBottom: '28px',
            }}
          >
            Construindo mais do que
            <br />
            <span className="gradient-text-orange">uma loja.</span>
          </h2>
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '17px',
              lineHeight: 1.8,
              color: 'rgba(250,250,250,0.4)',
              maxWidth: '520px',
            }}
          >
            Cada decisão, cada erro, cada aprendizado.
            Aqui você acompanha a construção real de uma marca que quer mudar como Goiânia come.
          </p>
        </div>

        {/* Stats */}
        <div
          ref={statsRef}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '2px',
            marginBottom: '100px',
          }}
          className="stats-grid"
        >
          {behindScenes.map((stat, i) => (
            <div
              key={i}
              style={{
                padding: '40px 32px',
                background: 'rgba(255,255,255,0.02)',
                borderRadius: i === 0 ? '20px 0 0 20px' : i === 3 ? '0 20px 20px 0' : '0',
                transition: `all 0.8s cubic-bezier(0.16, 1, 0.3, 1) ${i * 0.08}s`,
                opacity: statsInView ? 1 : 0,
                transform: statsInView ? 'translateY(0)' : 'translateY(30px)',
                borderRight: i < 3 ? '1px solid rgba(255,255,255,0.03)' : 'none',
                textAlign: 'center',
              }}
            >
              <div
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(28px, 3.5vw, 48px)',
                  fontWeight: 800,
                  color: stat.color,
                  marginBottom: '8px',
                  letterSpacing: '-0.02em',
                }}
              >
                {stat.value}
              </div>
              <div
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '12px',
                  color: 'rgba(250,250,250,0.3)',
                  lineHeight: 1.5,
                }}
              >
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Timeline */}
        <div ref={timelineRef}>
          <h3
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: '13px',
              fontWeight: 600,
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              color: 'rgba(250,250,250,0.25)',
              marginBottom: '48px',
              transition: 'all 1s ease',
              opacity: timelineInView ? 1 : 0,
            }}
          >
            Linha do Tempo
          </h3>

          <div style={{ position: 'relative' }}>
            {/* Vertical line */}
            <div
              style={{
                position: 'absolute',
                left: '120px',
                top: 0,
                bottom: 0,
                width: '1px',
                background: 'rgba(255,255,255,0.06)',
              }}
              className="timeline-line"
            />

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
              {milestones.map((milestone, i) => (
                <div
                  key={i}
                  style={{
                    display: 'flex',
                    gap: '0',
                    alignItems: 'flex-start',
                    padding: '32px 0',
                    borderBottom: i < milestones.length - 1 ? '1px solid rgba(255,255,255,0.03)' : 'none',
                    transition: `all 0.8s cubic-bezier(0.16, 1, 0.3, 1) ${0.05 + i * 0.07}s`,
                    opacity: timelineInView ? 1 : 0,
                    transform: timelineInView ? 'translateX(0)' : 'translateX(-30px)',
                  }}
                >
                  {/* Date */}
                  <div
                    style={{
                      width: '120px',
                      flexShrink: 0,
                      paddingRight: '32px',
                      paddingTop: '6px',
                    }}
                  >
                    <span
                      style={{
                        fontFamily: 'var(--font-body)',
                        fontSize: '12px',
                        color: 'rgba(250,250,250,0.3)',
                        lineHeight: 1.5,
                      }}
                    >
                      {milestone.date}
                    </span>
                  </div>

                  {/* Dot */}
                  <div
                    style={{
                      position: 'relative',
                      flexShrink: 0,
                      width: '40px',
                      display: 'flex',
                      justifyContent: 'center',
                      paddingTop: '8px',
                    }}
                  >
                    <div
                      style={{
                        width: milestone.status === 'current' ? '14px' : '8px',
                        height: milestone.status === 'current' ? '14px' : '8px',
                        borderRadius: '50%',
                        background: milestone.status === 'future' ? 'rgba(255,255,255,0.1)' : milestone.color,
                        border: milestone.status === 'future' ? `1px solid ${milestone.color}30` : 'none',
                        boxShadow: milestone.status === 'current' ? `0 0 20px ${milestone.color}60` : 'none',
                        animation: milestone.status === 'current' ? 'pulse-dot 2s ease-in-out infinite' : 'none',
                      }}
                    />
                  </div>

                  {/* Content */}
                  <div style={{ paddingLeft: '24px', flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                      <h4
                        style={{
                          fontFamily: 'var(--font-display)',
                          fontSize: '17px',
                          fontWeight: 700,
                          color: milestone.status === 'future' ? 'rgba(250,250,250,0.3)' : '#fafafa',
                        }}
                      >
                        {milestone.title}
                      </h4>
                      {milestone.status === 'current' && (
                        <span
                          style={{
                            padding: '3px 10px',
                            background: `${milestone.color}20`,
                            border: `1px solid ${milestone.color}40`,
                            borderRadius: '100px',
                            fontSize: '10px',
                            fontFamily: 'var(--font-display)',
                            fontWeight: 600,
                            color: milestone.color,
                            letterSpacing: '0.08em',
                            textTransform: 'uppercase',
                          }}
                        >
                          Agora
                        </span>
                      )}
                    </div>
                    <p
                      style={{
                        fontFamily: 'var(--font-body)',
                        fontSize: '14px',
                        lineHeight: 1.75,
                        color: 'rgba(250,250,250,0.35)',
                      }}
                    >
                      {milestone.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .stats-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .stats-grid > div { border-radius: 12px !important; border-right: none !important; }
          .timeline-line { left: 80px !important; }
        }
        @media (max-width: 480px) {
          .stats-grid { grid-template-columns: 1fr !important; }
          .timeline-line { display: none; }
        }
      `}</style>
    </section>
  );
}
