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

const founders = [
  {
    name: 'Vitória',
    theme: 'Transparência',
    tagline: '"Saúde não é radicalismo."',
    story: 'Sempre sentiu que o mercado saudável estava distante da vida real. Muito marketing, pouca verdade nutricional, excesso de rótulo fit. A JOYEAT nasceu do cansaço com a hipocrisia do mercado.',
    frustrations: ['Muito marketing, pouca verdade', 'Excesso de rótulo fit', 'Saúde como ilusão'],
    color: '#fd6900',
    accent: 'rgba(253,105,0,0.08)',
    border: 'rgba(253,105,0,0.15)',
    initial: 'V',
  },
  {
    name: 'Isabela',
    theme: 'Agilidade',
    tagline: '"A rotina acelerada fazia comer bem parecer inviável."',
    story: 'A rotina acelerada tornava a alimentação saudável um luxo. Não falta de vontade — falta de estrutura. A JOYEAT foi construída para preencher esse vazio.',
    frustrations: ['Sem tempo para decidir', 'Opções saudáveis demoram demais', 'Praticidade vs saúde'],
    color: '#88dd03',
    accent: 'rgba(136,221,3,0.06)',
    border: 'rgba(136,221,3,0.15)',
    initial: 'I',
  },
  {
    name: 'Maria Eduarda',
    theme: 'Próxima Geração',
    tagline: '"A nossa geração quer saúde, mas também quer praticidade."',
    story: 'Segurança alimentar e qualidade real são direitos, não privilégios. A próxima geração merece ter acesso a comida boa de verdade, com transparência e confiança.',
    frustrations: ['Insegurança sobre ingredientes', 'Falta de rastreabilidade', 'Qualidade inacessível'],
    color: '#fd6900',
    accent: 'rgba(253,105,0,0.08)',
    border: 'rgba(253,105,0,0.15)',
    initial: 'M',
  },
  {
    name: 'Nathalia',
    theme: 'Sabor',
    tagline: '"Se não for gostoso, não vira hábito."',
    story: 'Cansada de comida saudável sem graça e cara. Se a pessoa não tiver prazer no que come, ela para. O sabor é estratégico, não opcional.',
    frustrations: ['Comida saudável sem sabor', 'Preço fora da realidade', 'Prazer vs saúde'],
    color: '#88dd03',
    accent: 'rgba(136,221,3,0.06)',
    border: 'rgba(136,221,3,0.15)',
    initial: 'N',
  },
];

function FounderCard({ founder, index }: { founder: typeof founders[0]; index: number }) {
  const { ref, inView } = useInView(0.15);
  const [hovered, setHovered] = useState(false);

  return (
    <div
      ref={ref}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: hovered ? founder.accent : 'rgba(255,255,255,0.02)',
        border: `1px solid ${hovered ? founder.border : 'rgba(255,255,255,0.05)'}`,
        borderRadius: '24px',
        padding: '48px 40px',
        cursor: 'default',
        transition: `all 0.8s cubic-bezier(0.16, 1, 0.3, 1) ${index * 0.08}s, border 0.3s ease, background 0.3s ease`,
        opacity: inView ? 1 : 0,
        transform: inView ? 'translateY(0)' : 'translateY(50px)',
      }}
    >
      {/* Avatar */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '32px' }}>
        <div
          style={{
            width: '64px',
            height: '64px',
            borderRadius: '50%',
            background: `radial-gradient(circle at 35% 35%, ${founder.color}60, ${founder.color}20)`,
            border: `1px solid ${founder.color}40`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontFamily: 'var(--font-display)',
            fontSize: '24px',
            fontWeight: 800,
            color: founder.color,
            flexShrink: 0,
          }}
        >
          {founder.initial}
        </div>
        <div>
          <p
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: '18px',
              fontWeight: 700,
              color: '#fafafa',
              marginBottom: '4px',
            }}
          >
            {founder.name}
          </p>
          <span
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '11px',
              color: founder.color,
              fontWeight: 600,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
            }}
          >
            {founder.theme}
          </span>
        </div>
      </div>

      {/* Tagline */}
      <p
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(16px, 2vw, 20px)',
          fontWeight: 700,
          color: founder.color,
          lineHeight: 1.35,
          marginBottom: '20px',
          fontStyle: 'italic',
        }}
      >
        {founder.tagline}
      </p>

      {/* Story */}
      <p
        style={{
          fontFamily: 'var(--font-body)',
          fontSize: '14px',
          lineHeight: 1.8,
          color: 'rgba(250,250,250,0.45)',
          marginBottom: '28px',
        }}
      >
        {founder.story}
      </p>

      {/* Frustrations */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {founder.frustrations.map((item, i) => (
          <div
            key={i}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
            }}
          >
            <div
              style={{
                width: '4px',
                height: '4px',
                borderRadius: '50%',
                background: founder.color,
                flexShrink: 0,
              }}
            />
            <span
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '12px',
                color: 'rgba(250,250,250,0.3)',
              }}
            >
              {item}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Founders() {
  const { ref, inView } = useInView(0.1);

  return (
    <section
      id="fundadoras"
      style={{
        padding: '160px 0',
        background: 'var(--joy-dark)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div className="container-joy">
        {/* Header */}
        <div
          ref={ref}
          style={{
            marginBottom: '80px',
            transition: 'all 1.2s ease',
            opacity: inView ? 1 : 0,
            transform: inView ? 'translateY(0)' : 'translateY(30px)',
          }}
        >
          <span className="tag" style={{ marginBottom: '24px', display: 'inline-flex' }}>Fundadoras</span>
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: '32px' }}>
            <h2
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(32px, 5vw, 72px)',
                fontWeight: 800,
                lineHeight: 1.05,
                letterSpacing: '-0.02em',
                color: '#fafafa',
                maxWidth: '700px',
              }}
            >
              Quatro dores.
              <br />
              <span className="gradient-text-orange">Uma solução.</span>
            </h2>
            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '15px',
                lineHeight: 1.8,
                color: 'rgba(250,250,250,0.4)',
                maxWidth: '360px',
              }}
            >
              A JOYGROUP nasceu da experiência real de quatro mulheres que sentiram na pele a dificuldade de manter uma alimentação saudável na vida corrida.
            </p>
          </div>
        </div>

        {/* Founders grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: '16px',
          }}
          className="founders-grid"
        >
          {founders.map((founder, i) => (
            <FounderCard key={i} founder={founder} index={i} />
          ))}
        </div>

        {/* Bottom CTA */}
        <div
          style={{
            marginTop: '80px',
            textAlign: 'center',
          }}
        >
          <p
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(18px, 2.5vw, 28px)',
              fontWeight: 700,
              color: 'rgba(250,250,250,0.15)',
              marginBottom: '32px',
            }}
          >
            Não é só um restaurante. É um movimento.
          </p>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .founders-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
