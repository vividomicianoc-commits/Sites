'use client';
import { useEffect, useRef, useState } from 'react';

function useInView(threshold = 0.2) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, inView };
}

const lines = [
  { text: 'Acreditamos que alimentar é um gesto de cuidado.', bold: false },
  { text: 'Não apenas com o corpo.', bold: false },
  { text: 'Mas com o dia que ainda precisa acontecer.', bold: false },
  { text: 'Comida não é só combustível.', bold: true },
  { text: 'É energia que sustenta o dia.', bold: false },
  { text: 'É presença no meio da correria.', bold: false },
  { text: 'Comer bem precisa ser viável.', bold: true },
  { text: 'Parte da rotina. Parte da vida real.', bold: false },
  { text: 'Ainda dá tempo.', bold: true },
  { text: 'Tempo de comer bem.', bold: true },
];

function Line({ text, bold, index }: { text: string; bold: boolean; index: number }) {
  const { ref, inView } = useInView(0.5);
  return (
    <div ref={ref} style={{ overflow: 'hidden', paddingBottom: '6px' }}>
      <p style={{
        fontFamily: 'var(--font-display)',
        fontSize: bold ? 'clamp(24px, 4vw, 56px)' : 'clamp(18px, 3vw, 40px)',
        fontWeight: bold ? 900 : 400,
        lineHeight: 1.2,
        color: bold ? 'var(--joy-grafite)' : 'rgba(22,22,22,0.35)',
        transition: `all 0.9s cubic-bezier(0.16,1,0.3,1) ${index * 0.07}s`,
        transform: inView ? 'translateY(0)' : 'translateY(100%)',
        opacity: inView ? 1 : 0,
      }}>
        {text}
      </p>
    </div>
  );
}

export default function Manifesto() {
  const { ref, inView } = useInView(0.1);

  return (
    <section id="manifesto" style={{ background: 'var(--joy-cream)', padding: '140px 0', position: 'relative', overflow: 'hidden' }}>
      {/* Orange accent block */}
      <div style={{
        position: 'absolute', right: 0, top: '10%', width: '6px', height: '60%',
        background: 'linear-gradient(to bottom, transparent, var(--joy-orange), transparent)',
        borderRadius: '4px 0 0 4px',
      }} />

      <div className="container-joy">
        <div ref={ref} style={{
          marginBottom: '72px',
          transition: 'all 1s ease',
          opacity: inView ? 1 : 0, transform: inView ? 'translateY(0)' : 'translateY(24px)',
        }}>
          <span className="tag tag-orange" style={{ marginBottom: '20px', display: 'inline-flex' }}>Manifesto</span>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '14px', color: 'var(--joy-gray-lt)', maxWidth: '400px', lineHeight: 1.6 }}>
            Por que a Joyeat existe. Em palavras honestas.
          </p>
        </div>

        <div style={{ maxWidth: '860px' }}>
          {lines.map((l, i) => <Line key={i} {...l} index={i} />)}
        </div>

        {/* Signature */}
        <div style={{
          marginTop: '80px', paddingTop: '56px',
          borderTop: '1.5px solid rgba(22,22,22,0.08)',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '24px',
        }}>
          <div>
            <div style={{ fontFamily: 'var(--font-display)', fontWeight: 900, fontSize: '20px', color: 'var(--joy-grafite)', marginBottom: '4px' }}>
              <span style={{ color: 'var(--joy-orange)' }}>Joy</span>
              <span>Y</span>
              <span style={{ color: 'var(--joy-green-dk)' }}>eat</span>
            </div>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '12px', color: 'var(--joy-gray-lt)' }}>Goiânia, 2024 — Em construção</p>
          </div>
          <p style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(16px, 2.5vw, 26px)', fontWeight: 900, color: 'var(--joy-orange)', maxWidth: '360px' }}>
            &ldquo;Em tempo de comer bem.&rdquo;
          </p>
        </div>
      </div>
    </section>
  );
}
