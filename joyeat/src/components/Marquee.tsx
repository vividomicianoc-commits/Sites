'use client';

const words = [
  'Em tempo de comer bem',
  'Comida de verdade',
  'Fast casual saudável',
  'Joyeat',
  'Goiânia',
  'Sem esforço mental',
  'Transparência total',
  'Sabor real',
  'Sem radicalismo',
  'Alimentação para rotina real',
];

export default function Marquee({ bg = 'var(--joy-orange)', color = '#fff', reverse = false }: { bg?: string; color?: string; reverse?: boolean }) {
  const doubled = [...words, ...words];
  return (
    <div style={{ background: bg, overflow: 'hidden', padding: '16px 0' }}>
      <div className="marquee-track" style={{
        animation: `marquee 24s linear infinite ${reverse ? 'reverse' : ''}`,
      }}>
        {doubled.map((w, i) => (
          <span key={i} style={{
            fontFamily: 'var(--font-display)', fontSize: '14px', fontWeight: 800,
            letterSpacing: '0.12em', textTransform: 'uppercase', color,
            whiteSpace: 'nowrap', marginRight: '56px',
            display: 'inline-flex', alignItems: 'center', gap: '56px',
          }}>
            {w}
            <span style={{ width: 5, height: 5, borderRadius: '50%', background: color, opacity: 0.4, flexShrink: 0 }} />
          </span>
        ))}
      </div>
    </div>
  );
}
