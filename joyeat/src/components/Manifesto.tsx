'use client';

import { useEffect, useRef, useState } from 'react';

const manifestoLines = [
  { text: 'As pessoas querem comer bem.', accent: false },
  { text: 'O problema nunca foi a intenção.', accent: false },
  { text: 'Foi a vida real.', accent: true },
  { text: 'A correria. O cansaço mental. As escolhas que cansam.', accent: false },
  { text: 'Comer bem precisa ser viável.', accent: true },
  { text: 'Escolher o que comer não deveria gerar dúvida.', accent: false },
  { text: 'Somos o ponto de equilíbrio entre tempo e cuidado.', accent: false },
  { text: 'Ainda dá tempo.', accent: true },
  { text: 'Em tempo de comer bem.', accent: true },
];

function useInView(threshold = 0.2) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setInView(true);
      },
      { threshold }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, inView };
}

function ManifestoLine({ text, accent, index }: { text: string; accent: boolean; index: number }) {
  const { ref, inView } = useInView(0.3);

  return (
    <div
      ref={ref}
      style={{
        overflow: 'hidden',
        padding: '4px 0',
      }}
    >
      <p
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(22px, 4vw, 52px)',
          fontWeight: accent ? 800 : 400,
          lineHeight: 1.2,
          color: accent ? '#fafafa' : 'rgba(250,250,250,0.35)',
          transition: `all 1s cubic-bezier(0.16, 1, 0.3, 1) ${index * 0.08}s`,
          transform: inView ? 'translateY(0)' : 'translateY(100%)',
          opacity: inView ? 1 : 0,
        }}
      >
        {accent ? (
          <span className="gradient-text-orange">{text}</span>
        ) : text}
      </p>
    </div>
  );
}

export default function Manifesto() {
  const { ref: sectionRef, inView: sectionInView } = useInView(0.1);

  return (
    <section
      id="manifesto"
      ref={sectionRef}
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
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '800px',
          height: '800px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(253,105,0,0.04) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      <div className="container-joy">
        {/* Tag */}
        <div
          style={{
            marginBottom: '80px',
            transition: 'all 1s ease 0.1s',
            opacity: sectionInView ? 1 : 0,
            transform: sectionInView ? 'translateY(0)' : 'translateY(20px)',
          }}
        >
          <span className="tag">Manifesto</span>
        </div>

        {/* Manifesto lines */}
        <div style={{ maxWidth: '900px' }}>
          {manifestoLines.map((line, i) => (
            <ManifestoLine key={i} text={line.text} accent={line.accent} index={i} />
          ))}
        </div>

        {/* Divider + assinatura */}
        <div
          style={{
            marginTop: '80px',
            paddingTop: '60px',
            borderTop: '1px solid rgba(255,255,255,0.06)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '32px',
            transition: 'all 1s ease 0.5s',
            opacity: sectionInView ? 1 : 0,
            transform: sectionInView ? 'translateY(0)' : 'translateY(20px)',
          }}
        >
          <div>
            <p
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '13px',
                fontWeight: 600,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: 'var(--joy-orange)',
                marginBottom: '8px',
              }}
            >
              JOYGROUP
            </p>
            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '14px',
                color: 'rgba(250,250,250,0.4)',
              }}
            >
              Goiânia, 2024 — Em construção
            </p>
          </div>

          {/* The problem section */}
          <div
            style={{
              maxWidth: '420px',
            }}
          >
            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '15px',
                lineHeight: 1.8,
                color: 'rgba(250,250,250,0.45)',
              }}
            >
              Fast casual saudável pensado para a rotina real:
              rápido, gostoso e sem esforço mental.
              Sem radicalismo. Sem gourmetização. Sem complicação.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
